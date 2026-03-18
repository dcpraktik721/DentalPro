# Patient Dossier Tabs Overview

## 1. Что такое dossier-tab layer в нашем проекте

`Dossier-tab layer` — это patient-card contour вокруг `cbase/detail.html?id=<patient_id>` и связанных patient-linked screens, где важны:

- direct tab URL patterns;
- tab family inventory;
- tab-specific extraction methods;
- current tab outputs и boundary docs;
- safe claim boundary по тому, что уже operationally usable.

Этот слой не равен всему patient domain. Он уже включает:

- patient hub routes;
- cashbox/payments document models;
- insurance/DMS verified boundary;
- medcards registry family;
- xray scope boundary.

Он пока не включает полноценно закрытые payload models для всех tabs вроде `files`, `documents`, `family`, `comments`, `schedule history`, `medical history`.

## 2. Какие tab families уже найдены

Из current source-of-truth assets уже найдены следующие patient-card families:

- `profile/info`
- `comments`
- `files`
- `history of appointments / schedule history`
- `history of visits / medical history`
- `cashbox`
- `bills / payments`
- `DMS / insurance`
- `documents`
- `family`
- `medcards / амбулаторные записи`
- `orthodontic card`
- `xrays`

Основной inventory source:

- [dentalpro-crm-page-observations-2026-03-09.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro-crm-page-observations-2026-03-09.md)

## 3. Какие tab families уже verified

### `artifact_proven`

- `cashbox / payments / bills`
  - через patient cashbox document-model cases:
    - [patient_cashbox_18910_document_model_2026-03-18.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/patient_cashbox_18910_document_model_2026-03-18.json)
    - [patient_cashbox_19095_document_model_2026-03-18.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/patient_cashbox_19095_document_model_2026-03-18.json)
- `DMS / insurance`
  - через verified library и supporting patient-linked JSON:
    - [scope-insurance-verified-library-2026-01-15.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/scope-insurance-verified-library-2026-01-15.md)
    - [insurance-2026-01-15.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/insurance-2026-01-15.json)
- `medcards`
  - через empty-cards registry family:
    - [dentalpro_empty_cards_report_2026_03_16.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro_empty_cards_report_2026_03_16.md)
    - [dentalpro_empty_cards_forensic_disclosure_2026_03_16.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro_empty_cards_forensic_disclosure_2026_03_16.md)
    - [dentalpro_runtime_extraction_empty_cards_2026_03_16.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json)

### `structurally_observed`

- `profile/info`
- `comments`
- `files`
- `documents`
- `family`
- `schedule history`
- `medical history`
- `orthodontic card`

Они зафиксированы как tab families в patient hub inventory, но не закрыты current tab-specific outputs в repo.

### `validation_required`

- `xrays`
  - current boundary is proven, but usable patient xray read model is not closed:
    - [scope-xray-verification-2026-01-15.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/scope-xray-verification-2026-01-15.md)
    - [xray-2026-01-15.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/xray-2026-01-15.json)

## 4. Какие direct route patterns уже доказаны

- patient hub:
  - `cbase/detail.html?id=<patient_id>`
- patient cashbox tab:
  - `cbase/detail.html?id=<patient_id>&tab=cashbox\\cbase\\pays`
- medcards registry contour:
  - `medblock/cards/index`
- xray contour:
  - `xray/Images/index`
- patient universe entry:
  - `cbase/index.html`

Primary route evidence:

- [dentalpro-screen-map-2026-03-09.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro-screen-map-2026-03-09.md)
- [dentalpro-crm-page-observations-2026-03-09.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro-crm-page-observations-2026-03-09.md)

## 5. Какие extraction methods по tabs уже доказаны

- patient hub direct route access by `patient_id`
- patient-linked popup action -> `Информация о пациенте` -> card URL
- direct tab URL access for cashbox tab
- browser-first HTML extraction for cashbox tab
- document-grain normalization for patient cashbox
- browser-first GET form submit for medcards empty-cards registry
- machine-readable row extraction from filtered HTML table
- verified-library boundary method for insurance scope
- verified-library boundary method for xray scope

## 6. Какие dossier outputs уже production-usable

### `ready_with_limits`

- patient cashbox document models
- medcards empty-cards registry artifacts
- insurance patient linkage boundary docs

### `validation_required`

- xray scope boundary assets

Production-usable does not mean complete dossier closure. It means the current repo contains reusable source-of-truth assets for the proven tab families above.

## 7. Какие tab families еще partial / review / validation_required

### `partial`

- `files`
- `documents`
- `family`
- `comments`
- `schedule history`
- `medical history`
- `orthodontic card`

### `review`

- xray mixed mapping docs:
  - `xray-api-mapping-2026-03-08.md`
  - `xray-orthopantomography-api-mapping-2026-03-08.md`
- runtime-heavy dossier finance scripts:
  - `inspect_cashbox_detail.js`
  - `probe_cashbox_payments.js`

### `validation_required`

- xray family as a usable patient read model
- broader medcards beyond the empty-cards registry family

## 8. Как dossier tabs связаны с patient bundle

Current patient bundle in this repo строится не как full tab dump, а как layered package:

- identity and schedule linkage
- patient-ready schedule rows
- patient campaign lists
- patient finance/cashbox document models
- insurance/DMS boundary
- medcards registry slice
- xray boundary

То есть dossier-tab layer сейчас является supporting patient knowledge layer, а не full universal patient bundle.

## 9. Какие current assets в repo являются source-of-truth по dossier tabs

- [patient_dossier_tabs_index.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/patient_dossier_tabs_index.json)
- [dentalpro-crm-page-observations-2026-03-09.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro-crm-page-observations-2026-03-09.md)
- [dentalpro-screen-map-2026-03-09.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro-screen-map-2026-03-09.md)
- [dentalpro_empty_cards_forensic_disclosure_2026_03_16.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro_empty_cards_forensic_disclosure_2026_03_16.md)
- [dentalpro_runtime_extraction_empty_cards_2026_03_16.json](/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json)
- [scope-insurance-verified-library-2026-01-15.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/scope-insurance-verified-library-2026-01-15.md)
- [scope-xray-verification-2026-01-15.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/scope-xray-verification-2026-01-15.md)
- [patient_cashbox_18910_document_model_2026-03-18.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/patient_cashbox_18910_document_model_2026-03-18.json)

## 10. Что еще нужно для полного closure

После Phase 5 уже закрыты route/method packs для remaining tabs, но незакрыты:

1. full write-path closure for comments/files/documents actions;
2. non-empty family relation sample as current curated asset;
3. generalized multi-patient history payload packs;
4. packaging decision for xray mixed mapping docs;
5. packaging decision for runtime-heavy cashbox tab scripts.
