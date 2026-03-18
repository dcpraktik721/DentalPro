# Repo Map

- `README.md` — главный инженерный operating document.
- `docs/project_overview.md` — зачем нужен repo и какой scope он закрывает.
- `docs/architecture.md` — high-level architecture и proof model.
- `docs/verified_capabilities.md` — curated capability index.
- `docs/known_limits.md` — explicit current limits and boundaries.
- `docs/workflows.md` — repeatable workflows and operating patterns.
- `docs/repo_map.md` — этот файл.
- `docs/migration_plan.md` — staged migration из legacy workspaces.
- `docs/current_assets_index.md` — current migrated assets, review queue, superseded map in human-readable form.
- `docs/patient_layer_overview.md` — curated patient-layer operating summary after Phase 3.
- `docs/patient_dossier_tabs_overview.md` — curated patient dossier-tab coverage, route maps and current tab-family closure after Phase 4.
- `docs/patient_dossier_remaining_tabs_overview.md` — focused closure of files/documents/family/comments/history tabs after Phase 5.

- `registry/methods_registry.json` — method registry template; still bootstrap-level until dedicated method migration.
- `registry/artifacts_registry.json` — current migrated artifacts registry.
- `registry/scripts_registry.json` — current migrated scripts registry.
- `registry/domains_registry.json` — current migrated domain map.
- `registry/status_dictionary_registry.json` — reusable status dictionary template.
- `registry/current_assets_index.json` — main machine-readable migration index.
- `registry/patient_assets_index.json` — patient-layer migration index and patient source-of-truth roles.
- `registry/patient_dossier_tabs_index.json` — dossier-tab-specific source-of-truth index and tab-family coverage.
- `registry/patient_remaining_tabs_index.json` — focused Phase 5 index for files/documents/family/comments/history tabs.
- `registry/review_queue.json` — assets requiring manual review before migration.
- `registry/superseded_assets.json` — assets explicitly marked as superseded/do-not-migrate.

- `config/paths.json` — canonical repo paths.
- `config/project_settings.json` — project statuses, naming policy, repo settings.

- `artifacts/` — consolidated knowledge package, verified maps, readiness JSON, frozen current cross-domain assets.
- `scripts/` — current migrated reusable scripts.
- `logs/` — temp runtime logs.
- `data/raw/` — untouched source files.
- `data/normalized/` — normalized datasets.
- `data/exports/` — downloaded export files.
- `excel/` — current migrated workbooks and future final Excel outputs.
- `reports/` — disclosures, master reports, migration reports and current Markdown report assets.
- `schedule/` — current day-schedule baseline assets and schedule JSON outputs.
- `patients/` — patient identity and patient-campaign outputs.
- `patients/` also stores patient access/path support docs and patient-card forensic Markdown when the dominant role is patient-layer.
- `artifacts/` now also stores medcards registry JSON and xray boundary evidence migrated in Phase 4.
- `artifacts/` now also stores remaining-tab route/method packs such as [base_profile_and_tabs.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/base_profile_and_tabs.json) and [files_and_documents.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/files_and_documents.json).
- `tickets/` — current ticket registries, dictionaries, semantic closure and SOP files.
- `reporting/` — report universe, family maps, governed verdicts and report analysis artifacts.
- `finance/` — patient cashbox models and schedule finance enrichment.
- `runtime/` — reserved for future migrated runtime-only assets not yet copied in Phase 2.
- `tools/` — helper utilities.

## Current migrated highlights

- knowledge package:
  - [dentalpro_verified_capability_master_map.md](/Users/macbook15/Downloads/MacAi/DentalPro/reports/dentalpro_verified_capability_master_map.md)
  - [dentalpro_verified_data_capabilities.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/dentalpro_verified_data_capabilities.json)
- schedule:
  - [schedule_2026-03-10_operational_dump_master.md](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-03-10_operational_dump_master.md)
  - [schedule_2026-03-10_patient_full_report_v5.xlsx](/Users/macbook15/Downloads/MacAi/DentalPro/excel/schedule_2026-03-10_patient_full_report_v5.xlsx)
- tickets:
  - [schedule_2026-03-10_ticket_registry_v2.json](/Users/macbook15/Downloads/MacAi/DentalPro/tickets/schedule_2026-03-10_ticket_registry_v2.json)
  - [ticket_dictionary_v2.json](/Users/macbook15/Downloads/MacAi/DentalPro/tickets/ticket_dictionary_v2.json)
- reporting:
  - [report_universe_2026_03_16.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/report_universe_2026_03_16.json)
  - [RPT_23_final_governed_verdict_2026-03-11.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/RPT_23_final_governed_verdict_2026-03-11.json)
- finance:
  - [patient_cashbox_18910_document_model_2026-03-18.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/patient_cashbox_18910_document_model_2026-03-18.json)
- patient layer:
  - [patient_layer_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_layer_overview.md)
  - [patient_dossier_tabs_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_dossier_tabs_overview.md)
  - [patient_dossier_remaining_tabs_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_dossier_remaining_tabs_overview.md)
  - [patient_mobile_client-2026-01-15.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/patient_mobile_client-2026-01-15.json)
  - [patient_insurance-2026-01-15.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/patient_insurance-2026-01-15.json)
  - [patient-appointment-data-flow.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient-appointment-data-flow.md)
  - [dentalpro-screen-map-2026-03-09.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro-screen-map-2026-03-09.md)
  - [dentalpro_runtime_extraction_empty_cards_2026_03_16.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json)
  - [Task_Graph_Blueprint_Ultimate_Patient_Dossier.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/Task_Graph_Blueprint_Ultimate_Patient_Dossier.md)
  - [patient_dossier_live_15900_2026-03-14.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/patient_dossier_live_15900_2026-03-14.json)
