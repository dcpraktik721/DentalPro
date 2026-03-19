# RPT_39 Live Report — 2026-02-18

Report: `RPT_39` / `Касса: товары и услуги`

Date slice:
- `date_start = 2026-02-18`
- `date_end = 2026-02-18`

Primary truth:
- `runtime_html`

Supporting layer:
- catalog-level candidate sources only

## What was run

- repo-local auth refresh and static auth smoke were completed before the live pass;
- repo-local single-date probe opened:
  - `https://dcpraktik.dental-pro.online/reports/reports/view?id=39&date_range[start]=2026-02-18&date_range[end]=2026-02-18`
- raw runtime capture and screenshot were saved inside the repo.

## Runtime result

- live route opened authenticated;
- final runtime URL remained on saved report `id=39`;
- runtime title: `Касса: товары и услуги`;
- no runtime table was rendered;
- visible runtime message:
  - `Нет данных по вашему запросу`

## Verified interpretation

- on `2026-02-18`, the live `RPT_39` runtime report rendered as a no-data slice;
- the slice is still valid evidence because it confirms:
  - authenticated access to saved report `39`;
  - accepted single-date route shape via `date_range[start]` and `date_range[end]`;
  - actual runtime output state on the requested date.

## Safe claim boundary

Allowed wording:
- `RPT_39` single-date runtime slice for `2026-02-18` is captured and verified.
- The report opened authenticated and showed `Нет данных по вашему запросу`.
- Runtime HTML is the primary truth for this slice.

Forbidden wording:
- candidate API sources reproduce `RPT_39` for `2026-02-18`;
- `z/pays`, `invoice/detail`, or `z/services` are already verified report truth for this slice;
- `RPT_39` row semantics are closed.

## Output package

- curated probe:
  - `/Users/macbook15/Downloads/MacAi/DentalPro/reporting/RPT_39_live_probe_2026-02-18.json`
- raw runtime capture:
  - `/Users/macbook15/Downloads/MacAi/DentalPro/reporting/report-39-2026-02-18-2026-02-18.json`
- screenshot:
  - `/Users/macbook15/Downloads/MacAi/DentalPro/reporting/report-39-2026-02-18-2026-02-18.png`
- normalized workbook:
  - `/Users/macbook15/Downloads/MacAi/DentalPro/excel/RPT_39_2026-02-18_normalized.xlsx`
- meta sidecar:
  - `/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/RPT_39_2026-02-18_meta.json`

## Verdict

- closure level: `partial`
- operational status: `usable_with_limits`
- main limit: no business rows were observed and candidate API mappings remain unverified for this slice.
