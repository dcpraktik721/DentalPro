# Patient Dossier Remaining Tabs Overview

## 1. Какие dossier families закрываются в Phase 5

Phase 5 закрывает оставшиеся patient dossier families:

- `files`
- `documents`
- `family`
- `comments`
- `schedule_history`
- `medical_history`

Closure here means:

- route pattern is explicit;
- extraction method is explicit;
- at least one current curated source-of-truth asset is in the repo;
- safe claim boundary is explicit.

It does not mean every write path or every patient-wide payload is globally closed.

## 2. Files tab: что уже доказано

### Proven / artifact_proven

- Direct tab route:
  - `cbase/detail.html?id=<client_id>&tab=addons%5Cfiles%5Cmodels%5Ccbase`
- Server-rendered file list is parseable directly from HTML.
- Stable download/preview paths:
  - `/files/form/download?fileID=<file_id>&filename=<filename>`
  - `/files/form/text?id=<file_id>&filename=<filename>`
- Verified secondary modal routes:
  - `/files/collection/find?collectionID=<collection_id>`
  - `/files/form/upload?collectionID=<collection_id>&clientID=<client_id>`
  - `/files/form/createFolder?collectionID=<collection_id>&clientID=<client_id>`

Primary current assets:

- [files_and_documents.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/files_and_documents.json)
- [Task_Graph_Blueprint_Ultimate_Patient_Dossier.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/Task_Graph_Blueprint_Ultimate_Patient_Dossier.md)
- [patient_dossier_live_15900_2026-03-14.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/patient_dossier_live_15900_2026-03-14.json)

### Limits

- Search submit inside file modal remains `requires_live_validation`.
- Repo currently stores a sample patient bundle, not a generalized files-tab dataset across many patients.

## 3. Documents tab: что уже доказано

### Proven / artifact_proven

- Direct tab route:
  - `cbase/detail.html?id=<client_id>&tab=addons%5Cdocstorage%5Cmodels%5CdocstorageCbaseTab`
- Server-rendered documents table is parseable directly from HTML.
- Direct document download path:
  - `/docstorage/pages/get_doc_file?id=<doc_id>`
- Create-doc form bootstrap GET path:
  - `/docstorage/forms/create_doc?...party2_person_id=<client_id>`

Primary current assets:

- [files_and_documents.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/files_and_documents.json)
- [documents_state_machine.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/documents_state_machine.md)
- [patient_dossier_live_15900_2026-03-14.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/patient_dossier_live_15900_2026-03-14.json)

### Limits

- `POST /docstorage/forms/create_doc` still requires live validation.
- Read/download is current and usable. Generate/write is not promoted to ready.

## 4. Family tab: что уже доказано

### Artifact_proven

- Direct tab route:
  - `cbase/detail.html?id=<client_id>&tab=addons%5Cfamily%5Cmodels%5CfamilyCbaseTab`
- Empty-state detection is explicit:
  - `Нет данных о семье пациента.`
- Family tab belongs to the verified patient hub inventory.

Primary current assets:

- [base_profile_and_tabs.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/base_profile_and_tabs.json)
- [Task_Graph_Blueprint_Ultimate_Patient_Dossier.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/Task_Graph_Blueprint_Ultimate_Patient_Dossier.md)
- [patient_dossier_live_15900_2026-03-14.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/patient_dossier_live_15900_2026-03-14.json)

### Limits

- Current repo has empty-state proof and route/mechanics proof.
- Non-empty family relation rows are not yet represented by a current curated sample asset.

## 5. Comments tab: что уже доказано

### Artifact_proven

- Comments are not a separate `&tab=` page in the verified case.
- Comments live inside the base patient profile DOM under:
  - `#client-comments`
- No separate GET for comments pane is required in the verified current flow.
- Comment rows and author metadata are extractable from rendered HTML.

Primary current assets:

- [base_profile_and_tabs.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/base_profile_and_tabs.json)
- [Task_Graph_Blueprint_Ultimate_Patient_Dossier.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/Task_Graph_Blueprint_Ultimate_Patient_Dossier.md)
- [patient_dossier_live_15900_2026-03-14.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/patient_dossier_live_15900_2026-03-14.json)

### Limits

- Current closure is read-path only.
- Comment write/edit flows are not closed here.

## 6. Schedule history tab: что уже доказано

### Artifact_proven

- Direct tab route:
  - `cbase/detail.html?id=<client_id>&tab=schedule2%5Ccbase%5Chistory`
- Server-rendered schedule-history grid is parseable directly from HTML.
- Safe ready-state:
  - table with headers `Тип записи` and `Квитанция`

Primary current assets:

- [base_profile_and_tabs.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/base_profile_and_tabs.json)
- [Task_Graph_Blueprint_Ultimate_Patient_Dossier.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/Task_Graph_Blueprint_Ultimate_Patient_Dossier.md)
- [patient_dossier_live_15900_2026-03-14.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/patient_dossier_live_15900_2026-03-14.json)

### Limits

- Current repo contains a sample dataset and method closure, not a generalized multi-patient history extractor pack.

## 7. Medical history tab: что уже доказано

### Artifact_proven

- Direct tab route:
  - `cbase/detail.html?id=<client_id>&tab=medical%5Ccbase%5Chistory`
- Server-rendered medical-history grid is parseable directly from HTML.
- Safe ready-state:
  - table with headers `Прием` and `Решение`

Primary current assets:

- [base_profile_and_tabs.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/base_profile_and_tabs.json)
- [Task_Graph_Blueprint_Ultimate_Patient_Dossier.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/Task_Graph_Blueprint_Ultimate_Patient_Dossier.md)

### Limits

- Current sample bundle stores only `medical_history_count`, not a full normalized row pack.
- Full payload closure for medical-history rows is still `ready_with_limits`, not fully generalized.

## 8. Какие route patterns уже verified

- base profile:
  - `cbase/detail.html?id=<client_id>`
- comments pane:
  - `#client-comments` inside base profile
- files:
  - `cbase/detail.html?id=<client_id>&tab=addons%5Cfiles%5Cmodels%5Ccbase`
- documents:
  - `cbase/detail.html?id=<client_id>&tab=addons%5Cdocstorage%5Cmodels%5CdocstorageCbaseTab`
- family:
  - `cbase/detail.html?id=<client_id>&tab=addons%5Cfamily%5Cmodels%5CfamilyCbaseTab`
- schedule history:
  - `cbase/detail.html?id=<client_id>&tab=schedule2%5Ccbase%5Chistory`
- medical history:
  - `cbase/detail.html?id=<client_id>&tab=medical%5Ccbase%5Chistory`

## 9. Какие extraction methods уже verified

- browser-first direct patient hub open by `client_id`
- base profile accordion DOM extraction
- comments extraction from `#client-comments`
- files/documents direct tab GET and server-rendered list extraction
- history table extraction via header-based table discovery
- family tab extraction via relation rows or explicit empty-state marker
- proof-aware dossier bundle packaging

## 10. Какие outputs уже production-usable

### `ready_with_limits`

- [patient_dossier_live_15900_2026-03-14.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/patient_dossier_live_15900_2026-03-14.json)
- [base_profile_and_tabs.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/base_profile_and_tabs.json)
- [files_and_documents.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/files_and_documents.json)
- [documents_state_machine.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/documents_state_machine.md)

## 11. Какие families еще partial / review / validation_required

### `ready_with_limits`

- `files`
- `documents`
- `comments`
- `schedule_history`
- `medical_history`

### `validation_required`

- documents create/submit flow
- file modal search submit flow
- non-empty family relation samples
- generalized multi-patient history payload pack

### `review_only`

- raw HTML fixtures for all remaining tabs
- precursor Track B extension evidence

## 12. Какие current assets now are source-of-truth for these tabs

- [patient_remaining_tabs_index.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/patient_remaining_tabs_index.json)
- [Task_Graph_Blueprint_Ultimate_Patient_Dossier.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/Task_Graph_Blueprint_Ultimate_Patient_Dossier.md)
- [patient_dossier_live_15900_2026-03-14.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/patient_dossier_live_15900_2026-03-14.json)
- [base_profile_and_tabs.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/base_profile_and_tabs.json)
- [files_and_documents.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/files_and_documents.json)
- [documents_state_machine.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/documents_state_machine.md)

## 13. Что еще остается незакрытым после Phase 5

1. Full write-path closure for comments/documents/files actions.
2. Non-empty family relation sample in current curated repo.
3. A generalized medical-history row pack, not only a count/sample bundle.
4. Migration decision for raw fixtures and precursor evidence in review queue.
