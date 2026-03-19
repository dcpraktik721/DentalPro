# RPT_24 problem log — 2026-02-18

## Material unresolved item
- xray performer row-level key remains not proven.

## What still passed
- ui row count = 139
- api final row count = 139
- totals comparison pass = True

## Guardrails
- Do not promote accepted API composite to full canonical truth for xray rows.
- Do not hide that this slice is verified_with_limits rather than fully verified.
- No native export layer was checked in this pass.
