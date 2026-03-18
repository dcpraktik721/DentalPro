# Repo Map

- [README.md](/Users/macbook15/Downloads/MacAi/DentalPro/README.md) — top-level operating document.
- [docs/repo_current_state_master.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/repo_current_state_master.md) — frozen current repo state and safe claim boundary.
- [docs/current_methods_manual.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/current_methods_manual.md) — current methods operating manual.
- [docs/source_of_truth_hierarchy.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/source_of_truth_hierarchy.md) — canonical SoT ordering and conflict rules.
- [docs/verified_capabilities.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/verified_capabilities.md) — current capability layer.
- [docs/auth_runtime_readiness.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/auth_runtime_readiness.md) — auth/runtime operating boundary.

- `registry/methods_registry.json` — current machine-readable methods registry.
- `registry/domain_sot_boundary_table.json` — domain to SoT mapping.
- `registry/current_assets_index.json` — current asset inventory.
- `registry/scripts_registry.json` — current script inventory.
- `registry/artifacts_registry.json` — current artifact inventory.

- `schedule/` — schedule validations, baseline day assets, repro passes.
- `tickets/` — ticket registry, dictionary, semantic closure, extraction SOP.
- `patients/` — patient identity artifacts, campaign slices, dossier samples.
- `finance/` — cash enrichment and reference cashbox document models.
- `reporting/` — report-universe and governed report-family verdicts.
- `runtime/` — auth refresh/smoke scripts and latest runtime result artifacts.
- `reports/` — phase reports, validation matrix, audit layer, final repo verification.

## Canonical highlights

- schedule baseline:
  - [schedule_2026-03-10_patient_full_report_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-03-10_patient_full_report_v5.json)
- schedule cross-date:
  - [cross_date_validation_matrix.json](/Users/macbook15/Downloads/MacAi/DentalPro/reports/cross_date_validation_matrix.json)
- ticket SoT:
  - [schedule_2026-03-10_ticket_registry_v2.json](/Users/macbook15/Downloads/MacAi/DentalPro/tickets/schedule_2026-03-10_ticket_registry_v2.json)
- patient identity baseline:
  - [schedule_2026-03-10_patient_identity_probe_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/schedule_2026-03-10_patient_identity_probe_v5.json)
- February repro slice:
  - [schedule_2026-02-16_identity_repro_pass.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-02-16_identity_repro_pass.json)
- finance baseline:
  - [schedule_2026-03-10_cash_enrichment_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/schedule_2026-03-10_cash_enrichment_v5.json)
