# RPT_29 Problem Log — 2026-02-18

| Code | Severity | Layer | Description |
| --- | --- | --- | --- |
| `RUNTIME_EMPTY_REPORT` | medium | runtime_html | Live `RPT_29` rendered only a totals row (`ИТОГО 0.00 ₽`) and no business leaf rows. |
| `DATE_RANGE_ROUTE_REQUIRED` | medium | route | Saved report `29` accepts `date_range[start]` / `date_range[end]`; earlier route audit showed `date[start]` / `date[end]` falls back to annual defaults. |
| `ANNUAL_COMPOSITE_NOT_DATE_SPECIFIC` | high | supporting_artifacts | Existing annual/default unpaid-family composite artifacts are not safe to reuse as date-specific evidence for `2026-02-18`. |
| `UPDATER_HISTORY_NOT_PROVEN` | high | semantics | Updater/reason/history semantics for the unpaid report family remain unresolved in accepted readable sources. |

## Verification notes

- raw runtime capture exists and parses as JSON;
- screenshot exists;
- workbook and meta are built from repo-local artifacts only;
- no accepted API parity claim was made for this slice.
