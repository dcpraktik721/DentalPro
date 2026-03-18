# Repo Current State Master

## 1. Repo overall status

- Repo status: strongly verified operating repository with explicit limits.
- Verification model: current artifact evidence wins over older summaries and inferred narrative.
- Current strongest validated schedule dates:
  - `2026-02-15`
  - `2026-02-16`
  - `2026-03-10`
- Current repo posture:
  - read-path layers are broadly curated
  - subset-sensitive interaction layers remain explicitly limited
  - auth is usable locally but not self-bootstrapping
  - February cash closure is partial and externally dependent

## 2. Proven domains

### Schedule

- Proven:
  - date-targeted day schedule open by `?date=YYYY-MM-DD`
  - HTML-first row extraction
  - doctor/day structure
  - popup-based patient identity extraction
  - subset popup linkage
- Primary assets:
  - [schedule_2026-03-10_patient_full_report_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-03-10_patient_full_report_v5.json)
  - [schedule_2026-03-10_operational_dump_master.md](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-03-10_operational_dump_master.md)
  - [schedule_2026-02-15_validation_summary.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-02-15_validation_summary.json)
  - [schedule_2026-02-16_validation_summary.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-02-16_validation_summary.json)

### Tickets

- Proven:
  - icon-node extraction
  - live `rc-tooltip` extraction
  - normalized ticket dictionary
- Primary assets:
  - [schedule_2026-03-10_ticket_registry_v2.json](/Users/macbook15/Downloads/MacAi/DentalPro/tickets/schedule_2026-03-10_ticket_registry_v2.json)
  - [ticket_dictionary_v2.json](/Users/macbook15/Downloads/MacAi/DentalPro/tickets/ticket_dictionary_v2.json)
  - [schedule_ticket_extraction_algorithm.md](/Users/macbook15/Downloads/MacAi/DentalPro/tickets/schedule_ticket_extraction_algorithm.md)

### Patients / dossier read-path

- Proven:
  - direct patient tab access
  - patient hub route logic
  - selected dossier-tab read extraction
  - schedule-driven patient identity closure on curated slices
- Primary assets:
  - [patient_layer_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_layer_overview.md)
  - [patient_dossier_tabs_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_dossier_tabs_overview.md)
  - [patient_dossier_remaining_tabs_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_dossier_remaining_tabs_overview.md)
  - [ultimate_patient_dossier_live_15900.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/ultimate_patient_dossier_live_15900.json)

### Reporting

- Proven:
  - report universe mapping
  - selected governed report-family verdicts
  - export/file-first report interpretation on curated families
- Primary assets:
  - [report_universe_2026_03_16.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/report_universe_2026_03_16.json)
  - [RPT_18_final_governed_verdict_2026-03-18.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/RPT_18_final_governed_verdict_2026-03-18.json)
  - [RPT_23_final_governed_verdict_2026-03-11.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/RPT_23_final_governed_verdict_2026-03-11.json)
  - [RPT_33_final_governed_verdict_2026-03-15.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/RPT_33_final_governed_verdict_2026-03-15.json)

### Finance

- Proven:
  - patient cashbox document model on curated reference cases
  - schedule cash enrichment at patient-day grain for March baseline
- Primary assets:
  - [patient_cashbox_18910_document_model_2026-03-18.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/patient_cashbox_18910_document_model_2026-03-18.json)
  - [patient_cashbox_19095_document_model_2026-03-18.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/patient_cashbox_19095_document_model_2026-03-18.json)
  - [schedule_2026-03-10_cash_enrichment_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/schedule_2026-03-10_cash_enrichment_v5.json)

## 3. Verified dates and validation slices

| Date | Layer | Current verified scope | Safe boundary |
| --- | --- | --- | --- |
| `2026-02-15` | schedule day validation | full small-day slice for schedule + identity | ticket/cash are limited and must stay day-specific |
| `2026-02-16` | schedule day validation | schedule + ticket metrics + identity subset repro | identity remains subset-based (`40` probed of `67`) |
| `2026-03-10` | baseline forensic day | richest baseline across schedule/tickets/patient-ready workbook/cash | still not a universal all-date claim |

## 4. Methods with current proof level

| Method | Proof level | Readiness | Boundary |
| --- | --- | --- | --- |
| browser-first route access | proven | ready_with_limits | validated on selected routes and dates only |
| storageState auth reuse | proven | ready_with_limits | external local dependency |
| auth refresh via login form | proven | ready_with_limits | local workstation only |
| schedule DOM row extraction | proven | ready | read-path only |
| popup clean click probe | proven | ready_with_limits | subset-sensitive |
| focused `rc-tooltip` extraction | proven | ready_with_limits | tooltip layer only |
| patient info button ID resolution | proven | ready_with_limits | depends on popup/patient-link behavior |
| chair-view cross-map | proven | ready_with_limits | reconciliation method, not canonical source field |
| patient-day cash matching | proven | ready_with_limits | never visit-level |
| Phase 6A cross-date validation | artifact_proven | ready_with_limits | three dates only, not stable |

## 5. Subset-only results

- `2026-02-16` patient identity:
  - total patient rows: `67`
  - probed: `40`
  - popup success: `30`
  - patient IDs resolved: `24`
  - unresolved within probed subset: `16`
  - reproducibility: exact match across repro pass
- popup linkage in schedule remains subset/family-driven, not full-card universal proof
- ticket semantic closure remains limited by `schi-10`

## 6. External dependencies

- External auth state:
  - `/Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright/auth/dentalpro.storage.json`
- Local runtime/browser project used by some legacy-compatible scripts:
  - `/Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright`
- External February RPT_24 evidence is referenced in one validation artifact and is not internalized into repo as canonical SoT.

## 7. Blockers

- No self-contained auth bootstrap inside repo.
- February cash is not fully closed as in-repo source-of-truth.
- No non-empty family-tab sample that generalizes family-link extraction.
- No generalized multi-patient dossier pack.

## 8. Forbidden overclaims

- Do not call cross-date methods "stable".
- Do not promote `schi-10` above `inferred`.
- Do not call schedule cash enrichment visit-level.
- Do not call auth execution-ready or self-bootstrapping.
- Do not call `2026-02-16` patient identity full-day closed.

## 9. What is not yet closed

- write flows across patient dossier tabs
- generalized dossier packaging across many patients
- non-empty family relation case
- February cash closure as fully internalized repo evidence
- broader cross-date validation beyond the three verified dates

## 10. Current runtime closure note

- `2026-02-16` identity result is now locked as:
  - subset-based
  - reproducible
  - `24/40` resolved
- February cash result is now locked as:
  - March baseline closed at patient-day grain
  - February partial only
  - not fully internalized as repo SoT
