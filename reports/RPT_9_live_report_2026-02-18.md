# RPT_9 live report for 2026-02-18

Report: `RPT_9` / `Квитанции без оплаты`
Date: `2026-02-18`
Generated from live run on: `2026-03-19T15:44:11.774498+00:00`

## Executive verdict

- Runtime report page loaded authenticated and rendered successfully.
- On `2026-02-18`, live runtime output was effectively empty: only `ИТОГО` with `0.00 ₽` was visible.
- Accepted API sources still returned broader same-date finance rows, so they cannot be promoted to report truth.
- `RPT_9` remains `partial` at family level and this date is an `empty-slice evidence case`, not a closure upgrade.

## Runtime evidence

Primary runtime route:
- `https://dcpraktik.dental-pro.online/reports/reports/view?id=9&date_range[start]=2026-02-18&date_range[end]=2026-02-18`

Runtime artifacts:
- raw UI capture: `/Users/macbook15/Downloads/MacAi/DentalPro/reporting/report-9-2026-02-18-2026-02-18.json`
- screenshot: `/Users/macbook15/Downloads/MacAi/DentalPro/reporting/report-9-2026-02-18-2026-02-18.png`
- curated probe: `/Users/macbook15/Downloads/MacAi/DentalPro/reporting/RPT_9_live_probe_2026-02-18.json`

Authenticated shell confirmation:
- final URL: `https://dcpraktik.dental-pro.online/visits/schedule/week`
- success reason: `authenticated_shell_detected_without_day_marker`

Observed HTML structure:
- rendering mode: `single_summary_table`
- columns: `Статус квитанции / Кем изменено / Пациент | Квитанция | Филиал | Создатель квитанции | Дата создания | Дата изменения | Причина | Сумма к оплате`
- distinct leaf rows observed: `0`
- totals row: `ИТОГО = 0.00 ₽`

## Accepted API support

Supporting API artifact:
- `/Users/macbook15/Downloads/MacAi/DentalPro/reporting/report-9-api-analysis-2026-02-18-2026-02-18.json`

What `z/pays` returns for the same date:
- total rows: `59`
- statuses: `{"Оплачена": 58, "Сторнирование": 1}`

Interpretation:
- accepted API sources show finance activity for that date;
- the runtime report still renders empty for this slice;
- therefore date-only API output is broader than the report and must remain supporting only.

## Hidden history layer

- No runtime drilldown row existed on this date.
- No `cashbox/forms/detail` row-linked sample was available from the report output.
- Hidden history semantics therefore remain unresolved on this slice.

## Safe claim boundary

Proven on this slice:
- runtime `RPT_9` route works on `2026-02-18`;
- runtime page can legitimately render empty output with only totals row;
- accepted APIs still return broader same-date finance rows.

Partial only:
- family-level understanding that `RPT_9` belongs to the unpaid invoice/payment family;
- accepted API support as broader supporting layer.

Not proven:
- that accepted APIs reproduce the report output on this date;
- that updater/reason/history semantics are source-closed;
- that empty runtime result implies no same-date finance activity in source systems.

## Operational status

Verdict for `2026-02-18` as evidence slice:
- `usable_with_limits`

Reason:
- this is a valid live runtime observation and it strengthens the safe boundary by proving that date-only API output can be broader than a same-date empty report.
