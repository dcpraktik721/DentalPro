# RPT_4 Problem Log — 2026-02-18

| Code | Severity | Layer | Description |
| --- | --- | --- | --- |
| `VERIFIED_FIELD_MISMATCH` | high | replay | Accepted API replay still mismatched `2` verified fields against the live UI on this date. |
| `HIDDEN_BACKEND_PREDICATE` | high | selection | Full row selection logic for `RPT_4` remains not fully closed; at least one hidden backend predicate is still assumed. |
| `BRANCH_COORDINATOR_NOT_CLOSED` | medium | field_closure | `Филиал` and `Координатор` remain intentionally unclosed in the accepted replay. |

## Verification notes

- raw UI capture exists and parses as JSON;
- replay JSON exists and parses as JSON;
- workbook/meta are built from repo-local artifacts only;
- this slice must stay below full parity closure because verified-field mismatches remain.
