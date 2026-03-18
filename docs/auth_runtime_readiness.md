# Auth Runtime Readiness

## Current verdict

| Area | Verdict | Readiness | Notes |
| --- | --- | --- | --- |
| storageState session reuse | working | ready_with_limits | Verified by runtime smoke on 2026-03-18 |
| schedule route access | pass | ready_with_limits | `visits/schedule/index?date=2026-03-10` opened without login fallback |
| patient card access | pass | ready_with_limits | `cbase/detail.html?id=19199` opened without login fallback |
| API test shell access | pass | ready_with_limits | `apisettings/api/test?method=mobile/schedule` opened and exposed token field |
| repo self-bootstrap auth | not closed | validation_required | Repo still depends on external local `storageState` file |

## Evidence

- [auth_refresh.js](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_refresh.js)
- [auth_refresh_result.json](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_refresh_result.json)
- [auth_smoke_check.js](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_smoke_check.js)
- [auth_smoke_check_result.json](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_smoke_check_result.json)

## Safe boundary

- Auth is usable for current local runtime work.
- Auth is not self-contained inside this repo.
- The repo must not be called fully execution-ready on auth grounds alone.
- `storageState` can expire and needs explicit refresh outside repo.

## What is proven

1. The current local `storageState` opens key DentalPRO routes in authenticated mode.
2. The current repo-local refresh path can rebuild that `storageState` through the live login form.
3. Login redirect was not observed during the smoke pass after refresh.
4. This is enough to classify auth runtime reuse as `ready_with_limits`.

## What is not proven

1. Automatic login/bootstrap from this repo alone.
2. Long-term stability of the same `storageState`.
3. CI-ready auth bootstrap.

## Operational rule

When auth-dependent runtime work is claimed in this repo:

- refresh auth with [auth_refresh.js](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_refresh.js) when session drift is observed
- cite [auth_smoke_check_result.json](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_smoke_check_result.json)
- keep readiness at `ready_with_limits`
- do not upgrade to `ready` or `execution-ready`
- if smoke fails later, downgrade auth-dependent claims until refreshed evidence exists
