# Verified Capabilities

Этот документ — curated index current capabilities после `Phase 4` dossier-tab migration. Источник деталей:

- [current_assets_index.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/current_assets_index.md)
- [current_assets_index.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/current_assets_index.json)
- [patient_assets_index.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/patient_assets_index.json)
- [scripts_registry.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/scripts_registry.json)
- [artifacts_registry.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/artifacts_registry.json)
- [domains_registry.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/domains_registry.json)
- [patient_layer_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_layer_overview.md)
- [patient_dossier_tabs_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_dossier_tabs_overview.md)

## Patient layer

- current migrated capabilities:
  - patient identity closure for schedule rows via [schedule_2026-03-10_patient_identity_probe_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/schedule_2026-03-10_patient_identity_probe_v5.json)
  - patient-ready schedule dataset via [schedule_2026-03-10_patient_full_report_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-03-10_patient_full_report_v5.json)
  - patient campaign list via [patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18_v2.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18_v2.json)
  - doctor roster enrichment via [doctor_patients_Geyushova_2026-02_enriched_rpt24.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/doctor_patients_Geyushova_2026-02_enriched_rpt24.json)
  - patient access/path docs via [dentalpro-crm-page-observations-2026-03-09.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro-crm-page-observations-2026-03-09.md) and [patient-appointment-data-flow.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient-appointment-data-flow.md)
  - token boundary docs via [scope-mobile-client-verified-library-2026-01-15.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/scope-mobile-client-verified-library-2026-01-15.md)
  - insurance/DMS patient linkage via [scope-insurance-verified-library-2026-01-15.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/scope-insurance-verified-library-2026-01-15.md)
  - dossier-tab route maps via [dentalpro-screen-map-2026-03-09.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro-screen-map-2026-03-09.md)
  - medcards registry family via [dentalpro_empty_cards_forensic_disclosure_2026_03_16.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro_empty_cards_forensic_disclosure_2026_03_16.md) and [dentalpro_runtime_extraction_empty_cards_2026_03_16.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json)
  - xray boundary docs via [scope-xray-verification-2026-01-15.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/scope-xray-verification-2026-01-15.md)
  - patient cashbox forensic layer via [patient_cashbox_18910_forensic_2026-03-18.md](/Users/macbook15/Downloads/MacAi/DentalPro/patients/patient_cashbox_18910_forensic_2026-03-18.md)
- safe scope:
  - patient identity is proven for curated migrated outputs above
  - patient card access path and patient hub are now explicitly represented in the repo
  - dossier-tab layer is now curated for route maps, cashbox/payments, insurance boundary, medcards empty-cards registry and xray boundary
  - no full CRM-wide patient universe claim is stored in this repo yet
- not migrated yet:
  - payload-level outputs for files/documents/family/comments/history tabs
  - xray read-model closure remains review/validation-required

## Patient dossier tabs

- current migrated capabilities:
  - route and screen map coverage via [dentalpro-screen-map-2026-03-09.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro-screen-map-2026-03-09.md)
  - patient hub tab inventory via [dentalpro-crm-page-observations-2026-03-09.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro-crm-page-observations-2026-03-09.md)
  - medcards empty-cards registry slice via [dentalpro_empty_cards_report_2026_03_16.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro_empty_cards_report_2026_03_16.md) and [dentalpro_runtime_extraction_empty_cards_2026_03_16.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json)
  - xray boundary scope via [scope-xray-verification-2026-01-15.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/scope-xray-verification-2026-01-15.md)
  - remaining tabs closure via [Task_Graph_Blueprint_Ultimate_Patient_Dossier.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/Task_Graph_Blueprint_Ultimate_Patient_Dossier.md), [base_profile_and_tabs.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/base_profile_and_tabs.json), [files_and_documents.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/files_and_documents.json) and [ultimate_patient_dossier_live_15900.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/ultimate_patient_dossier_live_15900.json)
  - dossier source-of-truth index via [patient_dossier_tabs_index.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/patient_dossier_tabs_index.json)
  - focused Phase 5 index via [patient_remaining_tabs_index.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/patient_remaining_tabs_index.json)
- safe scope:
  - current dossier layer is curated for route knowledge and selected verified tab families
  - `files`, `documents`, `family`, `comments`, `schedule history`, `medical history` now have current route/method closure and a sample dossier bundle
  - several write-paths and broad global payload coverage remain validation-required
  - xray remains boundary-only, not a closed patient read model

## Schedule layer

- current migrated capabilities:
  - baseline day-schedule forensic dump via [schedule_2026-03-10_operational_dump_master.md](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-03-10_operational_dump_master.md)
  - popup linkage subset closure via [schedule_2026-03-10_popup_linkage_v3.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-03-10_popup_linkage_v3.json)
  - status normalization via [schedule_2026-03-10_status_dictionary_v2.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-03-10_status_dictionary_v2.json)
  - patient-ready workbook via [schedule_2026-03-10_patient_full_report_v5.xlsx](/Users/macbook15/Downloads/MacAi/DentalPro/excel/schedule_2026-03-10_patient_full_report_v5.xlsx)
- safe scope:
  - HTML-first runtime schedule extraction is production-usable for the proven date/family flow
  - popup linkage remains subset-based, not globally proven for every visit card
- current scripts:
  - [run_schedule_interaction_probe_v3.js](/Users/macbook15/Downloads/MacAi/DentalPro/scripts/run_schedule_interaction_probe_v3.js)

## Ticket layer

- current migrated capabilities:
  - normalized registry via [schedule_2026-03-10_ticket_registry_v2.json](/Users/macbook15/Downloads/MacAi/DentalPro/tickets/schedule_2026-03-10_ticket_registry_v2.json)
  - semantic dictionary via [ticket_dictionary_v2.json](/Users/macbook15/Downloads/MacAi/DentalPro/tickets/ticket_dictionary_v2.json)
  - semantic closure via [ticket_semantic_closure_v2.json](/Users/macbook15/Downloads/MacAi/DentalPro/tickets/ticket_semantic_closure_v2.json)
  - extraction SOP via [schedule_ticket_extraction_algorithm.md](/Users/macbook15/Downloads/MacAi/DentalPro/tickets/schedule_ticket_extraction_algorithm.md)
- safe scope:
  - ticket semantics are grounded in exact `rc-tooltip` extraction
  - `schi-10` remains inferred and must not be promoted to proven
- current scripts:
  - [run_schedule_ticket_registry_probe_v1.js](/Users/macbook15/Downloads/MacAi/DentalPro/scripts/run_schedule_ticket_registry_probe_v1.js)
  - [build_schedule_ticket_registry_v2.py](/Users/macbook15/Downloads/MacAi/DentalPro/scripts/build_schedule_ticket_registry_v2.py)

## Reporting layer

- current migrated capabilities:
  - report universe and catalog via [report_universe_2026_03_16.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/report_universe_2026_03_16.json), [dentalpro-reports-structured-catalog-2026-03-09.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/dentalpro-reports-structured-catalog-2026-03-09.json), [reports_scan.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/reports_scan.json)
  - governed reference verdicts via [RPT_23_final_governed_verdict_2026-03-11.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/RPT_23_final_governed_verdict_2026-03-11.json), [RPT_18_final_governed_verdict_2026-03-18.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/RPT_18_final_governed_verdict_2026-03-18.json), [RPT_33_final_governed_verdict_2026-03-15.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/RPT_33_final_governed_verdict_2026-03-15.json)
  - family reference patterns via [rpt_24_48_file_first_canonicalization_2026_03_10.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/rpt_24_48_file_first_canonicalization_2026_03_10.json) and [rpt_34_35_shape_reconciliation_2026_03_10.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/rpt_34_35_shape_reconciliation_2026_03_10.json)
- safe scope:
  - current reporting layer is strong for family maps and verified reference reports
  - not every report family is production-closed; some remain validation-required

## Finance layer

- current migrated capabilities:
  - patient cashbox document-model reference cases:
    - [patient_cashbox_18910_document_model_2026-03-18.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/patient_cashbox_18910_document_model_2026-03-18.json)
    - [patient_cashbox_19095_document_model_2026-03-18.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/patient_cashbox_19095_document_model_2026-03-18.json)
  - schedule cash enrichment layer via [schedule_2026-03-10_cash_enrichment_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/schedule_2026-03-10_cash_enrichment_v5.json)
- safe scope:
  - document-grain and patient-day finance modeling are usable
  - direct visit-to-cash linkage is still not proven and must remain separate

## Exports

- current migrated examples:
  - [report-24-api-analysis-2026-03-01-2026-03-31.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/report-24-api-analysis-2026-03-01-2026-03-31.json)
  - [report-29-composite-unpaid-2026.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/report-29-composite-unpaid-2026.json)
  - [rpt_24_48_file_first_canonicalization_2026_03_10.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/rpt_24_48_file_first_canonicalization_2026_03_10.json)

## Known proven methods

- browser-first route access
- direct tab URL opening
- runtime DOM extraction
- popup clean click probing
- focused icon-level ticket probe
- proof-aware normalization
- Excel/JSON registry building
- selective migration with current/superseded separation

## Current gaps

- full patient dossier/card-tab migration from legacy workspace
- xray patient-layer assets still sit in review queue
- some popup linkage families
- direct transport closure in unresolved flows
- scripts in review queue that still depend on external legacy runtimes
