const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const PROJECT_ROOT = '/Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright';
const requireFromProject = createRequire(path.join(PROJECT_ROOT, 'package.json'));
const { chromium } = requireFromProject('@playwright/test');

const BASE_URL = 'https://dcpraktik.dental-pro.online';
const STORAGE_STATE = path.join(PROJECT_ROOT, 'auth', 'dentalpro.storage.json');
const REPO_ROOT = '/Users/macbook15/Downloads/MacAi/DentalPro';
const OUT_FILE = path.join(REPO_ROOT, 'runtime', 'auth_refresh_result.json');

const LOGIN = process.env.DP_LOGIN || '';
const PASSWORD = process.env.DP_PASSWORD || '';

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

async function fillFirst(page, selectors, value) {
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    if (await locator.count()) {
      await locator.fill('');
      await locator.fill(value);
      return selector;
    }
  }
  return null;
}

async function clickFirst(page, selectors) {
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    if (await locator.count()) {
      await locator.click({ timeout: 5000 });
      return selector;
    }
  }
  return null;
}

async function main() {
  if (!LOGIN || !PASSWORD) {
    throw new Error('Missing DP_LOGIN/DP_PASSWORD in environment');
  }

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.mkdirSync(path.dirname(STORAGE_STATE), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();

  const result = {
    generated_at: new Date().toISOString(),
    base_url: BASE_URL,
    storage_state_path: STORAGE_STATE,
    login_page_url: `${BASE_URL}/user/login.html?backto=%2Fvisits%2Fschedule%2Findex%3Fdate%3D2026-03-10`,
    login_selector_used: null,
    password_selector_used: null,
    submit_selector_used: null,
    final_url: '',
    title: '',
    authenticated: false,
    schedule_root_present: false,
    status: 'unknown',
    notes: [],
  };

  try {
    await page.goto(result.login_page_url, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForTimeout(500);

    result.login_selector_used = await fillFirst(page, ['input[name="login"]', 'input[name="username"]', 'input[type="text"]'], LOGIN);
    result.password_selector_used = await fillFirst(page, ['input[name="password"]', 'input[type="password"]'], PASSWORD);

    if (!result.login_selector_used || !result.password_selector_used) {
      throw new Error('Login form selectors were not found');
    }

    const navPromise = page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => null);
    result.submit_selector_used = await clickFirst(page, ['button[type="submit"]', 'input[type="submit"]', 'button:has-text("Войти")']);
    if (!result.submit_selector_used) {
      await page.keyboard.press('Enter');
      result.submit_selector_used = 'keyboard:Enter';
    }
    await navPromise;
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

    const probeUrl = `${BASE_URL}/visits/schedule/index?date=2026-03-10`;
    await page.goto(probeUrl, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

    const pageState = await page.evaluate(() => ({
      final_url: location.href,
      title: document.title,
      schedule_root_present: Boolean(document.querySelector('#schedule-day-container')),
      login_like: Boolean(document.querySelector('input[type="password"], input[name="password"], form[action*="login"]')),
    }));

    result.final_url = clean(pageState.final_url);
    result.title = clean(pageState.title);
    result.schedule_root_present = Boolean(pageState.schedule_root_present);
    result.authenticated = result.schedule_root_present && !pageState.login_like;
    result.status = result.authenticated ? 'refreshed' : 'failed';

    if (result.authenticated) {
      await context.storageState({ path: STORAGE_STATE });
      const stats = fs.statSync(STORAGE_STATE);
      result.notes.push(`storageState saved (${stats.size} bytes)`);
    } else {
      result.notes.push('post-login probe did not reach authenticated schedule page');
    }

    fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 2), 'utf-8');
    console.log(OUT_FILE);
  } finally {
    await context.close().catch(() => null);
    await browser.close().catch(() => null);
  }
}

main().catch((error) => {
  const output = {
    generated_at: new Date().toISOString(),
    base_url: BASE_URL,
    storage_state_path: STORAGE_STATE,
    status: 'error',
    error: clean(error && error.stack ? error.stack : String(error)),
  };
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2), 'utf-8');
  console.error(output.error);
  process.exit(1);
});
