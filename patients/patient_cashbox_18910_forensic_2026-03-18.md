# Patient Cashbox Forensic Extraction

- patient_id: `18910`
- patient_name: `АЗАНОВ ЗАУР ХАКИМОВИЧ`
- live cashbox tab: `https://dcpraktik.dental-pro.online/cbase/detail.html?id=18910&tab=cashbox%5Ccbase%5Cpays`
- generated_at: `2026-03-18T08:37:10.922824`

## What Was Proven

- The patient cashbox is a patient-card tab, not a standard report-module page.
- The tab is backend-rendered HTML and exposes one `.cashbox_card` per visible cashbox row.
- Each visible row links to a separate `cashbox/forms/detail?id=<payment_id>` page.
- Detail pages expose `Позиции`, `История`, and `Платежи` tables directly in runtime HTML.
- For patient `18910`, four cashbox rows were observed and extracted.

## Canonical Dataset

| payment_id | patient_id | document_datetime | service_label | status | payment_method | gross_amount | discount_amount | paid_amount | payer | created_by | reversal_state |
|---|---:|---|---|---|---|---:|---:|---:|---|---|---|
| 86370 | 18910 | 2026-02-24 15:47:41 | Зуб(ы):18 Удаление постоянного зуба | Оплачена | Банковская карта | 2 455.00 ₽ | 0.00 ₽ | 2 455.00 ₽ | Физическое лицо - АЗАНОВ ЗАУР ХАКИМОВИЧ | Геюшова Я.Н. | not_reversed_observed |
| 85523 | 18910 | 2026-02-09 16:17:57 | Рентген №: 29190 Ортопантомография | Оплачена | Банковская карта | 1 500.00 ₽ | 1 500.00 ₽ | 0.00 ₽ | Физическое лицо - АЗАНОВ ЗАУР ХАКИМОВИЧ | Желудкова М.В. | not_reversed_observed |
| 85520 | 18910 | 2026-02-09 16:10:50 | Зуб(ы):28 Удаление постоянного зуба | Оплачена | Банковская карта | 4 530.00 ₽ | 0.00 ₽ | 4 530.00 ₽ | Физическое лицо - АЗАНОВ ЗАУР ХАКИМОВИЧ | Логвинчук Д.Н. | not_reversed_observed |
| 85516 | 18910 | 2026-02-09 15:54:22 | Рентген №: 29187 Ортопантомография | Оплачена | Банковская карта | 1 500.00 ₽ | 1 500.00 ₽ | 0.00 ₽ | Физическое лицо - АЗАНОВ ЗАУР ХАКИМОВИЧ | Желудкова М.В. | not_reversed_observed |

## Forensic Breakdown of `86370`

- detail_url: `https://dcpraktik.dental-pro.online/cashbox/forms/detail?id=86370`
- header shell proves: service label, creator, created datetime, patient, payer, status, act, contract
- positions table proves three positions and row-level totals `2 455.00 / 0.00 / 2 455.00 ₽`
- history table proves one event: `Создан акт 106549/18910` initiated `24.02.2026 15:48` by `Поняева Н.Н.`
- payments table proves payment method `Банковская карта`, accepted amount `2 455.00 ₽`, registrar `Атол ( Рабочий )`

## Critical Grain Decision

- `paid_amount` in the canonical dataset is taken from detail positions total `Сумма со скидкой` with list-page cross-check.
- It is **not** blindly taken from the payment-block amount when one payment block repeats across multiple detail ids in the same act.
- This matters for `85523` and `85516`, where the detail payment block repeats `4 530.00 ₽` but row-level net amount remains `0.00 ₽` because the row is fully discounted.

## Step-by-Step Algorithm

- 1. Open patient card tab /cbase/detail.html?id=<patient_id>&tab=cashbox\cbase\pays in authenticated browser session.
- 2. Treat the tab as backend-rendered HTML list, not as /reports/reports/view and not as proven XHR dataset.
- 3. Extract one row per .cashbox_card: payment_id, list label, created meta, badges, comment, cash block text, detail link.
- 4. For each row, open /cashbox/forms/detail?id=<payment_id>.
- 5. On detail page extract header shell, positions table, history table, payments table.
- 6. Build canonical row fields from detail page with list-page cross-checks.
- 7. Set gross_amount = positions total Сумма; discount_amount = positions total Скидка; paid_amount = positions total Сумма со скидкой.
- 8. Use payment_method from payments table Форма оплаты, but do not use payments table amount as row-level paid_amount when the same payment block repeats across multiple detail ids of one act.
- 9. Use payer from detail header payer string; keep list badge company as unresolved auxiliary signal only.
- 10. Set reversal_state only to observed runtime state, e.g. not_reversed_observed, unless reversal history/status is explicitly shown.
- 11. For forensic review of one row, preserve positions/history/payments subtables verbatim from the detail page.

## What Is Not Proven

- No standalone API/XHR data source for this tab was proven.
- The exact semantic role of the list-level badge `ООО НЬЮ ЛАЙФ ( СК ПRАКТИК )` is unresolved.
- `reversal_state` is only proven at current runtime-observed level.
- The payment-block amount on detail pages is not proven to be one-to-one row-grain for all cases.
