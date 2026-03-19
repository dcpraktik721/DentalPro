# RPT_9 problem log for 2026-02-18

## Confirmed issues

| issue_code | severity | layer | description |
|---|---|---|---|
| RUNTIME_EMPTY_REPORT | medium | runtime | Live RPT_9 runtime rendered no business rows on 2026-02-18 and showed only `ИТОГО 0.00 ₽`. |
| API_BROADER_THAN_REPORT | high | api/report parity | `z/pays` for `2026-02-18` returned `59` rows while runtime RPT_9 was empty. Accepted API output is broader than report truth on this slice. |
| UPDATER_HISTORY_NOT_PROVEN | high | semantics | Accepted APIs still do not expose `updated_user_id`, `updated_user_name`, `reason`, or `history[]` as direct read fields for `RPT_9`. |
| NO_DRILLDOWN_SAMPLE | low | hidden history validation | Because runtime report was empty, this pass could not sample a row-linked `cashbox/forms/detail` page for hidden history semantics. |

## Non-issues explicitly rejected

- No auth redirect was observed in this run.
- No claim is made that runtime empty output means source systems had no same-date finance rows.
- No claim is made that accepted API reproduces `RPT_9` on this date.
