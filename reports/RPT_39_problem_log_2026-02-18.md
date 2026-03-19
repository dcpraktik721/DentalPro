# RPT_39 Problem Log — 2026-02-18

| Code | Severity | Layer | Description |
| --- | --- | --- | --- |
| `RUNTIME_NO_DATA` | medium | runtime_html | Live `RPT_39` opened authenticated but rendered no table and showed `Нет данных по вашему запросу`. |
| `API_MAPPING_NOT_VERIFIED` | high | semantics | Candidate sources for `RPT_39` remain catalog-level only and were not promoted into report truth for `2026-02-18`. |

## Verification notes

- raw runtime capture exists and parses as JSON;
- screenshot exists;
- workbook and meta are built from repo-local artifacts only;
- no accepted API parity claim was made for this slice.
