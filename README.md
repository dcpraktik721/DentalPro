# DentalPro Workspace

## 1. Что это за репозиторий

Это локальный рабочий репозиторий для инженерной работы с DentalPRO: browser-first runtime probes, API-assisted extraction, normalizations, Excel packs, report analysis, forensic artifacts и knowledge consolidation.

Репозиторий задуман как основной чистый workspace. Он не содержит автоматической миграции legacy-файлов из других каталогов. Перенос существующих материалов должен идти по staged migration plan, чтобы не смешивать current, baseline и superseded assets.

## 2. Главная цель проекта

Цель репозитория — дать один воспроизводимый корневой каталог, где можно:

- проводить live browser probes и runtime extraction;
- разбирать расписание, пациентов, тикеты, отчеты и финансовые сущности;
- хранить артефакты и нормализованные данные без потери proof boundary;
- собирать Excel/JSON/Markdown пакеты для forensic review и productization;
- вести registries по методам, скриптам, артефактам и доменам;
- постепенно консолидировать DentalPRO knowledge base в одном месте.

## 3. Какие домены DentalPRO здесь исследуются

Минимальный рабочий охват репозитория:

- patient layer
- schedule / visits / day schedule
- ticket layer
- reporting / exports / parity / families
- finance / cash / bills / payments
- runtime / hidden DOM / popup / tooltip layers
- normalization / proof-aware schemas
- Excel packs / management views

## 4. Как устроена структура папок

- `docs/` — инженерные документы, operating rules, architecture, migration plan, repo map.
- `artifacts/` — Markdown/JSON/HTML forensic outputs, master reports, dumps, registries snapshots.
- `scripts/` — Python/Node utility scripts, builders, probes, validators, only after conscious migration or creation.
- `logs/` — временные runtime logs, trace notes, debug outputs.
- `registry/` — machine-readable registries: methods, artifacts, scripts, domains, status dictionaries.
- `data/raw/` — исходные выгрузки и неизмененные data slices.
- `data/normalized/` — proof-aware normalized JSON/CSV datasets.
- `data/exports/` — downloaded exports, async report files, XLSX/CSV source files.
- `excel/` — curated final Excel workbooks and management packs.
- `reports/` — report-family outputs, governed verdict packs, report-specific bundles.
- `schedule/` — schedule-specific artifacts and normalized schedule packs.
- `patients/` — patient dossiers, identity probes, patient-level bundles.
- `tickets/` — ticket registries, semantic closure packs, tooltip dictionaries.
- `reporting/` — reporting family maps, report mechanics, reproducibility and parity files.
- `finance/` — cashbox / payment / bill / financial reconciliation outputs.
- `runtime/` — DOM/runtime/network captures and operational dumps.
- `tools/` — helper tooling not tied to a single domain.
- `config/` — project settings and path configuration.

## 5. Какие типы данных здесь хранятся

- live runtime observations
- saved HTML / DOM / hidden-attribute dumps
- normalized JSON datasets
- Excel workbooks
- Markdown forensic disclosures
- report verdict packs
- method and artifact registries
- migration and validation backlog documents

## 6. Какие workflows предполагаются

### Patient extraction

- direct patient route or patient-linked popup
- patient identity proof
- card tab analysis
- patient-ready normalized outputs

### Schedule extraction

- open day schedule by exact date
- extract doctors, cabinets, timeslots, visits
- normalize task rows into proof-aware schema

### Ticket probing

- find icon nodes on visit card
- open exact icon handler
- capture live rendered `rc-tooltip`
- normalize ticket category with proof level

### Reporting analysis

- identify report route and report family
- run date-constrained live pass
- capture runtime/export/file artifacts
- issue governed verdict

### Export analysis

- detect direct vs async export
- persist files
- parse XLSX/CSV
- compare runtime vs export with explicit guardrails

### Normalization

- separate proven / artifact_proven / structurally_observed / inferred / not_proven
- document narrow normalization rules explicitly
- never use destructive normalization without evidence

### Excel/report generation

- build business-ready workbook from normalized data
- keep forensic tabs separate from management tabs
- preserve source layer and proof level

## 7. Какие статусы proof использовать

- `proven` — доказано live extraction или exact runtime/UI/network behavior.
- `artifact_proven` — доказано существующим сохраненным артефактом или governed pack.
- `structurally_observed` — структура наблюдается, но семантика не закрыта.
- `inferred` — рабочая гипотеза или ограниченный semantic interpretation.
- `not_proven` — доказательства недостаточны, capability нельзя поднимать.

## 8. Какие readiness использовать

- `ready` — production-usable в текущем scope.
- `ready_with_limits` — usable, но границы применимости надо сохранять.
- `validation_required` — нужны дополнительные targeted passes или reconciliation.
- `blocked` — текущими источниками/методами не закрывается.

## 9. Как запускать Python scripts

Базовый паттерн:

```bash
python3 /absolute/path/to/script.py
```

Рекомендуемый подход:

1. настраивать `.env` по `.env.example`;
2. использовать абсолютные пути в artifacts;
3. сохранять outputs в доменную папку или в `artifacts/` с понятным naming.

## 10. Как запускать Node scripts

Базовый паттерн:

```bash
node /absolute/path/to/script.js
```

Если проект позже получит зависимости:

```bash
npm install
npm run run:example
```

## 11. Где хранить артефакты

- forensic Markdown/JSON/HTML: `artifacts/`
- domain-specific artifacts, если они уже curated: `schedule/`, `patients/`, `tickets/`, `reporting/`, `finance/`
- если есть сомнение, сохранять в `artifacts/`, а потом раскладывать после ревизии

## 12. Где хранить Excel

- итоговые Excel workbooks: `excel/`
- временные или промежуточные export files: `data/exports/`
- если workbook является частью report bundle, можно дублировать в `reports/` через derived pack, но source export оставлять в `data/exports/`

## 13. Где хранить нормализованные JSON

- reusable normalized datasets: `data/normalized/`
- domain-specific normalized outputs можно дополнительно зеркалить в соответствующий каталог (`schedule/`, `patients/`, `tickets/`), если это curated bundle

## 14. Как именовать новые artifacts и reports

Базовый naming policy:

- дата в ISO: `YYYY-MM-DD`
- domain prefix: `schedule_`, `patient_`, `ticket_`, `rpt_`, `cashbox_`, `finance_`
- затем конкретный scope и версия

Примеры:

- `schedule_2026-03-10_operational_dump_master.md`
- `RPT_23_final_governed_verdict_2026-03-11.json`
- `patient_cashbox_18910_document_model_2026-03-18.xlsx`
- `ticket_registry_v2.json`

## 15. Как не смешивать baseline, continuation, derived и superseded artifacts

- `baseline` — первый устойчивый проход, который нельзя silently overwrite.
- `continuation` — targeted continuation pass, уточняющий gap.
- `derived` — производный workbook/report/dictionary на основе baseline + continuation.
- `superseded` — старый artifact, замененный новым, но сохраняемый для traceability.

Правило:

- никогда не перезаписывать baseline молча;
- если есть новая версия, выпускать `v2`, `v3`, `v4`, `v5`;
- связь current vs superseded фиксировать в registry или migration docs.

## 16. Как вести knowledge consolidation

- каждый стабильный вывод должен опираться на artifact path или live method;
- registries должны отражать current и superseded state;
- knowledge pack не должен превращаться в narrative summary;
- в docs фиксируются safe claim boundaries и known limits;
- major domain changes требуют обновления `docs/verified_capabilities.md` и relevant registries.

## 17. Какие правила честности использовать

- не выдавать `inferred` за `proven`;
- не терять limits при переходе к business-ready workbook;
- не смешивать live-proof и structural observation;
- не поднимать capability до global, если доказан только narrow scope;
- не переносить narrow normalization policy на другие families без нового evidence;
- не считать row-count parity достаточным доказательством content parity.

## 18. Следующие рекомендуемые шаги по развитию репозитория

1. Мигрировать current registries и current production-safe scripts по staged migration plan.
2. Создать `registry/current_assets_index.json` после первой ручной ревизии.
3. Вынести reusable schedule/ticket/report builders в этот repo.
4. Добавить smoke-check scripts для path validation и naming compliance.
5. Синхронизировать new repo с master knowledge package как новым source-of-truth workspace.
