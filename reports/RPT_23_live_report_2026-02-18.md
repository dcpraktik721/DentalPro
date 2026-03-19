# RPT_23 live report — 2026-02-18

## Verdict
- run_status: success_with_warnings
- report_code: RPT_23
- report_name: Услуги за период
- closure_level: verified_with_limits
- primary_truth: runtime_html

## Runtime
- report_url: https://dcpraktik.dental-pro.online/reports/reports/view?id=23&date_range%5Bstart%5D=2026-02-18&date_range%5Bend%5D=2026-02-18
- page_accessible: True
- runtime_shape: single_table
- runtime_row_count: 66
- runtime_headers_exact:
  - Услуга
  - Средняя цена
  - Кол-во
  - Сумма выполнено
  - Сумма скидки
  - Сумма оплачено с учетом скидки
  - Наличные
  - Безналичные
  - Общая

## Export / file
- export_available: yes
- export_mode: direct_download
- file_received: True
- file_row_count: 66
- file_schema_status: proven
- file_row_boundary_status: proven

## Governed verdict
- family_class: runtime_table_export_table
- raw_parity_status: failed
- normalized_business_parity_status: partial
- canonicalization_status: still_not_canonical
- safe_for_future_reporting: conditional

## Safe claim boundary
- For 2026-02-18, RPT_23 is runtime-first.
- Native export/file is a secondary audit layer only.
- Raw parity failed even though headers and row counts matched.
- First-column service-label canonicalization remains unresolved.
- Do not claim full parity or canonicalization for this slice.
