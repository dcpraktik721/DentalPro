# Migration Plan

## Purpose

Этот план описывает staged migration из текущих legacy workspaces в новый repo `/Users/macbook15/Downloads/MacAi/DentalPro`.

Главный принцип: ничего не переносить автоматически без ручной ревизии current/superseded состояния.

## Current phase status

`Phase 1` bootstrap — completed.  
`Phase 2` selective migration of current verified assets — completed.
`Phase 3` selective migration of current patient-layer assets — completed.
`Phase 4` selective migration and closure of patient dossier tabs — completed.
`Phase 5` closure of files/documents/family/comments/history tabs — completed.

Current outputs of Phase 2:

- [current_assets_index.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/current_assets_index.md)
- [current_assets_index.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/current_assets_index.json)
- [review_queue.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/review_queue.json)
- [superseded_assets.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/superseded_assets.json)
- [phase2_migration_report.md](/Users/macbook15/Downloads/MacAi/DentalPro/reports/phase2_migration_report.md)

Current outputs of Phase 3:

- [patient_layer_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_layer_overview.md)
- [patient_assets_index.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/patient_assets_index.json)
- [phase3_patient_migration_report.md](/Users/macbook15/Downloads/MacAi/DentalPro/reports/phase3_patient_migration_report.md)

Current outputs of Phase 4:

- [patient_dossier_tabs_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_dossier_tabs_overview.md)
- [patient_dossier_tabs_index.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/patient_dossier_tabs_index.json)
- [phase4_dossier_tabs_migration_report.md](/Users/macbook15/Downloads/MacAi/DentalPro/reports/phase4_dossier_tabs_migration_report.md)

Current outputs of Phase 5:

- [patient_dossier_remaining_tabs_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_dossier_remaining_tabs_overview.md)
- [patient_remaining_tabs_index.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/patient_remaining_tabs_index.json)
- [phase5_remaining_tabs_closure_report.md](/Users/macbook15/Downloads/MacAi/DentalPro/reports/phase5_remaining_tabs_closure_report.md)

## Что переносить в первую очередь

### Priority 1: current knowledge and registries

- consolidated verified capability package
- current architecture maps
- current reporting registries
- current schedule/ticket dictionaries

### Priority 2: current production-safe scripts

- scripts, которые:
  - имеют ясный purpose;
  - создают current artifacts;
  - не завязаны на legacy hardcoded assumptions beyond path rewiring.

### Priority 3: curated current artifacts

- current `vN` workbooks and normalized JSON packs
- current governed verdict packs
- current source-of-truth registries

## Что считать baseline

- первые устойчивые forensic passes, которые не должны перезаписываться
- initial operational dumps
- initial governed verdicts, если они остаются reference evidence

## Что считать legacy

- старые рабочие каталоги вне нового repo
- ad hoc scripts без registry entry
- промежуточные tmp/debug files
- narrative notes без связки с artifacts

## Что считать superseded

- `v1`, `v2`, `v3` outputs, которые уже заменены новым current artifact
- scripts, замененные новым builder/probe и больше не являющиеся current entrypoint
- derived bundles, у которых есть более новый current equivalent

## Какие файлы переносить только после ручной ревизии

- любые scripts с hardcoded absolute paths
- любые artifacts без явного current/superseded статуса
- файлы, которые смешивают runtime observation и inferred narrative
- Excel packs без QC и source-layer distinction
- report verdict packs без explicit evidence_reference

## Recommended staged migration

### Stage 1

- перенести current registries и current master docs
- завести initial `current_assets_index`

### Stage 2

- перенести current reusable scripts
- перепривязать path config к новому repo
- статус: completed

### Stage 3

- перенести current normalized outputs and current Excel packs
- отдельно отметить forensic-only и superseded assets
- статус: completed for patient-layer current assets, broader mixed dossier/xray assets still in review

### Stage 4

- провести dossier-tab inventory and selective migration
- закрыть route/tab family map внутри нового repo
- обновить registries и patient docs
- статус: completed

## Phase 2 migration outcome

Уже migrated now:

- current knowledge package
- current schedule/ticket/patient/finance/reporting artifacts
- current reusable scripts, которые признаны production-safe enough

Вынесено в review queue:

- scripts с version drift или внешними runtime dependencies
- partial baseline artifacts, которые полезны, но не являются current daily asset
- finance/detail assets, требующие ручной оценки placement

Оставлено в superseded:

- `ticket_registry_v1`
- `popup_linkage_v2`
- `patient_full_report_v4`
- initial hygiene no-followup outputs before `v2`

## Safe migration rules

- не переносить файлы пакетно без ревизии
- не перезаписывать baseline artifacts
- сохранять lineage `old path -> new path -> status`
- если есть сомнение, оставить asset в legacy и зафиксировать как pending review

## Next migration step

Следующий логичный этап — `Phase 5A / review and write-path closure`:

1. разобрать `review_queue.json` по raw fixtures remaining tabs;
2. решить, нужен ли перенос precursor Track B evidence;
3. при необходимости live-validate write paths for document create / file modal search / comments edit;
4. наполнить `methods_registry.json` current method entries instead of bootstrap template;
5. решить, нужен ли generalized multi-patient dossier bundle beyond the current verified sample cases.
