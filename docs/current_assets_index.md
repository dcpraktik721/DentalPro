# Current Assets Index

Phase 2 curated migration index for current verified DentalPRO assets moved into this repo.

## Migrated now

| Asset | New repo path | Domain | Readiness | Notes |
| --- | --- | --- | --- | --- |
| Build verified capability package | `scripts/build_dentalpro_verified_capability_package.py` | mixed | ready | Current curated builder for repository-wide verified knowledge package |
| Build schedule ticket registry v2 | `scripts/build_schedule_ticket_registry_v2.py` | tickets, schedule | ready_with_limits | Current builder for normalized ticket registry workbook/json layer |
| Run schedule ticket registry probe v1 | `scripts/run_schedule_ticket_registry_probe_v1.js` | tickets, schedule, runtime | ready_with_limits | Current focused runtime probe for ticket-bearing visits |
| Run schedule interaction probe v3 | `scripts/run_schedule_interaction_probe_v3.js` | schedule, runtime | ready_with_limits | Current hardened interaction subset probe for schedule cards/popups |
| Find old hygiene ticket patients live | `scripts/find_hygiene_ticket_patients_live.js` | patients, tickets, schedule | ready_with_limits | Current live operational script for old hygiene ticket campaign slice |
| Verified capability master map | `reports/dentalpro_verified_capability_master_map.md` | mixed | ready | Current consolidated architecture and capability package |
| Known limits and gaps | `reports/dentalpro_known_limits_and_gaps.md` | mixed | ready | Current explicit limits registry for safe claim boundary |
| Verified data capabilities registry | `artifacts/dentalpro_verified_data_capabilities.json` | mixed | ready | Current machine-readable capability registry |
| Verified methods registry | `artifacts/dentalpro_verified_methods_registry.json` | mixed | ready | Current machine-readable methods registry |
| Verified algorithms registry | `artifacts/dentalpro_verified_algorithms_registry.json` | mixed | ready | Current machine-readable algorithms registry |
| Verified reports registry | `artifacts/dentalpro_verified_reports_registry.json` | reporting | ready | Current report and report-family map |
| Verified scripts registry | `artifacts/dentalpro_verified_scripts_registry.json` | mixed | ready | Current scripts capability registry |
| Verified artifacts registry | `artifacts/dentalpro_verified_artifacts_registry.json` | mixed | ready | Current artifacts capability registry |
| Verified tooling and skills registry | `artifacts/dentalpro_verified_tooling_and_skills_registry.json` | mixed | ready | Current tooling and skill registry |
| Productization readiness master | `artifacts/dentalpro_productization_readiness_master.json` | mixed | ready | Current readiness map for productization decisions |
| Source of truth map | `artifacts/dentalpro_source_of_truth_map.json` | mixed | ready | Current source-of-truth mapping |
| Validation backlog current | `artifacts/dentalpro_validation_backlog_current.json` | mixed | ready | Current backlog of unresolved validated gaps |
| Superseded vs current map | `artifacts/dentalpro_superseded_vs_current_map.json` | mixed | ready | Current lineage map for current vs superseded assets |
| Schedule operational dump master 2026-03-10 | `schedule/schedule_2026-03-10_operational_dump_master.md` | schedule, runtime | ready_with_limits | Current baseline forensic schedule dump for proven date-targeted day schedule |
| Schedule popup linkage v3 | `schedule/schedule_2026-03-10_popup_linkage_v3.json` | schedule, runtime | ready_with_limits | Current subset-validated popup linkage layer |
| Schedule status dictionary v2 | `schedule/schedule_2026-03-10_status_dictionary_v2.json` | schedule, tickets | ready_with_limits | Current proof-aware schedule status normalization map |
| Schedule patient full report v5 JSON | `schedule/schedule_2026-03-10_patient_full_report_v5.json` | schedule, patients, tickets | ready_with_limits | Current patient-ready normalized schedule dataset |
| Schedule patient full report v5 workbook | `excel/schedule_2026-03-10_patient_full_report_v5.xlsx` | schedule, patients, tickets | ready_with_limits | Current business-ready patient schedule workbook |
| Schedule patient full report v5 disclosure | `reports/schedule_2026-03-10_patient_full_report_v5.md` | schedule, patients | ready_with_limits | Current disclosure for patient-ready schedule workbook |
| Schedule patient identity probe v5 | `patients/schedule_2026-03-10_patient_identity_probe_v5.json` | patients, schedule | ready_with_limits | Current focused patient identity closure for schedule rows |
| Schedule cash enrichment v5 | `finance/schedule_2026-03-10_cash_enrichment_v5.json` | finance, schedule, patients | ready_with_limits | Current conditional patient-day cash enrichment for schedule rows |
| Ticket registry v2 JSON | `tickets/schedule_2026-03-10_ticket_registry_v2.json` | tickets, schedule | ready_with_limits | Current normalized ticket registry across ticketed visits |
| Ticket registry v2 workbook | `excel/schedule_2026-03-10_ticket_registry_v2.xlsx` | tickets, schedule | ready_with_limits | Current workbook for ticket registry |
| Ticket registry v2 report | `tickets/schedule_2026-03-10_ticket_registry_v2.md` | tickets, schedule | ready_with_limits | Current report for ticket registry pack |
| Ticket dictionary v2 | `tickets/ticket_dictionary_v2.json` | tickets | ready_with_limits | Current proof-aware ticket semantic dictionary |
| Ticket semantic closure v2 JSON | `tickets/ticket_semantic_closure_v2.json` | tickets | ready_with_limits | Current closure artifact for schi-10 and schi-3 residual semantics |
| Ticket semantic closure v2 report | `tickets/ticket_semantic_closure_v2.md` | tickets | ready_with_limits | Current narrative disclosure for semantic closure |
| Schedule ticket extraction algorithm | `tickets/schedule_ticket_extraction_algorithm.md` | tickets, runtime | ready | Current operational SOP for ticket extraction |
| Schedule ticket extraction schema | `tickets/schedule_ticket_extraction_schema.json` | tickets, runtime | ready | Current JSON schema for ticket extraction |
| Schedule ticket runtime reference | `tickets/schedule_ticket_runtime_reference.json` | tickets, runtime | ready | Current runtime selectors/handlers reference for ticket extraction |
| Patient cashbox 18910 document model | `finance/patient_cashbox_18910_document_model_2026-03-18.json` | finance, patients | ready_with_limits | Current document-level patient cashbox model reference case |
| Patient cashbox 18910 document model workbook | `excel/patient_cashbox_18910_document_model_2026-03-18.xlsx` | finance, patients | ready_with_limits | Workbook for reference cashbox model |
| Patient cashbox 18910 document model report | `reports/patient_cashbox_18910_document_model_2026-03-18.md` | finance, patients | ready_with_limits | Disclosure for reference cashbox model |
| Patient cashbox 19095 document model | `finance/patient_cashbox_19095_document_model_2026-03-18.json` | finance, patients | ready_with_limits | Second reference patient cashbox model case |
| Patient cashbox 19095 document model workbook | `excel/patient_cashbox_19095_document_model_2026-03-18.xlsx` | finance, patients | ready_with_limits | Workbook for second reference cashbox model |
| Patient cashbox 19095 document model report | `reports/patient_cashbox_19095_document_model_2026-03-18.md` | finance, patients | ready_with_limits | Disclosure for second reference cashbox model |
| Patients old hygiene no followup v2 JSON | `patients/patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18_v2.json` | patients, tickets, schedule | ready_with_limits | Current normalized operational call list for old hygiene patients without follow-up hygiene visit |
| Patients old hygiene no followup v2 workbook | `excel/patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18_v2.xlsx` | patients, tickets, schedule | ready_with_limits | Current workbook for hygiene campaign operational list |
| Patients old hygiene no followup v2 report | `reports/patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18_v2.md` | patients, tickets, schedule | ready_with_limits | Disclosure for hygiene campaign report v2 |
| Doctor patients Geyushova enriched by RPT24 JSON | `patients/doctor_patients_Geyushova_2026-02_enriched_rpt24.json` | patients, reporting | ready_with_limits | Current two-source operational patient roster + revenue enrichment example |
| Doctor patients Geyushova enriched by RPT24 workbook | `excel/doctor_patients_Geyushova_2026-02_enriched_rpt24.xlsx` | patients, reporting | ready_with_limits | Workbook for doctor roster enriched by report data |
| Manager report 2026-03-06 JSON | `reports/manager_report_2026-03-06.json` | reporting, schedule, patients | ready_with_limits | Current verified clinic manager report example |
| Manager report 2026-03-06 markdown | `reports/manager_report_2026-03-06.md` | reporting, schedule, patients | ready_with_limits | Markdown disclosure for manager report example |
| Report universe 2026-03-16 JSON | `reporting/report_universe_2026_03_16.json` | reporting | ready_with_limits | Current report universe registry |
| Reports scan JSON | `reporting/reports_scan.json` | reporting | ready_with_limits | Current reports module structural scan |
| DentalPRO structured reports catalog JSON | `reporting/dentalpro-reports-structured-catalog-2026-03-09.json` | reporting | ready_with_limits | Current structured catalog of reports universe |
| DentalPRO structured reports catalog markdown | `reports/dentalpro-reports-structured-catalog-2026-03-09.md` | reporting | ready_with_limits | Markdown catalog for reports universe |
| RPT24 API analysis March 2026 JSON | `reporting/report-24-api-analysis-2026-03-01-2026-03-31.json` | reporting, finance | ready_with_limits | Current verified analysis for RPT24 monthly API reconstruction |
| RPT29 composite unpaid JSON | `reporting/report-29-composite-unpaid-2026.json` | reporting, finance | ready_with_limits | Current composite unpaid family reconstruction |
| RPT24/48 file-first canonicalization JSON | `reporting/rpt_24_48_file_first_canonicalization_2026_03_10.json` | reporting | ready_with_limits | Current file-first reference pattern for async export family |
| RPT34/35 shape reconciliation JSON | `reporting/rpt_34_35_shape_reconciliation_2026_03_10.json` | reporting | ready_with_limits | Current dual-layer detail-vs-summary reference pattern |
| RPT23 final governed verdict | `reporting/RPT_23_final_governed_verdict_2026-03-11.json` | reporting | ready | Current reference runtime-table-export-table verdict |
| RPT18 final governed verdict | `reporting/RPT_18_final_governed_verdict_2026-03-18.json` | reporting | ready | Current grouped-header reference verdict |
| RPT33 final governed verdict | `reporting/RPT_33_final_governed_verdict_2026-03-15.json` | reporting | ready | Current canonical business field boundary reference verdict |

## Review queue

| Asset | Source path | Why not migrated yet |
| --- | --- | --- |
| Build schedule patient full report v4 script | `/Users/macbook15/Downloads/MacAi/scripts/build_schedule_patient_full_report_v4.py` | Script name and generated assets lag behind current v5 output lineage |
| Run schedule patient identity probe v4 script | `/Users/macbook15/Downloads/MacAi/scripts/run_schedule_patient_identity_probe_v4.js` | Produces pre-v5 lineage and may not reflect final current workflow |
| Run targeted report pass TypeScript script | `/Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright/run_targeted_report_pass.ts` | Useful current runner but depends on external project runtime and ts/playwright environment |
| Schedule full schedule report v3 | `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_full_schedule_report_v3.xlsx` | Still useful forensic baseline but superseded for patient-ready output by v5 |
| Schedule custom schedule schema v3 | `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_custom_schedule_schema_v3.json` | Schema still useful as baseline but not final patient-ready package |
| Single visit ticket report 130329 | `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_visit_130329_ticket_report.xlsx` | Strong single-case example, but not a general current asset for daily workspace root |
| Cashbox payments live probe | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/cashbox-payments/cashbox-payments-live-probe.json` | Potentially important current asset, but placement and relation to newer patient cashbox models should be reviewed first |
| Cashbox detail 86644 | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/cashbox/cashbox-detail-86644.json` | Useful finance detail reference, but narrower than patient cashbox document-model assets |
| Patient cashbox 18910 forensic report | `/Users/macbook15/Downloads/MacAi/docs/patient_cashbox_18910_forensic_2026-03-18.md` | Detailed forensic explanation, but secondary to the document model current pack |

## Superseded / do not migrate

| Asset | Source path | Why not migrated |
| --- | --- | --- |
| Schedule ticket registry v1 JSON | `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_ticket_registry_v1.json` | Superseded by ticket_registry_v2 |
| Schedule ticket registry v1 workbook | `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_ticket_registry_v1.xlsx` | Superseded by ticket_registry_v2 |
| Schedule popup linkage v2 | `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_popup_linkage_v2.json` | Superseded by popup_linkage_v3 |
| Schedule patient full report v4 JSON | `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_patient_full_report_v4.json` | Superseded by patient_full_report_v5 |
| Schedule patient full report v4 workbook | `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_patient_full_report_v4.xlsx` | Superseded by patient_full_report_v5 |
| Patients old hygiene no followup v1 JSON | `/Users/macbook15/Downloads/MacAi/artifacts/patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18.json` | Superseded by normalized v2 output |
| Patients old hygiene no followup v1 workbook | `/Users/macbook15/Downloads/MacAi/artifacts/patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18.xlsx` | Superseded by normalized v2 output |