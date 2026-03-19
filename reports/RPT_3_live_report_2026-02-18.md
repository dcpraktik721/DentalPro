# RPT_3 Live Report

Date fixed: `2026-03-19`

Report under test:
- `RPT_3`
- `Задолженности и авансы`
- report date `2026-02-18`

## Executive verdict

`RPT_3` for `2026-02-18` is now live-probed and usable as a `ready_with_limits` report slice.

What is strong:
- authenticated runtime page is proven
- six-column HTML table is proven
- native export flow is proven
- column `Долг` is sample-proven through patient cashbox balances

What is limited:
- runtime and native export are not parity-safe on this date
- exact backend source chain for the full table remains hidden/server-side
- `i/balance` is not proven as direct row source

## Live runtime facts

Route:
- `https://dcpraktik.dental-pro.online/reports/reports/view?id=3&date_range[start]=2026-02-18&date_range[end]=2026-02-18`

Observed columns:
- `Пациент`
- `Телефон`
- `Долг`
- `Аванс`
- `Доступно собственных средств`
- `Дата последней операции`

Observed runtime metrics:
- runtime rows: `241`
- runtime footer:
  - `Долг = 140 600.00 ₽`
  - `Аванс = 4 253 790.20 ₽`
  - `Доступно собственных средств = 4 113 190.20 ₽`

Observed runtime arithmetic:
- `Доступно собственных средств = Аванс - Долг`

Observed report-family assets on the page:
- `cashbox.*`
- `pay_debt.*`
- `reports.*`

## Native export

Saved file:
- [RPT_3_2026-02-18_live_export.xlsx](/Users/macbook15/Downloads/MacAi/DentalPro/excel/RPT_3_2026-02-18_live_export.xlsx)

Export mechanics:
- export starts at `/exporter/index?...`
- first step is intermediate HTML form
- second step is `/exporter/step_export?...`
- final file path is returned by `/exporter/process_export?...`

Safe export classification:
- `two_step_async_export`

## Where the `Долг` column comes from

### Proven on sampled patients

Strongest current source:
- patient cashbox balance view on patient card:
  - `cbase/detail.html?id=<patient_id>&tab=cashbox\\cbase\\bills`

Sample 1:
- patient `625`
- report row:
  - `Долг = 17 800.00 ₽`
  - `Аванс = 0.00 ₽`
  - `Доступно собственных средств = -17 800.00 ₽`
- patient cashbox tab:
  - `Персональный счёт пациента Баланс: 0.00 ₽`
  - `Долговой счёт пациента Баланс: -17 800.00 ₽`
- verdict:
  - report `Долг` matches the absolute value of the debt-account balance

Sample 2:
- patient `710`
- report row:
  - `Долг = 7 750.00 ₽`
  - `Аванс = 0.00 ₽`
  - `Доступно собственных средств = -7 750.00 ₽`
- patient cashbox tab:
  - `Персональный счёт пациента Баланс: 0.00 ₽`
  - `Долговой счёт пациента Баланс: -7 750.00 ₽`
- verdict:
  - same rule confirmed

Sample 3:
- patient `2230`
- report row:
  - `Долг = 0.00 ₽`
  - `Аванс = 200.00 ₽`
  - `Доступно собственных средств = 200.00 ₽`
- patient cashbox tab:
  - `Персональный счёт пациента Баланс: 200.00 ₽`
  - `Долговой счёт пациента Счет еще не открыт`
- verdict:
  - zero-debt / positive-advance case also matches patient cashbox balances

### What is not proven as source

`i/balance`:
- API settings describe it as `Импортирует суммы долгов и авансов`
- live test with native patient id `625` returned `Клиент не найден`
- safe conclusion:
  - do not promote `i/balance` to direct read source for `RPT_3`

`i/client`:
- useful for patient identity
- does not explain `Долг/Аванс/Доступно собственных средств`

### Safe source verdict

Allowed wording:
- `For sampled rows, RPT_3 column "Долг" is explained by the patient cashbox debt-account balance rendered on patient cashbox tabs.`

Forbidden wording:
- `RPT_3 debt comes from i/balance`
- `RPT_3 full backend source is fully closed`
- `runtime and export are identical`

## Runtime vs export comparison

Current result:
- `mismatch_detected`

Runtime:
- rows: `241`
- footer advance: `4 253 790.20 ₽`
- footer available own funds: `4 113 190.20 ₽`

Export:
- rows excluding total: `243`
- footer advance: `3 350 956.20 ₽`
- footer available own funds: `3 210 356.20 ₽`

Observed drift:
- `5` runtime-only patients
- `7` export-only patients
- `3` shared patients with changed values and changed last-operation dates

This means:
- runtime HTML is primary evidence for this live pass
- export exists, but row-level and aggregate parity are `not_proven`

Detailed drift list:
- see [RPT_3_problem_log_2026-02-18.md](/Users/macbook15/Downloads/MacAi/DentalPro/reports/RPT_3_problem_log_2026-02-18.md)

## Evidence classification

### Proven
- authenticated live page open
- runtime six-column table
- runtime row extraction
- two-step export flow
- sampled `Долг` linkage to patient cashbox debt-account balance

### Partial
- hidden backend generation path for the full table
- `RPT_3` relation to broader debts-and-advances family
- export usability as secondary evidence layer

### Not proven
- direct published API source for the full `RPT_3` table
- direct `i/balance` read mapping
- runtime-to-export parity on `2026-02-18`

## Final conclusion

`RPT_3` on `2026-02-18` is now a valid live evidence slice.

Recommended operational stance:
- use runtime HTML as source of truth for this tested slice
- use native export only with explicit mismatch warning
- treat `Долг` as sample-proven via patient cashbox balances
- keep backend source mapping and export parity under `partial / not_proven`
