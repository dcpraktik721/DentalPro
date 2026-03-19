# current_assets_index normalization report

## Audit
- entries_total: 183
- shapes_before: 6
  - 124 :: `asset_id|asset_type|domain|lifecycle|migration_decision|notes|proof_status|readiness|reason|repo_path|source_path|title`
  - 14 :: `asset_id|asset_type|domain|lifecycle|migration_decision|notes|proof_status|readiness|reason|source_path|title`
  - 14 :: `created|path|type`
  - 12 :: `created|date|path|type`
  - 10 :: `asset_id|asset_type|domain|lifecycle|migration_decision|notes|patient_subdomain|proof_status|readiness|reason|repo_path|source_of_truth_role|source_path|title`
  - 9 :: `asset_id|asset_type|domain|lifecycle|migration_decision|notes|patient_subdomain|proof_status|readiness|reason|source_of_truth_role|source_path|title`
- shapes_after: 1
  - 183 :: `asset_id|asset_type|domain|indexed_created|lifecycle|migration_decision|notes|patient_subdomain|proof_status|readiness|reason|record_date|repo_path|source_of_truth_role|source_path|title`

## Canonical schema
- `asset_id`
- `title`
- `source_path`
- `repo_path`
- `asset_type`
- `domain`
- `proof_status`
- `readiness`
- `lifecycle`
- `migration_decision`
- `reason`
- `notes`
- `patient_subdomain`
- `source_of_truth_role`
- `record_date`
- `indexed_created`

## Migration rules applied
- existing canonical entries were preserved and expanded only with null/empty canonical fields where absent
- legacy `path/type/date/created` entries were converted into full asset records
- `repo_path` was derived from legacy `path` or repo-local `source_path` where possible
- external review/superseded entries without repo residency now carry `repo_path = null` explicitly
- no Stage 1 evidence package content was modified; only the index schema was normalized

## Validation
- json_parse: passed
- non_null_repo_path_count: 160
- repo_path_missing_count: 23
- repo_path_existence_check: passed
- legacy_or_external_entries_normalized: 49

## Boundary
- no live runs
- no methods_registry changes
- no auth policy changes
- no Stage 1 evidence content changes
