# RPT_24 live report — 2026-02-18

## Verdict
- run_status: success_with_warnings
- report_code: RPT_24
- report_name: Выручка по отделениям
- closure_level: verified_with_limits
- primary_truth: runtime_html_validated_with_accepted_api_composite

## Runtime
- report_url: https://dcpraktik.dental-pro.online/reports/reports/view?id=24&date%5Bstart%5D=2026-02-18&date%5Bend%5D=2026-02-18
- page_title: Выручка по отделениям
- row_count: 139
- ui_totals: quantity=166, discount=50382, paid=593371

## Accepted API composite
- primary row source: z/pays pay_positions
- patient/phone enrichment: mobile/client/getByID or i/client lookups
- performer lookup: z/doctor/all, with xray caveat
- final_rows: 139
- paid_ui_total: 593371
- totals_pass: True

## Safe claim boundary
- For 2026-02-18, runtime UI and accepted API composite agree on row count and totals.
- This does not fully close xray performer row-level linkage.
- Accepted API composite is usable with limits and must not be promoted as fully canonical for all subfamilies.
