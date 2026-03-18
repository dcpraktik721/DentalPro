# DentalPRO Structured Report Catalog

Дата фиксации: `2026-03-09`
Статус документа: `current structured report catalog`

Источник:
- built from previously captured `puppeteer-mcp-server` browser artifact because live puppeteer session was stale in this pass
- primary browser artifact: `artifacts/reports/reports_scan.json`
- architecture registry: `docs/reports-architecture-deep-dive-2026-03-09.md`
- report verification dossier: `docs/report-api-verification-dossier-2026-03-09.md`

## 1. Summary

- Groups: **7**
- Template reports: **41**
- Saved reports: **41**
- Total structured entries: **82**

### Current project status counts

| Status | Count |
| --- | ---: |
| blocked | 1 |
| closed | 1 |
| in progress | 1 |
| not started | 75 |
| partially closed | 4 |

## 2. Group map

| Group | Name | URL |
| --- | --- | --- |
| all | Все отчёты | `https://dcpraktik.dental-pro.online/reports/reports/index?group=all` |
| appointments | Приёмы | `https://dcpraktik.dental-pro.online/reports/reports/index?group=appointments` |
| callcenter | Call-центр | `https://dcpraktik.dental-pro.online/reports/reports/index?group=callcenter` |
| dms | ДМС | `https://dcpraktik.dental-pro.online/reports/reports/index?group=dms` |
| financial | Финансы | `https://dcpraktik.dental-pro.online/reports/reports/index?group=financial` |
| warehouse | Склад | `https://dcpraktik.dental-pro.online/reports/reports/index?group=warehouse` |
| workload | Загруженность | `https://dcpraktik.dental-pro.online/reports/reports/index?group=workload` |

## 3. Template to saved-report relations

| Template code | Saved report | Relation type | Confidence |
| --- | --- | --- | --- |
| efficiency | RPT_18 | exact_name_match | high |
| unpaid_pays | RPT_9 | exact_name_match | high |
| unpaid_pays | RPT_29 | exact_name_match | high |
| mediline_primary_records | RPT_4 | exact_name_match | high |
| cashbox_debts | RPT_3 | exact_name_match | high |
| cashbox_debts | RPT_45 | exact_name_match | high |
| cashbox_dds | RPT_21 | candidate_family_match | medium |
| cashbox_dds | RPT_5 | candidate_family_match | medium |
| cashbox_dds | RPT_33 | candidate_family_match | medium |
| cashbox_income_expenses | RPT_46 | exact_name_match | high |
| cashbox_pays_positions | RPT_39 | exact_name_match | high |
| insurance_attachments | RPT_34 | exact_name_match | high |
| insurance_attachments | RPT_35 | exact_name_match | high |
| market_items | RPT_2 | exact_name_match | high |
| records_registry | RPT_7 | variant_saved_report | medium |
| records_registry | RPT_8 | variant_saved_report | medium |
| schedule_out | RPT_13 | exact_name_match | high |
| doctor_visits | RPT_42 | exact_name_match | high |
| admin_conversion | RPT_40 | exact_name_match | high |
| callcentr_tickets_table | RPT_10 | exact_name_match | high |
| callcentr_tickets_table | RPT_49 | exact_name_match | high |
| callcentr_ratings | RPT_11 | exact_name_match | high |
| callcentr_tickets | RPT_12 | exact_name_match | high |
| callcenter_calls | RPT_25 | exact_name_match | medium |
| appointments_services | RPT_23 | candidate_family_match | medium |
| discounts | RPT_6 | exact_name_match | high |
| warehouse_history | RPT_36 | exact_name_match | high |
| warehouse_history | RPT_38 | exact_name_match | high |
| wage_doctors_updated | RPT_48 | exact_name_match | high |
| pay_debt | RPT_28 | candidate_family_match | medium |

## 4. Active proven / partially proven reports

| Report | Name | Current project status | API mapping status | Current source bundle | Main gap |
| --- | --- | --- | --- | --- | --- |
| RPT_18 | Ключевые показатели эффективности | closed | verified | mobile/owner/efficiency, mobile/schedule | none |
| RPT_21 | ДДС | blocked | blocked | mobile/owner/dds, z/pays, invoice/detail, hidden cashbox statement family | hidden cashbox statement / balance / channel logic |
| RPT_24 | Выручка по отделениям | partially closed | partial | z/pays, mobile/client/getByID, z/doctor/all, insurance/getClients, mobile/schedule | xray performer row-level key remains unproven |
| RPT_29 | Квитанции без оплаты | partially closed | partial | z/pays, invoice/detail, cashbox/forms/detail (server-side history) | missing published updater/reason/history semantics |
| RPT_4 | Первичные пациенты | partially closed | partial | i/client, z/pays, z/visits, z/patients, z/doctor/all, mobile/owner/advSourcesList | hidden backend predicate and incomplete field closure for Филиал/Координатор |
| RPT_45 | Задолженности и авансы | in progress | partial | mobile/client/getByID, invoice/detail, cbase cashbox bills ledger (server-side) | full row-level finance bundle not yet generalized |
| RPT_9 | Квитанции без оплаты | partially closed | partial | z/pays, invoice/detail, cashbox/forms/detail (server-side history) | missing published updater/reason/history semantics |

## 5. Full structured registry

| Report code | Kind | Name | Category | Report type | Related template / saved reports | Candidate sources | Current project status | API mapping status | Main gap | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RPT_1 | saved | Заботливый доктор | all | parameterized generated report | none | z/doctor/all | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_10 | saved | Статистика по тикетам | callcenter | call-center report | callcentr_tickets_table | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_11 | saved | Рейтинг операторов | all | call-center report | callcentr_ratings | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_12 | saved | Тикеты | callcenter | call-center report | callcentr_tickets | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_13 | saved | Удаленные записи | appointments | parameterized generated report | schedule_out | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_14 | saved | Мотивация врачей по дате приема | appointments | appointment report | none | mobile/owner/recordCosts, z/pays, z/doctor/all | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_15 | saved | Мотивация врачей по дате оплаты | all | parameterized generated report | none | mobile/owner/recordCosts, z/pays, z/doctor/all | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_16 | saved | Мотивация VIP-менеджеров по дате приема | appointments | appointment report | none | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_17 | saved | Мотивация VIP-менеджеров по дате оплаты | all | parameterized generated report | none | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_18 | saved | Ключевые показатели эффективности | all | management summary | efficiency | mobile/owner/efficiency, mobile/schedule | closed | verified | none | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md`<br>`docs/report-18-direct-data-api-proof-2026-03-08.md`<br>`docs/report-api-verification-dossier-2026-03-09.md` |
| RPT_19 | saved | Занятость кресел врачами | workload | workload report | none | z/visits, z/doctor/all | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_2 | saved | Проданные товары | warehouse | warehouse report | market_items | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_20 | saved | Занятость кресел пациентами | workload | workload report | none | z/visits | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_21 | saved | ДДС | financial | financial statement | cashbox_dds | z/pays, invoice/detail, mobile/owner/dds | blocked | blocked | hidden cashbox statement / balance / channel logic | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md`<br>`docs/report-api-verification-dossier-2026-03-09.md` |
| RPT_23 | saved | Отчет по выполненным услугам | appointments | parameterized generated report | appointments_services | z/services | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_24 | saved | Выручка по отделениям | financial | management summary | none | z/pays, invoice/detail | partially closed | partial | xray performer row-level key remains unproven | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md`<br>`docs/report-24-api-library-2026-03-08.md`<br>`docs/report-24-march-verifier-2026-03-08.md`<br>`docs/report-api-verification-dossier-2026-03-09.md` |
| RPT_25 | saved | Количество звонков | callcenter | call-center report | callcenter_calls | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_27 | saved | Колл-центр. Тикеты. Отчет по звонкам за текущий год. | callcenter | call-center report | none | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_28 | saved | Задолженности пациентов | financial | management summary | pay_debt | z/pays, invoice/detail | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_29 | saved | Квитанции без оплаты | financial | management summary | unpaid_pays | z/pays, invoice/detail | partially closed | partial | missing published updater/reason/history semantics | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md`<br>`docs/report-29-composite-unpaid-2026.md`<br>`docs/report-api-verification-dossier-2026-03-09.md` |
| RPT_3 | saved | Задолженности и авансы | financial | management summary | cashbox_debts | z/pays, invoice/detail | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_32 | saved | Отчет пациентов, записанных на след день. | all | parameterized generated report | none | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_33 | saved | ДДС пациента | financial | financial statement | cashbox_dds | z/pays, invoice/detail, mobile/owner/dds | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_34 | saved | Количество прикреплений пациентов к страховым | dms | DMS report | insurance_attachments | insurance/* | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_35 | saved | КОЛИЧЕСТВО ПРИКРЕПЛЕНИЙ ПАЦИЕНТОВ К СТРАХОВЫМ | dms | DMS report | insurance_attachments | insurance/* | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_36 | saved | Склад: статистика по документам | warehouse | warehouse report | warehouse_history | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_38 | saved | Склад: статистика по документам | warehouse | warehouse report | warehouse_history | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_39 | saved | Касса: товары и услуги | warehouse | warehouse report | cashbox_pays_positions | z/pays, invoice/detail, z/services | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_4 | saved | Первичные пациенты | appointments | appointment report | mediline_primary_records | z/visits | partially closed | partial | hidden backend predicate and incomplete field closure for Филиал/Координатор | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md`<br>`docs/report-4-api-copy-2026-03-06-2026-03-07.md`<br>`docs/rpt4-selector-probe-2026-03-09.md`<br>`docs/report-api-verification-dossier-2026-03-09.md` |
| RPT_40 | saved | Отчет по конверсии администраторов | callcenter | call-center report | admin_conversion | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_41 | saved | Количественные показатели | all | parameterized generated report | none | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_42 | saved | Статистика посещения врача | all | appointment report | doctor_visits | z/visits, z/doctor/all | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_45 | saved | Задолженности и авансы | financial | management summary | cashbox_debts | z/pays, invoice/detail | in progress | partial | full row-level finance bundle not yet generalized | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md`<br>`docs/report-45-first-row-finance-linkage-2026-03-08.md`<br>`docs/dentalpro-verified-findings-registry.md` |
| RPT_46 | saved | Отчёт по кассе (доходы и расходы) | financial | management summary | cashbox_income_expenses | z/pays, invoice/detail | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_48 | saved | Заработные платы врачей, обновленный | financial | management summary | wage_doctors_updated | mobile/owner/recordCosts, z/pays, z/doctor/all | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_49 | saved | Cтатистика по тикетам | callcenter | call-center report | callcentr_tickets_table | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_5 | saved | Движение денежных средств | financial | financial statement | cashbox_dds | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_6 | saved | Списания/Акции/Скидки | financial | management summary | discounts | z/pays, invoice/detail | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_7 | saved | Работа регистратуры по дате приема | appointments | appointment report | records_registry | z/visits | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_8 | saved | Работа регистратуры по дате записи в расписании | appointments | appointment report | records_registry | z/visits | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| RPT_9 | saved | Квитанции без оплаты | financial | management summary | unpaid_pays | z/pays, invoice/detail | partially closed | partial | missing published updater/reason/history semantics | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md`<br>`docs/report-9-api-feasibility-2026-03-08.md`<br>`docs/report-api-verification-dossier-2026-03-09.md` |
| TPL_admin_conversion | template | Колл-центр: Отчет по конверсии администраторов | callcenter | call-center report | RPT_40 | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_advertising_source | template | Колл-центр: Отчет по рекламным источникам | callcenter | parameterized generated report | none | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_appointments_records | template | Мед.блок: приёмы пациентов | appointments | appointment report | none | z/visits | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_appointments_services | template | Мед.блок: услуги в приёмах | appointments | appointment report | RPT_23 | z/services | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_basic_statistics | template | Базовые показатели статистики | all | parameterized generated report | none | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_callcenter_calls | template | Колл-центр: входящие и исходящие звонки | callcenter | call-center report | RPT_25 | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_callcentr_history | template | Колл-центр: История звонков | callcenter | call-center report | none | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_callcentr_ratings | template | Колл-центр: Рейтинг операторов | callcenter | call-center report | RPT_11 | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_callcentr_tickets | template | Колл-центр: Тикеты | callcenter | call-center report | RPT_12 | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_callcentr_tickets_table | template | Колл-центр: Cтатистика по тикетам | callcenter | call-center report | RPT_10, RPT_49 | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_caredoc_stats | template | Заботливый доктор | all | parameterized generated report | none | z/doctor/all | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_cashbox_dds | template | Касса: движение денежных средств | financial | financial statement | RPT_21, RPT_5, RPT_33 | z/pays, invoice/detail | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_cashbox_debts | template | Задолженности и авансы | financial | management summary | RPT_3, RPT_45 | z/pays, invoice/detail | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_cashbox_income_expenses | template | Отчёт по кассе (доходы и расходы) | financial | management summary | RPT_46 | z/pays, invoice/detail | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_cashbox_pays | template | Касса: платежи | financial | parameterized generated report | none | z/pays, invoice/detail | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_cashbox_pays_positions | template | Касса: товары и услуги | warehouse | warehouse report | RPT_39 | z/pays, invoice/detail, z/services | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_chair_doctors | template | Занятость кресел | workload | workload report | none | z/visits | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_discounts | template | Списания / Акции / Скидки | financial | management summary | RPT_6 | z/pays, invoice/detail | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_doctor_hours | template | Врачи: часы работы | workload | workload report | none | z/doctor/all | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_doctor_visits | template | Статистика посещения врача | appointments | appointment report | RPT_42 | z/visits, z/doctor/all | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_doctors | template | Врачи: сводный отчёт | workload | workload report | none | z/doctor/all | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_efficiency | template | Ключевые показатели эффективности | all | management summary | RPT_18 | mobile/owner/efficiency, mobile/schedule | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_insurance_attachments | template | Количество прикреплений пациентов к страховым | dms | DMS report | RPT_34, RPT_35 | insurance/* | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_market_items | template | Проданные товары | warehouse | warehouse report | RPT_2 | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_mediline_primary_records | template | Первичные пациенты | appointments | appointment report | RPT_4 | z/visits | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_mediline_records | template | Расписание: записи пациентов | appointments | appointment report | none | z/visits | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_pay_debt | template | Должники | financial | management summary | RPT_28 | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_prepaid_certificate | template | Отчет по сертификатам | financial | management summary | none | z/pays, invoice/detail | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_records_registry | template | Расписание: работа регистратуры | appointments | appointment report | RPT_7, RPT_8 | z/visits | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_schedule_out | template | Расписание: удалённые записи | appointments | appointment report | RPT_13 | z/visits | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_sms_tasks | template | СМС | all | parameterized generated report | none | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_unpaid_pays | template | Квитанции без оплаты | financial | management summary | RPT_9, RPT_29 | z/pays, invoice/detail | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_wage | template | Заработные платы | financial | management summary | none | mobile/owner/recordCosts, z/pays | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_wage_doctors | template | Заработные платы врачей | workload | management summary | none | mobile/owner/recordCosts, z/pays, z/doctor/all | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_wage_doctors_updated | template | Заработные платы врачей, обновленный | workload | management summary | RPT_48 | mobile/owner/recordCosts, z/pays, z/doctor/all | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_wage_doctors_updated_check | template | Проверка расчета ЗП для бухгалтера | workload | parameterized generated report | none | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_warehouse_history | template | Склад: статистика по документам | warehouse | warehouse report | RPT_36, RPT_38 | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_warehouse_overs | template | Склад: остатки | warehouse | warehouse report | none | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_waybill_list | template | Бегунки | all | warehouse report | none | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_waybill_visit | template | Бегунки: визиты | appointments | warehouse report | none | z/visits | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |
| TPL_workorders | template | Заказ-наряды | all | warehouse report | none | none | not started | candidate | not yet investigated beyond catalog-level family mapping | `artifacts/reports/reports_scan.json`<br>`docs/reports-architecture-deep-dive-2026-03-09.md` |

## 6. Reading rules

- `current project status` is the operational state used by the project control-plane docs.
- `API mapping status` is the narrower source/API closure verdict for the report itself.
- `candidate sources` come from architecture/report-family evidence; they are not all fully verified.
- `current source bundle` is only promoted for reports where the project already has stronger evidence than catalog-level inference.

