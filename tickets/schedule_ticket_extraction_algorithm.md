# DentalPRO Schedule Ticket Extraction Algorithm

## Objective

Воспроизводимо извлекать тикеты с карточек визитов в расписании DentalPRO через live runtime, без screenshot-first подхода и без blind hover sweep.

## Canonical Order

1. Открыть нужную дату расписания через:
   - `https://dcpraktik.dental-pro.online/visits/schedule/index?date=YYYY-MM-DD`
2. Дождаться стабильного runtime state:
   - `domcontentloaded`
   - затем `networkidle`, если достижим
3. Найти карточку визита по stable DOM id:
   - `#task-record-<visit_id>`
4. Внутри карточки найти icon nodes тикетов:
   - `#task-record-<visit_id> .task-icons i`
5. Не использовать broad hover sweep.
   Для каждого icon node делать clean probe отдельно:
   - очистить/закрыть текущие layers;
   - вызвать live React handler на конкретном icon node;
   - дождаться реально отрисованного `.rc-tooltip`
6. Снять только live rendered tooltip:
   - `icon_class`
   - `ticket_order`
   - `tooltip_text`
   - `tooltip_html`
   - `visit_id`
   - `patient_id`
   - `patient_name`
7. Нормализовать ticket category по exact tooltip text и icon family rules.
8. Для каждого тикета явно проставить:
   - `proven`
   - `inferred`
   - `not_proven`
9. После каждого icon probe закрывать layer:
   - `Escape`
   - safe body click
   - short wait
10. Popup пациента открывать отдельно clean click по карточке, не смешивать с ticket tooltip.

## Runtime Method

### Ticket tooltip

Правильный порядок для одного icon node:

1. Найти icon element.
2. Получить React props key:
   - property name starts with `__reactProps$`
3. Проверить наличие `onMouseEnter`.
4. Перед probe удалить старые `.rc-tooltip`.
5. Вызвать:
   - `props.onMouseEnter({ target: el, currentTarget: el, type: 'mouseenter' })`
6. Подождать `~220ms`.
7. Считать:
   - `.rc-tooltip`
   - `innerText`
   - `outerHTML`
8. Вызвать `onMouseLeave`, если есть.

Только такой tooltip считать source of truth.

### Patient popup

Popup пациента и ticket tooltip — разные слои.

Правильный порядок:

1. Закрыть текущие tooltips.
2. Кликнуть по карточке:
   - `#task-record-<visit_id>`
3. Подождать `~350ms`.
4. Искать patient popup:
   - `.popover.show`
5. Извлекать popup отдельно:
   - patient full name
   - phone
   - action buttons
   - info text

Popup пациента нельзя использовать как доказательство ticket tooltip, если exact trigger -> layer relation не разделена.

## Proven Data Contract

Для каждого тикета сохранять минимум:

- `visit_id`
- `patient_id`
- `patient_name_full` or runtime patient name
- `doctor_name`
- `ticket_order`
- `icon_class`
- `icon_attrs`
- `tooltip_text`
- `tooltip_html`
- `source_layer = rendered_rc_tooltip`
- `linkage_method = live_react_onMouseEnter_on_icon_node`
- `tooltip_proof`
- `normalized_category`
- `proof_level`
- `notes`

## Normalization Rule

1. Exact tooltip text has priority over icon class.
2. Один и тот же icon class может означать разные категории.
   Пример:
   - `schi-3` -> `external_booking_source_info`
   - `schi-3` -> `free_text_note_marker`
3. Если role semantics не выражена прямо в tooltip/popup text, не поднимать категорию до `proven`.
4. `inferred` допустим только если есть supporting runtime context outside icon-local tooltip.

## Proven / Inferred / Not Proven

### proven

Использовать только если:
- tooltip был реально отрисован live runtime;
- exact tooltip text captured;
- category выводится напрямую из текста.

### inferred

Использовать только если:
- icon-local tooltip сам по себе недостаточен;
- есть дополнительный runtime context;
- direct role label не найден.

### not_proven

Использовать если:
- tooltip не открылся;
- stale layer contamination нельзя исключить;
- category не выводится безопасно.

## Stable Selectors and Runtime Anchors

- schedule date route:
  - `/visits/schedule/index?date=YYYY-MM-DD`
- visit card:
  - `#task-record-<visit_id>`
- ticket icons container:
  - `#task-record-<visit_id> .task-icons`
- ticket icon node:
  - `#task-record-<visit_id> .task-icons i`
- rendered tooltip root:
  - `.rc-tooltip`
- patient popup root:
  - `.popover.show`
- popup patient name:
  - `.sheduler_popover_header_name`
- popup info:
  - `.sheduler_popover_header_info`
- popup phone:
  - `.telephony-call-button[data-phone]`

## Stale Contamination Prevention

Обязательная последовательность:

1. удалить старые `.rc-tooltip`, если probe идет через icon handler;
2. после каждого probe:
   - `Escape`
   - click on safe body point
   - short wait
3. не переиспользовать tooltip из предыдущей карточки;
4. не открывать popup пациента поверх активного tooltip;
5. при сомнении:
   - hard reload between subset batches
   - not between every icon by default

## What Not To Do

- не делать broad blind hover sweep;
- не использовать screenshot как источник истины;
- не считать tooltip proven, если открыт не на exact icon node;
- не смешивать ticket tooltip и patient popup;
- не нормализовать category только по icon class, если exact tooltip text противоречит этому;
- не считать stale `.rc-tooltip` valid evidence.

## Typical Errors and Recovery

### 1. Tooltip did not open

Причина:
- icon node without active React handler
- stale refs

Что делать:
- re-query exact icon node
- проверить `__reactProps$`
- повторить clean probe

### 2. Tooltip text belongs to previous icon

Причина:
- stale tooltip not removed

Что делать:
- удалить `.rc-tooltip`
- закрыть layers
- повторить probe

### 3. Popup patient data mixed into ticket extraction

Причина:
- card click performed before tooltip capture finished

Что делать:
- разделить ticket probe и popup probe на два отдельных шага

### 4. Same icon class maps to different semantics

Причина:
- semantic overload on icon family

Что делать:
- classify by exact tooltip text first
- use icon class only as fallback family marker

### 5. Role semantics still unclear

Причина:
- tooltip contains only person name or short marker

Что делать:
- keep `inferred` or `not_proven`
- add supporting runtime context if available

## Distinguishing Ticket Tooltip vs Patient Popup

| Layer | Trigger | Root selector | Truth level |
|---|---|---|---|
| ticket tooltip | icon node `onMouseEnter` | `.rc-tooltip` | primary for ticket semantics |
| patient popup | clean click on visit card | `.popover.show` | secondary layer for patient/card/actions |

Rule:
- ticket semantics come from ticket tooltip first;
- popup is supporting runtime context, not replacement for tooltip.
