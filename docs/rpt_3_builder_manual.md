# RPT_3 Builder Manual

Builder:
- [build_report_rpt3.py](/Users/macbook15/Downloads/MacAi/DentalPro/scripts/build_report_rpt3.py)

Repo-local wrapper:
- [tools/rpt3](/Users/macbook15/Downloads/MacAi/DentalPro/tools/rpt3)

Spec:
- [rpt_3.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/report_specs/rpt_3.json)

## Purpose

This builder creates a production-safe normalized workbook for:
- `RPT_3`
- `Отчет_3`
- `Задолженности_и_авансы`

It uses:
- `runtime_html` as primary truth
- `native export` as optional secondary parity-check layer

It does not promote:
- `i/balance` to a direct read source
- native export to canonical truth by default

## Supported invocations

Single date:

```bash
./tools/rpt3 2026-02-18
python3 /Users/macbook15/Downloads/MacAi/DentalPro/scripts/build_report_rpt3.py RPT_3 2026-02-18
python3 /Users/macbook15/Downloads/MacAi/DentalPro/scripts/build_report_rpt3.py Отчет_3 2026-02-18
python3 /Users/macbook15/Downloads/MacAi/DentalPro/scripts/build_report_rpt3.py Задолженности_и_авансы 2026-02-18
python3 /Users/macbook15/Downloads/MacAi/DentalPro/scripts/build_report_rpt3.py --date 2026-02-18
```

Period:

```bash
./tools/rpt3 2026-02-01 2026-02-29
python3 /Users/macbook15/Downloads/MacAi/DentalPro/scripts/build_report_rpt3.py RPT_3 2026-02-01 2026-02-29
python3 /Users/macbook15/Downloads/MacAi/DentalPro/scripts/build_report_rpt3.py Отчет_3 2026-02-01 2026-02-29
python3 /Users/macbook15/Downloads/MacAi/DentalPro/scripts/build_report_rpt3.py Задолженности_и_авансы 2026-02-01 2026-02-29
python3 /Users/macbook15/Downloads/MacAi/DentalPro/scripts/build_report_rpt3.py --start 2026-02-01 --end 2026-02-29
```

Flags:

```bash
--no-export
--skip-auth-refresh
--output-xlsx /abs/path/file.xlsx
--output-meta /abs/path/file.json
```

Wrapper contract:
- `tools/rpt3` computes repo root relative to the wrapper file, not `cwd`
- it forwards all arguments unchanged via `"$@"`
- executable bit is required

## Output files

Single-date run:
- `excel/RPT_3_YYYY-MM-DD_normalized.xlsx`
- `artifacts/RPT_3_YYYY-MM-DD_meta.json`
- `artifacts/RPT_3_YYYY-MM-DD_native_export.xlsx` if export succeeds

Period run:
- `excel/RPT_3_YYYY-MM-DD_YYYY-MM-DD_normalized.xlsx`
- `artifacts/RPT_3_YYYY-MM-DD_YYYY-MM-DD_meta.json`
- `artifacts/RPT_3_YYYY-MM-DD_YYYY-MM-DD_native_export.xlsx` if export succeeds

## Workflow

1. Run repo-local auth refresh through [auth_refresh.js](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_refresh.js).
2. Read cookies from the saved storage state path in [auth_refresh_result.json](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_refresh_result.json).
3. Request runtime report page for `RPT_3`.
4. Parse server-rendered HTML table.
5. Normalize rows into a fixed schema.
6. Optionally run native export through the two-step exporter flow.
7. Compare runtime vs export.
8. Save user-facing Excel plus forensic meta sidecar.

## Excel contract

Workbook sheets:
- `RPT_3_normalized`
- `RPT_3_summary`
- `RPT_3_warnings`

Primary row source:
- `row_source = runtime_html`

Important row-level fields:
- `patient_id` comes only from runtime patient card link
- `identity_proof = row_link_patient_card` when present
- `debt_source_status = sample_proven_cashbox_based_family_only`
- `runtime_export_parity_status` is set from the current run only

## Meta sidecar contract

The meta file records:
- auth state
- runtime URL
- runtime columns
- runtime row count
- runtime footer metrics
- export availability
- export row count
- export footer metrics
- parity status
- warning list
- problem log

## Guardrails

Allowed:
- `runtime_html is the primary truth for the output workbook`
- `native export was checked as a secondary layer`
- `debt source is sample-proven via patient cashbox balances`

Forbidden:
- `native export is canonical by default`
- `i/balance is the direct source of RPT_3 debt`
- `runtime and export are identical` unless the run proves it

## Current known limits

- runtime and export can drift on the same tested slice
- patient cashbox explains sampled debt values, but the hidden backend generation path is not fully closed
- auth depends on repo-local refresh plus external credentials in environment
