/**
 * DentalPRO Auth Smoke-Check Script
 * Purpose: Verify storageState validity before any live probe
 * Status: READY_TO_RUN — requires storageState file on local Mac
 *
 * Usage:
 *   node runtime/auth_smoke_check.js [--storage-path /path/to/dentalpro.storage.json]
 *
 * Exit codes:
 *   0 = auth valid
 *   1 = auth expired or cookies missing
 *   2 = storageState file not found
 *   3 = network error / DentalPRO unreachable
 */

const fs = require('fs');
const path = require('path');

// --- CONFIG ---
const DEFAULT_STORAGE_PATH = process.env.DENTALPRO_STORAGE_STATE
  || path.join(process.env.HOME || '~', 'Downloads', 'YDIREKT_code', 'mac-ai-os', 'dentalpro-playwright', 'auth', 'dentalpro.storage.json');
const SCHEDULE_URL = 'https://dcpraktik.dental-pro.online/visits/schedule/index';
const LOGIN_REDIRECT_INDICATOR = '/login';
const AUTH_CHECK_TIMEOUT_MS = 10000;

// --- PARSE ARGS ---
const args = process.argv.slice(2);
const storageFlagIdx = args.indexOf('--storage-path');
const storagePath = storageFlagIdx >= 0 ? args[storageFlagIdx + 1] : DEFAULT_STORAGE_PATH;

// --- MAIN ---
async function runAuthSmokeCheck() {
  console.log('[AUTH_SMOKE_CHECK] Starting DentalPRO auth validation...');
  console.log(`[AUTH_SMOKE_CHECK] storageState path: ${storagePath}`);

  // 1. Check storageState file exists
  if (!fs.existsSync(storagePath)) {
    console.error(`[AUTH_SMOKE_CHECK] CRITICAL: storageState file NOT FOUND at: ${storagePath}`);
    console.error('[AUTH_SMOKE_CHECK] This is the primary auth gap. Cannot run any live probe without it.');
    console.error('[AUTH_SMOKE_CHECK] Fix: ensure dentalpro-playwright project is present and auth/ is populated');
    process.exit(2);
  }

  let storageState;
  try {
    storageState = JSON.parse(fs.readFileSync(storagePath, 'utf-8'));
  } catch (e) {
    console.error(`[AUTH_SMOKE_CHECK] ERROR: storageState file is not valid JSON: ${e.message}`);
    process.exit(2);
  }

  // 2. Check cookies are present
  const cookies = storageState.cookies || [];
  const sessionCookies = cookies.filter(c =>
    c.domain && c.domain.includes('dental-pro.online')
  );
  console.log(`[AUTH_SMOKE_CHECK] Found ${cookies.length} total cookies, ${sessionCookies.length} dental-pro.online cookies`);

  if (sessionCookies.length === 0) {
    console.error('[AUTH_SMOKE_CHECK] FAIL: No dental-pro.online cookies found in storageState');
    process.exit(1);
  }

  // 3. Check cookie expiry
  const now = Date.now() / 1000;
  const expired = sessionCookies.filter(c => c.expires && c.expires < now && c.expires > 0);
  const sessionBased = sessionCookies.filter(c => !c.expires || c.expires <= 0);
  const valid = sessionCookies.filter(c => c.expires && c.expires > now);

  console.log(`[AUTH_SMOKE_CHECK] Cookie status: ${valid.length} valid, ${expired.length} expired, ${sessionBased.length} session-based`);

  if (expired.length > 0 && valid.length === 0 && sessionBased.length === 0) {
    console.error('[AUTH_SMOKE_CHECK] FAIL: All dental-pro.online cookies are expired');
    console.error('[AUTH_SMOKE_CHECK] Auth drift detected — re-authentication required before any live probe');
    process.exit(1);
  }

  // 4. Check localStorage for auth tokens
  const localStorage = storageState.origins || [];
  const dentalOrigin = localStorage.find(o => o.origin && o.origin.includes('dental-pro.online'));
  if (dentalOrigin) {
    const lsEntries = dentalOrigin.localStorage || [];
    console.log(`[AUTH_SMOKE_CHECK] localStorage entries for dental-pro.online: ${lsEntries.length}`);
  }

  // 5. Network check (Playwright required — this part requires playwright runtime)
  console.log('[AUTH_SMOKE_CHECK] Static cookie check: PASSED');
  console.log('[AUTH_SMOKE_CHECK] Network live check: SKIPPED (requires Playwright — run with playwright runner for full smoke)');
  console.log('[AUTH_SMOKE_CHECK] Summary: storageState PRESENT and cookies STRUCTURALLY VALID');
  console.log('[AUTH_SMOKE_CHECK] Safe claim: static check only — live session validity not confirmed without browser navigation');

  // 6. Output machine-readable result
  const result = {
    check_timestamp: new Date().toISOString(),
    storage_path: storagePath,
    storage_file_exists: true,
    total_cookies: cookies.length,
    dental_pro_cookies: sessionCookies.length,
    expired_cookies: expired.length,
    session_based_cookies: sessionBased.length,
    valid_timed_cookies: valid.length,
    static_check_passed: expired.length === 0 || sessionBased.length > 0 || valid.length > 0,
    network_check_performed: false,
    verdict: 'static_ok_network_unverified',
    next_step: 'Run with Playwright runner to verify live session: npx playwright test auth_smoke_check.js'
  };
  console.log('[AUTH_SMOKE_CHECK] Result:', JSON.stringify(result, null, 2));
  process.exit(0);
}

runAuthSmokeCheck().catch(e => {
  console.error('[AUTH_SMOKE_CHECK] Unhandled error:', e.message);
  process.exit(3);
});
