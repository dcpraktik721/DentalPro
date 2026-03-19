# RPT_23 problem log — 2026-02-18

## Material unresolved items
- Raw parity failed between runtime and file layers.
- First business column is represented differently across layers:
  - runtime uses prefixed service labels like `[109.35] ...`
  - file uses service labels without the runtime prefix
- Canonicalization remains `still_not_canonical`.

## What still passed
- live browser-backed run completed
- explicit date-constrained route was opened
- runtime structured dataset extracted
- native export file received
- file schema and row boundary parsed
- runtime row count = 66
- file row count = 66
- exact headers matched

## Guardrails
- Do not promote native export/file to primary truth.
- Do not treat row-count equality as final parity.
- Do not silently normalize runtime service-code prefixes into file labels.
- Keep this slice at `verified_with_limits`, not fully verified.
