# Patient Cashbox Document-Level Model

- patient_id: `18910`
- patient_name: `АЗАНОВ ЗАУР ХАКИМОВИЧ`
- list_url: `https://dcpraktik.dental-pro.online/cbase/detail.html?id=18910&tab=cashbox%5Ccbase%5Cpays`

## Canonical Document-Level Dataset

| payment_id | act_reference | document_scope | payment_block_scope | service_label | gross_amount | discount_amount | paid_amount | payment_block_amount |
|---|---|---|---|---|---:|---:|---:|---:|
| 86370 | 106549/18910 | single_row_document | row_grain_observed | Зуб(ы):18 Удаление постоянного зуба | 2 455.00 ₽ | 0.00 ₽ | 2 455.00 ₽ | 2 455.00 ₽ |
| 85523 | 105575/18910 | shared_payment_document | document_grain_shared | Рентген №: 29190 Ортопантомография | 1 500.00 ₽ | 1 500.00 ₽ | 0.00 ₽ | 4 530.00 ₽ |
| 85520 | 105575/18910 | shared_payment_document | document_grain_shared | Зуб(ы):28 Удаление постоянного зуба | 4 530.00 ₽ | 0.00 ₽ | 4 530.00 ₽ | 4 530.00 ₽ |
| 85516 | 105575/18910 | shared_payment_document | document_grain_shared | Рентген №: 29187 Ортопантомография | 1 500.00 ₽ | 1 500.00 ₽ | 0.00 ₽ | 4 530.00 ₽ |

## Document Groups

- `105575/18910`: rows=3, scope=`shared_payment_document`, payment_ids=`85523, 85520, 85516`, payment_block_amounts=`4 530.00 ₽`
- `106549/18910`: rows=1, scope=`single_row_document`, payment_ids=`86370`, payment_block_amounts=`2 455.00 ₽`

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
