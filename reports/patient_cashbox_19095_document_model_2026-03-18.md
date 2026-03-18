# Patient Cashbox Document-Level Model

- patient_id: `19095`
- patient_name: `ХЕХЛЕР ЮРИ МИХАЙЛОВИЧ`
- list_url: `https://dcpraktik.dental-pro.online/cbase/detail.html?id=19095&tab=cashbox%5Ccbase%5Cpays`

## Canonical Document-Level Dataset

| payment_id | act_reference | document_scope | payment_block_scope | service_label | gross_amount | discount_amount | paid_amount | payment_block_amount |
|---|---|---|---|---|---:|---:|---:|---:|
| 86156 | 106296/19095 | shared_payment_document | document_grain_shared | Зуб(ы):0 Первичная консультация врача-ортопеда | 2 600.00 ₽ | 2 050.00 ₽ | 550.00 ₽ | 550.00 ₽ |
| 86149 | 106296/19095 | shared_payment_document | document_grain_shared | Рентген №: 29441 Ортопантомография | 3 520.00 ₽ | 3 520.00 ₽ | 0.00 ₽ | 550.00 ₽ |

## Document Groups

- `106296/19095`: rows=2, scope=`shared_payment_document`, payment_ids=`86156, 86149`, payment_block_amounts=`550.00 ₽`

## Algorithm

- 1. Open patient cashbox tab in authenticated browser session.
- 2. Extract one visible .cashbox_card per row.
- 3. Open each cashbox/forms/detail?id=<payment_id> page.
- 4. Extract header shell, positions, history, payments.
- 5. Recover act_reference from detail header shell (Акт <value>).
- 6. Group rows by act_reference to distinguish row-grain from shared-payment document-grain.
- 7. Build row-grain gross/discount/net from positions totals.
- 8. Build payment_method from payments table, but classify payment-block amount as document_grain_shared when repeated across multiple rows of one act.
- 9. Set document_scope=single_row_document when one act maps to one visible row; otherwise shared_payment_document.
- 10. Use canonical row values only from evidence-backed fields; keep unresolved badge/company semantics outside canonical payer field.
