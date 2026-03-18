# DentalPRO Screen Map — 2026-03-09

Основа документа: только уже зафиксированные интерфейсные факты из `dentalpro-ui-facts-2026-03-09.md`, сгруппированные по экранам и ролям.

Маркировка фактов:
- `observed`
- `inferred`
- `linked_to_accepted_source`
- `hypothesis`

## 1. Screen catalog

| Screen code | Screen name | URL / pattern | Назначение | Основные роли | Связанные экраны | Маркер |
|---|---|---|---|---|---|---|
| `SCH_DAY` | Расписание на день | `/visits/schedule/index?date=2026-03-07` | Центральный операционный экран расписания | администратор, врач, координатор | `SCH_WEEK`, `PAT_LIST`, `PAT_DETAIL`, `CASHBOX`, `XRAY_INDEX`, `REPORTS_INDEX`, `INS_SCHEDULE`, `SERVICE_RECORD_MODAL`, `WORK_INTERVAL_*`, `HOLD_RECORD_ACTION` | `observed` |
| `SCH_WEEK` | Расписание на неделю | `/visits/schedule/week?clear` | Недельный режим расписания | администратор, координатор | `SCH_DAY` | `observed` |
| `PAT_LIST` | База пациентов | `/cbase/index.html` | Поиск, фильтрация, массовые действия по пациентам | администратор, координатор | `PAT_DETAIL` | `observed` |
| `PAT_DETAIL` | Карточка пациента | `/cbase/detail.html?id=*` | Карточка пациента | администратор, врач, координатор | likely related from `PAT_LIST`, `SCH_DAY` | `observed` |
| `CASHBOX` | Касса | `/cashbox/index` | Финансовый операционный экран | касса, администратор, директор | `CASHBOX_PRICE_APPT`, `CASHBOX_PRICE_SERVICE` | `observed` |
| `CASHBOX_PRICE_APPT` | Стоимость приемов | `/cashbox/priceAppointments` | Стоимостной экран приемов | администратор, финансы | linked from `SCH_DAY` / `CASHBOX` domain | `observed` |
| `CASHBOX_PRICE_SERVICE` | Стоимость услуг | `/cashbox/priceService` | Стоимостной экран услуг | администратор, финансы | linked from `SCH_DAY` / `CASHBOX` domain | `observed` |
| `XRAY_INDEX` | Рентген кабинет | `/xray/Images/index` | Экран рентген-исследований | рентген, врач, администратор | imaging actions | `observed` |
| `REPORTS_INDEX` | Отчётный модуль | `/reports/reports/index` | Каталог отчетов | директор, управляющий, финансы | report screens | `observed` |
| `INS_SCHEDULE` | Записи страховых пациентов | `/insurance/schedule` | Специализированный schedule по ДМС | администратор, координатор | insurance-specific records | `observed` |
| `TASKS_INDEX` | Задачи | `/task/Task/open` | Рабочие задачи | администратор, координатор | unknown | `observed` |
| `TIMESHEET_INDEX` | Табель / графики | `/timesheet/Timesheets/index` | Табель и графики | администратор, управляющий | unknown | `observed` |
| `MEDBLOCK_CARDS` | Медкарты | `/medblock/cards/index` | Медицинские карты | врач | likely clinical screens | `observed` |
| `SERVICE_RECORD_MODAL` | Служебная запись | `/visits/forms/serviceRecord` | Создание служебной записи | администратор | modal from `SCH_DAY` | `observed` |
| `WORK_INTERVAL_EDIT_MODAL` | Редактирование графика работы | `/stompro/scheduler/formEditInterval?...` | Изменение рабочего интервала | администратор | modal from `SCH_DAY` | `observed` |
| `WORK_INTERVAL_ADD_MODAL` | Добавление графика работы | `/stompro/scheduler/formAddInterval?...` | Создание рабочего интервала | администратор | modal from `SCH_DAY` | `observed` |
| `HOLD_RECORD_ACTION` | Отложенная запись | `/holdrecord/ajax.json?action=add` | Waitlist/deferred record action | администратор, координатор | action from `SCH_DAY` | `observed` |
| `SUPPORT_VIDEO_MODAL` | Видео-подсказка | `/support/sidebar/video?type=*` | Обучающий modal-help | все роли | help from `SCH_DAY` | `observed` |
| `VISIT_CARD_OR_APPT` | Карточка визита / приема | unknown concrete URL | Drilldown из schedule task | врач, администратор | likely from `SCH_DAY` | `hypothesis` |
| `RECORD_MOVE` | Перенос записи | unknown concrete URL | Перенос schedule record | администратор | likely from `SCH_DAY` | `inferred` |
| `RECORD_COMMENTS` | Комментарии записи | unknown concrete URL | Комментарии к записи | администратор, координатор | likely from `SCH_DAY` | `hypothesis` |

## 2. Role-to-screen matrix

| Роль | Основные экраны | Поддерживающие экраны | High-risk write controls | Маркер |
|---|---|---|---|---|
| Администратор | `SCH_DAY`, `PAT_LIST`, `INS_SCHEDULE`, `CASHBOX` | `SCH_WEEK`, `TASKS_INDEX`, `TIMESHEET_INDEX`, `SERVICE_RECORD_MODAL`, `WORK_INTERVAL_*` | service record, hold record, edit mode, work intervals, patient create | `inferred` + `observed` |
| Врач | `SCH_DAY`, `PAT_DETAIL`, `MEDBLOCK_CARDS`, `XRAY_INDEX` | `PAT_LIST` | not directly confirmed on inspected screen set | `inferred` + `observed` |
| Координатор | `SCH_DAY`, `PAT_LIST`, `INS_SCHEDULE`, `TASKS_INDEX` | `SCH_WEEK`, `REPORTS_INDEX` | hold record, patient search/context switches | `inferred` + `observed` |
| Касса / финансовый пользователь | `CASHBOX` | `REPORTS_INDEX`, schedule paid indicators context | finance operations inside cashbox tabs | `inferred` + `observed` |
| Директор / управляющий | `REPORTS_INDEX`, `CASHBOX` | `SCH_DAY` as observational operational hub | not confirmed direct writes in inspected set | `inferred` + `observed` |
| Рентген / imaging user | `XRAY_INDEX` | `PAT_DETAIL`, `SCH_DAY` context | print/order actions | `inferred` + `observed` |
| Call-center / telephony workstation | `SCH_DAY` | telephony controls, tasks | telephony connect control | `inferred` + `observed` |

## 3. Screen groups by domain

| Domain | Экраны | Маркер |
|---|---|---|
| Scheduling core | `SCH_DAY`, `SCH_WEEK`, `SERVICE_RECORD_MODAL`, `WORK_INTERVAL_EDIT_MODAL`, `WORK_INTERVAL_ADD_MODAL`, `HOLD_RECORD_ACTION` | `observed` |
| Patient management | `PAT_LIST`, `PAT_DETAIL` | `observed` |
| Finance | `CASHBOX`, `CASHBOX_PRICE_APPT`, `CASHBOX_PRICE_SERVICE` | `observed` |
| Imaging | `XRAY_INDEX` | `observed` |
| Reports / management | `REPORTS_INDEX` | `observed` |
| Insurance-specific operations | `INS_SCHEDULE` | `observed` |
| Clinical support | `MEDBLOCK_CARDS` | `observed` |
| Tasks / workforce | `TASKS_INDEX`, `TIMESHEET_INDEX` | `observed` |

## 4. Expanded screen map by screen

### `SCH_DAY` — Расписание на день

**URL:** `/visits/schedule/index?date=2026-03-07`  
**Назначение:** day-level operational schedule hub  
**Маркер:** `observed`

#### Zones

| Zone | Что найдено | Маркер |
|---|---|---|
| Header | `Расписание на день` | `observed` |
| Header / telephony | `Автоподключение`, `Внутренний номер`, `Подключиться` | `observed` |
| Global navigation | links to patients, cashbox, xray, reports, tasks, timesheet, medblock, insurance | `observed` |
| Date controls | previous day, today, next day, date input | `observed` |
| Mode controls | day/week, doctor/chair, adult/child-like view toggles | `observed` |
| Context controls | patient search, delayed record, service record | `observed` |
| Dropdown controls | edit mode, color scheme, simple mode, doctor display, pricing links, clinic schedule edit | `observed` |
| Help controls | support video links | `observed` |
| Specialty tabs | `Все`, `Рентген лаборант`, `Гигиенисты`, `Детская терапия`, `Анестезиологи`, `Пародонтологи`, `Ортопеды`, `Ортодонты`, `Терапевты`, `Хирурги` | `observed` |
| Main timeline | `.timeline`, doctor lanes, time axis, task cards | `observed` |
| Availability blocks | blocked intervals, reserve blocks | `observed` |
| Inline work controls | add/edit interval actions | `observed` |

#### Key UI elements

| Element | Type | Function | Related entity | Маркер |
|---|---|---|---|---|
| `Предыдущий день` | button | shift day backward | schedule day | `observed` |
| `Сегодняшний день` | button | jump to today | schedule day | `observed` |
| `Следующий день` | button | shift day forward | schedule day | `observed` |
| `Выберите дату` | date input | choose day | schedule day | `observed` |
| specialty tabs | tabs | filter doctor groups / department-like subsets | doctor group | `observed` |
| `Поиск по пациентам` | select2 search | patient lookup from schedule | patient | `observed` |
| `Отложенная запись` | action | start deferred record flow | hold record | `observed` |
| `Служебная запись` | button | open service record modal | service record | `observed` |
| `Режим редактирования` | dropdown action | enable edit mode | scheduler UI state | `observed` |
| `Цветовая схема` | dropdown action | change scheduler color scheme | scheduler UI state | `observed` |
| `Упрощенный режим` | dropdown action | simplify scheduler UI | scheduler UI state | `observed` |
| `Отображение врачей` | dropdown action | adjust doctor visibility | doctor display | `observed` |
| `Стоимость приемов` | dropdown link | open pricing page | finance/pricing | `observed` |
| `Стоимость услуг` | dropdown link | open pricing page | finance/pricing | `observed` |
| task card `task-record-*` | draggable card | represent schedule record | visit / record | `observed` |
| `status-paid` icon | status icon | visual paid indicator | pay state | `observed` |
| `callcentr-*` icons | status icons | call-center state indicators | call-center state | `observed` |
| blocked interval text | blocked block | unavailable slot | schedule availability | `observed` |
| reserve block | schedule block | reserved interval | reserve slot | `observed` |
| add/edit interval controls | inline action | work interval modal | work interval | `observed` |

#### Linked screens

| Linked screen | How linked | Маркер |
|---|---|---|
| `SCH_WEEK` | mode toggle | `observed` |
| `PAT_LIST` | global nav | `observed` |
| `PAT_DETAIL` | patient search redirect | `observed` |
| `CASHBOX` | global nav | `observed` |
| `CASHBOX_PRICE_APPT` | dropdown link | `observed` |
| `CASHBOX_PRICE_SERVICE` | dropdown link | `observed` |
| `XRAY_INDEX` | global nav | `observed` |
| `REPORTS_INDEX` | global nav | `observed` |
| `INS_SCHEDULE` | global nav | `observed` |
| `SERVICE_RECORD_MODAL` | service record button | `observed` |
| `WORK_INTERVAL_EDIT_MODAL` | inline edit | `observed` |
| `WORK_INTERVAL_ADD_MODAL` | inline add | `observed` |
| `HOLD_RECORD_ACTION` | delayed record action | `observed` |
| `VISIT_CARD_OR_APPT` | task click | `hypothesis` |
| `RECORD_MOVE` | drag/drop or action | `inferred` |
| `RECORD_COMMENTS` | task-level action | `hypothesis` |

#### Role emphasis

| Role | Why screen matters | Risk points | Маркер |
|---|---|---|---|
| Администратор | central scheduling control | edit mode, interval changes, service/hold records | `inferred` |
| Врач | daily patient/time visibility | unclear drilldown path to appointment | `inferred` |
| Координатор | patient lookup + waitlist + task visibility | context switching and schedule mutation risk | `inferred` |
| Call-center workstation | telephony controls + call-center icons | icon semantics not fully closed | `inferred` |

### `PAT_LIST` — База пациентов

**URL:** `/cbase/index.html`  
**Назначение:** patient lookup and operations  
**Маркер:** `observed`

| Zone / block | Что найдено | Маркер |
|---|---|---|
| Header | `База пациентов` | `observed` |
| Top actions | `Добавить`, `Опции`, `Поиск дублей`, SMS actions, export/group actions | `observed` |
| Filters | patient name, phone, snils, schedule date, manager, birthday | `observed` |
| Main table | patient table with at least `Фамилия`, `Филиал` | `observed` |

| Role | Why screen matters | Маркер |
|---|---|---|
| Администратор | patient CRUD and operational search | `inferred` |
| Координатор | search/filter/contact context | `inferred` |
| Врач | possible lookup context, not primary confirmed screen | `inferred` |

### `PAT_DETAIL` — Карточка пациента

**URL pattern:** `/cbase/detail.html?id=*`  
**Назначение:** patient card  
**Маркер:** `observed`

| Fact | Маркер |
|---|---|
| URL pattern confirmed from schedule search JS | `observed` |
| Opens for existing patient selected from schedule search | `observed` |
| Internal anatomy not yet opened in this pass | `observed` |
| Patient card as primary screen object | `inferred` |

### `CASHBOX` — Касса

**URL:** `/cashbox/index`  
**Назначение:** finance operations hub  
**Маркер:** `observed`

| Zone / block | Что найдено | Маркер |
|---|---|---|
| Header | `Касса` | `observed` |
| Tabs | `Касса`, `Касса для юр.лиц`, `Разделенные квитанции`, `Платежи`, `Документы по платежам`, `Средства гигиены`, `Сверка итогов`, `Super-VIP`, `Сертификаты`, `Заказ-наряды`, `Рекламация` | `observed` |
| Filters | date range, status, overdue, client_id, payer_id | `observed` |
| Main zone | finance table/list | `observed` |

| Role | Why screen matters | Маркер |
|---|---|---|
| Касса / финансовый пользователь | primary finance operations | `inferred` |
| Администратор | cross-functional operations | `inferred` |
| Директор | finance visibility / report context | `inferred` |

### `XRAY_INDEX` — Рентген кабинет

**URL:** `/xray/Images/index`  
**Назначение:** imaging workflow screen  
**Маркер:** `observed`

| Zone / block | Что найдено | Маркер |
|---|---|---|
| Header | `Рентген кабинет` | `observed` |
| Filters | 3 filters | `observed` |
| Main rows | studies with modality, patient, time/date | `observed` |
| Actions | `Создать заказ-наряд`, `Печать снимка`, `Печать ИДС` | `observed` |

| Role | Why screen matters | Маркер |
|---|---|---|
| Рентген / imaging user | operational imaging flow | `inferred` |
| Врач | linked diagnostic context | `inferred` |
| Администратор | cross-module support | `inferred` |

### `REPORTS_INDEX` — Отчётный модуль

**URL:** `/reports/reports/index`  
**Назначение:** catalog of reports  
**Маркер:** `observed`

| Zone / block | Что найдено | Маркер |
|---|---|---|
| Header | `Отчётный модуль` | `observed` |
| Tabs | `Все отчёты`, `Финансы`, `Загруженность`, `Приёмы`, `Call-центр`, `ДМС`, `Склад` | `observed` |
| Main table | catalog with headers `№`, `Название`, `Доступ`, `Тип`, `Добавлен` | `observed` |
| Example report names | finance and operations reports listed in body text | `observed` |

| Role | Why screen matters | Маркер |
|---|---|---|
| Директор / управляющий | management reporting entry point | `inferred` |
| Финансы | finance report navigation | `inferred` |
| Координатор | possible operations reporting | `inferred` |

### `INS_SCHEDULE` — Записи страховых пациентов

**URL:** `/insurance/schedule`  
**Назначение:** insurance-specific schedule table  
**Маркер:** `observed`

| Zone / block | Что найдено | Маркер |
|---|---|---|
| Header | `Записи страховых пациентов` | `observed` |
| Filters | 4 filters | `observed` |
| Main table | headers `ID`, `Пациент`, `Врач`, `Отделение`, `Время начала`, `Время конца`, `Дмс` | `observed` |

| Role | Why screen matters | Маркер |
|---|---|---|
| Администратор | specialized scheduling flow | `inferred` |
| Координатор | insurance patient handling | `inferred` |

### `TASKS_INDEX`, `TIMESHEET_INDEX`, `MEDBLOCK_CARDS`

| Screen | URL | Fact | Маркер |
|---|---|---|---|
| `TASKS_INDEX` | `/task/Task/open` | visible in global navigation | `observed` |
| `TIMESHEET_INDEX` | `/timesheet/Timesheets/index` | visible in global navigation | `observed` |
| `MEDBLOCK_CARDS` | `/medblock/cards/index` | visible in global navigation | `observed` |
| `TASKS_INDEX` anatomy | not opened in this pass | `observed` |
| `TIMESHEET_INDEX` anatomy | not opened in this pass | `observed` |
| `MEDBLOCK_CARDS` anatomy | not opened in this pass | `observed` |

## 5. Role-centered navigation paths

### Администратор

| Entry screen | Next screens / actions | Маркер |
|---|---|---|
| `SCH_DAY` | patient search, hold record, service record, edit mode, add/edit work interval, open cashbox/reports/xray/insurance | `observed` + `inferred` |
| `PAT_LIST` | create/filter/export patient operations | `observed` |
| `CASHBOX` | finance tabs and filters | `observed` |
| `INS_SCHEDULE` | insurance schedule list | `observed` |

### Врач

| Entry screen | Next screens / actions | Маркер |
|---|---|---|
| `SCH_DAY` | view own schedule/group tab, likely click task to appointment | `observed` + `hypothesis` |
| `PAT_DETAIL` | likely patient card context | `observed` |
| `MEDBLOCK_CARDS` | med card module via nav | `observed` |
| `XRAY_INDEX` | imaging context | `observed` |

### Координатор

| Entry screen | Next screens / actions | Маркер |
|---|---|---|
| `SCH_DAY` | patient search, hold record, specialty tab navigation | `observed` + `inferred` |
| `PAT_LIST` | lookup and communications | `observed` |
| `TASKS_INDEX` | tasks via nav | `observed` |
| `INS_SCHEDULE` | insurance scheduling | `observed` |

### Касса / финансовый пользователь

| Entry screen | Next screens / actions | Маркер |
|---|---|---|
| `CASHBOX` | finance tabs, filters, documents and payments | `observed` |
| `REPORTS_INDEX` | finance report access | `observed` + `inferred` |
| `SCH_DAY` | paid indicators as operational context only | `observed` + `linked_to_accepted_source` |

### Директор / управляющий

| Entry screen | Next screens / actions | Маркер |
|---|---|---|
| `REPORTS_INDEX` | finance/load/visits/DMS report catalog | `observed` |
| `CASHBOX` | finance operations visibility | `observed` + `inferred` |
| `SCH_DAY` | operational observation context | `observed` + `inferred` |

## 6. Cross-screen entity visibility map

| Entity | Primary screens | Secondary screens | Маркер |
|---|---|---|---|
| Patient | `PAT_LIST`, `PAT_DETAIL` | `SCH_DAY`, `XRAY_INDEX`, `INS_SCHEDULE` | `observed` |
| Doctor | `SCH_DAY` | `INS_SCHEDULE`, likely `PAT_DETAIL`, marts context | `observed` + `linked_to_accepted_source` |
| Visit / record | `SCH_DAY` | `INS_SCHEDULE`, likely `VISIT_CARD_OR_APPT` | `observed` + `hypothesis` |
| Pay / invoice | `CASHBOX` | paid indicator on `SCH_DAY`, report screens | `observed` + `linked_to_accepted_source` |
| Service / procedure | `SCH_DAY` | `CASHBOX_PRICE_SERVICE`, reports context | `observed` + `linked_to_accepted_source` |
| Branch | page-level / table-level context on multiple screens | `SCH_DAY`, `PAT_LIST`, `INS_SCHEDULE`, branch marts | `observed` + `linked_to_accepted_source` |
| Xray study | `XRAY_INDEX` | likely patient/visit context | `observed` + `hypothesis` |
| Insurance record | `INS_SCHEDULE` | likely patient/visit context | `observed` + `hypothesis` |
| Work interval | `SCH_DAY` | interval modals | `observed` |
| Hold record | `SCH_DAY` | hold-record action flow | `observed` |
| Service record | `SCH_DAY` | service record modal | `observed` |

## 7. Screen-to-source candidates

| Screen | UI block | Candidate source | Маркер |
|---|---|---|---|
| `SCH_DAY` | schedule task cards | `z/visits` / `ods.ods_visits` | `linked_to_accepted_source` |
| `SCH_DAY` | doctor columns | `z/doctor/all` / `ods.dim_doctors` | `linked_to_accepted_source` |
| `SCH_DAY` | branch context | `i/branches` / `ods.dim_branches` | `linked_to_accepted_source` |
| `SCH_DAY` | service text | `z/services` / `ods.dim_services` | `linked_to_accepted_source` |
| `SCH_DAY` | paid icon | `z/pays` / `ods.ods_pays` | `linked_to_accepted_source` |
| `PAT_LIST` | patient search/list | `/cbase/*` UI routes | `observed` |
| `CASHBOX` | payments/docs | `z/pays`, `invoice/detail`, `ods.ods_pays`, `ods.ods_invoice_detail`, `ods.bridge_pay_invoice` | `linked_to_accepted_source` |
| `REPORTS_INDEX` | report catalog | internal reporting backend unknown | `hypothesis` |
| `XRAY_INDEX` | xray rows | xray/file backend unknown | `hypothesis` |
| `INS_SCHEDULE` | insurance rows | insurance backend unknown | `hypothesis` |

## 8. Screen-level write-risk map

| Screen | Write-capable element | Why risky | Маркер |
|---|---|---|---|
| `SCH_DAY` | edit mode | turns scheduler into editable surface | `observed` + `inferred` |
| `SCH_DAY` | drag-and-drop task cards | may move records | `observed` + `inferred` |
| `SCH_DAY` | service record modal | creates schedule object | `observed` |
| `SCH_DAY` | hold record action | creates/changes deferred record | `observed` |
| `SCH_DAY` | add/edit interval | changes work availability | `observed` |
| `PAT_LIST` | create patient | patient master write | `observed` |
| `PAT_LIST` | SMS / mass actions / grouping | mass effects | `observed` |
| `XRAY_INDEX` | create order / print flows | document and print side effects | `observed` |
| `CASHBOX` | not individually opened as writes in this pass | finance write surface likely exists | `inferred` |

## 9. Guardrails for using this map

| Area | Safe to use now | Unsafe to assume now | Маркер |
|---|---|---|---|
| Schedule source mapping | `z/visits` / `ods.ods_visits` as schedule-record source | finance interpretation of visits | `linked_to_accepted_source` |
| Finance interpretation | `z/pays`, `invoice/detail`, `bridge_pay_invoice`, marts | line-item invoice semantics | `linked_to_accepted_source` |
| DDS usage | aggregated branch-scoped context | transaction ledger interpretation | `linked_to_accepted_source` |
| recordCosts usage | aggregated doctor-period context | visit-level or service-line fact | `linked_to_accepted_source` |
| Patient UI | operational/UX map | accepted BI/ETL source-of-truth | `observed` + `inferred` |
| Insurance/xray/report catalog | screen existence and actions | accepted API/ODS source mapping | `observed` + `hypothesis` |

## 10. Open slots for future verification

| Topic | Why still open | Current marker |
|---|---|---|
| Task click -> visit card URL | not opened in this pass | `hypothesis` |
| Comments flow | no direct control captured | `hypothesis` |
| Arrival / cancel / no-show UI | no explicit state controls observed | `hypothesis` |
| Cashbox row-level actions | page opened, row internals not drilled | `inferred` |
| Patient detail anatomy | route known, anatomy not opened in this pass | `observed` |
| Insurance row drilldown | table observed, row click path not opened | `hypothesis` |
| Xray row drilldown | row actions seen, detail screen not opened | `hypothesis` |
