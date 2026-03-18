# Scope Insurance Verified Library

Дата верификации: `2026-01-15`

Назначение:
- зафиксировать только те `Показатель -> API method -> API key`, которые подтверждены живыми вызовами;
- не включать write-методы, empty-result методы и отрицательные ответы в field-level библиотеку.

Источник доказательства:
- `projects/dentalpro-integration/artifacts/api/scope-runner/patient_insurance-2026-01-15.json`

## Подтвержденные методы

### `insurance/getClients`

| Показатель | API method | API key | Пример значения на `2026-01-15` | Статус |
|---|---|---|---|---|
| `ID страхового пациента` | `insurance/getClients` | `data[].client_id` | `1155` | Доказано |
| `Дата начала прикрепления` | `insurance/getClients` | `data[].date_add` | `2020-03-11` | Доказано |
| `Дата окончания прикрепления` | `insurance/getClients` | `data[].date_end` | `2021-03-10` | Доказано |
| `ID страховой компании у пациента` | `insurance/getClients` | `data[].id_company` | `6` | Доказано |

### `insurance/getInsuranceCompanies`

| Показатель | API method | API key | Пример значения на `2026-01-15` | Статус |
|---|---|---|---|---|
| `ID страховой компании` | `insurance/getInsuranceCompanies` | `data[].id` | `6` | Доказано |
| `Название страховой компании` | `insurance/getInsuranceCompanies` | `data[].name` | `СПАО Ресо-Гарантия` | Доказано |
| `Дата создания страховой компании` | `insurance/getInsuranceCompanies` | `data[].createdAt.date` | `2026-03-08 17:52:43.083072` | Доказано |
| `Тип timezone поля createdAt` | `insurance/getInsuranceCompanies` | `data[].createdAt.timezone_type` | `3` | Доказано |
| `Timezone поля createdAt` | `insurance/getInsuranceCompanies` | `data[].createdAt.timezone` | `Asia/Yekaterinburg` | Доказано |

### `insurance/getPrices`

| Показатель | API method | API key | Пример значения на `2026-01-15` | Статус |
|---|---|---|---|---|
| `ID прайс-листа страховой` | `insurance/getPrices` | `data[].id` | `45` | Доказано |
| `Название прайс-листа страховой` | `insurance/getPrices` | `data[].name` | `Новый прайс 2026, 21.01.2026 г.` | Доказано |
| `Дата создания прайс-листа` | `insurance/getPrices` | `data[].createdAt.date` | `2026-03-08 17:52:43.449373` | Доказано |
| `Тип timezone поля прайса` | `insurance/getPrices` | `data[].createdAt.timezone_type` | `3` | Доказано |
| `Timezone поля прайса` | `insurance/getPrices` | `data[].createdAt.timezone` | `Asia/Yekaterinburg` | Доказано |

## Что сознательно не включено

- `insurance/addDMS`, `insurance/addInsuranceCompany`, `insurance/addInsuranceProgram`, `insurance/removeClientDMS`:
  write-методы, не исполнялись.
- `insurance/getProgramsByCompany`:
  метод вызывается, но на `id_company=2` вернул `status=true` и пустой `data`, поэтому row-level keys не доказаны.
- `insurance/getClientsByCompanyID`:
  метод вызывается, но на `id_company=2` вернул `status=false` и `Не найдено прикрепленных клиентов к страховой компании`, поэтому row-level keys не доказаны.

## Вывод

`scope-insurance` можно использовать в общей библиотеке как источник:
- связки пациента со страховой компанией;
- справочника страховых компаний;
- справочника страховых прайс-листов.
