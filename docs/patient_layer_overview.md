# Patient Layer Overview

## 1. Что уже доказано по patient layer

- `cbase/detail.html?id=<patient_id>` является patient hub и главным межмодульным узлом для patient layer.
- Patient-ready schedule outputs уже дают доказанные `patient_id`, `patient_name_full`, контактные поля и patient-card linkage в текущем scope.
- Patient cashbox tab доказан как отдельный patient-card financial contour с document-level model.
- Insurance/DMS patient linkage имеет отдельный verified API boundary.
- Mobile-client token scope имеет честно зафиксированную границу: patient-specific fields этим токеном не доказаны.

## 2. Как устроен patient access path

1. Patient master list: `/cbase/index.html`.
2. Patient hub: `/cbase/detail.html?id=<patient_id>`.
3. Patient-linked planner: `/visits/pages/edit?id=<patient_id>`.
4. Patient-linked finance: `/cbase/detail.html?id=<patient_id>&tab=cashbox\cbase\pays`.
5. Patient identity in schedule flow может закрываться через popup action `Информация о пациенте` -> `cbase/detail.html?id=<patient_id>`.

## 3. Что уже умеем получать из patient card

- patient_id and direct patient card URL in current proven flows;
- patient-linked cashbox document rows and act-level grouping;
- patient-to-insurance company linkage via verified insurance methods;
- patient-to-appointment routing mechanics and scheduling form inputs;
- patient-ready schedule bundles and campaign lists derived from verified runtime/API slices.

## 4. Какие tab families уже verified

- patient hub itself: `cbase/detail`;
- patient cashbox tab: verified as backend-rendered HTML finance list;
- insurance/DMS linkage proven at API boundary and represented in repo;
- medcards empty-cards registry family proven as current browser-first HTML extraction slice;
- xray scope represented as verified boundary, not as closed read-model.
- files/documents/family/comments/schedule history/medical history now represented through current dossier blueprint and supporting method packs.

Полная dossier-tab карта теперь вынесена в:

- [patient_dossier_tabs_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_dossier_tabs_overview.md)
- [patient_dossier_tabs_index.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/patient_dossier_tabs_index.json)
- [patient_dossier_remaining_tabs_overview.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/patient_dossier_remaining_tabs_overview.md)
- [patient_remaining_tabs_index.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/patient_remaining_tabs_index.json)

## 5. Какие patient outputs уже production-usable

- [schedule_2026-03-10_patient_full_report_v5.xlsx](/Users/macbook15/Downloads/MacAi/DentalPro/excel/schedule_2026-03-10_patient_full_report_v5.xlsx)
- [patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18_v2.xlsx](/Users/macbook15/Downloads/MacAi/DentalPro/excel/patients_old_hygiene_no_followup_live_2025-10-10_to_2026-03-18_v2.xlsx)
- [patient_cashbox_18910_document_model_2026-03-18.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/patient_cashbox_18910_document_model_2026-03-18.json)

## 6. Какие методы применяются

- `client_id discovery`: schedule popup action -> patient info route, `i/client`, `mobile/client/getByID`;
- `token discovery / boundary`: verified mobile-client scope doc and JSON;
- `direct tab access`: `cbase/detail.html?id=<patient_id>&tab=...`;
- `DOM extraction`: patient-card cashbox tab and linked runtime screens;
- `bundle normalization`: patient-ready v5 workbook/JSON builder;
- `artifact packaging`: JSON + XLSX + Markdown disclosures under explicit proof/readiness model.

## 7. Где limits

- partial patient coverage: no global CRM-wide patient universe claim;
- token/runtime boundaries: mobile-client scope does not itself prove patient-specific files/media/rentgens;
- tab-specific limits: remaining dossier tabs now have current route/method closure, but several write paths and some non-empty payload variants are still limited;
- xray boundary is now curated, but payload-level xray read model is still not closed;
- fields not globally proven: broader medcard/xray/document payload fields remain outside current patient package.

## 8. Какие patient assets сейчас source-of-truth в новом repo

- [patient_assets_index.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/patient_assets_index.json)
- [patient_dossier_tabs_index.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/patient_dossier_tabs_index.json)
- [schedule_2026-03-10_patient_identity_probe_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/schedule_2026-03-10_patient_identity_probe_v5.json)
- [schedule_2026-03-10_patient_full_report_v5.json](/Users/macbook15/Downloads/MacAi/DentalPro/schedule/schedule_2026-03-10_patient_full_report_v5.json)
- [patient_cashbox_18910_document_model_2026-03-18.json](/Users/macbook15/Downloads/MacAi/DentalPro/finance/patient_cashbox_18910_document_model_2026-03-18.json)
- [scope-mobile-client-verified-library-2026-01-15.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/scope-mobile-client-verified-library-2026-01-15.md)
- [dentalpro-screen-map-2026-03-09.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro-screen-map-2026-03-09.md)
- [dentalpro_empty_cards_forensic_disclosure_2026_03_16.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/dentalpro_empty_cards_forensic_disclosure_2026_03_16.md)
- [Task_Graph_Blueprint_Ultimate_Patient_Dossier.md](/Users/macbook15/Downloads/MacAi/DentalPro/docs/Task_Graph_Blueprint_Ultimate_Patient_Dossier.md)
- [ultimate_patient_dossier_live_15900.json](/Users/macbook15/Downloads/MacAi/DentalPro/patients/ultimate_patient_dossier_live_15900.json)

## 9. Что еще остается в review / validation

- xray mixed mapping docs remain in review;
- broader API endpoint tables with patient rows remain mixed and review-only;
- runtime-heavy dossier scripts are useful but not yet cleanly packaged for this repo;
- raw fixtures and write-path cases for `files`, `documents`, `family`, `comments`, `schedule history`, `medical history` remain in review queue.
