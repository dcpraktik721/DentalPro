# RPT_4 Live Report — 2026-02-18

Report: `RPT_4` / `Первичные пациенты`

Date slice:
- `date_start = 2026-02-18`
- `date_end = 2026-02-18`

Primary truth:
- `runtime_html` anchored replay

Supporting layer:
- accepted API replay:
  - `z/patients`
  - `z/pays`
  - `z/visits`
  - `z/doctor/all`
  - `mobile/owner/advSourcesList`
  - `i/client`

## What was run

- repo-local auth refresh and static auth smoke were completed before the live pass;
- repo-local single-date UI capture opened:
  - `https://dcpraktik.dental-pro.online/reports/reports/view?id=4&date_range[start]=2026-02-18&date_range[end]=2026-02-18`
- accepted legacy replay `analyze_report_4_api.js` was then run against the repo-local UI capture.

## Runtime result

- live route opened authenticated;
- report rendered a single HTML table with canonical `RPT_4` headers;
- UI row count: `7`;
- captured period in form fields:
  - `18.02.2026 - 18.02.2026`

## Replay result

- API replay rows: `7`
- verification pass: `false`
- verified-field mismatches: `2`

Observed mismatches:
1. `ГОРБАТЮК НИКОЛАЙ ФЕДОРОВИЧ`
   - field: `Врач`
   - UI: `Кулешов К.А.`
   - API replay: `Храпонова Н.А.`
2. `МОРЖЕВСКАЯ ОЛЬГА ВЛАДИМИРОВНА`
   - field: `Дата текущей первичной записи`
   - UI: `18.02.2026`
   - API replay: `17.02.2026`

## Verified interpretation

- the single-date runtime slice is real and saved;
- accepted API replay remains operationally useful;
- row identity is preserved on this slice;
- two verified-field mismatches show that this slice stays below full parity closure.

## Safe claim boundary

Allowed wording:
- `RPT_4` on `2026-02-18` has a live UI slice plus accepted API replay.
- The replay is usable with limits and still shows residual mismatches.
- `runtime_html` remains the anchoring truth for this slice.

Forbidden wording:
- `RPT_4` is fully reproduced by accepted APIs on `2026-02-18`;
- doctor/date-current-primary semantics are fully closed on this slice;
- `Филиал` and `Координатор` are verified 1:1 fields.

## Output package

- raw UI capture:
  - `/Users/macbook15/Downloads/MacAi/DentalPro/reporting/report-4-2026-02-18-2026-02-18-date_range.json`
- API replay:
  - `/Users/macbook15/Downloads/MacAi/DentalPro/reporting/report-4-api-copy-2026-02-18-2026-02-18.json`
- normalized workbook:
  - `/Users/macbook15/Downloads/MacAi/DentalPro/excel/RPT_4_2026-02-18_normalized.xlsx`
- meta sidecar:
  - `/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/RPT_4_2026-02-18_meta.json`

## Verdict

- closure level: `partial`
- operational status: `usable_with_limits`
- main limit: replay still has residual mismatches and hidden backend predicate/field-closure gaps.
