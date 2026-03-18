# Source of Truth Hierarchy

## Rule order

1. Current repo artifact with direct evidence
2. Current repo summary built from direct evidence
3. Supporting/manual slice artifact
4. External dependency explicitly referenced in repo
5. Old report language if not backed by current artifact

## Domain mapping

| Domain | Primary SoT | Secondary | Boundary |
| --- | --- | --- | --- |
| schedule baseline | [schedule_2026-03-10_patient_full_report_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-03-10_patient_full_report_v5.json) | operational dump, popup linkage, status dictionary | March baseline only |
| schedule cross-date | [cross_date_validation_matrix.json](/Users/macbook15/Downloads/MacAi/DentalPro/reports/cross_date_validation_matrix.json) | per-date validation summaries, Feb 16 repro pass | three dates only |
| ticket semantics | [schedule_2026-03-10_ticket_registry_v2.json](/Users/macbook15/Downloads/MacAi/DentalPro/tickets/schedule_2026-03-10_ticket_registry_v2.json) | ticket dictionary, semantic closure | `schi-10` inferred |
| patient identity | [schedule_2026-03-10_patient_identity_probe_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/schedule_2026-03-10_patient_identity_probe_v5.json) | Feb identity validations, repro pass | Feb 16 subset only |
| patient dossier read-path | [patient_dossier_remaining_tabs_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_dossier_remaining_tabs_overview.md) | dossier tab overviews, live dossier sample | read-path only |
| finance baseline | [schedule_2026-03-10_cash_enrichment_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/schedule_2026-03-10_cash_enrichment_v5.json) | patient cashbox document models | patient-day only |
| runtime auth | [auth_runtime_readiness.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/auth_runtime_readiness.md) | auth refresh/smoke result JSONs | local external auth dependency |

## Handling conflicts

### February ticket drift

- Canonical metrics come from:
  - [schedule_2026-02-15_validation_summary.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-02-15_validation_summary.json)
  - [schedule_2026-02-16_validation_summary.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-02-16_validation_summary.json)
- Supporting files:
  - [schedule_2026-02-15_ticket_validation.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-02-15_ticket_validation.json)
  - [schedule_2026-02-16_ticket_validation.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-02-16_ticket_validation.json)
- These supporting files are not used as canonical metric sources when they drift from summaries.

### February cash drift

- Canonical repo-safe claim:
  - February cash is not fully closed in repo.
- Supporting evidence:
  - `2026-02-16` validation summary contains an external-dependent partial match slice.
- That supporting slice must not be promoted to full in-repo cash closure.
