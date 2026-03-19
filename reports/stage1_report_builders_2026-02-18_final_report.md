# Stage 1 final report — 2026-02-18

## PART 1. Overall status
| Metric | Value | Notes |
| --- | --- | --- |
| Fully verified | 0 | No report reached fully verified without limits |
| Verified with limits | 6 | Runtime-first slices with explicit unresolved boundaries |
| Partial | 2 | Live evidence captured but closure incomplete |
| Blocked | 0 | No report stayed fully blocked |

## PART 2. Per-report result
| Report | Run status | Primary truth | Workbook | Meta | Live report | Problem log | Commit | Closure level |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RPT_3 | success_with_warnings | runtime_html | `excel/RPT_3_2026-02-18_normalized.xlsx` | `artifacts/RPT_3_2026-02-18_meta.json` | `reports/RPT_3_live_report_2026-02-18.md` | `reports/RPT_3_problem_log_2026-02-18.md` | `c9ac972` | verified_with_limits |
| RPT_9 | success_with_warnings | runtime_html | `excel/RPT_9_2026-02-18_normalized.xlsx` | `artifacts/RPT_9_2026-02-18_meta.json` | `reports/RPT_9_live_report_2026-02-18.md` | `reports/RPT_9_problem_log_2026-02-18.md` | `f8c2999` | verified_with_limits |
| RPT_18 | success_with_warnings | runtime_html_validated_with_accepted_api_composite | `excel/RPT_18_2026-02-18_normalized.xlsx` | `artifacts/RPT_18_2026-02-18_meta.json` | `reports/RPT_18_live_report_2026-02-18.md` | `reports/RPT_18_problem_log_2026-02-18.md` | `6098dbd` | verified_with_limits |
| RPT_24 | success_with_warnings | runtime_html_validated_with_accepted_api_composite | `excel/RPT_24_2026-02-18_normalized.xlsx` | `artifacts/RPT_24_2026-02-18_meta.json` | `reports/RPT_24_live_report_2026-02-18.md` | `reports/RPT_24_problem_log_2026-02-18.md` | `bc1e0bd` | verified_with_limits |
| RPT_29 | success_with_warnings | runtime_html | `excel/RPT_29_2026-02-18_normalized.xlsx` | `artifacts/RPT_29_2026-02-18_meta.json` | `reports/RPT_29_live_report_2026-02-18.md` | `reports/RPT_29_problem_log_2026-02-18.md` | `5662f26` | verified_with_limits |
| RPT_39 | partial | runtime_html | `excel/RPT_39_2026-02-18_normalized.xlsx` | `artifacts/RPT_39_2026-02-18_meta.json` | `reports/RPT_39_live_report_2026-02-18.md` | `reports/RPT_39_problem_log_2026-02-18.md` | `00fdd40` | partial |
| RPT_4 | partial | runtime_html | `excel/RPT_4_2026-02-18_normalized.xlsx` | `artifacts/RPT_4_2026-02-18_meta.json` | `reports/RPT_4_live_report_2026-02-18.md` | `reports/RPT_4_problem_log_2026-02-18.md` | `307c076` | partial |
| RPT_23 | success_with_warnings | runtime_html | `excel/RPT_23_2026-02-18_normalized.xlsx` | `artifacts/RPT_23_2026-02-18_meta.json` | `reports/RPT_23_live_report_2026-02-18.md` | `reports/RPT_23_problem_log_2026-02-18.md` | `665c9ff` | verified_with_limits |

## PART 3. Report notes
- `RPT_3`: Runtime/export mismatch remains explicit; debt source is sample-proven via patient cashbox only.
- `RPT_9`: Empty-runtime slice; accepted API remains supporting-only and broader than report output.
- `RPT_18`: Existing accepted verifier re-run passed row/totals parity, but single-endpoint replacement remains forbidden.
- `RPT_24`: Runtime totals and accepted API composite totals match; xray performer linkage remains unresolved.
- `RPT_29`: Single-date route requires date_range params; this slice is an empty runtime result with only footer total.
- `RPT_39`: Authenticated runtime route opened but rendered no table; candidate API mapping remains unverified.
- `RPT_4`: Repo-local UI capture plus accepted replay show 2 residual field mismatches; hidden backend predicate remains unresolved.
- `RPT_23`: Runtime and export/file both captured; raw parity failed, normalized business parity partial, canonicalization still_not_canonical.

## PART 4. Builders and methods
- Builders/wrappers added in this stage:
  - `scripts/run_report_rpt29_live_probe.js`
  - `scripts/build_report_rpt29_workbook.py`
  - `scripts/run_report_rpt39_live_probe.js`
  - `scripts/build_report_rpt39_workbook.py`
  - `scripts/run_report_rpt4_ui_capture.js`
  - `scripts/build_report_rpt4_workbook.py`
  - `scripts/build_report_rpt23_workbook.py`
- Methods reused:
  - repo-local auth refresh path
  - repo-local auth smoke path
  - runtime HTML table extraction
  - native export capture where available
  - workbook-from-saved-artifacts builders
  - accepted API support replay for governed report families
- New methods that appeared:
  - safe single-date saved report replay with date_range params for RPT_29
  - repo-local no-data runtime capture path for RPT_39
  - repo-local UI anchor feeding accepted replay for RPT_4
  - repo-local runtime-first workbook/meta packaging for runtime_table_export_table family on RPT_23

## PART 5. Safe run surface
- `./tools/rpt3 2026-02-18`
- `./tools/rpt9 --date 2026-02-18`
- `python3 scripts/build_report_rpt18_workbook.py --date 2026-02-18`
- `python3 scripts/build_report_rpt24_workbook.py --date 2026-02-18`
- `python3 scripts/build_report_rpt29_workbook.py --date 2026-02-18`
- `python3 scripts/build_report_rpt39_workbook.py --date 2026-02-18`
- `python3 scripts/build_report_rpt4_workbook.py --date 2026-02-18`
- `python3 scripts/build_report_rpt23_workbook.py --date 2026-02-18`

## PART 6. Remaining drift / second-pass targets
- Report families still needing second pass:
  - RPT_24 xray performer subfamily
  - RPT_4 hidden predicate + field closure
  - RPT_23 first-column canonicalization
  - RPT_39 candidate API mapping if non-empty slice appears
- Unresolved drift:
  - RPT_3 runtime vs native export mismatch
  - RPT_9 accepted API wider than report output
  - RPT_24 xray performer key unresolved
  - RPT_4 residual replay mismatches
  - RPT_23 first-column canonicalization unresolved

## PART 7. Final verdict
- Stage 1 completed as a sequential set of eight single-date report packages for `2026-02-18`.
- The repo now contains normalized workbook + meta + human-readable evidence for all eight target reports.
- Safe global boundary: runtime HTML remains the primary truth unless a specific slice explicitly says otherwise; accepted API and native export remain supporting layers where closure is incomplete.
