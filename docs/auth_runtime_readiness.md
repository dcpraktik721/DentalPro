# Auth & Runtime Readiness

**Status:** BLOCKED — storageState not in repo  
**Last updated:** 2026-03-18  
**Author:** repo_hardening_agent / auth_runtime_agent

---

## Current Auth Architecture

DentalPRO uses cookie-based browser session auth. All live probe methods (11 of 23 in methods_registry) depend on a valid `dentalpro.storage.json` (Playwright storageState).

| Component | Location | In Repo | Status |
|-----------|----------|---------|--------|
| `dentalpro.storage.json` | `~/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright/auth/` | **NO** | **CRITICAL GAP** |
| `run_schedule_interaction_probe_v3.js` | `scripts/` | YES | References local Mac path |
| `run_schedule_patient_identity_focused_probe_v5.js` | `scripts/` | YES | References local Mac path |
| `auth_smoke_check.js` | `runtime/` | YES | Ready to run on Mac |

---

## Auth Drift Detection — Protocol

**Auth drift** = storageState cookies are expired or session was invalidated server-side, causing silent redirect to `/login` instead of returning schedule data.

### How to detect auth drift before any live probe

**Step 1 — Static check (fast, local):**
```bash
node runtime/auth_smoke_check.js
# Exit 0 = cookies structurally present and not obviously expired
# Exit 1 = cookies expired
# Exit 2 = storageState file not found
# Exit 3 = network error
```

**Step 2 — Navigation check (requires Playwright):**
```javascript
// In your playwright script, before data extraction:
await page.goto('https://dcpraktik.dental-pro.online/visits/schedule/index');
const currentUrl = page.url();
if (currentUrl.includes('/login')) {
  throw new Error('AUTH_DRIFT: Redirected to login — re-authenticate before running probe');
}
// Also check for redirect after date navigation:
await page.goto(SCHEDULE_URL + '?date=2026-03-10');
const afterNav = page.url();
if (afterNav.includes('/login') || afterNav.includes('/auth')) {
  throw new Error('AUTH_DRIFT: Date navigation triggered re-auth — session invalid');
}
```

**Step 3 — Content check (definitive):**
```javascript
// Check that schedule DOM loaded and is not a login form
const rowCount = await page.locator('[data-id]').count();
if (rowCount === 0) {
  // Could be auth drift OR empty day — check for schedule table presence
  const tableExists = await page.locator('.visits-schedule').isVisible();
  if (!tableExists) throw new Error('AUTH_DRIFT: Schedule table not rendered — likely auth failure');
}
```

---

## Auth Drift Risk Registry

| Risk | Likelihood | Detection | Impact |
|------|-----------|-----------|--------|
| storageState not present on Mac | Possible if machine changed | Exit 2 from smoke-check | All 11 auth-dep methods blocked |
| Session expired (cookies > 30 days old) | Medium (~monthly) | Exit 1 from smoke-check | All 11 auth-dep methods blocked |
| Server-side session invalidated | Low | URL redirect to /login | Silent failure — all live data returns empty |
| IP/device change invalidating session | Very low | Navigation check | Same as above |

---

## Why storageState Should NOT Be in Repo

1. Contains active session tokens → security risk if repo is public
2. Expires → stale committed file creates false confidence
3. Machine-specific → path structure differs per developer

## Recommended Alternative

Create `.gitignore`-protected local path with documented location:

```
# .gitignore
auth/dentalpro.storage.json
runtime/dentalpro.storage.json
```

Document expected path in `config/project_settings.json`:
```json
{
  "auth": {
    "storage_state_path_pattern": "${DENTALPRO_PLAYWRIGHT_ROOT}/auth/dentalpro.storage.json",
    "env_var": "DENTALPRO_STORAGE_STATE",
    "smoke_check_script": "runtime/auth_smoke_check.js"
  }
}
```

---

## Cross-Date Validation Auth Note

For cross-date validation on 2026-02-15 and 2026-02-16:
- Live browser probes require storageState valid at time of probe run
- Historical dates can still be navigated if storageState is valid NOW (the app's date picker goes back)
- If auth is expired, cross-date live runs are BLOCKED → fall back to static data validation

**Current status (2026-03-18):** storageState not in repo → all live cross-date runs blocked from this workspace. Static validation proceeds using existing artifacts.

---

## Auth Gap Closure Checklist

- [ ] Add `runtime/auth_smoke_check.js` (DONE — created 2026-03-18)
- [ ] Document auth drift protocol (DONE — this file)
- [ ] Add `auth_smoke_check` to methods_registry (DONE — v1.2.0)
- [ ] Migrate storageState to repo (BLOCKED — security policy)
- [ ] Add DENTALPRO_STORAGE_STATE env var support to all probe scripts
- [ ] Add auth drift guard to `run_schedule_interaction_probe_v3.js`
- [ ] Add auth drift guard to `run_schedule_patient_identity_focused_probe_v5.js`
