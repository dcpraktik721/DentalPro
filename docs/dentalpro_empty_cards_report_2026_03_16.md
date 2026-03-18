# DentalPRO Empty Cards Report — 2026-03-16

## 1. Objective
Obtain real system data for the DentalPRO report family `Пустые карты зв` (`Незаполненные карты / Пустые карты`) for date `2026-03-16` using browser-first execution and evidence-backed extraction.

## 2. Access path used
- Entry path: `https://dcpraktik.dental-pro.online/medblock/cards/index`
- Runtime family: `medblock/cards` registry, not `/reports/reports/view?id=...`
- Filter transport: native `GET` form submit from `form.js-filter`

## 3. Whether browser session or browser login was used
- Access mode: `browser_ui_login`
- Browser session reused: `False`
- Login required: `True`
- Login success: `True`

## 4. Whether XTEA/client-side encryption was observed
- XTEA/client crypto observed: `True`
- JS auth flow understood: `False`

## 5. Whether transport auth was reproduced
- Transport auth reproduced: `False`
- Official API/session found: `False`
- Practical result: access was achieved through real browser session, not transport-only auth replay.

## 6. Real request/response path for the report
- Initial registry path: `https://dcpraktik.dental-pro.online/medblock/cards/index`
- Filter method: `GET`
- Final filtered URL: `https://dcpraktik.dental-pro.online/medblock/cards/index?filter%5BFilter%5D%5Bstatus_change_date%5D%5Bstart%5D=2026-03-16&filter%5BFilter%5D%5Bstatus_change_date%5D%5Bend%5D=2026-03-16&filter%5BFilter%5D%5Bstatus%5D%5B%5D=0&filter%5BFilter%5D%5Bclient_id%5D=&filter%5BFilter%5D%5Bdiagnosis_id%5D=&filter%5BFilter%5D%5Bappointment_id%5D=`
- Required query keys observed: `filter[Filter][status_change_date][start]`, `filter[Filter][status_change_date][end]`, `filter[Filter][status][]`, `filter[Filter][client_id]`, `filter[Filter][diagnosis_id]`, `filter[Filter][appointment_id]`
- Selected status after submit: `[{'value': '0', 'text': 'Пустая'}]`
- Data-bearing endpoint: filtered HTML response from `/medblock/cards/index?...`

## 7. Whether report data was actually obtained
- Page accessible: `True`
- Date filter applied: `True`
- Runtime data visible: `True`
- Structured extraction complete: `True`
- Final data obtained: `True`

## 8. What fields and rows were extracted
- Headers: `ID, Информация о карте, Пациент, Врач, Статус, Создано, Обновлено`
- Row count: `18`
- Extraction method: `browser_session_html_table_after_native_get_form_submit`
- First rows sample:

```json
[
  {
    "ID": "68389",
    "Информация о карте": "Дата: 16.03.2026 | Зуб(ы): №48 Осмотр хирурга Диагноз: K00.0 Адентия",
    "Пациент": "КОЛЯДЕНКО ЕВГЕНИЙ АЛЕКСАНДРОВИЧ",
    "Врач": "Дышлевой К.А.",
    "Статус": "Пустая",
    "Создано": "Дышлевой К.А. 16.03.2026 в 20:05:34",
    "Обновлено": ""
  },
  {
    "ID": "68387",
    "Информация о карте": "Дата: 16.03.2026 | Зуб(ы): №16 Лечение периодонтита 1 канал -2 посещение Диагноз: К04.5 Хронический апикальный периодонтит",
    "Пациент": "ЛАПЫКИНА МАРИНА МИХАЙЛОВНА",
    "Врач": "Зотов В.Д.",
    "Статус": "Пустая",
    "Создано": "Зотов В.Д. 16.03.2026 в 19:31:18",
    "Обновлено": ""
  },
  {
    "ID": "68386",
    "Информация о карте": "Дата: 16.03.2026 | Зуб(ы): №45 Прямая реставрация зуба жевательной зоны Диагноз: K02.1 Кариес дентина",
    "Пациент": "КОЛЧЕНКО ОЛЬГА КОНСТАНТИНОВНА",
    "Врач": "Аушева М.А.",
    "Статус": "Пустая",
    "Создано": "Аушева М.А. 16.03.2026 в 19:20:56",
    "Обновлено": ""
  }
]
```

## 9. Whether export exists and whether file was received
- Export available: `False`
- Export used: `False`
- File received: `False`
- File parsed: `False`

## 10. What remains blocked or unknown
- No native export control was detected in the live DOM of `/medblock/cards/index`.
- No official API/session endpoint was claimed for this task.
- No client-side XTEA/auth transport reproduction was claimed.
- Internal medcard runtime endpoints like `/medblock/cards/get` and `/medblock/SelectApi/cardTemplate` remain known project facts, but they were not required to extract the registry data for this run.

## 11. Final concise verdict
Real browser access succeeded through `browser_ui_login`. The DentalPRO empty-cards registry for `2026-03-16` was opened, filtered, and structured rows were extracted directly from the live HTML runtime response. Export was not used because no export control was present in the live report UI.
