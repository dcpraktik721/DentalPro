# Auth Runtime Readiness

## Current verdict

| Area | Verdict | Readiness | Notes |
| --- | --- | --- | --- |
| auth refresh path | working | ready_with_limits | local login-form refresh path exists |
| auth smoke path | working | ready_with_limits | authenticated routes verified after refresh |
| committed runtime scripts | present | ready_with_limits | refresh and smoke scripts are in repo |
| committed secrets/bootstrap | absent | validation_required | repo does not contain credentials or self-bootstrap auth |
| repo execution readiness on auth | forbidden claim | validation_required | auth depends on external local state and secrets |

## Committed assets

- [auth_refresh.js](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_refresh.js)
- [auth_refresh_result.json](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_refresh_result.json)
- [auth_smoke_check.js](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_smoke_check.js)
- [auth_smoke_check_result.json](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_smoke_check_result.json)

## External local dependencies

- storageState path:
  - `/Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright/auth/dentalpro.storage.json`
- credentials / secrets:
  - local-only, not committed

## Standard operating path

1. Run [auth_refresh.js](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_refresh.js) if drift is suspected.
2. Read [auth_refresh_result.json](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_refresh_result.json).
3. Run [auth_smoke_check.js](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_smoke_check.js).
4. Read [auth_smoke_check_result.json](/Users/macbook15/Downloads/MacAi/DentalPro/runtime/auth_smoke_check_result.json).
5. Only then make live runtime claims.

## Drift detection

Auth drift is detected when any of these occurs:

- final URL falls back to `login.html`
- expected selector is absent on an auth-dependent route
- `summary.all_routes_authenticated=false`
- a previously working identity-only pass suddenly returns login redirects

## What is proven

- local refresh path can restore authenticated state
- smoke-check can verify current route access after refresh
- current auth model is sufficient for local runtime validation work

## What is not proven

- self-contained repo auth bootstrap
- CI-ready auth bootstrap
- long-lived auth stability without refresh

## Safe boundary

- allowed wording:
  - `auth is ready_with_limits`
  - `local auth refresh and smoke path are committed`
- forbidden wording:
  - `repo is execution-ready`
  - `repo is self-bootstrapping on auth`
  - `auth is stable`
