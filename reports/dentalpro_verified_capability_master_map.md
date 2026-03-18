# DentalPRO Verified Capability Master Map

## PART 1. Executive Summary

| Area | What we can get | Proof status | Readiness | Notes |
|---|---|---|---|---|
| schedule runtime | day schedule entities and normalized visit roster | proven | ready | HTML-first runtime source |
| schedule tickets | ticket tooltips and proof-aware semantics | proven | ready_with_limits | schi-10 inferred only |
| patient schedule report | patient-ready visit workbook | artifact_proven | ready_with_limits | cash separate |
| patient cashbox | document model with act_reference | proven | ready_with_limits | tested on two patients |
| reporting families | family-aware report extraction/comparison | proven | ready_with_limits | not every family closed |
| empty medcards | internal runtime workflow | proven | ready_with_limits | internal browser runtime only |
| daily manager report | appointments + payments daily operational pack | proven | ready | accepted API slice |

## PART 2. Verified Data Domains

| Domain | Data we can extract | Source layer | Grain | Proof level | Readiness |
|---|---|---|---|---|---|
| patient_card_tab | patient card tabs, direct tab URLs, patient cashbox detail, patient full name, phone, card-linked sections | patient_card_tab + internal authenticated runtime pages | patient / payment_document / payment_row | proven | ready_with_limits |
| patient_identity_and_profile | patient_id, full name, phone, patient_card_url, appointment-linked identity enrichment | schedule popup + i/client + mobile/client/getByID | patient / visit-enriched patient row | proven | ready_with_limits |
| schedule_day_runtime | day schedule, doctors, cabinets, timeslots, visits, root config, date mechanics, DOM/runtime layout | HTML-first schedule runtime | doctor/day, cabinet/day, visit row, timeslot | proven | ready |
| schedule_ticket_layer | ticket icon order, exact tooltip text, ticket family, normalized category, proof-aware semantics | live rendered rc-tooltip on exact icon node | ticket on visit card | proven | ready_with_limits |
| schedule_patient_ready_extract | patient-ready visit workbook with full name, phone, patient_id, doctor, cabinet, proof-aware status fields | schedule runtime + popup + identity probes + conditional cash enrichment | one schedule visit row | artifact_proven | ready_with_limits |
| report_universe_and_routes | report groups, template codes, saved report ids, route patterns, mechanics classes | reports index + report route/runtime probes | report template / saved report | proven | ready |
| runtime_table_export_table_reports | runtime table, export file, parsed workbook, parity verdict, explicit normalization policy | report runtime + export xlsx + parsed workbook | report row / header contract / footer | proven | ready_with_limits |
| grouped_headers_reports | runtime grouped-header table, leaf business headers, normalized parity to export | report runtime + export file | report business row | proven | ready_with_limits |
| file_first_async_reports | file as primary truth, runtime shell, parsed schema and row boundaries | async export file | file row / workbook schema | artifact_proven | ready_with_limits |
| finance_operational_layer | paid service/payment rows, patient/day revenue, manager daily report, unpaid families partial, cash detail overlap | z/pays + enrichments + cashbox detail HTML + invoice/detail | pay position / payment header / manager-day aggregate | proven | ready_with_limits |
| empty_medcards_internal_runtime | internal card workflow endpoints, save/approve/decline/cancelApprove state machine | authenticated internal web runtime | medcard status transition | proven | ready_with_limits |
| doctor_roster_custom_reporting | patients by doctor over period, patient/day roster, optional financial enrichment | z/doctor/all + mobile/schedule + optional RPT_24 | appointment row / patient-day enrichment | proven | ready_with_limits |

## PART 3. Verified Methods

| Method | What it does | Where used | What it yields | Proven scope | Limitations |
|---|---|---|---|---|---|
| browser_first_route_access | Opens CRM/runtime/report routes in authenticated browser state | schedule, reports, cashbox, empty cards | live UI/runtime state | broad project-wide | UI-first only; not an API proof by itself |
| direct_tab_url_access | Opens patient/report sub-tabs directly by URL | patient cashbox, patient tabs, reports | hidden deep pages without menu navigation | patient card and report shells | requires known route contract |
| storageState_auth_reuse | Reuses authenticated browser session | playwright regression layer | stable repeated live probes | dentalpro-playwright and schedule probes | expires over time |
| accepted_api_path_usage | Calls token/secret API methods from proved candidates | manager report, report verification, roster extraction | JSON data rows | 157-method catalog subset; strongest around patient/schedule/pay | not all UI domains have published API source |
| dom_extraction | Reads post-load runtime DOM and key containers | schedule forensic, cashbox, reports | HTML/runtime field inventory | HTML-first pages | DOM presence does not equal source closure |
| hidden_attribute_harvesting | Extracts data-* and hidden attrs from live nodes | schedule, reports, runtime configs | selectors, ids, config metadata | schedule root and report shells | structural only if semantics are not explicit |
| popup_clean_click_probe | Opens patient popup by exact card click | schedule patient enrichment | full name, phone, popup actions | majority subset on 2026-03-10 schedule | not guaranteed for every family without focused probe |
| focused_rc_tooltip_extraction | Opens exact ticket tooltip by React onMouseEnter on icon node | schedule ticket registry | live rendered ticket semantics | ticket-bearing visit subset and ticket registry v1/v2 | must avoid stale tooltip contamination |
| stale_layer_prevention | Closes/deletes old tooltips/popups before each probe | schedule interaction and ticket probes | clean trigger->layer linkage | schedule popup/tooltip hardening | subset-validated, not perfect globally |
| chair_view_cross_map | Maps visit ids between doctor view and chair view | schedule cabinet attribution | visit->cabinet mapping | 2026-03-10 schedule forensic pass | cross-map method remains canonical because direct field not found |
| report_formation_probe | Opens report, applies date/filter, captures runtime and export behavior | RPT_18, 23, 33, 36, 4 | runtime/export/file evidence | single-report live passes | report-family specific |
| export_tracking_direct_vs_async | Distinguishes direct download, async shell, callback/file_url completion | report export validation, RPT_21, RPT_24/48 | export mechanics contract | multiple report families | not every report family closed |
| parsed_xlsx_extraction | Parses workbook sheets, headers, rows, boundaries | report parity and file-first families | structured file dataset | RPT_18/23/33/36 and file-first families | header recovery can remain unresolved |
| grouped_header_leaf_extraction | Resolves business headers from grouped thead structure | RPT_18 | canonical business columns | grouped_headers report family | pattern portability not automatic |
| explicit_normalization_policy | Formalizes narrow local normalization after mismatch classification | RPT_23, RPT_18, RPT_33 | governed normalized parity | specific report families | must not be transferred without evidence |
| family_aware_canonicalization | Classifies reports by mechanics family and chooses compare path | family program for reports 23/24/34/35/36/48 | extraction/comparison/guardrail policy | priority report families | not a universal closure for all reports |
| detail_vs_summary_reconciliation | Distinguishes runtime detail vs export summary mismatch families | RPT_34/RPT_35 | dual-layer guardrail model | shape mismatch families | no direct row parity |
| file_first_dataset_modeling | Treats file as primary truth and runtime as launch shell | RPT_24/48 async families | file-first canonical dataset | async export families | runtime table claims forbidden |
| row_document_split_by_act_reference | Separates row-grain and shared-payment document-grain | patient cashbox model | document model with act_reference | patients 18910 and 19095 | cashbox domain still not globally source-closed |
| delta_pass_strategy | Runs targeted follow-up passes instead of broad reruns | schedule continuation, ticket semantics, report next-step passes | gap closure without resetting baseline | project-wide operating method | depends on strong baseline artifacts |

## PART 4. Verified Algorithms and Workflows

| Algorithm / Workflow | Steps | Inputs | Outputs | Domains | Reusability | Notes |
|---|---|---|---|---|---|---|
| schedule_forensic_operational_dump | open date route -> capture full DOM -> map doctors/cabinets/timeslots/visits -> capture network -> normalize entities | schedule date + storageState | DOM/entity/network artifact pack | schedule | reusable_with_constraints | HTML-first day schedule proven |
| schedule_popup_hardening | baseline subset -> hard reload or clean layer -> one-card-at-a-time popup probe -> linkage classification | visit subset | popup_linkage_v2/v3 | schedule interaction | reusable_with_constraints | acceptance-grade for subset only |
| ticket_registry_build | enumerate task icons -> clean icon probe -> capture rc-tooltip -> classify exact text -> aggregate per visit | schedule visit subset | ticket registry json/xlsx + dictionary | schedule ticket layer | reusable_with_constraints | current main registry = v2 |
| ticket_semantic_closure | select unresolved families -> focused runtime probe -> exact tooltip capture -> assign proven/inferred/not_proven -> update dictionary | existing ticket registry | semantic closure + updated dictionary | ticket semantics | case_specific | used for schi-10 and schi-3 split |
| patient_full_schedule_report | runtime schedule extract -> popup identity -> focused unresolved probes -> normalize proof-aware fields -> optional cash enrichment sheet | schedule runtime artifacts | patient_full_report_v4/v5 | schedule patient-ready reporting | reusable_with_constraints | cash kept separate by guardrail |
| old_hygiene_no_followup | live mobile/schedule over window -> detect hygiene ticket older than threshold -> scan later hygienist visits -> enrich via i/client | threshold date + schedule window | patient list xlsx/json | schedule custom reporting | reusable_with_constraints | window-bound patient universe only |
| cashbox_document_model_build | open patient cashbox tab -> enumerate row links -> open each detail page -> separate position totals from shared payment block -> assign act_reference | patient_id | cashbox document model | patient cashbox | reusable_with_constraints | proven on two patients |
| doctor_roster_with_revenue_enrichment | resolve doctor id -> fetch mobile/schedule roster -> fetch RPT_24 rows -> join on patient-day doctor grain -> output xlsx | doctor name + period | doctor patient roster xlsx/json | custom reporting | reusable_with_constraints | patient-day finance signal only |
| targeted_live_report_pass | open report -> apply date -> capture runtime -> capture export -> parse file -> classify family -> compare -> write verdict | REPORT_ID/CODE/TARGET_DATE | runtime/export/file/verdict artifacts | reports | reusable_with_constraints | implemented in dentalpro-playwright |
| runtime_table_export_compare | validate headers -> validate row boundary -> compare content -> classify mismatches -> apply explicit normalization if evidenced | runtime and file structured datasets | parity verdict | report families | reusable_with_constraints | RPT_23 reference pattern |
| grouped_header_report_compare | extract leaf headers -> project business columns -> compare normalized rows to export -> confirm parity | runtime grouped table + file | normalized parity verdict | reports | reusable_with_constraints | RPT_18 reference pattern |
| file_first_async_compare | treat file as truth -> parse workbook -> define row boundary and schema -> ignore runtime shell for parity | async export file | file-first canonicalization verdict | reports | reusable_with_constraints | RPT_24/48 pattern |
| report_shape_reconciliation | classify runtime shape -> classify export shape -> forbid direct row parity -> set dual-layer decision | runtime + export artifacts | shape reconciliation verdict | reports | case_specific | RPT_34/35 pattern |
| empty_medcards_state_machine_probe | open card runtime -> call save(confirm) -> approve/decline/cancelApprove -> inspect returned card/activity | card_id under browser auth | state transition evidence | medical history / empty cards | reusable_with_constraints | internal runtime API only |
| report_export_mechanics_audit | trace export buttons -> identify direct vs async -> collect completion callback/file path -> parse resulting xlsx | report route | transport audit and export verdict | reports/export | reusable_with_constraints | used on broad report export fix work |

## PART 5. Verified Scripts

| Script | Purpose | Domain | Inputs | Outputs | Status | Notes |
|---|---|---|---|---|---|---|
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/scripts/explore_crm.js | read-only CRM crawl and route discovery | crm/ui inventory | DP_LOGIN, DP_PASSWORD | crm_scan_report.json | current | not deep interaction closure |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/scripts/extract_reports.js | extract report universe | reporting | browser auth | reports_scan.json | current | catalog only |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/scripts/analyze_report_24_api.js | live API reconstruction for RPT_24 | reporting/finance | DP_LOGIN, DP_PASSWORD, dates | report-24-api-analysis-*.json | current | xray performer key unresolved |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/scripts/verify_efficiency_report.js | RPT_18 verifier | reporting/KPI | dates | efficiency report verification artifacts | current | report family specific |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/scripts/analyze_report_4_api.js | RPT_4 API replay | reporting/appointments | dates | report-4-api-copy-*.json | current | residual replay gaps |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/scripts/analyze_report_9_api.js | RPT_9 unpaid family API analysis | reporting/finance | dates | report-9-api-analysis json | current | hidden history semantics remain |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/scripts/build_report_29_unpaid_composite.js | RPT_29 composite unpaid build | reporting/finance | API extracts | report-29-composite-unpaid json | current | still partial |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/scripts/clinic_manager_agent.js | daily manager report | schedule + payments | date | manager daily report csv/json/md | current | daily operational slice, not full reporting layer |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/scripts/inspect_cashbox_detail.js | cashbox detail probe | cashbox | payment/detail id | detail JSON/HTML evidence | current | specific objects only |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/scripts/probe_cashbox_payments.js | cashbox payments list/domain probe | cashbox | browser auth | cashbox payment list probe | current | HTML-first shell |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/scripts/probe_rpt4_selector.js | RPT_4 selector investigation | reporting/appointments | date windows | selector probe json | current | case-specific |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/scripts/inspect_schedule_day_api.js | schedule API day inspection | schedule | target date | schedule-api-day json | current | API layer only |
| /Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright/run_schedule_forensic_pass.js | full schedule forensic runtime dump | schedule runtime | target date + storageState | schedule forensic artifact pack | current | date-specific forensic snapshot |
| /Users/macbook15/Downloads/MacAi/scripts/run_schedule_interaction_probe_v2.js | schedule popup hardening pass | schedule interaction | baseline visit subset | popup_linkage_v2 | deprecated_or_superseded | v3 extends subset families |
| /Users/macbook15/Downloads/MacAi/scripts/run_schedule_interaction_probe_v3.js | expanded schedule popup subset probe | schedule interaction | schedule subset families | popup_linkage_v3 | current | subset only |
| /Users/macbook15/Downloads/MacAi/scripts/run_schedule_status_normalizer_v2.js | status normalization for schedule | schedule/status | baseline visit data | status_dictionary_v2 | current | mixed proof levels |
| /Users/macbook15/Downloads/MacAi/scripts/run_schedule_ticket_registry_probe_v1.js | build live ticket registry | schedule/tickets | patient_full_report_v5 subset + storageState | ticket registry v1 | deprecated_or_superseded | main registry replaced by v2 |
| /Users/macbook15/Downloads/MacAi/scripts/run_schedule_ticket_semantic_probe_v2.js | focused unresolved ticket family probe | schedule/tickets | ticket_registry_v1 | semantic probe v2 | current | only unresolved families |
| /Users/macbook15/Downloads/MacAi/scripts/build_schedule_ticket_registry_v2.py | build main ticket registry v2 with proof-aware semantics | schedule/tickets | v1 registry + ticket_dictionary_v2 + semantic probe | ticket_registry_v2 json/xlsx/md | current | depends on proven tooltip registry |
| /Users/macbook15/Downloads/MacAi/scripts/build_schedule_patient_full_report_v4.py | patient-ready schedule report v4 | schedule/patient report | normalized schedule + identity + cash enrichment | patient_full_report_v4 | deprecated_or_superseded | v5 closes patient_id gaps |
| /Users/macbook15/Downloads/MacAi/scripts/build_schedule_patient_full_report_v5.py | patient-ready schedule report v5 | schedule/patient report | identity probe v5 + normalized schedule | patient_full_report_v5 | current | cash remains separate |
| /Users/macbook15/Downloads/MacAi/scripts/find_patients_old_hygiene_no_followup_live.js | find patients with old hygiene ticket and no later hygienist visit | custom schedule reporting | threshold and schedule window | patients_old_hygiene_no_followup live json | current | schedule-window patient universe only |
| /Users/macbook15/Downloads/MacAi/scripts/build_reporting_architecture_map.py | build reporting architecture package | architecture/knowledge | existing artifacts and docs | architecture map registries | current | reporting-focused, not full project capability pack |
| /Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright/run_targeted_report_pass.ts | single-report live governed pass | reports/runtime-export | report code/id/date | dated runtime/export/file/verdict artifacts | current | family-specific interpretation still required |
| /Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright/extract_rpt_36_workbook.py | technical workbook header recovery for RPT_36 | reports/file parsing | RPT_36 xlsx | workbook header recovery json | current | semantic headers remain unresolved |

## PART 6. Verified Artifacts

| Artifact | Domain | What is proven there | Current role | Notes |
|---|---|---|---|---|
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/docs/dentalpro-master-worklog.md | project state | current operational truth, strongest conclusions, workstreams, gaps | source_of_truth | primary control-plane doc |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/docs/report-api-verification-dossier-2026-03-09.md | report verification | priority report reproducibility positions and blockers | source_of_truth | main report verification dossier |
| /Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_operational_dump_master.md | schedule runtime | HTML-first schedule runtime, entities, mechanics, transport findings | source_of_truth | canonical schedule forensic baseline |
| /Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_ticket_registry_v2.json | schedule tickets | ticket tooltip capture and normalized semantics with proof levels | source_of_truth | main ticket registry |
| /Users/macbook15/Downloads/MacAi/artifacts/ticket_dictionary_v2.json | ticket semantics | normalized categories, proof_level, scope, evidence basis | source_of_truth | current semantic dictionary |
| /Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_patient_full_report_v5.json | schedule patient report | patient-ready schedule rows with proven IDs/phones where available | source_of_truth | current patient-ready schedule dataset |
| /Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_cash_enrichment_v5.json | schedule cash | patient-day conditional financial linkage | secondary_enrichment | keep separate from primary visit sheet |
| /Users/macbook15/Downloads/MacAi/artifacts/patient_cashbox_18910_document_model_2026-03-18.json | patient cashbox | row/document split with act_reference | source_of_truth | reference patient cashbox model |
| /Users/macbook15/Downloads/MacAi/artifacts/patient_cashbox_19095_document_model_2026-03-18.json | patient cashbox | shared payment document pattern on second patient | source_of_truth | second patient confirmation |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/doctor_patients_Geyushova_2026-02.json | doctor roster | accepted API patient roster by doctor | source_of_truth | operational roster baseline |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/doctor_patients_Geyushova_2026-02_enriched_rpt24.json | doctor roster | patient-day revenue enrichment | secondary_enrichment | patient-day enrichment only |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/manager_report_2026-03-06.json | daily manager report | daily appointments/payments composite algorithm | source_of_truth | production-usable daily operational report |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/report-24-api-analysis-2026-03-01-2026-03-31.json | RPT_24 / finance | z/pays-based row reconstruction and rules | source_of_truth | main finance analysis asset |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/report-9-api-analysis-2026-03-01-2026-03-31.json | RPT_9 | core unpaid family API coverage | source_of_truth | partial unpaid family |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/report-29-composite-unpaid-2026.json | RPT_29 | saved unpaid family composite build | source_of_truth | saved variant unpaid family |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/report-4-api-copy-2026-03-06-2026-03-07.json | RPT_4 | anchored API copy and partial parity | source_of_truth | best anchored window |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/rpt4-selector-probe-2026-02.json | RPT_4 | visit-centered selector/tie-break behavior | source_of_truth | selector rule asset |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/efficiency-report-verification-2026-03-07.json | RPT_18 | API/UI parity for KPI report | source_of_truth | reference verified report |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/cashbox-payments/cashbox-payments-live-probe.json | cashbox payments | HTML-first payments shell and row opening behavior | source_of_truth | cashbox shell baseline |
| /Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/cashbox/cashbox-detail-86644.json | cashbox detail | detail tabs/history/payment shell | secondary_enrichment | detail object evidence |
| /Users/macbook15/Downloads/MacAi/docs/dentalpro_empty_cards_forensic_disclosure_2026_03_16.md | empty medcards | internal runtime API path and browser-authenticated flow | source_of_truth | empty cards closure artifact |
| /Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright/artifacts/RPT_23_final_governed_verdict_2026-03-11.json | reporting | runtime_table_export_table with explicit normalization | source_of_truth | RPT_23 reference pattern |
| /Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright/artifacts/RPT_18_final_governed_verdict_2026-03-18.json | reporting | grouped_headers canonicalized with explicit normalization | source_of_truth | RPT_18 reference pattern |
| /Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright/artifacts/RPT_33_final_governed_verdict_2026-03-15.json | reporting | runtime/file parity with explicit normalization on business fields | source_of_truth | RPT_33 boundary reference |
| /Users/macbook15/Downloads/MacAi/artifacts/rpt_24_48_file_first_canonicalization_2026_03_10.json | reporting | file-first family model | source_of_truth | async file-first pattern |
| /Users/macbook15/Downloads/MacAi/artifacts/rpt_34_35_shape_reconciliation_2026_03_10.json | reporting | detail-vs-summary dual-layer status | source_of_truth | shape mismatch pattern |
| /Users/macbook15/Downloads/MacAi/artifacts/dentalpro_reporting_architecture_map.md | architecture | source/family/entity/join architecture summary | secondary_enrichment | reporting-focused map |
| /Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_ticket_registry_v1.json | schedule tickets | first live ticket registry build | deprecated_or_superseded | superseded by v2 |
| /Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_patient_full_report_v4.json | schedule patient report | v4 patient-ready report prior to v5 focused closure | deprecated_or_superseded | superseded by v5 |

## PART 7. Verified Reports and Reporting Paths

| Report / Family / Path | What is known | Status | Readiness | Notes |
|---|---|---|---|---|
| reports/index universe | 7 report groups, 41 template codes and 41 saved reports cataloged | proven | ready | catalog/route discovery only |
| runtime_table_export_table family | runtime and export can be compared after header/row boundary validation; explicit normalization allowed only when narrow and evidenced | proven | ready_with_limits | RPT_23 reference pattern |
| grouped_headers family | leaf-header extraction and business header projection can close parity | proven | ready_with_limits | RPT_18 reference pattern |
| file_first_async family | file is primary truth and runtime is launch shell | artifact_proven | ready_with_limits | RPT_24/48 pattern |
| detail-vs-summary dual-layer family | runtime detail and export summary must not be compared row-by-row | artifact_proven | ready_with_limits | RPT_34/35 |
| RPT_18 | reproducible now via mobile/owner/efficiency + mobile/schedule | proven | ready | current strongest report reference |
| RPT_23 | canonicalized with explicit first-column normalization | proven | ready_with_limits | normalization not portable |
| RPT_33 | runtime/file business parity confirmed with explicit normalization | proven | ready_with_limits | canonical field boundary reference |
| RPT_24 | partially reproducible from z/pays and enrichments; also file-first family for certain governed use | proven | ready_with_limits | xray performer unresolved |
| RPT_4 | partially reproducible; row identity closed, field semantics narrowed | proven | validation_required | still not canonicalized |
| RPT_9 / RPT_29 | core unpaid family reconstructable, but hidden history/update semantics remain | proven | validation_required | partial unpaid family |
| RPT_21 | render/export/edit contract opened; blocked by hidden cashbox statement source | proven | blocked | do not overclaim DDS overlap |
| RPT_36 | runtime/file reference-pattern hypothesis rejected for current evidence; workbook technical recovery only | proven | validation_required | semantic header contract unresolved |
| report export transport | direct and async export behaviors mapped; some reports use 3-step exporter flow | artifact_proven | ready_with_limits | export mechanics family useful for custom reporting |

## PART 8. Skills / Techniques / Tooling We Already Use

| Skill / Technique | What this skill does | Practical use in project | Evidence base | Current value |
|---|---|---|---|---|
| live_browser_probe | opens DentalPRO routes in real authenticated browser and extracts runtime state | all UI forensics and report passes | multiple live probes and playwright artifacts | high |
| browser_auth_reuse_via_storageState | reuses authenticated browser state for deterministic passes | dentalpro-playwright regression layer | run_targeted_report_pass and schedule forensic scripts | high |
| direct_route_probing | opens deep routes directly with params | report, patient tab, schedule date probes | multiple route inventories | high |
| direct_tab_url_opening | opens patient/report tabs without menu traversal | patient cashbox and report families | patient cashbox and report probes | high |
| dom_harvesting | captures operational DOM and key containers | HTML-first runtime interpretation | schedule full DOM, cashbox HTML | high |
| hidden_attribute_harvesting | reads data-* attrs, hidden fields, runtime config blobs | route/action/config discovery | schedule runtime maps | medium |
| popup_clean_click_probe | opens patient popup with exact click and clean layer handling | patient enrichment from schedule | patient_full_report_v5 | high |
| focused_rc_tooltip_extraction | extracts exact ticket tooltip from icon handler | ticket semantics | ticket_registry_v1/v2 and algorithm docs | high |
| icon_level_ticket_probe | enumerates ticket order and icon classes per visit | ticket registry and campaign filters | ticket registry artifacts | high |
| network_trace_capture | records request inventory and action-linked transport | report export and schedule transport discovery | network artifacts | medium |
| html_first_runtime_interpretation | treats HTML screen as primary runtime truth where API is unproven | schedule and cashbox shell interpretation | forensic passes | high |
| cross_view_reconciliation | links entities across two UI views | doctor->cabinet mapping | schedule entity relationship artifacts | medium |
| status_normalization | converts raw classes/icons/text into normalized status fields | schedule and report semantic fields | status_dictionary_v2, report policies | high |
| proof_aware_schema_design | adds proof level, scope and reuse boundaries to schemas | ticket dictionary, patient schedule report, reporting verdicts | ticket_dictionary_v2 and governed report artifacts | high |
| excel_pack_building | builds manager-friendly and forensic Excel workbooks | schedule reports, cashbox model, report result packs | multiple xlsx outputs | high |
| json_registry_building | builds machine-mergeable registries | ticket registry, architecture map, report family packs | registry artifacts | high |
| validation_backlog_tracking | keeps open gaps, current vs superseded, and next steps explicit | avoid reopening closed work | worklog and registries | high |
| semantic_closure_without_overclaiming | closes only the unresolved semantic families with focused probes | schi-10/schi-3, report normalizations | semantic closure artifacts | high |
| delta_rerun_strategy | runs only targeted continuation passes over gaps | schedule continuation, report next-step closures | many continuation artifacts | high |

## PART 9. Productization Relevance

| Area | Why it matters for custom reporting layer | Readiness | Limits |
|---|---|---|---|
| schedule runtime | base roster and ticket-bearing visit source | ready | HTML-first, transport not fully closed |
| ticket semantics | follow-up campaigns and patient qualification | ready_with_limits | some families inferred |
| patient cashbox model | patient financial document reporting | ready_with_limits | two-patient proof scope |
| RPT_18/23/33 patterns | reference compare and normalization patterns | ready_with_limits | family-specific |
| doctor roster + RPT_24 enrichment | doctor operational reports | ready_with_limits | patient-day enrichment only |

## PART 10. Limits, Gaps, and What Is Still Not Proven

| Area | Not proven / gap | Why not yet proven | Recommended next step |
|---|---|---|---|
| schedule tickets | schi-10 direct role label not found | inferred | focused icon-local search if new role surface appears |
| schedule popup coverage | not every family has clean popup linkage | structurally_observed | subset-focused hardening only |
| cashbox domain | full source closure absent | not_proven | only if finance blocker requires it |
| RPT_21 | hidden statement family | not_proven | narrow source access or hidden family probe |
| RPT_24 | xray performer key | not_proven | prove row-level key or freeze heuristic with warning |
| RPT_4 | residual replay semantics | not_proven | keep narrow residual set only |
| patient universe | full CRM-wide patient source for some schedule-derived campaigns | not_proven | find stronger global patient source if business case requires it |

## PART 11. Final Verdict

| Area | Verdict | Basis | Safe claim boundary |
|---|---|---|---|
| schedule | production-usable runtime source | operational dump + patient/ticket registries | HTML-first day state, not universal transport closure |
| reports | family-aware productization baseline exists | governed report verdicts | family-specific, not all reports closed |
| cashbox | patient-level document model usable with limits | patient cashbox models | not full cashbox source closure |
| custom reporting | operational custom reports already buildable | doctor roster, hygiene lists, manager report | stay within proven joins and source boundaries |

## Top-20 Proven Data Capabilities

1. Schedule day route targeting via `?date=`.
2. HTML-first extraction of doctors, cabinets, timeslots and visits.
3. Stable visit ids via `#task-record-<visit_id>`.
4. Visit->cabinet mapping via doctor/chair cross-map.
5. Clean patient popup extraction from schedule cards.
6. Ticket icon ordering per visit.
7. Live rendered `rc-tooltip` extraction on exact icon node.
8. Proof-aware ticket dictionary with `proven/inferred/not_proven`.
9. Patient-ready schedule workbook with full names and phones.
10. Patient cashbox document model with `act_reference`.
11. Manager daily report from `mobile/schedule + z/pays`.
12. Doctor roster extraction by accepted API.
13. Patient-day financial enrichment via `RPT_24`.
14. Report universe discovery and route catalog.
15. Live runtime/export/file report pass.
16. Parsed XLSX extraction and row-boundary handling.
17. Grouped-header projection for report parity.
18. Narrow explicit normalization policies for report comparison.
19. Empty medcards internal runtime state machine.
20. Focused hygiene-ticket campaign list generation.

## Top-20 Working Methods / Algorithms / Scripts

1. `explore_crm.js`
2. `extract_reports.js`
3. `analyze_report_24_api.js`
4. `verify_efficiency_report.js`
5. `analyze_report_4_api.js`
6. `analyze_report_9_api.js`
7. `clinic_manager_agent.js`
8. `run_schedule_forensic_pass.js`
9. `run_schedule_interaction_probe_v3.js`
10. `run_schedule_ticket_registry_probe_v1.js`
11. `run_schedule_ticket_semantic_probe_v2.js`
12. `build_schedule_ticket_registry_v2.py`
13. `build_schedule_patient_full_report_v5.py`
14. `find_patients_old_hygiene_no_followup_live.js`
15. `run_targeted_report_pass.ts`
16. `extract_rpt_36_workbook.py`
17. grouped-header leaf extraction workflow
18. family-aware report canonicalization workflow
19. cashbox row/document split by `act_reference`
20. delta-pass continuation strategy

## Top-10 Things We Must Not Overpromise

1. Global cashbox source closure.
2. Full CRM-wide patient universe from schedule-derived artifacts.
3. Popup/detail completeness for every schedule card family.
4. Direct dedicated API-first source for schedule detail.
5. Direct doctor->cabinet canonical field beyond cross-map.
6. Global portability of `schi-10` semantics.
7. Automatic portability of grouped-header normalization from `RPT_18`.
8. Automatic portability of first-column normalization from `RPT_23`.
9. Full closure of `RPT_21` DDS report.
10. Visit-level cash truth from patient-day or patient-document enrichment.

## Top-10 Most Valuable Reusable Assets

1. `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/docs/dentalpro-master-worklog.md`
2. `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/docs/report-api-verification-dossier-2026-03-09.md`
3. `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_operational_dump_master.md`
4. `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_ticket_registry_v2.json`
5. `/Users/macbook15/Downloads/MacAi/artifacts/ticket_dictionary_v2.json`
6. `/Users/macbook15/Downloads/MacAi/artifacts/schedule_2026-03-10_patient_full_report_v5.json`
7. `/Users/macbook15/Downloads/MacAi/artifacts/patient_cashbox_18910_document_model_2026-03-18.json`
8. `/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/artifacts/api/report-24-api-analysis-2026-03-01-2026-03-31.json`
9. `/Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright/run_targeted_report_pass.ts`
10. `/Users/macbook15/Downloads/MacAi/scripts/build_schedule_ticket_registry_v2.py`
