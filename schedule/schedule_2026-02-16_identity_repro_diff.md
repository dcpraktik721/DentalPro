# Identity Repro Diff 2026-02-16

## Reference

- old patient_rows_total = 67
- old patient_rows_probed = 40
- old popup_success_count = 30
- old patient_id_resolved_probed = 24
- old unresolved_probed = 16

## Repro result

- new patient_rows_total = 67
- new patient_rows_probed = 40
- new popup_success_count = 30
- new patient_id_resolved_probed = 24
- new unresolved_probed = 16

## Comparison

- exact same summary metrics: yes
- changed rows count: 0
- resolved overlap count: 24
- resolved only old count: 0
- resolved only new count: 0
- failed overlap count: 16
- failed only old count: 0
- failed only new count: 0

## Failure reason overlap

- old failure reasons: {"missing_patient_link":6,"modal_not_opened":10}
- new failure reasons: {"missing_patient_link":6,"modal_not_opened":10}

## Changed rows

| Visit ID | Patient | Old status | New status | Old failure | New failure |
| --- | --- | --- | --- | --- | --- |
| n/a | n/a | n/a | n/a | n/a | n/a |

## Final verdict

- reproducible
- old 24/40 trusted
- yes, another follow-up beyond 40 is still useful if broader February identity closure is needed

## Safe boundary

- schi-10 remains inferred
- cash remains patient-day only
- auth remains ready_with_limits
