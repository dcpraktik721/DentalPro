# Architecture

## High-level model

Репозиторий строится вокруг browser-first подхода к DentalPRO. Основная модель:

1. runtime capture
2. targeted API-assisted extraction, если она доказана
3. artifact persistence
4. normalization
5. business-ready outputs
6. registries and knowledge consolidation

## Main layers

### Browser-first runtime work

- authenticated browser session
- direct route and tab opening
- DOM harvesting
- hidden attribute inspection
- popup / tooltip clean probes
- network and transport observation

### API-assisted extraction

- используется только там, где accepted path уже доказан
- не подменяет runtime source автоматически
- должен иметь явный proof boundary

### Artifacts

- HTML, JSON, XLSX, Markdown
- baseline / continuation / derived / superseded separation
- reproducible naming

### Normalization

- proof-aware fields
- explicit statuses
- no silent coercion
- narrow normalization rules only

### Excel/report outputs

- forensic tabs separate from management tabs
- source-layer distinction preserved
- quality-control sheet preferred

### Registries

- methods
- artifacts
- scripts
- domains
- status dictionaries

## Proof / readiness model

### Proof

- `proven`
- `artifact_proven`
- `structurally_observed`
- `inferred`
- `not_proven`

### Readiness

- `ready`
- `ready_with_limits`
- `validation_required`
- `blocked`

