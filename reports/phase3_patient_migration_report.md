## PART 1. Executive Summary

| Area | Result | Notes |
| --- | --- | --- |
| Patient assets migrated now | 29 | Current verified patient-layer assets only |
| Patient scripts migrated | 4 | Current patient-focused scripts only |
| Patient review queue | 6 | Requires packaging or placement review |
| Patient superseded | 9 | Explicitly excluded from migration |

## PART 2. Migrated Patient Assets

| Asset | Source Path | New Repo Path | Patient Subdomain | Why migrated |
| --- | --- | --- | --- | --- |
| Find old hygiene ticket patients live | `/Users/macbook15/Downloads/MacAi/scripts/find_hygiene_ticket_patients_live.js` | `scripts/find_hygiene_ticket_patients_live.js` | mixed | Current live operational script for old hygiene ticket campaign slice |
| Schedule patient full report v5 JSON | `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_patient_full_report_v5.json` | `schedule/schedule_2026-03-10_patient_full_report_v5.json` | mixed | Current patient-ready normalized schedule dataset |
| Schedule patient full report v5 workbook | `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_patient_full_report_v5.xlsx` | `excel/schedule_2026-03-10_patient_full_report_v5.xlsx` | mixed | Current business-ready patient schedule workbook |
| Schedule patient full report v5 disclosure | `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_patient_full_report_v5.md` | `reports/schedule_2026-03-10_patient_full_report_v5.md` | mixed | Current disclosure for patient-ready schedule workbook |
| Schedule patient identity probe v5 | `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_patient_identity_probe_v5.json` | `patients/schedule_2026-03-10_patient_identity_probe_v5.json` | mixed | Current focused patient identity closure for schedule rows |
| Schedule cash enrichment v5 | `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_cash_enrichment_v5.json` | `finance/schedule_2026-03-10_cash_enrichment_v5.json` | mixed | Current conditional patient-day cash enrichment for schedule rows |
| Patient cashbox 18910 document model | `/Users/macbook15/Downloads/MacAi/artifacts/patient_cashbox_18910_document_model_2026-03-18.json` | `finance/patient_cashbox_18910_document_model_2026-03-18.json` | mixed | Current document-level patient cashbox model reference case |
| Patient cashbox 18910 document model workbook | `/Users/macbook15/Downloads/MacAi/artifacts/patient_cashbox_18910_document_model_2026-03-18.xlsx` | `excel/patient_cashbox_18910_document_model_2026-03-18.xlsx` | mixed | Workbook for reference cashbox model |
| Patient cashbox 18910 document model report | `/Users/macbook15/Downloads/MacAi/docs/patient_cashbox_18910_document_model_2026-03-18.md` | `reports/patient_cashbox_18910_document_model_2026-03-18.md` | mixed | Disclosure for reference cashbox model |
| Patient cashbox 19095 document model | `/Users/macbook15/Downloads/MacAi/artifacts/patient_cashbox_19095_document_model_2026-03-18.json` | `finance/patient_cashbox_19095_document_model_2026-03-18.json` | mixed | Second reference patient cashbox model case |
| Patient cashbox 19095 document model workbook | `/Users/macbook15/Downloads/MacAi/artifacts/patient_cashbox_19095_document_model_2026-03-18.xlsx` | `excel/patient_cashbox_19095_document_model_2026-03-18.xlsx` | mixed | Workbook for second reference cashbox model |
| Patient cashbox 19095 document model report | `/Users/macbook15/Downloads/MacAi/docs/patient_cashbox_19095_document_model_2026-03-18.md` | `reports/patient_cashbox_19095_document_model_2026-03-18.md` | mixed | Disclosure for second reference cashbox model |
| Patients old hygiene no followup v2 JSON | `/Users/macbook15/Downloads/MacAi/artifacts/patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18_v2.json` | `patients/patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18_v2.json` | mixed | Current normalized operational call list for old hygiene patients without follow-up hygiene visit |
| Patients old hygiene no followup v2 workbook | `/Users/macbook15/Downloads/MacAi/artifacts/patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18_v2.xlsx` | `excel/patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18_v2.xlsx` | mixed | Current workbook for hygiene campaign operational list |
| Patients old hygiene no followup v2 report | `/Users/macbook15/Downloads/MacAi/artifacts/patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18_v2.md` | `reports/patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18_v2.md` | mixed | Disclosure for hygiene campaign report v2 |
| Doctor patients Geyushova enriched by RPT24 JSON | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/doctor_patients_Geyushova_2026-02_enriched_rpt24.json` | `patients/doctor_patients_Geyushova_2026-02_enriched_rpt24.json` | mixed | Current two-source operational patient roster + revenue enrichment example |
| Doctor patients Geyushova enriched by RPT24 workbook | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/doctor_patients_Geyushova_2026-02_enriched_rpt24.xlsx` | `excel/doctor_patients_Geyushova_2026-02_enriched_rpt24.xlsx` | mixed | Workbook for doctor roster enriched by report data |
| Manager report 2026-03-06 JSON | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/manager_report_2026-03-06.json` | `reports/manager_report_2026-03-06.json` | mixed | Current verified clinic manager report example |
| Manager report 2026-03-06 markdown | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/docs/manager-report-2026-03-06.md` | `reports/manager-report-2026-03-06.md` | mixed | Markdown disclosure for manager report example |
| Build schedule patient full report v5 | `/Users/macbook15/Downloads/MacAi/scripts/build_schedule_patient_full_report_v5.py` | `scripts/build_schedule_patient_full_report_v5.py` | dossier_bundle | Current builder for patient-ready schedule workbook and normalized patient schedule dataset |
| Run schedule patient identity focused probe v5 | `/Users/macbook15/Downloads/MacAi/scripts/run_schedule_patient_identity_focused_probe_v5.js` | `scripts/run_schedule_patient_identity_focused_probe_v5.js` | identity_lookup | Current focused patient identity closure script for unresolved schedule rows |
| Find patients old hygiene no followup live | `/Users/macbook15/Downloads/MacAi/scripts/find_patients_old_hygiene_no_followup_live.js` | `scripts/find_patients_old_hygiene_no_followup_live.js` | mixed | Current normalized operational script for patients with outdated hygiene ticket and no later hygienist visit |
| DentalPRO CRM page observations patient hubs | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/docs/dentalpro-crm-page-observations-2026-03-09.md` | `docs/dentalpro-crm-page-observations-2026-03-09.md` | card_tabs | Current structural proof that cbase/detail is patient hub and that patient card links connect key operational domains |
| Scope mobile client verified library | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/docs/scope-mobile-client-verified-library-2026-01-15.md` | `docs/scope-mobile-client-verified-library-2026-01-15.md` | token_mechanics | Current verified boundary for mobile-client token scope and patient-specific limitations |
| Scope mobile client verified responses JSON | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/scope-runner/mobile_client-2026-01-15.json` | `patients/mobile_client-2026-01-15.json` | token_mechanics | Machine-readable proof basis for mobile-client scope boundary |
| Scope insurance verified library | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/docs/scope-insurance-verified-library-2026-01-15.md` | `docs/scope-insurance-verified-library-2026-01-15.md` | files_documents | Current verified insurance/DMS patient relation library |
| Scope insurance verified responses JSON | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/scope-runner/insurance-2026-01-15.json` | `patients/insurance-2026-01-15.json` | files_documents | Machine-readable insurance/DMS proof for patient-company linkage |
| Patient appointment data flow | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/docs/patient-appointment-data-flow.md` | `docs/patient-appointment-data-flow.md` | treatment_links | Current patient->appointment routing and form mechanics document |
| Patient cashbox 18910 forensic report | `/Users/macbook15/Downloads/MacAi/docs/patient_cashbox_18910_forensic_2026-03-18.md` | `patients/patient_cashbox_18910_forensic_2026-03-18.md` | payments_bills | Current patient-card cashbox tab forensic explanation for exact extraction algorithm and safe claim boundary |

## PART 3. Patient Scripts Migrated

| Script | Source Path | New Repo Path | What it does | Notes |
| --- | --- | --- | --- | --- |
| Find old hygiene ticket patients live | `/Users/macbook15/Downloads/MacAi/scripts/find_hygiene_ticket_patients_live.js` | `scripts/find_hygiene_ticket_patients_live.js` | Current live operational script for old hygiene ticket campaign slice | Scope limited to proven live schedule window, not full CRM universe |
| Build schedule patient full report v5 | `/Users/macbook15/Downloads/MacAi/scripts/build_schedule_patient_full_report_v5.py` | `scripts/build_schedule_patient_full_report_v5.py` | Current builder for patient-ready schedule workbook and normalized patient schedule dataset | Builds current v5 layer, unlike v4 builder in review queue |
| Run schedule patient identity focused probe v5 | `/Users/macbook15/Downloads/MacAi/scripts/run_schedule_patient_identity_focused_probe_v5.js` | `scripts/run_schedule_patient_identity_focused_probe_v5.js` | Current focused patient identity closure script for unresolved schedule rows | Relies on browser/runtime project root but reflects current v5 patient identity method |
| Find patients old hygiene no followup live | `/Users/macbook15/Downloads/MacAi/scripts/find_patients_old_hygiene_no_followup_live.js` | `scripts/find_patients_old_hygiene_no_followup_live.js` | Current normalized operational script for patients with outdated hygiene ticket and no later hygienist visit | Scope stays within observed live schedule window |

## PART 4. Review Queue

| Asset | Source Path | Why not migrated yet | Required review |
| --- | --- | --- | --- |
| Patient cashbox 18910 forensic report | `/Users/macbook15/Downloads/MacAi/docs/patient_cashbox_18910_forensic_2026-03-18.md` | Detailed forensic explanation, but secondary to the document model current pack | Manual review required |
| Scope xray verified responses JSON | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/scope-runner/xray-2026-01-15.json` | Useful patient xray boundary artifact, but only proves upload/write-only scope and needs packaging choice before migration | Potentially migrate later into docs/artifacts as xray limit reference |
| Scope xray verification | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/docs/scope-xray-verification-2026-01-15.md` | Useful patient xray scope limit doc, but not yet clearly placed as current patient-layer source-of-truth asset | Manual review required |
| Xray API mapping 2026-03-08 | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/docs/xray-api-mapping-2026-03-08.md` | Valuable xray detail mapping but mixed with finance/reporting semantics; migrate after explicit placement review | Manual review required |
| Clinic manager agent script | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/scripts/clinic_manager_agent.js` | Operationally useful but broader than patient layer and needs packaging review before moving into curated repo | Manual review required |
| API endpoints data table 2026-03-02 | `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/docs/api-endpoints-data-table-2026-03-02.md` | Contains useful patient endpoint rows but is a broad mixed API table, not a clean patient-layer curated doc | Manual review required |

## PART 5. Superseded / Legacy

| Asset | Source Path | Lifecycle | Why not migrated |
| --- | --- | --- | --- |
| Build schedule patient full report v4 | `/Users/macbook15/Downloads/MacAi/scripts/build_schedule_patient_full_report_v4.py` | superseded | Superseded by v5 patient full report builder |
| Run schedule patient identity probe v4 | `/Users/macbook15/Downloads/MacAi/scripts/run_schedule_patient_identity_probe_v4.js` | superseded | Superseded by focused v5 identity probe |
| Schedule patient full report v4 JSON | `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_patient_full_report_v4.json` | superseded | Superseded by patient_full_report_v5 |
| Schedule patient full report v4 workbook | `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_patient_full_report_v4.xlsx` | superseded | Superseded by patient_full_report_v5 |
| Patients old hygiene no followup v1 JSON | `/Users/macbook15/Downloads/MacAi/artifacts/patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18.json` | superseded | Superseded by normalized v2 output |
| Patients old hygiene no followup v1 workbook | `/Users/macbook15/Downloads/MacAi/artifacts/patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18.xlsx` | superseded | Superseded by normalized v2 output |
| Patient cashbox 18910 dataset JSON | `/Users/macbook15/Downloads/MacAi/artifacts/patient_cashbox_18910_dataset_2026-03-18.json` | superseded | Superseded by document-level cashbox model |
| Patient cashbox 18910 dataset workbook | `/Users/macbook15/Downloads/MacAi/artifacts/patient_cashbox_18910_dataset_2026-03-18.xlsx` | superseded | Superseded by document-level cashbox model workbook |
| Patients old hygiene precursor list | `/Users/macbook15/Downloads/MacAi/artifacts/patients_old_hygiene_live_2026-03-01_to_2026-03-31.json` | superseded | Precursor asset superseded by no-followup v2 operational list |

## PART 6. Patient Layer Coverage

| Patient Subdomain | Current coverage | Readiness | Notes |
| --- | --- | --- | --- |
| identity_lookup | current scripts and patient-ready schedule outputs migrated | ready_with_limits | current curated coverage |
| token_mechanics | mobile-client scope boundary doc and JSON migrated | ready_with_limits | current curated coverage |
| card_tabs | patient hub / cbase detail observations migrated | ready_with_limits | current curated coverage |
| dossier_bundle | current v5 patient schedule bundle migrated | ready_with_limits | current curated coverage |
| payments_bills | patient cashbox document models and forensic note present | ready_with_limits | current curated coverage |
| files_documents | insurance/DMS linkage doc and JSON migrated | ready_with_limits | current curated coverage |
| medcards_xrays | still in review, not fully migrated | validation_required | review or missing standalone current pack |
| schedule_history | covered indirectly through patient-ready schedule outputs, not separate current dossier pack | validation_required | review or missing standalone current pack |
| medical_history | not yet migrated as standalone verified patient asset | validation_required | review or missing standalone current pack |
| treatment_links | patient appointment flow doc migrated | ready_with_limits | current curated coverage |
| mixed | campaign lists and mixed patient operational outputs migrated | ready_with_limits | current curated coverage |

## PART 7. Registry and Docs Updates

| File | What changed |
| --- | --- |
| `registry/current_assets_index.json` | Patient-layer migrated/review/superseded assets appended |
| `registry/patient_assets_index.json` | Added dedicated patient asset registry |
| `registry/artifacts_registry.json` | Added patient docs and artifacts migrated in Phase 3 |
| `registry/scripts_registry.json` | Added current patient scripts migrated in Phase 3 |
| `registry/domains_registry.json` | Expanded patient domain description and current scope |
| `registry/review_queue.json` | Added patient review candidates |
| `registry/superseded_assets.json` | Added patient superseded assets |
| `docs/patient_layer_overview.md` | Added patient-layer operating overview |
| `docs/verified_capabilities.md` | Will be updated to reflect patient-layer curated state |

## PART 8. Final Repo Readiness

| Area | Readiness | Notes |
| --- | --- | --- |
| Patient access path knowledge | ready_with_limits | Patient hub, card access and token boundary now represented |
| Patient outputs | ready_with_limits | Current patient-ready outputs and campaign lists are in repo |
| Patient scripts | ready_with_limits | Current focused scripts migrated |
| Broad dossier/tab closure | validation_required | Additional patient card tab families still need review/migration |

- patient assets migrated: 29
- patient scripts migrated: 4
- patient assets in review: 6
- patient assets superseded: 9
- top patient assets now in repo: patient full report v5, patient identity probe v5, old hygiene no-followup v2, patient cashbox document models, patient cashbox forensic note, mobile-client scope library, insurance scope library, patient appointment flow doc, CRM page observations doc, patient-focused v5 scripts