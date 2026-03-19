# RPT_18 problem log — 2026-02-18

## Material issues
- No blocking mismatches were detected on this date. The verifier returned PASS for row-level and totals-level parity.

## Non-blocking guardrails
- `mobile/owner/efficiency` alone is not enough for total unique patients and derivative totals; `mobile/schedule` remains required.
- Fresh browser page load is not itself evidence of a browser-side direct API call; parity is proven by verifier comparison, not by network-only observation.
- The normalization policy is still family-specific and must not be promoted automatically to unrelated reports.

## Operational status
- status: verified_with_limits
- next_step_if_needed: reuse this date as an additional verified slice, but keep the dual-source boundary explicit.
