# Phase 6A Cross-Date Validation + Repo Hardening

## Executive Summary

| Area | Result | Notes |
| --- | --- | --- |
| Feb 15 live validation | completed | canonical summary and sub-artifacts exist in repo |
| Feb 16 live validation | completed | canonical summary exists; identity subset repro exists |
| Cross-date matrix | completed | canonicalized to current evidence hierarchy |
| Auth refresh and smoke | completed | repo-local scripts and results exist |
| Methods registry | completed | current evidence-backed entries updated |

## Canonical boundaries

- cross-date wording: `validated on three dates`
- forbidden wording: `stable`
- `schi-10`: `inferred`
- cash: `patient-day only`
- auth: `ready_with_limits`
- `2026-02-16` identity: `subset-based reproducible`

## Evidence notes

- `2026-02-16` identity result is supported by exact repro overlap:
  - `40` probed
  - `30` popup success
  - `24` patient IDs resolved
  - `16` unresolved
- February ticket supporting notes are not canonical metric sources when they drift from validation summaries.
- February cash remains partially validated, not fully closed in repo.
