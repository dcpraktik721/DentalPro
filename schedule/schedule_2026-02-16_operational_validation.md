# Schedule Operational Validation 2026-02-16

## Executive

| Area | Result | Notes |
| --- | --- | --- |
| Authenticated route access | pass | final_url=https://dcpraktik.dental-pro.online/visits/schedule/index?date=2026-02-16 |
| Schedule root | present | title=Расписание на день |
| Rows extracted | 69 | patient_rows=67, service_rows=2 |
| Doctors count | 12 | column-based extraction |
| Ticket tooltips | 372/372 | live rendered rc-tooltip only |
| Patient identity | 24/40 | popup clean click + patient-info action (subset) |
| Cash enrichment | 12/67 | patient-day only |

## Boundaries

- cross-date observation from this file alone is not a stability proof
- schi-10 remains inferred
- cash remains patient-day only and is not a direct visit-to-cash fact
- auth is usable through external storageState but not self-bootstrapping inside repo
