# Ревизия алгоритма пустых карт - live rerun

## Summary
- период: `2025-01-01 -> 2026-03-23`
- run_status: `success_with_warnings`
- route_status: `opened_authenticated`
- records_count: `107`
- pages_collected: `3`
- source_of_truth: `browser-authenticated direct GET runtime HTML`

## Revised Method
- exact filtered route `/medblock/cards/index`
- exact GET filter contract with `status_change_date[start/end]` and `status[]=0`
- full fresh rerun across all visible pagination pages
- no baseline workbook merge
- no export substitution

## Issues
- `EXPORT_NOT_DETECTED` - Native export control was not detected in this live rerun.
- `COUNT_DRIFT_VS_PREVIOUS_RESULT` - Previous claimed count 150 vs current live count 107.
- `PREVIOUS_WORKBOOK_MAIN_SHEET_CONTAMINATED` - Previous workbook main sheet contained non-card rows beyond numeric card ids.

## Comparison With Previous Algorithm
- `previous_claimed_records_count` - `150`
- `previous_run_status` - `success_with_limits`
- `previous_workbook_path` - `/Users/macbook15/Downloads/MacAi/DentalPro/excel/Незаполненные карты 2025-01-01 - 2026-03-23.xlsx`
- `previous_workbook_max_row_minus_header` - `167`
- `previous_workbook_numeric_card_ids` - `150`
- `previous_workbook_contaminated_main_sheet` - `True`

## Claim Boundary
Ревизованный алгоритм подтверждает exact filtered direct route /medblock/cards/index, browser-authenticated direct GET, сбор строк со всех видимых страниц пагинации и нормализацию поля 'Информация о карте' без baseline merge. Export layer не доказан. Полнота вне текущей пагинации runtime response не заявляется.

## Files
- `/Users/macbook15/Downloads/MacAi/DentalPro/excel/Незаполненные карты 2025-01-01 - 2026-03-23 ревизия.xlsx`
- `/Users/macbook15/Downloads/MacAi/DentalPro/artifacts/nezapolnennye_karty_2025-01-01_2026-03-23_reaudit_result.json`
- `/Users/macbook15/Downloads/MacAi/DentalPro/reports/nezapolnennye_karty_2025-01-01_2026-03-23_reaudit_report.md`
