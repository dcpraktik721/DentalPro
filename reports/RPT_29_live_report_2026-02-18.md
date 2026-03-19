# RPT_29 Live Report — 2026-02-18

Report: `RPT_29` / `Квитанции без оплаты`

Date slice:
- `date_start = 2026-02-18`
- `date_end = 2026-02-18`

Primary truth:
- `runtime_html`

Supporting layer:
- existing unpaid family artifacts only

## What was run

- repo-local auth refresh and static auth smoke were completed before the live pass;
- repo-local single-date probe opened:
  - `https://dcpraktik.dental-pro.online/reports/reports/view?id=29&date_range[start]=2026-02-18&date_range[end]=2026-02-18`
- raw runtime capture and screenshot were saved inside the repo.

## Runtime result

- live route opened authenticated;
- final runtime URL remained on saved report `id=29`;
- runtime title: `Квитанции без оплаты`;
- one table was rendered;
- observed headers:
  - `Статус квитанции / Кем изменено / Пациент`
  - `Квитанция`
  - `Филиал`
  - `Создатель квитанции`
  - `Дата создания`
  - `Дата изменения`
  - `Причина`
  - `Сумма к оплате`
- observed rows:
  - header row
  - `ИТОГО ... 0.00 ₽`

## Verified interpretation

- on `2026-02-18`, the live `RPT_29` runtime report rendered as an empty slice;
- no business leaf rows were observed;
- the slice is still valid evidence because it confirms:
  - the correct single-date route shape for saved report `29`;
  - authenticated runtime rendering on the requested date;
  - the actual runtime output state for that date.

## Safe claim boundary

Allowed wording:
- `RPT_29` single-date runtime slice for `2026-02-18` is captured and verified.
- The report rendered empty with only an `ИТОГО 0.00 ₽` row.
- Runtime HTML is the primary truth for this slice.

Forbidden wording:
- accepted API fully reproduces `RPT_29` for `2026-02-18`;
- annual/default unpaid composite is date-specific evidence for this slice;
- updater/reason/history semantics are closed for `RPT_29`.

## Output package

- curated probe:
  - `/Users/macbook15/Downloads/MacAi/DentalPro/reporting/RPT_29_live_probe_2026-02-18.json`
- raw runtime capture:
  - `/Users/macbook15/Downloads/MacAi/DentalPro/reporting/report-29-2026-02-18-2026-02-18.json`
- screenshot:
  - `/Users/macbook15/Downloads/MacAi/DentalPro/reporting/report-29-2026-02-18-2026-02-18.png`
- normalized workbook:
  - `/Users/macbook15/Downloads/MacAi/DentalPro/excel/RPT_29_2026-02-18_normalized.xlsx`
- meta sidecar:
  - `/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/RPT_29_2026-02-18_meta.json`

## Verdict

- closure level: `verified_with_limits`
- operational status: `usable_with_limits`
- main limit: this is an empty-runtime slice and annual unpaid-family composites remain supporting-only, not date-specific truth.
