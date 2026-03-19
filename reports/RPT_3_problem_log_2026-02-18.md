# RPT_3 Problem Log

Date fixed: `2026-03-19`

Report under test:
- `RPT_3`
- `Задолженности и авансы`
- report date `2026-02-18`

## Problem 1. Runtime vs export mismatch

Status:
- `confirmed`

Observed:
- runtime HTML table rows: `241`
- export workbook rows excluding total: `243`
- runtime footer:
  - `Долг = 140 600.00 ₽`
  - `Аванс = 4 253 790.20 ₽`
  - `Доступно собственных средств = 4 113 190.20 ₽`
- export footer:
  - `Долг = 140 600.00 ₽`
  - `Аванс = 3 350 956.20 ₽`
  - `Доступно собственных средств = 3 210 356.20 ₽`

Runtime-only patients:
- `АСКАРОВА РЕГИНА КАМИЛЬЕВНА`
- `ЕРШОВА ИРИНА ВИКТОРОВНА`
- `КОЖЕВНИКОВА СВЕТЛАНА СЕРГЕЕВНА`
- `МАЙЕР ПОЛИНА ОЛЕГОВНА`
- `ФАРАДЖАЕВ РАШИД ГУСЕЙНОВИЧ`

Export-only patients:
- `БЕЛОБОРОДОВ АЛЕКСЕЙ ВИКТОРОВИЧ`
- `ЗАДОРОЖНЮК НАТАЛЬЯ АЛЕКСАНДРОВНА`
- `ЗАРУБА НИНА ОЛЕГОВНА`
- `МИНАСЯН ВЛАДИМИР КАРЕНОВИЧ`
- `ПЕРЕДНЯ ТАТЬЯНА ГЕННАДЬЕВНА`
- `ХАЛИТОВА АННА АЛЕКСАНДРОВНА`
- `ШАГИМЕРДАНОВ РУСЛАН НИЯЗОВИЧ`

Same-patient field mismatches:
- `МАКАРЬ ДОЙНА НИКОЛАЕВНА`
  - runtime: `Аванс = 15 370.00 ₽`, `Дата последней операции = 06.10.2025`
  - export: `Аванс = 7 205.00 ₽`, `Дата последней операции = 16.03.2026`
- `ОСЕТРОВ АЛЕКСАНДР ВЛАДИМИРОВИЧ`
  - runtime: `Аванс = 10 000.00 ₽`, `Дата последней операции = 20.12.2025`
  - export: `Аванс = 140.00 ₽`, `Дата последней операции = 09.03.2026`
- `ШМУНК ЛЮБОВЬ ВЛАДИМИРОВНА`
  - runtime: `Аванс = 570 000.00 ₽`, `Дата последней операции = 16.02.2026`
  - export: `Аванс = 250 000.00 ₽`, `Дата последней операции = 11.03.2026`

Safe conclusion:
- `runtime` and `native export` must be treated as separate evidence layers for this tested slice.
- direct row parity is `not_proven`.

## Problem 2. Candidate API mismatch for debt source

Status:
- `confirmed`

Observed:
- API settings classify `i/balance` as `Импортирует суммы долгов и авансов`
- live `i/balance` test with native patient id `625` returned:
  - `status = false`
  - `error = Клиент не найден.`

Safe conclusion:
- `i/balance` is not proven as direct read source for `RPT_3` `Долг`.
- if it participates at all, that path is not closed in current evidence.

## Problem 3. Export flow is not direct-file

Status:
- `confirmed`

Observed:
- `/exporter/index?...` returns an intermediate HTML form with submit button `Далее`
- actual file appears only after:
  - `/exporter/step_export?...`
  - hidden iframe to `/exporter/process_export?...`
  - callback `export_done('/content/cache/dpfile_1773892081_pMoBNOVROi.xlsx')`

Safe conclusion:
- RPT_3 export is `two_step_async_export`, not direct file download from the first export URL.

## Problem 4. Hidden backend generation path remains unresolved

Status:
- `open`

Observed:
- runtime HTML and patient cashbox tabs explain sampled `Долг` values
- no single published API read method has been proven as the direct table source

Safe conclusion:
- backend generation remains `partial`
- patient cashbox balance view is the strongest current explanatory source
