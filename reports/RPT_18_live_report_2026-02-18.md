# RPT_18 live report — 2026-02-18

## Verdict
- run_status: success
- report_code: RPT_18
- report_name: Ключевые показатели эффективности
- primary_truth: accepted_api_composite_validated_against_runtime_html
- closure_level: verified_with_limits

## Runtime
- report_url: https://dcpraktik.dental-pro.online/reports/reports/view?id=18&date_range%5Bstart%5D=2026-02-18&date_range%5Bend%5D=2026-02-18
- ui_title: Ключевые показатели эффективности
- runtime_empty: False
- runtime_row_count: 10

## API composite
- row_source: mobile/owner/efficiency
- unique-patient supplement: mobile/schedule
- api_row_count: 10
- unique_patients_total: 41

## Verification
- overall_pass: True
- row_level_pass: True
- totals_pass: True
- comparable_totals_pass: True
- unique_patient_totals_pass: True

## Safe claim boundary
- For 2026-02-18, RPT_18 is reproducible through the accepted API composite `mobile/owner/efficiency` plus `mobile/schedule` for unique-patient totals, validated against runtime UI.
- This does not prove that one API endpoint fully reproduces the whole report.
- The grouped-header and normalization policy remains RPT_18-family specific.
