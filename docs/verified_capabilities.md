# Verified Capabilities

Этот документ описывает только текущие capability claims, которые выдерживают проверку по артефактам внутри repo.

## Schedule

- proven baseline:
  - [schedule_2026-03-10_patient_full_report_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-03-10_patient_full_report_v5.json)
  - [schedule_2026-03-10_operational_dump_master.md](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-03-10_operational_dump_master.md)
- cross-date validated slices:
  - [schedule_2026-02-15_validation_summary.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-02-15_validation_summary.json)
  - [schedule_2026-02-16_validation_summary.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-02-16_validation_summary.json)
  - [cross_date_validation_matrix.json](/Users/macbook15/Downloads/MacAi/DentalPro/reports/cross_date_validation_matrix.json)
- safe boundary:
  - validated on three dates
  - not stable
  - popup linkage remains subset-sensitive

## Tickets

- canonical SoT:
  - [schedule_2026-03-10_ticket_registry_v2.json](/Users/macbook15/Downloads/MacAi/DentalPro/tickets/schedule_2026-03-10_ticket_registry_v2.json)
  - [ticket_dictionary_v2.json](/Users/macbook15/Downloads/MacAi/DentalPro/tickets/ticket_dictionary_v2.json)
- proven:
  - icon-level extraction
  - live tooltip capture
  - normalized ticket semantics for proven families
- forbidden overclaim:
  - `schi-10` must stay `inferred`

## Patients

- canonical SoT:
  - [schedule_2026-03-10_patient_identity_probe_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/schedule_2026-03-10_patient_identity_probe_v5.json)
  - [schedule_2026-02-16_identity_repro_pass.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-02-16_identity_repro_pass.json)
- proven:
  - schedule-driven patient identity closure
  - direct patient tab read access
  - dossier read-path knowledge
- limits:
  - `2026-02-16` identity is subset-based reproducible (`24/40`)
  - no full CRM-wide patient universe claim

## Patient dossier tabs

- canonical SoT:
  - [patient_dossier_tabs_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_dossier_tabs_overview.md)
  - [patient_dossier_remaining_tabs_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_dossier_remaining_tabs_overview.md)
- proven:
  - read-path route logic
  - files/documents/comments/history sample read extraction
- limits:
  - write flows not closed
  - family remains without non-empty generalized sample

## Finance

- canonical SoT:
  - [schedule_2026-03-10_cash_enrichment_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/schedule_2026-03-10_cash_enrichment_v5.json)
  - [patient_cashbox_18910_document_model_2026-03-18.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/patient_cashbox_18910_document_model_2026-03-18.json)
- proven:
  - March baseline patient-day cash enrichment
  - reference-case cashbox document model
- limits:
  - cash is patient-day only
  - February cash is partial / externally dependent

## Reporting

- canonical SoT:
  - [report_universe_2026_03_16.json](/Users/macbook15/Downloads/MacAi/DentalPro/reporting/report_universe_2026_03_16.json)
- proven:
  - curated report family map
  - selected governed verdicts
  - `RPT_9` normalized workbook can be rebuilt from saved repo artifacts without new live run
  - `RPT_3` has a production-safe builder and normalized workbook on the live slice `2026-02-18`
- limits:
  - not every report family is production-closed
  - `RPT_9` workbook keeps `runtime_html` as primary truth and accepted API as supporting layer only
  - `RPT_3` keeps `runtime_html` as primary truth; native export is secondary parity-check only

## Runtime/auth

- canonical SoT:
  - [auth_runtime_readiness.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/auth_runtime_readiness.md)
- proven:
  - local refresh path
  - local smoke-check path
- limits:
  - auth remains `ready_with_limits`
  - repo is not execution-ready
