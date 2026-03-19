# Post-Stage-1 repo cleanup report

## PART 1. Executive summary
| Area | Status | Notes |
| --- | --- | --- |
| Stage 1 evidence packages | closed | All eight report packages remain intact and were not rewritten. |
| Registry/docs drift | cleaned | Removed references to untracked `RPT_9 2026-03-18` artifacts and reverted methods drift to committed evidence only. |
| Working tree noise | cleaned | Removed non-Stage-1 generated files that were not integrated into registries/docs. |
| RPT_23 builder safety | closed | Cold rerun recreated workbook and meta sidecar without manual intervention. |
| Open structural issues | still_open | `current_assets_index.json` schema remains mixed; auth refresh result remains tracked and volatile. |

## PART 2. Closed
- Stage 1 packages preserved for `RPT_3`, `RPT_9`, `RPT_18`, `RPT_24`, `RPT_29`, `RPT_39`, `RPT_4`, `RPT_23`.
- `RPT_23` cold rerun safety passed: builder recreated both workbook and meta sidecar from saved artifacts with no manual dopiski.
- Guardrails retained: `schi-10 = inferred`, `cash = patient-day only`, `auth = ready_with_limits`.

## PART 3. Cleaned
- `.gitignore` now ignores temporary Excel lock files (`~$*.xlsx`).
- `README.md` no longer advertises the untracked `RPT_9 2026-03-18` slice.
- `docs/repo_current_state_master.md` now references only the committed `RPT_9 2026-02-18` workbook slice.
- `registry/scripts_registry.json` now points `script_build_report_rpt9_workbook` at the committed output set only.
- `registry/current_assets_index.json` no longer contains the untracked `excel/RPT_9_2026-03-18_normalized.xlsx` entry.
- `registry/methods_registry.json` no longer claims `2025-03-05` schedule validation dates that were not integrated into repo history.
- Removed 31 non-Stage-1 generated files from the working tree to return the repo to a clean operating set.

## PART 4. Still open
- `registry/current_assets_index.json` still mixes current asset records with legacy phase-report entries that do not carry `asset_id`.
- `runtime/auth_refresh_result.json` is still a tracked volatile snapshot and will dirty the repo on future auth refreshes unless handled deliberately.
- Removed ad hoc post-Stage-1 slices were not integrated; if they are needed later, they should return via dedicated package passes rather than as untracked drift.

## PART 5. Cleanup classification
| Category | Result | Notes |
| --- | --- | --- |
| Relates to Stage 1 and remains | kept | Stage 1 report packages and final stage reports remain untouched. |
| Legacy / temporary / generated noise | cleaned | Untracked period RPT_3 outputs, ad hoc schedule slices, report summary builders/artifacts, and RPT_9 2026-03-18 ad hoc slice were removed. |
| Runtime/auth volatile files | cleaned / still_open | `auth_refresh_result.json` restored to baseline bytes now, but the file remains tracked and inherently volatile. |
| Registry/docs drift | cleaned | Current state and RPT_9 references now match committed artifacts only. |

## PART 6. Final state
- The repo is back to a clean Stage-1-consistent operating set after this commit.
- No new live runs were executed.
- No claim boundary was expanded.
