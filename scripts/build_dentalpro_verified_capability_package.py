#!/usr/bin/env python3
import json
from pathlib import Path


ROOT = Path("/Users/macbook15/Downloads/MacAi")
ART = ROOT / "artifacts"
YD = Path("/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration")
DPPW = Path("/Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright")


def dump(path: Path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2))


def md_table(headers, rows):
    lines = ["| " + " | ".join(headers) + " |", "|" + "|".join(["---"] * len(headers)) + "|"]
    for row in rows:
        lines.append("| " + " | ".join(str(row.get(h, "")) for h in headers) + " |")
    return "\n".join(lines)


data_capabilities = [
    {
        "domain": "patient_card_tab",
        "data_we_can_extract": "patient card tabs, direct tab URLs, patient cashbox detail, patient full name, phone, card-linked sections",
        "source_layer": "patient_card_tab + internal authenticated runtime pages",
        "grain": "patient / payment_document / payment_row",
        "proof_level": "proven",
        "readiness": "ready_with_limits",
        "method": "browser-first direct tab URL access + DOM extraction + detail-page drilldown",
        "evidence_basis": [
            str(ART / "patient_cashbox_18910_document_model_2026-03-18.json"),
            str(ART / "patient_cashbox_19095_document_model_2026-03-18.json"),
            str(ROOT / "docs/patient_cashbox_18910_forensic_2026-03-18.md"),
        ],
        "safe_claim_boundary": "Patient cashbox can be modeled at row/document grain for proven patients; not a global cashbox source closure."
    },
    {
        "domain": "patient_identity_and_profile",
        "data_we_can_extract": "patient_id, full name, phone, patient_card_url, appointment-linked identity enrichment",
        "source_layer": "schedule popup + i/client + mobile/client/getByID",
        "grain": "patient / visit-enriched patient row",
        "proof_level": "proven",
        "readiness": "ready_with_limits",
        "method": "schedule popup clean click + API fallback identity probe",
        "evidence_basis": [
            str(ART / "schedule_2026-03-10_patient_full_report_v5.json"),
            str(ART / "schedule_2026-03-10_patient_identity_probe_v5.json"),
        ],
        "safe_claim_boundary": "Patient enrichment is proven for observed schedule rows, not as a full CRM-wide patient inventory."
    },
    {
        "domain": "schedule_day_runtime",
        "data_we_can_extract": "day schedule, doctors, cabinets, timeslots, visits, root config, date mechanics, DOM/runtime layout",
        "source_layer": "HTML-first schedule runtime",
        "grain": "doctor/day, cabinet/day, visit row, timeslot",
        "proof_level": "proven",
        "readiness": "ready",
        "method": "browser-backed schedule forensic pass + DOM/network extraction",
        "evidence_basis": [
            str(ART / "schedule_2026-03-10_operational_dump_master.md"),
            str(ART / "schedule_2026-03-10_visits.json"),
            str(ART / "schedule_2026-03-10_doctors.json"),
            str(ART / "schedule_2026-03-10_cabinets.json"),
            str(ART / "schedule_2026-03-10_timeslots.json"),
        ],
        "safe_claim_boundary": "Schedule page is operationally usable as runtime HTML source for observed day state."
    },
    {
        "domain": "schedule_ticket_layer",
        "data_we_can_extract": "ticket icon order, exact tooltip text, ticket family, normalized category, proof-aware semantics",
        "source_layer": "live rendered rc-tooltip on exact icon node",
        "grain": "ticket on visit card",
        "proof_level": "proven",
        "readiness": "ready_with_limits",
        "method": "focused icon-level React onMouseEnter probe with stale tooltip prevention",
        "evidence_basis": [
            str(ART / "schedule_2026-03-10_ticket_registry_v2.json"),
            str(ART / "ticket_dictionary_v2.json"),
            str(ART / "schedule_ticket_extraction_algorithm.md"),
        ],
        "safe_claim_boundary": "Proven for live-rendered tooltip families; some semantics like schi-10 remain inferred."
    },
    {
        "domain": "schedule_patient_ready_extract",
        "data_we_can_extract": "patient-ready visit workbook with full name, phone, patient_id, doctor, cabinet, proof-aware status fields",
        "source_layer": "schedule runtime + popup + identity probes + conditional cash enrichment",
        "grain": "one schedule visit row",
        "proof_level": "artifact_proven",
        "readiness": "ready_with_limits",
        "method": "full report builder v5 on top of schedule normalized dataset",
        "evidence_basis": [
            str(ART / "schedule_2026-03-10_patient_full_report_v5.xlsx"),
            str(ART / "schedule_2026-03-10_patient_full_report_v5.json"),
        ],
        "safe_claim_boundary": "Visit-level identity is strong; cash remains secondary conditional enrichment only."
    },
    {
        "domain": "report_universe_and_routes",
        "data_we_can_extract": "report groups, template codes, saved report ids, route patterns, mechanics classes",
        "source_layer": "reports index + report route/runtime probes",
        "grain": "report template / saved report",
        "proof_level": "proven",
        "readiness": "ready",
        "method": "reports index extraction + architecture cataloging",
        "evidence_basis": [
            str(YD / "artifacts/reports/reports_scan.json"),
            str(YD / "docs/dentalpro-reports-structured-catalog-2026-03-09.md"),
            str(ART / "report_universe_2026_03_16.json"),
        ],
        "safe_claim_boundary": "Universe discovery is strong; not every report is source-closed."
    },
    {
        "domain": "runtime_table_export_table_reports",
        "data_we_can_extract": "runtime table, export file, parsed workbook, parity verdict, explicit normalization policy",
        "source_layer": "report runtime + export xlsx + parsed workbook",
        "grain": "report row / header contract / footer",
        "proof_level": "proven",
        "readiness": "ready_with_limits",
        "method": "date-constrained targeted report pass with family-aware compare",
        "evidence_basis": [
            str(DPPW / "artifacts/RPT_23_final_governed_verdict_2026-03-11.json"),
            str(DPPW / "artifacts/RPT_33_final_governed_verdict_2026-03-15.json"),
            str(ART / "rpt_23_36_runtime_vs_file_parity_2026_03_10.json"),
        ],
        "safe_claim_boundary": "Canonicalization depends on content compare and explicit normalization; row count equality is never enough."
    },
    {
        "domain": "grouped_headers_reports",
        "data_we_can_extract": "runtime grouped-header table, leaf business headers, normalized parity to export",
        "source_layer": "report runtime + export file",
        "grain": "report business row",
        "proof_level": "proven",
        "readiness": "ready_with_limits",
        "method": "leaf-header extraction + header projection + normalization",
        "evidence_basis": [
            str(DPPW / "artifacts/RPT_18_final_governed_verdict_2026-03-17.json"),
            str(DPPW / "artifacts/RPT_18_final_governed_verdict_2026-03-18.json"),
        ],
        "safe_claim_boundary": "Pattern proven for RPT_18 family; portability to all grouped-header reports is not automatic."
    },
    {
        "domain": "file_first_async_reports",
        "data_we_can_extract": "file as primary truth, runtime shell, parsed schema and row boundaries",
        "source_layer": "async export file",
        "grain": "file row / workbook schema",
        "proof_level": "artifact_proven",
        "readiness": "ready_with_limits",
        "method": "async export tracing + file parse",
        "evidence_basis": [
            str(ART / "rpt_24_48_file_first_canonicalization_2026_03_10.json"),
            str(ART / "async_export_reports_2026_03_16.json"),
        ],
        "safe_claim_boundary": "File-first families are usable only as file-truth datasets, not as runtime-table parity families."
    },
    {
        "domain": "finance_operational_layer",
        "data_we_can_extract": "paid service/payment rows, patient/day revenue, manager daily report, unpaid families partial, cash detail overlap",
        "source_layer": "z/pays + enrichments + cashbox detail HTML + invoice/detail",
        "grain": "pay position / payment header / manager-day aggregate",
        "proof_level": "proven",
        "readiness": "ready_with_limits",
        "method": "accepted API usage + composite joins + HTML detail supplement",
        "evidence_basis": [
            str(YD / "artifacts/api/report-24-api-analysis-2026-03-01-2026-03-31.json"),
            str(YD / "artifacts/api/manager_report_2026-03-06.json"),
            str(YD / "docs/cashbox-source-mapping-2026-03-09.md"),
        ],
        "safe_claim_boundary": "Operational finance extraction is strong for z/pays families; cashbox and DDS hidden logic remain only partially closed."
    },
    {
        "domain": "empty_medcards_internal_runtime",
        "data_we_can_extract": "internal card workflow endpoints, save/approve/decline/cancelApprove state machine",
        "source_layer": "authenticated internal web runtime",
        "grain": "medcard status transition",
        "proof_level": "proven",
        "readiness": "ready_with_limits",
        "method": "runtime component inspection + live internal POST probes",
        "evidence_basis": [
            str(ROOT / "docs/dentalpro_empty_cards_forensic_disclosure_2026_03_16.md"),
            str(YD / "docs/empty-cards-api-candidate-plan-2026-03-14.md"),
            str(ART / "dentalpro_runtime_extraction_empty_cards_2026_03_16.json"),
        ],
        "safe_claim_boundary": "Usable for browser-authenticated automation; not a published token/secret API family."
    },
    {
        "domain": "doctor_roster_custom_reporting",
        "data_we_can_extract": "patients by doctor over period, patient/day roster, optional financial enrichment",
        "source_layer": "z/doctor/all + mobile/schedule + optional RPT_24",
        "grain": "appointment row / patient-day enrichment",
        "proof_level": "proven",
        "readiness": "ready_with_limits",
        "method": "accepted API roster extraction + optional report-based enrichment",
        "evidence_basis": [
            str(YD / "artifacts/api/doctor_patients_Geyushova_2026-02.json"),
            str(YD / "artifacts/api/doctor_patients_Geyushova_2026-02_enriched_rpt24.json"),
        ],
        "safe_claim_boundary": "Patient-day financial enrichment is not visit-level cash proof."
    },
]


methods = [
    {"method": "browser_first_route_access", "what_it_does": "Opens CRM/runtime/report routes in authenticated browser state", "where_used": "schedule, reports, cashbox, empty cards", "what_it_yields": "live UI/runtime state", "proven_scope": "broad project-wide", "limitations": "UI-first only; not an API proof by itself", "proof_status": "proven", "readiness": "ready"},
    {"method": "direct_tab_url_access", "what_it_does": "Opens patient/report sub-tabs directly by URL", "where_used": "patient cashbox, patient tabs, reports", "what_it_yields": "hidden deep pages without menu navigation", "proven_scope": "patient card and report shells", "limitations": "requires known route contract", "proof_status": "proven", "readiness": "ready"},
    {"method": "storageState_auth_reuse", "what_it_does": "Reuses authenticated browser session", "where_used": "playwright regression layer", "what_it_yields": "stable repeated live probes", "proven_scope": "dentalpro-playwright and schedule probes", "limitations": "expires over time", "proof_status": "proven", "readiness": "ready"},
    {"method": "accepted_api_path_usage", "what_it_does": "Calls token/secret API methods from proved candidates", "where_used": "manager report, report verification, roster extraction", "what_it_yields": "JSON data rows", "proven_scope": "157-method catalog subset; strongest around patient/schedule/pay", "limitations": "not all UI domains have published API source", "proof_status": "proven", "readiness": "ready"},
    {"method": "dom_extraction", "what_it_does": "Reads post-load runtime DOM and key containers", "where_used": "schedule forensic, cashbox, reports", "what_it_yields": "HTML/runtime field inventory", "proven_scope": "HTML-first pages", "limitations": "DOM presence does not equal source closure", "proof_status": "proven", "readiness": "ready"},
    {"method": "hidden_attribute_harvesting", "what_it_does": "Extracts data-* and hidden attrs from live nodes", "where_used": "schedule, reports, runtime configs", "what_it_yields": "selectors, ids, config metadata", "proven_scope": "schedule root and report shells", "limitations": "structural only if semantics are not explicit", "proof_status": "proven", "readiness": "ready_with_limits"},
    {"method": "popup_clean_click_probe", "what_it_does": "Opens patient popup by exact card click", "where_used": "schedule patient enrichment", "what_it_yields": "full name, phone, popup actions", "proven_scope": "majority subset on 2026-03-10 schedule", "limitations": "not guaranteed for every family without focused probe", "proof_status": "proven", "readiness": "ready_with_limits"},
    {"method": "focused_rc_tooltip_extraction", "what_it_does": "Opens exact ticket tooltip by React onMouseEnter on icon node", "where_used": "schedule ticket registry", "what_it_yields": "live rendered ticket semantics", "proven_scope": "ticket-bearing visit subset and ticket registry v1/v2", "limitations": "must avoid stale tooltip contamination", "proof_status": "proven", "readiness": "ready_with_limits"},
    {"method": "stale_layer_prevention", "what_it_does": "Closes/deletes old tooltips/popups before each probe", "where_used": "schedule interaction and ticket probes", "what_it_yields": "clean trigger->layer linkage", "proven_scope": "schedule popup/tooltip hardening", "limitations": "subset-validated, not perfect globally", "proof_status": "proven", "readiness": "ready_with_limits"},
    {"method": "chair_view_cross_map", "what_it_does": "Maps visit ids between doctor view and chair view", "where_used": "schedule cabinet attribution", "what_it_yields": "visit->cabinet mapping", "proven_scope": "2026-03-10 schedule forensic pass", "limitations": "cross-map method remains canonical because direct field not found", "proof_status": "proven", "readiness": "ready_with_limits"},
    {"method": "report_formation_probe", "what_it_does": "Opens report, applies date/filter, captures runtime and export behavior", "where_used": "RPT_18, 23, 33, 36, 4", "what_it_yields": "runtime/export/file evidence", "proven_scope": "single-report live passes", "limitations": "report-family specific", "proof_status": "proven", "readiness": "ready"},
    {"method": "export_tracking_direct_vs_async", "what_it_does": "Distinguishes direct download, async shell, callback/file_url completion", "where_used": "report export validation, RPT_21, RPT_24/48", "what_it_yields": "export mechanics contract", "proven_scope": "multiple report families", "limitations": "not every report family closed", "proof_status": "proven", "readiness": "ready_with_limits"},
    {"method": "parsed_xlsx_extraction", "what_it_does": "Parses workbook sheets, headers, rows, boundaries", "where_used": "report parity and file-first families", "what_it_yields": "structured file dataset", "proven_scope": "RPT_18/23/33/36 and file-first families", "limitations": "header recovery can remain unresolved", "proof_status": "proven", "readiness": "ready"},
    {"method": "grouped_header_leaf_extraction", "what_it_does": "Resolves business headers from grouped thead structure", "where_used": "RPT_18", "what_it_yields": "canonical business columns", "proven_scope": "grouped_headers report family", "limitations": "pattern portability not automatic", "proof_status": "proven", "readiness": "ready_with_limits"},
    {"method": "explicit_normalization_policy", "what_it_does": "Formalizes narrow local normalization after mismatch classification", "where_used": "RPT_23, RPT_18, RPT_33", "what_it_yields": "governed normalized parity", "proven_scope": "specific report families", "limitations": "must not be transferred without evidence", "proof_status": "proven", "readiness": "ready_with_limits"},
    {"method": "family_aware_canonicalization", "what_it_does": "Classifies reports by mechanics family and chooses compare path", "where_used": "family program for reports 23/24/34/35/36/48", "what_it_yields": "extraction/comparison/guardrail policy", "proven_scope": "priority report families", "limitations": "not a universal closure for all reports", "proof_status": "artifact_proven", "readiness": "ready_with_limits"},
    {"method": "detail_vs_summary_reconciliation", "what_it_does": "Distinguishes runtime detail vs export summary mismatch families", "where_used": "RPT_34/RPT_35", "what_it_yields": "dual-layer guardrail model", "proven_scope": "shape mismatch families", "limitations": "no direct row parity", "proof_status": "artifact_proven", "readiness": "ready_with_limits"},
    {"method": "file_first_dataset_modeling", "what_it_does": "Treats file as primary truth and runtime as launch shell", "where_used": "RPT_24/48 async families", "what_it_yields": "file-first canonical dataset", "proven_scope": "async export families", "limitations": "runtime table claims forbidden", "proof_status": "artifact_proven", "readiness": "ready_with_limits"},
    {"method": "row_document_split_by_act_reference", "what_it_does": "Separates row-grain and shared-payment document-grain", "where_used": "patient cashbox model", "what_it_yields": "document model with act_reference", "proven_scope": "patients 18910 and 19095", "limitations": "cashbox domain still not globally source-closed", "proof_status": "proven", "readiness": "ready_with_limits"},
    {"method": "delta_pass_strategy", "what_it_does": "Runs targeted follow-up passes instead of broad reruns", "where_used": "schedule continuation, ticket semantics, report next-step passes", "what_it_yields": "gap closure without resetting baseline", "proven_scope": "project-wide operating method", "limitations": "depends on strong baseline artifacts", "proof_status": "proven", "readiness": "ready"},
]


algorithms = [
    {"algorithm": "schedule_forensic_operational_dump", "steps": "open date route -> capture full DOM -> map doctors/cabinets/timeslots/visits -> capture network -> normalize entities", "inputs": "schedule date + storageState", "outputs": "DOM/entity/network artifact pack", "domains": "schedule", "reusability": "reusable_with_constraints", "notes": "HTML-first day schedule proven"},
    {"algorithm": "schedule_popup_hardening", "steps": "baseline subset -> hard reload or clean layer -> one-card-at-a-time popup probe -> linkage classification", "inputs": "visit subset", "outputs": "popup_linkage_v2/v3", "domains": "schedule interaction", "reusability": "reusable_with_constraints", "notes": "acceptance-grade for subset only"},
    {"algorithm": "ticket_registry_build", "steps": "enumerate task icons -> clean icon probe -> capture rc-tooltip -> classify exact text -> aggregate per visit", "inputs": "schedule visit subset", "outputs": "ticket registry json/xlsx + dictionary", "domains": "schedule ticket layer", "reusability": "reusable_with_constraints", "notes": "current main registry = v2"},
    {"algorithm": "ticket_semantic_closure", "steps": "select unresolved families -> focused runtime probe -> exact tooltip capture -> assign proven/inferred/not_proven -> update dictionary", "inputs": "existing ticket registry", "outputs": "semantic closure + updated dictionary", "domains": "ticket semantics", "reusability": "case_specific", "notes": "used for schi-10 and schi-3 split"},
    {"algorithm": "patient_full_schedule_report", "steps": "runtime schedule extract -> popup identity -> focused unresolved probes -> normalize proof-aware fields -> optional cash enrichment sheet", "inputs": "schedule runtime artifacts", "outputs": "patient_full_report_v4/v5", "domains": "schedule patient-ready reporting", "reusability": "reusable_with_constraints", "notes": "cash kept separate by guardrail"},
    {"algorithm": "old_hygiene_no_followup", "steps": "live mobile/schedule over window -> detect hygiene ticket older than threshold -> scan later hygienist visits -> enrich via i/client", "inputs": "threshold date + schedule window", "outputs": "patient list xlsx/json", "domains": "schedule custom reporting", "reusability": "reusable_with_constraints", "notes": "window-bound patient universe only"},
    {"algorithm": "cashbox_document_model_build", "steps": "open patient cashbox tab -> enumerate row links -> open each detail page -> separate position totals from shared payment block -> assign act_reference", "inputs": "patient_id", "outputs": "cashbox document model", "domains": "patient cashbox", "reusability": "reusable_with_constraints", "notes": "proven on two patients"},
    {"algorithm": "doctor_roster_with_revenue_enrichment", "steps": "resolve doctor id -> fetch mobile/schedule roster -> fetch RPT_24 rows -> join on patient-day doctor grain -> output xlsx", "inputs": "doctor name + period", "outputs": "doctor patient roster xlsx/json", "domains": "custom reporting", "reusability": "reusable_with_constraints", "notes": "patient-day finance signal only"},
    {"algorithm": "targeted_live_report_pass", "steps": "open report -> apply date -> capture runtime -> capture export -> parse file -> classify family -> compare -> write verdict", "inputs": "REPORT_ID/CODE/TARGET_DATE", "outputs": "runtime/export/file/verdict artifacts", "domains": "reports", "reusability": "reusable_with_constraints", "notes": "implemented in dentalpro-playwright"},
    {"algorithm": "runtime_table_export_compare", "steps": "validate headers -> validate row boundary -> compare content -> classify mismatches -> apply explicit normalization if evidenced", "inputs": "runtime and file structured datasets", "outputs": "parity verdict", "domains": "report families", "reusability": "reusable_with_constraints", "notes": "RPT_23 reference pattern"},
    {"algorithm": "grouped_header_report_compare", "steps": "extract leaf headers -> project business columns -> compare normalized rows to export -> confirm parity", "inputs": "runtime grouped table + file", "outputs": "normalized parity verdict", "domains": "reports", "reusability": "reusable_with_constraints", "notes": "RPT_18 reference pattern"},
    {"algorithm": "file_first_async_compare", "steps": "treat file as truth -> parse workbook -> define row boundary and schema -> ignore runtime shell for parity", "inputs": "async export file", "outputs": "file-first canonicalization verdict", "domains": "reports", "reusability": "reusable_with_constraints", "notes": "RPT_24/48 pattern"},
    {"algorithm": "report_shape_reconciliation", "steps": "classify runtime shape -> classify export shape -> forbid direct row parity -> set dual-layer decision", "inputs": "runtime + export artifacts", "outputs": "shape reconciliation verdict", "domains": "reports", "reusability": "case_specific", "notes": "RPT_34/35 pattern"},
    {"algorithm": "empty_medcards_state_machine_probe", "steps": "open card runtime -> call save(confirm) -> approve/decline/cancelApprove -> inspect returned card/activity", "inputs": "card_id under browser auth", "outputs": "state transition evidence", "domains": "medical history / empty cards", "reusability": "reusable_with_constraints", "notes": "internal runtime API only"},
    {"algorithm": "report_export_mechanics_audit", "steps": "trace export buttons -> identify direct vs async -> collect completion callback/file path -> parse resulting xlsx", "inputs": "report route", "outputs": "transport audit and export verdict", "domains": "reports/export", "reusability": "reusable_with_constraints", "notes": "used on broad report export fix work"},
]


scripts = [
    {"path": str(YD / "scripts/explore_crm.js"), "purpose": "read-only CRM crawl and route discovery", "domain": "crm/ui inventory", "inputs": "DP_LOGIN, DP_PASSWORD", "outputs": "crm_scan_report.json", "artifacts_produced": [str(YD / "artifacts/playwright/crm_scan_report.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "not deep interaction closure", "practical_value": "baseline CRM structure map"},
    {"path": str(YD / "scripts/extract_reports.js"), "purpose": "extract report universe", "domain": "reporting", "inputs": "browser auth", "outputs": "reports_scan.json", "artifacts_produced": [str(YD / "artifacts/reports/reports_scan.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "catalog only", "practical_value": "report universe discovery"},
    {"path": str(YD / "scripts/analyze_report_24_api.js"), "purpose": "live API reconstruction for RPT_24", "domain": "reporting/finance", "inputs": "DP_LOGIN, DP_PASSWORD, dates", "outputs": "report-24-api-analysis-*.json", "artifacts_produced": [str(YD / "artifacts/api/report-24-api-analysis-2026-03-01-2026-03-31.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "xray performer key unresolved", "practical_value": "primary finance composite source proof"},
    {"path": str(YD / "scripts/verify_efficiency_report.js"), "purpose": "RPT_18 verifier", "domain": "reporting/KPI", "inputs": "dates", "outputs": "efficiency report verification artifacts", "artifacts_produced": [str(YD / "artifacts/api/efficiency-report-verification-2026-03-07.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "report family specific", "practical_value": "reference verified report path"},
    {"path": str(YD / "scripts/analyze_report_4_api.js"), "purpose": "RPT_4 API replay", "domain": "reporting/appointments", "inputs": "dates", "outputs": "report-4-api-copy-*.json", "artifacts_produced": [str(YD / "artifacts/api/report-4-api-copy-2026-03-06-2026-03-07.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "residual replay gaps", "practical_value": "partial reproducibility of primary patients family"},
    {"path": str(YD / "scripts/analyze_report_9_api.js"), "purpose": "RPT_9 unpaid family API analysis", "domain": "reporting/finance", "inputs": "dates", "outputs": "report-9-api-analysis json", "artifacts_produced": [str(YD / "artifacts/api/report-9-api-analysis-2026-03-01-2026-03-31.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "hidden history semantics remain", "practical_value": "partial unpaid report family closure"},
    {"path": str(YD / "scripts/build_report_29_unpaid_composite.js"), "purpose": "RPT_29 composite unpaid build", "domain": "reporting/finance", "inputs": "API extracts", "outputs": "report-29-composite-unpaid json", "artifacts_produced": [str(YD / "artifacts/api/report-29-composite-unpaid-2026.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "still partial", "practical_value": "saved variant unpaid family proof"},
    {"path": str(YD / "scripts/clinic_manager_agent.js"), "purpose": "daily manager report", "domain": "schedule + payments", "inputs": "date", "outputs": "manager daily report csv/json/md", "artifacts_produced": [str(YD / "artifacts/api/manager_report_2026-03-06.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "daily operational slice, not full reporting layer", "practical_value": "production-usable operational report"},
    {"path": str(YD / "scripts/inspect_cashbox_detail.js"), "purpose": "cashbox detail probe", "domain": "cashbox", "inputs": "payment/detail id", "outputs": "detail JSON/HTML evidence", "artifacts_produced": [str(YD / "artifacts/cashbox/cashbox-detail-86644.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "specific objects only", "practical_value": "detail shell narrowing"},
    {"path": str(YD / "scripts/probe_cashbox_payments.js"), "purpose": "cashbox payments list/domain probe", "domain": "cashbox", "inputs": "browser auth", "outputs": "cashbox payment list probe", "artifacts_produced": [str(YD / "artifacts/cashbox-payments/cashbox-payments-live-probe.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "HTML-first shell", "practical_value": "source family narrowing"},
    {"path": str(YD / "scripts/probe_rpt4_selector.js"), "purpose": "RPT_4 selector investigation", "domain": "reporting/appointments", "inputs": "date windows", "outputs": "selector probe json", "artifacts_produced": [str(YD / "artifacts/api/rpt4-selector-probe-2026-02.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "case-specific", "practical_value": "current-primary selector rule"},
    {"path": str(YD / "scripts/inspect_schedule_day_api.js"), "purpose": "schedule API day inspection", "domain": "schedule", "inputs": "target date", "outputs": "schedule-api-day json", "artifacts_produced": [str(YD / "artifacts/api/schedule-api-day-2026-03-09.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "API layer only", "practical_value": "accepted schedule API contract"},
    {"path": str(DPPW / "run_schedule_forensic_pass.js"), "purpose": "full schedule forensic runtime dump", "domain": "schedule runtime", "inputs": "target date + storageState", "outputs": "schedule forensic artifact pack", "artifacts_produced": [str(ART / "schedule_2026-03-10_operational_dump_master.md")], "current_status": "current", "superseded_or_current": "current", "limitations": "date-specific forensic snapshot", "practical_value": "canonical schedule baseline"},
    {"path": str(ROOT / "scripts/run_schedule_interaction_probe_v2.js"), "purpose": "schedule popup hardening pass", "domain": "schedule interaction", "inputs": "baseline visit subset", "outputs": "popup_linkage_v2", "artifacts_produced": [str(ART / "schedule_2026-03-10_popup_linkage_v2.json")], "current_status": "superseded", "superseded_or_current": "deprecated_or_superseded", "limitations": "v3 extends subset families", "practical_value": "method hardening history"},
    {"path": str(ROOT / "scripts/run_schedule_interaction_probe_v3.js"), "purpose": "expanded schedule popup subset probe", "domain": "schedule interaction", "inputs": "schedule subset families", "outputs": "popup_linkage_v3", "artifacts_produced": [str(ART / "schedule_2026-03-10_popup_linkage_v3.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "subset only", "practical_value": "best current popup subset proof"},
    {"path": str(ROOT / "scripts/run_schedule_status_normalizer_v2.js"), "purpose": "status normalization for schedule", "domain": "schedule/status", "inputs": "baseline visit data", "outputs": "status_dictionary_v2", "artifacts_produced": [str(ART / "schedule_2026-03-10_status_dictionary_v2.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "mixed proof levels", "practical_value": "usable custom schedule status schema"},
    {"path": str(ROOT / "scripts/run_schedule_ticket_registry_probe_v1.js"), "purpose": "build live ticket registry", "domain": "schedule/tickets", "inputs": "patient_full_report_v5 subset + storageState", "outputs": "ticket registry v1", "artifacts_produced": [str(ART / "schedule_2026-03-10_ticket_registry_v1.json")], "current_status": "superseded", "superseded_or_current": "deprecated_or_superseded", "limitations": "main registry replaced by v2", "practical_value": "foundational ticket capture"},
    {"path": str(ROOT / "scripts/run_schedule_ticket_semantic_probe_v2.js"), "purpose": "focused unresolved ticket family probe", "domain": "schedule/tickets", "inputs": "ticket_registry_v1", "outputs": "semantic probe v2", "artifacts_produced": [str(ART / "schedule_2026-03-10_ticket_semantic_probe_v2.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "only unresolved families", "practical_value": "semantic closure support"},
    {"path": str(ROOT / "scripts/build_schedule_ticket_registry_v2.py"), "purpose": "build main ticket registry v2 with proof-aware semantics", "domain": "schedule/tickets", "inputs": "v1 registry + ticket_dictionary_v2 + semantic probe", "outputs": "ticket_registry_v2 json/xlsx/md", "artifacts_produced": [str(ART / "schedule_2026-03-10_ticket_registry_v2.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "depends on proven tooltip registry", "practical_value": "current main ticket knowledge asset"},
    {"path": str(ROOT / "scripts/build_schedule_patient_full_report_v4.py"), "purpose": "patient-ready schedule report v4", "domain": "schedule/patient report", "inputs": "normalized schedule + identity + cash enrichment", "outputs": "patient_full_report_v4", "artifacts_produced": [str(ART / "schedule_2026-03-10_patient_full_report_v4.json")], "current_status": "superseded", "superseded_or_current": "deprecated_or_superseded", "limitations": "v5 closes patient_id gaps", "practical_value": "intermediate patient-ready workbook"},
    {"path": str(ROOT / "scripts/build_schedule_patient_full_report_v5.py"), "purpose": "patient-ready schedule report v5", "domain": "schedule/patient report", "inputs": "identity probe v5 + normalized schedule", "outputs": "patient_full_report_v5", "artifacts_produced": [str(ART / "schedule_2026-03-10_patient_full_report_v5.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "cash remains separate", "practical_value": "current patient-ready schedule workbook"},
    {"path": str(ROOT / "scripts/find_patients_old_hygiene_no_followup_live.js"), "purpose": "find patients with old hygiene ticket and no later hygienist visit", "domain": "custom schedule reporting", "inputs": "threshold and schedule window", "outputs": "patients_old_hygiene_no_followup live json", "artifacts_produced": [str(ART / "patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18_v2.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "schedule-window patient universe only", "practical_value": "operational campaign list generation"},
    {"path": str(ROOT / "scripts/build_reporting_architecture_map.py"), "purpose": "build reporting architecture package", "domain": "architecture/knowledge", "inputs": "existing artifacts and docs", "outputs": "architecture map registries", "artifacts_produced": [str(ART / "dentalpro_source_landscape_map.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "reporting-focused, not full project capability pack", "practical_value": "current architecture baseline"},
    {"path": str(DPPW / "run_targeted_report_pass.ts"), "purpose": "single-report live governed pass", "domain": "reports/runtime-export", "inputs": "report code/id/date", "outputs": "dated runtime/export/file/verdict artifacts", "artifacts_produced": [str(DPPW / "artifacts/RPT_23_final_governed_verdict_2026-03-11.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "family-specific interpretation still required", "practical_value": "core live report execution layer"},
    {"path": str(DPPW / "extract_rpt_36_workbook.py"), "purpose": "technical workbook header recovery for RPT_36", "domain": "reports/file parsing", "inputs": "RPT_36 xlsx", "outputs": "workbook header recovery json", "artifacts_produced": [str(DPPW / "artifacts/RPT_36_workbook_header_recovery_2026-03-11.json")], "current_status": "current", "superseded_or_current": "current", "limitations": "semantic headers remain unresolved", "practical_value": "technical contract recovery"},
]


artifacts = [
    {"path": str(YD / "docs/dentalpro-master-worklog.md"), "artifact_type": "master_doc", "domain": "project state", "what_is_proven_there": "current operational truth, strongest conclusions, workstreams, gaps", "what_is_only_structurally_observed": "none; it is a control-plane summary", "what_cannot_be_claimed": "raw evidence beyond linked docs", "current_role": "source_of_truth", "notes": "primary control-plane doc"},
    {"path": str(YD / "docs/report-api-verification-dossier-2026-03-09.md"), "artifact_type": "dossier", "domain": "report verification", "what_is_proven_there": "priority report reproducibility positions and blockers", "what_is_only_structurally_observed": "candidate source overlaps for blocked reports", "what_cannot_be_claimed": "full closure of blocked families", "current_role": "source_of_truth", "notes": "main report verification dossier"},
    {"path": str(ART / "schedule_2026-03-10_operational_dump_master.md"), "artifact_type": "forensic_dump", "domain": "schedule runtime", "what_is_proven_there": "HTML-first schedule runtime, entities, mechanics, transport findings", "what_is_only_structurally_observed": "some popup/detail layers", "what_cannot_be_claimed": "global API-first schedule source", "current_role": "source_of_truth", "notes": "canonical schedule forensic baseline"},
    {"path": str(ART / "schedule_2026-03-10_ticket_registry_v2.json"), "artifact_type": "registry", "domain": "schedule tickets", "what_is_proven_there": "ticket tooltip capture and normalized semantics with proof levels", "what_is_only_structurally_observed": "none for proven families; schi-10 remains inferred", "what_cannot_be_claimed": "global proof for all icon families", "current_role": "source_of_truth", "notes": "main ticket registry"},
    {"path": str(ART / "ticket_dictionary_v2.json"), "artifact_type": "dictionary", "domain": "ticket semantics", "what_is_proven_there": "normalized categories, proof_level, scope, evidence basis", "what_is_only_structurally_observed": "families left as inferred", "what_cannot_be_claimed": "global safe reuse for inferred families", "current_role": "source_of_truth", "notes": "current semantic dictionary"},
    {"path": str(ART / "schedule_2026-03-10_patient_full_report_v5.json"), "artifact_type": "normalized_dataset", "domain": "schedule patient report", "what_is_proven_there": "patient-ready schedule rows with proven IDs/phones where available", "what_is_only_structurally_observed": "none material in current rows", "what_cannot_be_claimed": "visit-level cash truth", "current_role": "source_of_truth", "notes": "current patient-ready schedule dataset"},
    {"path": str(ART / "schedule_2026-03-10_cash_enrichment_v5.json"), "artifact_type": "enrichment", "domain": "schedule cash", "what_is_proven_there": "patient-day conditional financial linkage", "what_is_only_structurally_observed": "heuristic joins", "what_cannot_be_claimed": "direct visit->cash linkage", "current_role": "secondary_enrichment", "notes": "keep separate from primary visit sheet"},
    {"path": str(ART / "patient_cashbox_18910_document_model_2026-03-18.json"), "artifact_type": "document_model", "domain": "patient cashbox", "what_is_proven_there": "row/document split with act_reference", "what_is_only_structurally_observed": "none in tested patient", "what_cannot_be_claimed": "global patient cashbox model for all patients", "current_role": "source_of_truth", "notes": "reference patient cashbox model"},
    {"path": str(ART / "patient_cashbox_19095_document_model_2026-03-18.json"), "artifact_type": "document_model", "domain": "patient cashbox", "what_is_proven_there": "shared payment document pattern on second patient", "what_is_only_structurally_observed": "none in tested patient", "what_cannot_be_claimed": "full clinic-wide cashbox source closure", "current_role": "source_of_truth", "notes": "second patient confirmation"},
    {"path": str(YD / "artifacts/api/doctor_patients_Geyushova_2026-02.json"), "artifact_type": "custom_report_artifact", "domain": "doctor roster", "what_is_proven_there": "accepted API patient roster by doctor", "what_is_only_structurally_observed": "none", "what_cannot_be_claimed": "visit-level service price", "current_role": "source_of_truth", "notes": "operational roster baseline"},
    {"path": str(YD / "artifacts/api/doctor_patients_Geyushova_2026-02_enriched_rpt24.json"), "artifact_type": "custom_report_artifact", "domain": "doctor roster", "what_is_proven_there": "patient-day revenue enrichment", "what_is_only_structurally_observed": "service-level exact mapping", "what_cannot_be_claimed": "exact appointment line-item price", "current_role": "secondary_enrichment", "notes": "patient-day enrichment only"},
    {"path": str(YD / "artifacts/api/manager_report_2026-03-06.json"), "artifact_type": "operational_report", "domain": "daily manager report", "what_is_proven_there": "daily appointments/payments composite algorithm", "what_is_only_structurally_observed": "none in proven daily slice", "what_cannot_be_claimed": "multi-day or arbitrary historic full-lake reporting", "current_role": "source_of_truth", "notes": "production-usable daily operational report"},
    {"path": str(YD / "artifacts/api/report-24-api-analysis-2026-03-01-2026-03-31.json"), "artifact_type": "analysis_artifact", "domain": "RPT_24 / finance", "what_is_proven_there": "z/pays-based row reconstruction and rules", "what_is_only_structurally_observed": "xray executor mapping candidate", "what_cannot_be_claimed": "fully closed performer key", "current_role": "source_of_truth", "notes": "main finance analysis asset"},
    {"path": str(YD / "artifacts/api/report-9-api-analysis-2026-03-01-2026-03-31.json"), "artifact_type": "analysis_artifact", "domain": "RPT_9", "what_is_proven_there": "core unpaid family API coverage", "what_is_only_structurally_observed": "history/update source", "what_cannot_be_claimed": "full report closure", "current_role": "source_of_truth", "notes": "partial unpaid family"},
    {"path": str(YD / "artifacts/api/report-29-composite-unpaid-2026.json"), "artifact_type": "analysis_artifact", "domain": "RPT_29", "what_is_proven_there": "saved unpaid family composite build", "what_is_only_structurally_observed": "hidden history semantics", "what_cannot_be_claimed": "full report closure", "current_role": "source_of_truth", "notes": "saved variant unpaid family"},
    {"path": str(YD / "artifacts/api/report-4-api-copy-2026-03-06-2026-03-07.json"), "artifact_type": "analysis_artifact", "domain": "RPT_4", "what_is_proven_there": "anchored API copy and partial parity", "what_is_only_structurally_observed": "residual selector semantics", "what_cannot_be_claimed": "global closure of RPT_4", "current_role": "source_of_truth", "notes": "best anchored window"},
    {"path": str(YD / "artifacts/api/rpt4-selector-probe-2026-02.json"), "artifact_type": "probe_artifact", "domain": "RPT_4", "what_is_proven_there": "visit-centered selector/tie-break behavior", "what_is_only_structurally_observed": "none material", "what_cannot_be_claimed": "complete report closure", "current_role": "source_of_truth", "notes": "selector rule asset"},
    {"path": str(YD / "artifacts/api/efficiency-report-verification-2026-03-07.json"), "artifact_type": "verification_artifact", "domain": "RPT_18", "what_is_proven_there": "API/UI parity for KPI report", "what_is_only_structurally_observed": "none material", "what_cannot_be_claimed": "all grouped-header reports automatically closed", "current_role": "source_of_truth", "notes": "reference verified report"},
    {"path": str(YD / "artifacts/cashbox-payments/cashbox-payments-live-probe.json"), "artifact_type": "forensic_probe", "domain": "cashbox payments", "what_is_proven_there": "HTML-first payments shell and row opening behavior", "what_is_only_structurally_observed": "direct API source candidate", "what_cannot_be_claimed": "cashbox source closure", "current_role": "source_of_truth", "notes": "cashbox shell baseline"},
    {"path": str(YD / "artifacts/cashbox/cashbox-detail-86644.json"), "artifact_type": "forensic_probe", "domain": "cashbox detail", "what_is_proven_there": "detail tabs/history/payment shell", "what_is_only_structurally_observed": "comment internals in some cases", "what_cannot_be_claimed": "generic comment source model", "current_role": "secondary_enrichment", "notes": "detail object evidence"},
    {"path": str(ROOT / "docs/dentalpro_empty_cards_forensic_disclosure_2026_03_16.md"), "artifact_type": "forensic_report", "domain": "empty medcards", "what_is_proven_there": "internal runtime API path and browser-authenticated flow", "what_is_only_structurally_observed": "none for tested state machine", "what_cannot_be_claimed": "published token/secret medcard API", "current_role": "source_of_truth", "notes": "empty cards closure artifact"},
    {"path": str(DPPW / "artifacts/RPT_23_final_governed_verdict_2026-03-11.json"), "artifact_type": "governed_verdict", "domain": "reporting", "what_is_proven_there": "runtime_table_export_table with explicit normalization", "what_is_only_structurally_observed": "none for current pass", "what_cannot_be_claimed": "global portability of normalization", "current_role": "source_of_truth", "notes": "RPT_23 reference pattern"},
    {"path": str(DPPW / "artifacts/RPT_18_final_governed_verdict_2026-03-18.json"), "artifact_type": "governed_verdict", "domain": "reporting", "what_is_proven_there": "grouped_headers canonicalized with explicit normalization", "what_is_only_structurally_observed": "none for current pass", "what_cannot_be_claimed": "all grouped-header reports behave alike", "current_role": "source_of_truth", "notes": "RPT_18 reference pattern"},
    {"path": str(DPPW / "artifacts/RPT_33_final_governed_verdict_2026-03-15.json"), "artifact_type": "governed_verdict", "domain": "reporting", "what_is_proven_there": "runtime/file parity with explicit normalization on business fields", "what_is_only_structurally_observed": "none for current pass", "what_cannot_be_claimed": "all runtime/file families share same field policy", "current_role": "source_of_truth", "notes": "RPT_33 boundary reference"},
    {"path": str(ART / "rpt_24_48_file_first_canonicalization_2026_03_10.json"), "artifact_type": "family_artifact", "domain": "reporting", "what_is_proven_there": "file-first family model", "what_is_only_structurally_observed": "runtime shell", "what_cannot_be_claimed": "runtime parity", "current_role": "source_of_truth", "notes": "async file-first pattern"},
    {"path": str(ART / "rpt_34_35_shape_reconciliation_2026_03_10.json"), "artifact_type": "family_artifact", "domain": "reporting", "what_is_proven_there": "detail-vs-summary dual-layer status", "what_is_only_structurally_observed": "aggregate relation specifics", "what_cannot_be_claimed": "direct row parity", "current_role": "source_of_truth", "notes": "shape mismatch pattern"},
    {"path": str(ART / "dentalpro_reporting_architecture_map.md"), "artifact_type": "knowledge_package", "domain": "architecture", "what_is_proven_there": "source/family/entity/join architecture summary", "what_is_only_structurally_observed": "future opportunities", "what_cannot_be_claimed": "new evidence beyond source files", "current_role": "secondary_enrichment", "notes": "reporting-focused map"},
    {"path": str(ART / "schedule_2026-03-10_ticket_registry_v1.json"), "artifact_type": "registry", "domain": "schedule tickets", "what_is_proven_there": "first live ticket registry build", "what_is_only_structurally_observed": "some semantics before closure", "what_cannot_be_claimed": "current final ticket dictionary", "current_role": "deprecated_or_superseded", "notes": "superseded by v2"},
    {"path": str(ART / "schedule_2026-03-10_patient_full_report_v4.json"), "artifact_type": "normalized_dataset", "domain": "schedule patient report", "what_is_proven_there": "v4 patient-ready report prior to v5 focused closure", "what_is_only_structurally_observed": "remaining missing patient ids at that time", "what_cannot_be_claimed": "current best patient-ready workbook", "current_role": "deprecated_or_superseded", "notes": "superseded by v5"},
]


reports = [
    {"report_or_family_or_path": "reports/index universe", "what_is_known": "7 report groups, 41 template codes and 41 saved reports cataloged", "status": "proven", "readiness": "ready", "notes": "catalog/route discovery only"},
    {"report_or_family_or_path": "runtime_table_export_table family", "what_is_known": "runtime and export can be compared after header/row boundary validation; explicit normalization allowed only when narrow and evidenced", "status": "proven", "readiness": "ready_with_limits", "notes": "RPT_23 reference pattern"},
    {"report_or_family_or_path": "grouped_headers family", "what_is_known": "leaf-header extraction and business header projection can close parity", "status": "proven", "readiness": "ready_with_limits", "notes": "RPT_18 reference pattern"},
    {"report_or_family_or_path": "file_first_async family", "what_is_known": "file is primary truth and runtime is launch shell", "status": "artifact_proven", "readiness": "ready_with_limits", "notes": "RPT_24/48 pattern"},
    {"report_or_family_or_path": "detail-vs-summary dual-layer family", "what_is_known": "runtime detail and export summary must not be compared row-by-row", "status": "artifact_proven", "readiness": "ready_with_limits", "notes": "RPT_34/35"},
    {"report_or_family_or_path": "RPT_18", "what_is_known": "reproducible now via mobile/owner/efficiency + mobile/schedule", "status": "proven", "readiness": "ready", "notes": "current strongest report reference"},
    {"report_or_family_or_path": "RPT_23", "what_is_known": "canonicalized with explicit first-column normalization", "status": "proven", "readiness": "ready_with_limits", "notes": "normalization not portable"},
    {"report_or_family_or_path": "RPT_33", "what_is_known": "runtime/file business parity confirmed with explicit normalization", "status": "proven", "readiness": "ready_with_limits", "notes": "canonical field boundary reference"},
    {"report_or_family_or_path": "RPT_24", "what_is_known": "partially reproducible from z/pays and enrichments; also file-first family for certain governed use", "status": "proven", "readiness": "ready_with_limits", "notes": "xray performer unresolved"},
    {"report_or_family_or_path": "RPT_4", "what_is_known": "partially reproducible; row identity closed, field semantics narrowed", "status": "proven", "readiness": "validation_required", "notes": "still not canonicalized"},
    {"report_or_family_or_path": "RPT_9 / RPT_29", "what_is_known": "core unpaid family reconstructable, but hidden history/update semantics remain", "status": "proven", "readiness": "validation_required", "notes": "partial unpaid family"},
    {"report_or_family_or_path": "RPT_21", "what_is_known": "render/export/edit contract opened; blocked by hidden cashbox statement source", "status": "proven", "readiness": "blocked", "notes": "do not overclaim DDS overlap"},
    {"report_or_family_or_path": "RPT_36", "what_is_known": "runtime/file reference-pattern hypothesis rejected for current evidence; workbook technical recovery only", "status": "proven", "readiness": "validation_required", "notes": "semantic header contract unresolved"},
    {"report_or_family_or_path": "report export transport", "what_is_known": "direct and async export behaviors mapped; some reports use 3-step exporter flow", "status": "artifact_proven", "readiness": "ready_with_limits", "notes": "export mechanics family useful for custom reporting"},
]


skills = [
    {"skill_name": "live_browser_probe", "what_this_skill_does": "opens DentalPRO routes in real authenticated browser and extracts runtime state", "practical_use": "all UI forensics and report passes", "input": "route/date/id + auth", "output": "live runtime evidence", "domain_coverage": "schedule, reports, patient tabs, cashbox", "proof_basis": "multiple live probes and playwright artifacts", "limitations": "browser-only, not source proof by itself", "current_value_for_productization": "high"},
    {"skill_name": "browser_auth_reuse_via_storageState", "what_this_skill_does": "reuses authenticated browser state for deterministic passes", "practical_use": "dentalpro-playwright regression layer", "input": "storageState file", "output": "repeated authenticated contexts", "domain_coverage": "reports and schedule", "proof_basis": "run_targeted_report_pass and schedule forensic scripts", "limitations": "session expiry", "current_value_for_productization": "high"},
    {"skill_name": "direct_route_probing", "what_this_skill_does": "opens deep routes directly with params", "practical_use": "report, patient tab, schedule date probes", "input": "route contract", "output": "exact screen state", "domain_coverage": "reports, schedule, patient tabs", "proof_basis": "multiple route inventories", "limitations": "needs known contract", "current_value_for_productization": "high"},
    {"skill_name": "direct_tab_url_opening", "what_this_skill_does": "opens patient/report tabs without menu traversal", "practical_use": "patient cashbox and report families", "input": "patient_id or report params", "output": "deep page access", "domain_coverage": "patient dossier, reports", "proof_basis": "patient cashbox and report probes", "limitations": "not all tabs globally mapped", "current_value_for_productization": "high"},
    {"skill_name": "dom_harvesting", "what_this_skill_does": "captures operational DOM and key containers", "practical_use": "HTML-first runtime interpretation", "input": "loaded page", "output": "DOM maps and entity inventories", "domain_coverage": "schedule, cashbox, reports", "proof_basis": "schedule full DOM, cashbox HTML", "limitations": "HTML alone is not full semantics", "current_value_for_productization": "high"},
    {"skill_name": "hidden_attribute_harvesting", "what_this_skill_does": "reads data-* attrs, hidden fields, runtime config blobs", "practical_use": "route/action/config discovery", "input": "DOM nodes", "output": "config metadata", "domain_coverage": "schedule and reports", "proof_basis": "schedule runtime maps", "limitations": "structural only without further proof", "current_value_for_productization": "medium"},
    {"skill_name": "popup_clean_click_probe", "what_this_skill_does": "opens patient popup with exact click and clean layer handling", "practical_use": "patient enrichment from schedule", "input": "visit card", "output": "name, phone, actions", "domain_coverage": "schedule", "proof_basis": "patient_full_report_v5", "limitations": "subset/family sensitivity", "current_value_for_productization": "high"},
    {"skill_name": "focused_rc_tooltip_extraction", "what_this_skill_does": "extracts exact ticket tooltip from icon handler", "practical_use": "ticket semantics", "input": "icon node", "output": "exact tooltip text/html", "domain_coverage": "schedule ticket layer", "proof_basis": "ticket_registry_v1/v2 and algorithm docs", "limitations": "must prevent stale contamination", "current_value_for_productization": "high"},
    {"skill_name": "icon_level_ticket_probe", "what_this_skill_does": "enumerates ticket order and icon classes per visit", "practical_use": "ticket registry and campaign filters", "input": "visit card", "output": "ticket rows", "domain_coverage": "schedule ticket layer", "proof_basis": "ticket registry artifacts", "limitations": "semantics vary by icon family", "current_value_for_productization": "high"},
    {"skill_name": "network_trace_capture", "what_this_skill_does": "records request inventory and action-linked transport", "practical_use": "report export and schedule transport discovery", "input": "runtime page + actions", "output": "request registry", "domain_coverage": "schedule, cashbox, reports", "proof_basis": "network artifacts", "limitations": "absence of request does not prove absence of server logic", "current_value_for_productization": "medium"},
    {"skill_name": "html_first_runtime_interpretation", "what_this_skill_does": "treats HTML screen as primary runtime truth where API is unproven", "practical_use": "schedule and cashbox shell interpretation", "input": "live HTML page", "output": "usable runtime dataset", "domain_coverage": "schedule, cashbox", "proof_basis": "forensic passes", "limitations": "still not transport/source closure", "current_value_for_productization": "high"},
    {"skill_name": "cross_view_reconciliation", "what_this_skill_does": "links entities across two UI views", "practical_use": "doctor->cabinet mapping", "input": "doctor view + chair view", "output": "reconciled relation", "domain_coverage": "schedule", "proof_basis": "schedule entity relationship artifacts", "limitations": "indirect mapping", "current_value_for_productization": "medium"},
    {"skill_name": "status_normalization", "what_this_skill_does": "converts raw classes/icons/text into normalized status fields", "practical_use": "schedule and report semantic fields", "input": "runtime markers", "output": "proof-aware status dictionary", "domain_coverage": "schedule, reports", "proof_basis": "status_dictionary_v2, report policies", "limitations": "some entries stay inferred", "current_value_for_productization": "high"},
    {"skill_name": "proof_aware_schema_design", "what_this_skill_does": "adds proof level, scope and reuse boundaries to schemas", "practical_use": "ticket dictionary, patient schedule report, reporting verdicts", "input": "normalized fields", "output": "safe downstream schema", "domain_coverage": "project-wide", "proof_basis": "ticket_dictionary_v2 and governed report artifacts", "limitations": "requires discipline to maintain", "current_value_for_productization": "high"},
    {"skill_name": "excel_pack_building", "what_this_skill_does": "builds manager-friendly and forensic Excel workbooks", "practical_use": "schedule reports, cashbox model, report result packs", "input": "normalized json data", "output": "xlsx deliverables", "domain_coverage": "schedule, reporting, cashbox", "proof_basis": "multiple xlsx outputs", "limitations": "presentation layer only", "current_value_for_productization": "high"},
    {"skill_name": "json_registry_building", "what_this_skill_does": "builds machine-mergeable registries", "practical_use": "ticket registry, architecture map, report family packs", "input": "curated evidence", "output": "json registries", "domain_coverage": "project-wide", "proof_basis": "registry artifacts", "limitations": "curation quality matters", "current_value_for_productization": "high"},
    {"skill_name": "validation_backlog_tracking", "what_this_skill_does": "keeps open gaps, current vs superseded, and next steps explicit", "practical_use": "avoid reopening closed work", "input": "project state", "output": "control-plane docs", "domain_coverage": "project-wide", "proof_basis": "worklog and registries", "limitations": "manual discipline required", "current_value_for_productization": "high"},
    {"skill_name": "semantic_closure_without_overclaiming", "what_this_skill_does": "closes only the unresolved semantic families with focused probes", "practical_use": "schi-10/schi-3, report normalizations", "input": "targeted unresolved set", "output": "proof-aware closure", "domain_coverage": "tickets and reports", "proof_basis": "semantic closure artifacts", "limitations": "can still end in inferred", "current_value_for_productization": "high"},
    {"skill_name": "delta_rerun_strategy", "what_this_skill_does": "runs only targeted continuation passes over gaps", "practical_use": "schedule continuation, report next-step closures", "input": "baseline artifacts + gap list", "output": "v2/v3/v5 deltas", "domain_coverage": "project-wide", "proof_basis": "many continuation artifacts", "limitations": "depends on strong baselines", "current_value_for_productization": "high"},
]


readiness = [
    {"identifier": "schedule_day_runtime", "category": "domain", "current_status": "current", "canonicalization_level": "proven", "safe_for_future_reporting": "yes", "required_guardrails": "treat as HTML-first runtime dataset; popup/detail layers remain subset-sensitive", "what_is_missing": "full dedicated transport proof", "evidence_reference": str(ART / "schedule_2026-03-10_operational_dump_master.md"), "notes": ""},
    {"identifier": "schedule_ticket_layer", "category": "domain", "current_status": "current", "canonicalization_level": "proven", "safe_for_future_reporting": "conditional", "required_guardrails": "only live rendered rc-tooltip is source of truth; schi-10 remains inferred", "what_is_missing": "global proof for all icon families", "evidence_reference": str(ART / "schedule_2026-03-10_ticket_registry_v2.json"), "notes": ""},
    {"identifier": "patient_schedule_full_v5", "category": "artifact", "current_status": "current", "canonicalization_level": "artifact_proven", "safe_for_future_reporting": "conditional", "required_guardrails": "do not treat cash sheet as visit-level truth", "what_is_missing": "direct visit->cash linkage", "evidence_reference": str(ART / "schedule_2026-03-10_patient_full_report_v5.json"), "notes": ""},
    {"identifier": "cash_enrichment_v5", "category": "artifact", "current_status": "current", "canonicalization_level": "artifact_proven", "safe_for_future_reporting": "conditional", "required_guardrails": "patient-day conditional join only", "what_is_missing": "visit-level cash proof", "evidence_reference": str(ART / "schedule_2026-03-10_cash_enrichment_v5.json"), "notes": ""},
    {"identifier": "patient_cashbox_document_model", "category": "domain", "current_status": "current", "canonicalization_level": "proven", "safe_for_future_reporting": "conditional", "required_guardrails": "keep act_reference and payment_block_scope separate from row-level paid_amount", "what_is_missing": "full-clinic source closure", "evidence_reference": str(ART / "patient_cashbox_18910_document_model_2026-03-18.json"), "notes": ""},
    {"identifier": "RPT_18", "category": "report", "current_status": "current", "canonicalization_level": "proven", "safe_for_future_reporting": "yes", "required_guardrails": "use grouped-header projection policy", "what_is_missing": "", "evidence_reference": str(DPPW / "artifacts/RPT_18_final_governed_verdict_2026-03-18.json"), "notes": ""},
    {"identifier": "RPT_23", "category": "report", "current_status": "current", "canonicalization_level": "proven", "safe_for_future_reporting": "conditional", "required_guardrails": "use first-column normalization policy; do not claim canonicalized_now", "what_is_missing": "global transferability of policy", "evidence_reference": str(DPPW / "artifacts/RPT_23_final_governed_verdict_2026-03-11.json"), "notes": ""},
    {"identifier": "RPT_33", "category": "report", "current_status": "current", "canonicalization_level": "proven", "safe_for_future_reporting": "conditional", "required_guardrails": "respect explicit normalization and field boundary rules", "what_is_missing": "", "evidence_reference": str(DPPW / "artifacts/RPT_33_final_governed_verdict_2026-03-15.json"), "notes": ""},
    {"identifier": "RPT_24_file_first_family", "category": "report_family", "current_status": "current", "canonicalization_level": "artifact_proven", "safe_for_future_reporting": "conditional", "required_guardrails": "file-first only; xray performer gap remains", "what_is_missing": "xray performer key", "evidence_reference": str(ART / "rpt_24_48_file_first_canonicalization_2026_03_10.json"), "notes": ""},
    {"identifier": "RPT_34_35_dual_layer", "category": "report_family", "current_status": "current", "canonicalization_level": "artifact_proven", "safe_for_future_reporting": "conditional", "required_guardrails": "no direct row parity", "what_is_missing": "aggregate reconciliation maturation", "evidence_reference": str(ART / "rpt_34_35_shape_reconciliation_2026_03_10.json"), "notes": ""},
    {"identifier": "RPT_4", "category": "report", "current_status": "current", "canonicalization_level": "proven", "safe_for_future_reporting": "no", "required_guardrails": "treat as replay/debug family only", "what_is_missing": "residual semantics and replay closure", "evidence_reference": str(DPPW / "artifacts/RPT_4_final_governed_verdict_2026-03-17.json"), "notes": ""},
    {"identifier": "RPT_9_RPT_29", "category": "report_family", "current_status": "current", "canonicalization_level": "proven", "safe_for_future_reporting": "conditional", "required_guardrails": "explicitly omit hidden updater/reason fields or keep as partial", "what_is_missing": "history/update source", "evidence_reference": str(YD / "docs/report-api-verification-dossier-2026-03-09.md"), "notes": ""},
    {"identifier": "RPT_21", "category": "report", "current_status": "current", "canonicalization_level": "proven", "safe_for_future_reporting": "no", "required_guardrails": "keep blocked; DDS overlap is not statement source", "what_is_missing": "hidden statement family", "evidence_reference": str(YD / "docs/report-api-verification-dossier-2026-03-09.md"), "notes": ""},
    {"identifier": "empty_medcards_internal_runtime", "category": "domain", "current_status": "current", "canonicalization_level": "proven", "safe_for_future_reporting": "conditional", "required_guardrails": "browser-authenticated internal runtime only", "what_is_missing": "published API equivalent", "evidence_reference": str(ROOT / "docs/dentalpro_empty_cards_forensic_disclosure_2026_03_16.md"), "notes": ""},
]


source_of_truth_map = [
    {"area": "project_state", "asset": str(YD / "docs/dentalpro-master-worklog.md"), "role": "source_of_truth"},
    {"area": "report_verification", "asset": str(YD / "docs/report-api-verification-dossier-2026-03-09.md"), "role": "source_of_truth"},
    {"area": "schedule_runtime", "asset": str(ART / "schedule_2026-03-10_operational_dump_master.md"), "role": "source_of_truth"},
    {"area": "ticket_semantics", "asset": str(ART / "ticket_dictionary_v2.json"), "role": "source_of_truth"},
    {"area": "ticket_registry", "asset": str(ART / "schedule_2026-03-10_ticket_registry_v2.json"), "role": "source_of_truth"},
    {"area": "patient_ready_schedule", "asset": str(ART / "schedule_2026-03-10_patient_full_report_v5.json"), "role": "source_of_truth"},
    {"area": "cashbox_document_model", "asset": str(ART / "patient_cashbox_18910_document_model_2026-03-18.json"), "role": "source_of_truth"},
    {"area": "reporting_architecture", "asset": str(ART / "dentalpro_reporting_architecture_map.md"), "role": "secondary_enrichment"},
]


superseded_map = [
    {"asset": str(ART / "schedule_2026-03-10_ticket_registry_v1.json"), "status": "deprecated_or_superseded", "replaced_by": str(ART / "schedule_2026-03-10_ticket_registry_v2.json"), "reason": "v2 carries proof-aware semantic closure"},
    {"asset": str(ART / "schedule_2026-03-10_patient_full_report_v4.json"), "status": "deprecated_or_superseded", "replaced_by": str(ART / "schedule_2026-03-10_patient_full_report_v5.json"), "reason": "v5 closes patient_id gaps"},
    {"asset": str(ART / "patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18.json"), "status": "deprecated_or_superseded", "replaced_by": str(ART / "patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18_v2.json"), "reason": "v2 adds normalized doctor split and management view"},
    {"asset": str(ART / "schedule_2026-03-10_popup_linkage_v2.json"), "status": "deprecated_or_superseded", "replaced_by": str(ART / "schedule_2026-03-10_popup_linkage_v3.json"), "reason": "v3 expands subset families"},
]


validation_backlog = [
    {"area": "schedule tickets", "gap": "schi-10 direct role label not found", "proof_status": "inferred", "recommended_next_step": "focused icon-local search if new role surface appears"},
    {"area": "schedule popup coverage", "gap": "not every family has clean popup linkage", "proof_status": "structurally_observed", "recommended_next_step": "subset-focused hardening only"},
    {"area": "cashbox domain", "gap": "full source closure absent", "proof_status": "not_proven", "recommended_next_step": "only if finance blocker requires it"},
    {"area": "RPT_21", "gap": "hidden statement family", "proof_status": "not_proven", "recommended_next_step": "narrow source access or hidden family probe"},
    {"area": "RPT_24", "gap": "xray performer key", "proof_status": "not_proven", "recommended_next_step": "prove row-level key or freeze heuristic with warning"},
    {"area": "RPT_4", "gap": "residual replay semantics", "proof_status": "not_proven", "recommended_next_step": "keep narrow residual set only"},
    {"area": "patient universe", "gap": "full CRM-wide patient source for some schedule-derived campaigns", "proof_status": "not_proven", "recommended_next_step": "find stronger global patient source if business case requires it"},
]


playbooks_md = """# DentalPRO Reusable Playbooks

## 1. Single Report Live Pass
- use `run_targeted_report_pass.ts`
- inputs: report id/code/date
- outputs: runtime/export/file/verdict artifacts
- use only family-aware compare path

## 2. Schedule Ticket Extraction
- open `/visits/schedule/index?date=YYYY-MM-DD`
- resolve `#task-record-<visit_id>`
- enumerate `.task-icons i`
- probe exact icon by React `onMouseEnter`
- capture only live `.rc-tooltip`

## 3. Patient Cashbox Document Model
- open patient cashbox tab by URL
- enumerate detail links
- open each detail page
- separate row-grain totals from shared payment block
- preserve `act_reference`

## 4. Doctor Roster With Optional Financial Enrichment
- roster from `z/doctor/all + mobile/schedule`
- financial enrichment from `RPT_24`
- join on patient-day-doctor
- keep visit-level cash claims out

## 5. Delta Continuation Pass
- start from baseline artifacts
- do not rerun broad screen/report
- close only named gaps
- write v2/v3/v5 artifacts, never silently overwrite baseline
"""


def build_master_md():
    lines = ["# DentalPRO Verified Capability Master Map", ""]
    lines += ["## PART 1. Executive Summary", ""]
    rows = [
        {"Area": "schedule runtime", "What we can get": "day schedule entities and normalized visit roster", "Proof status": "proven", "Readiness": "ready", "Notes": "HTML-first runtime source"},
        {"Area": "schedule tickets", "What we can get": "ticket tooltips and proof-aware semantics", "Proof status": "proven", "Readiness": "ready_with_limits", "Notes": "schi-10 inferred only"},
        {"Area": "patient schedule report", "What we can get": "patient-ready visit workbook", "Proof status": "artifact_proven", "Readiness": "ready_with_limits", "Notes": "cash separate"},
        {"Area": "patient cashbox", "What we can get": "document model with act_reference", "Proof status": "proven", "Readiness": "ready_with_limits", "Notes": "tested on two patients"},
        {"Area": "reporting families", "What we can get": "family-aware report extraction/comparison", "Proof status": "proven", "Readiness": "ready_with_limits", "Notes": "not every family closed"},
        {"Area": "empty medcards", "What we can get": "internal runtime workflow", "Proof status": "proven", "Readiness": "ready_with_limits", "Notes": "internal browser runtime only"},
        {"Area": "daily manager report", "What we can get": "appointments + payments daily operational pack", "Proof status": "proven", "Readiness": "ready", "Notes": "accepted API slice"},
    ]
    lines.append(md_table(["Area", "What we can get", "Proof status", "Readiness", "Notes"], rows))
    lines += ["", "## PART 2. Verified Data Domains", ""]
    lines.append(md_table(["Domain", "Data we can extract", "Source layer", "Grain", "Proof level", "Readiness"], [
        {"Domain": d["domain"], "Data we can extract": d["data_we_can_extract"], "Source layer": d["source_layer"], "Grain": d["grain"], "Proof level": d["proof_level"], "Readiness": d["readiness"]} for d in data_capabilities
    ]))
    lines += ["", "## PART 3. Verified Methods", ""]
    lines.append(md_table(["Method", "What it does", "Where used", "What it yields", "Proven scope", "Limitations"], [
        {"Method": m["method"], "What it does": m["what_it_does"], "Where used": m["where_used"], "What it yields": m["what_it_yields"], "Proven scope": m["proven_scope"], "Limitations": m["limitations"]} for m in methods
    ]))
    lines += ["", "## PART 4. Verified Algorithms and Workflows", ""]
    lines.append(md_table(["Algorithm / Workflow", "Steps", "Inputs", "Outputs", "Domains", "Reusability", "Notes"], [
        {"Algorithm / Workflow": a["algorithm"], "Steps": a["steps"], "Inputs": a["inputs"], "Outputs": a["outputs"], "Domains": a["domains"], "Reusability": a["reusability"], "Notes": a["notes"]} for a in algorithms
    ]))
    lines += ["", "## PART 5. Verified Scripts", ""]
    lines.append(md_table(["Script", "Purpose", "Domain", "Inputs", "Outputs", "Status", "Notes"], [
        {"Script": s["path"], "Purpose": s["purpose"], "Domain": s["domain"], "Inputs": s["inputs"], "Outputs": s["outputs"], "Status": s["superseded_or_current"], "Notes": s["limitations"]} for s in scripts
    ]))
    lines += ["", "## PART 6. Verified Artifacts", ""]
    lines.append(md_table(["Artifact", "Domain", "What is proven there", "Current role", "Notes"], [
        {"Artifact": a["path"], "Domain": a["domain"], "What is proven there": a["what_is_proven_there"], "Current role": a["current_role"], "Notes": a["notes"]} for a in artifacts
    ]))
    lines += ["", "## PART 7. Verified Reports and Reporting Paths", ""]
    lines.append(md_table(["Report / Family / Path", "What is known", "Status", "Readiness", "Notes"], [
        {"Report / Family / Path": r["report_or_family_or_path"], "What is known": r["what_is_known"], "Status": r["status"], "Readiness": r["readiness"], "Notes": r["notes"]} for r in reports
    ]))
    lines += ["", "## PART 8. Skills / Techniques / Tooling We Already Use", ""]
    lines.append(md_table(["Skill / Technique", "What this skill does", "Practical use in project", "Evidence base", "Current value"], [
        {"Skill / Technique": s["skill_name"], "What this skill does": s["what_this_skill_does"], "Practical use in project": s["practical_use"], "Evidence base": s["proof_basis"], "Current value": s["current_value_for_productization"]} for s in skills
    ]))
    lines += ["", "## PART 9. Productization Relevance", ""]
    lines.append(md_table(["Area", "Why it matters for custom reporting layer", "Readiness", "Limits"], [
        {"Area": "schedule runtime", "Why it matters for custom reporting layer": "base roster and ticket-bearing visit source", "Readiness": "ready", "Limits": "HTML-first, transport not fully closed"},
        {"Area": "ticket semantics", "Why it matters for custom reporting layer": "follow-up campaigns and patient qualification", "Readiness": "ready_with_limits", "Limits": "some families inferred"},
        {"Area": "patient cashbox model", "Why it matters for custom reporting layer": "patient financial document reporting", "Readiness": "ready_with_limits", "Limits": "two-patient proof scope"},
        {"Area": "RPT_18/23/33 patterns", "Why it matters for custom reporting layer": "reference compare and normalization patterns", "Readiness": "ready_with_limits", "Limits": "family-specific"},
        {"Area": "doctor roster + RPT_24 enrichment", "Why it matters for custom reporting layer": "doctor operational reports", "Readiness": "ready_with_limits", "Limits": "patient-day enrichment only"},
    ]))
    lines += ["", "## PART 10. Limits, Gaps, and What Is Still Not Proven", ""]
    lines.append(md_table(["Area", "Not proven / gap", "Why not yet proven", "Recommended next step"], [
        {"Area": x["area"], "Not proven / gap": x["gap"], "Why not yet proven": x["proof_status"], "Recommended next step": x["recommended_next_step"]} for x in validation_backlog
    ]))
    lines += ["", "## PART 11. Final Verdict", ""]
    lines.append(md_table(["Area", "Verdict", "Basis", "Safe claim boundary"], [
        {"Area": "schedule", "Verdict": "production-usable runtime source", "Basis": "operational dump + patient/ticket registries", "Safe claim boundary": "HTML-first day state, not universal transport closure"},
        {"Area": "reports", "Verdict": "family-aware productization baseline exists", "Basis": "governed report verdicts", "Safe claim boundary": "family-specific, not all reports closed"},
        {"Area": "cashbox", "Verdict": "patient-level document model usable with limits", "Basis": "patient cashbox models", "Safe claim boundary": "not full cashbox source closure"},
        {"Area": "custom reporting", "Verdict": "operational custom reports already buildable", "Basis": "doctor roster, hygiene lists, manager report", "Safe claim boundary": "stay within proven joins and source boundaries"},
    ]))
    lines += ["", "## Top-20 Proven Data Capabilities", ""]
    for idx, item in enumerate([
        "Schedule day route targeting via `?date=`.",
        "HTML-first extraction of doctors, cabinets, timeslots and visits.",
        "Stable visit ids via `#task-record-<visit_id>`.",
        "Visit->cabinet mapping via doctor/chair cross-map.",
        "Clean patient popup extraction from schedule cards.",
        "Ticket icon ordering per visit.",
        "Live rendered `rc-tooltip` extraction on exact icon node.",
        "Proof-aware ticket dictionary with `proven/inferred/not_proven`.",
        "Patient-ready schedule workbook with full names and phones.",
        "Patient cashbox document model with `act_reference`.",
        "Manager daily report from `mobile/schedule + z/pays`.",
        "Doctor roster extraction by accepted API.",
        "Patient-day financial enrichment via `RPT_24`.",
        "Report universe discovery and route catalog.",
        "Live runtime/export/file report pass.",
        "Parsed XLSX extraction and row-boundary handling.",
        "Grouped-header projection for report parity.",
        "Narrow explicit normalization policies for report comparison.",
        "Empty medcards internal runtime state machine.",
        "Focused hygiene-ticket campaign list generation.",
    ], 1):
        lines.append(f"{idx}. {item}")
    lines += ["", "## Top-20 Working Methods / Algorithms / Scripts", ""]
    for idx, item in enumerate([
        "`explore_crm.js`",
        "`extract_reports.js`",
        "`analyze_report_24_api.js`",
        "`verify_efficiency_report.js`",
        "`analyze_report_4_api.js`",
        "`analyze_report_9_api.js`",
        "`clinic_manager_agent.js`",
        "`run_schedule_forensic_pass.js`",
        "`run_schedule_interaction_probe_v3.js`",
        "`run_schedule_ticket_registry_probe_v1.js`",
        "`run_schedule_ticket_semantic_probe_v2.js`",
        "`build_schedule_ticket_registry_v2.py`",
        "`build_schedule_patient_full_report_v5.py`",
        "`find_patients_old_hygiene_no_followup_live.js`",
        "`run_targeted_report_pass.ts`",
        "`extract_rpt_36_workbook.py`",
        "grouped-header leaf extraction workflow",
        "family-aware report canonicalization workflow",
        "cashbox row/document split by `act_reference`",
        "delta-pass continuation strategy",
    ], 1):
        lines.append(f"{idx}. {item}")
    lines += ["", "## Top-10 Things We Must Not Overpromise", ""]
    for idx, item in enumerate([
        "Global cashbox source closure.",
        "Full CRM-wide patient universe from schedule-derived artifacts.",
        "Popup/detail completeness for every schedule card family.",
        "Direct dedicated API-first source for schedule detail.",
        "Direct doctor->cabinet canonical field beyond cross-map.",
        "Global portability of `schi-10` semantics.",
        "Automatic portability of grouped-header normalization from `RPT_18`.",
        "Automatic portability of first-column normalization from `RPT_23`.",
        "Full closure of `RPT_21` DDS report.",
        "Visit-level cash truth from patient-day or patient-document enrichment.",
    ], 1):
        lines.append(f"{idx}. {item}")
    lines += ["", "## Top-10 Most Valuable Reusable Assets", ""]
    for idx, item in enumerate([
        str(YD / "docs/dentalpro-master-worklog.md"),
        str(YD / "docs/report-api-verification-dossier-2026-03-09.md"),
        str(ART / "schedule_2026-03-10_operational_dump_master.md"),
        str(ART / "schedule_2026-03-10_ticket_registry_v2.json"),
        str(ART / "ticket_dictionary_v2.json"),
        str(ART / "schedule_2026-03-10_patient_full_report_v5.json"),
        str(ART / "patient_cashbox_18910_document_model_2026-03-18.json"),
        str(YD / "artifacts/api/report-24-api-analysis-2026-03-01-2026-03-31.json"),
        str(DPPW / "run_targeted_report_pass.ts"),
        str(ROOT / "scripts/build_schedule_ticket_registry_v2.py"),
    ], 1):
        lines.append(f"{idx}. `{item}`")
    return "\n".join(lines) + "\n"


def build_known_limits_md():
    rows = [
        {"Area": "schedule transport", "Not proven / gap": "dedicated schedule JSON detail source", "Why not yet proven": "page remains practically HTML-first", "Recommended next step": "only if productization requires transport-native source"},
        {"Area": "ticket semantics", "Not proven / gap": "schi-10 direct role label", "Why not yet proven": "tooltip contains person name only", "Recommended next step": "focused runtime probe if new role surface appears"},
        {"Area": "cashbox", "Not proven / gap": "full-clinic source closure", "Why not yet proven": "detail/list shells are HTML-first", "Recommended next step": "keep patient-level model only"},
        {"Area": "RPT_21", "Not proven / gap": "statement source family", "Why not yet proven": "DDS overlap insufficient", "Recommended next step": "narrow hidden statement source access"},
        {"Area": "RPT_24", "Not proven / gap": "xray performer key", "Why not yet proven": "row-level join key absent", "Recommended next step": "prove key or freeze caveat"},
        {"Area": "RPT_4", "Not proven / gap": "residual replay semantics", "Why not yet proven": "patient-resolution and selector residuals", "Recommended next step": "keep narrow residual investigation"},
        {"Area": "patient universe", "Not proven / gap": "global patient list for schedule campaigns", "Why not yet proven": "current proven source is window-bounded schedule", "Recommended next step": "only if business asks for full-clinic completeness"},
    ]
    return "# DentalPRO Known Limits and Gaps\n\n" + md_table(["Area", "Not proven / gap", "Why not yet proven", "Recommended next step"], rows) + "\n"


def main():
    dump(ART / "dentalpro_verified_data_capabilities.json", data_capabilities)
    dump(ART / "dentalpro_verified_methods_registry.json", methods)
    dump(ART / "dentalpro_verified_algorithms_registry.json", algorithms)
    dump(ART / "dentalpro_verified_scripts_registry.json", scripts)
    dump(ART / "dentalpro_verified_artifacts_registry.json", artifacts)
    dump(ART / "dentalpro_verified_reports_registry.json", reports)
    dump(ART / "dentalpro_verified_tooling_and_skills_registry.json", skills)
    dump(ART / "dentalpro_productization_readiness_master.json", readiness)
    dump(ART / "dentalpro_source_of_truth_map.json", source_of_truth_map)
    dump(ART / "dentalpro_superseded_vs_current_map.json", superseded_map)
    dump(ART / "dentalpro_validation_backlog_current.json", validation_backlog)
    (ART / "dentalpro_reusable_playbooks.md").write_text(playbooks_md)
    (ART / "dentalpro_verified_capability_master_map.md").write_text(build_master_md())
    (ART / "dentalpro_known_limits_and_gaps.md").write_text(build_known_limits_md())


if __name__ == "__main__":
    main()
