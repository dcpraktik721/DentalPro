#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const PROJECT_ROOT = '/Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright';
const requireFromProject = createRequire(path.join(PROJECT_ROOT, 'package.json'));
const { chromium } = requireFromProject('@playwright/test');

const REPO_ROOT = '/Users/macbook15/Downloads/MacAi/DentalPro';
const REPORTING_DIR = path.join(REPO_ROOT, 'reporting');
const STORAGE_STATE = path.join(PROJECT_ROOT, 'auth', 'dentalpro.storage.json');
const DATE = process.env.DP_DATE || '2026-02-18';
const REPORT_URL = `https://dcpraktik.dental-pro.online/reports/reports/view?id=4&date_range%5Bstart%5D=${DATE}&date_range%5Bend%5D=${DATE}`;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

async function main() {
  ensureDir(REPORTING_DIR);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    storageState: STORAGE_STATE,
    viewport: { width: 1600, height: 1400 },
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  const requests = [];

  page.on('requestfinished', async (request) => {
    const response = await request.response().catch(() => null);
    requests.push({
      method: request.method(),
      resourceType: request.resourceType(),
      url: request.url().replace(/([?&]token=)[^&]+/g, '$1<redacted>').replace(/([?&]secret=)[^&]+/g, '$1<redacted>'),
      status: response ? response.status() : null,
    });
  });

  try {
    await page.goto(REPORT_URL, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => null);
    await page.waitForTimeout(1500);

    const finalUrl = page.url();
    const loginRedirect = finalUrl.includes('/user/login');
    const screenshotPath = path.join(REPORTING_DIR, `report-4-${DATE}-${DATE}-date_range.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const payload = await page.evaluate(() => {
      const cleanLocal = (value) => String(value || '').replace(/\s+/g, ' ').trim();
      const forms = Array.from(document.querySelectorAll('form')).map((form) => ({
        id: form.id || '',
        action: form.getAttribute('action') || '',
        method: (form.getAttribute('method') || 'GET').toUpperCase(),
        fields: Array.from(form.querySelectorAll('input,select,textarea')).map((el) => ({
          tag: el.tagName.toLowerCase(),
          type: el.getAttribute('type') || '',
          name: el.getAttribute('name') || '',
          value: el.value || el.getAttribute('value') || '',
          placeholder: el.getAttribute('placeholder') || '',
        })),
      }));

      const htmlTables = Array.from(document.querySelectorAll('table')).map((table, index) => ({
        index: index + 1,
        headers: Array.from(table.querySelectorAll('th')).map((cell) => cleanLocal(cell.textContent)).filter(Boolean),
        rows: Array.from(table.querySelectorAll('tr')).map((tr) =>
          Array.from(tr.querySelectorAll('td,th')).map((td) => cleanLocal(td.textContent))
        ).filter((row) => row.some(Boolean)),
      }));

      return {
        title: document.title,
        h1: cleanLocal(document.querySelector('h1') ? document.querySelector('h1').textContent : ''),
        bodyText: cleanLocal(document.body ? document.body.innerText : ''),
        forms,
        htmlTables,
      };
    });

    const outPath = path.join(REPORTING_DIR, `report-4-${DATE}-${DATE}-date_range.json`);
    const report = {
      generated_at: new Date().toISOString(),
      report_id: 4,
      report_url: REPORT_URL,
      screenshot: screenshotPath,
      page: {
        title: payload.title,
        h1: payload.h1,
        final_url: finalUrl,
        login_redirect_detected: loginRedirect,
      },
      forms: payload.forms,
      flex_tables: [],
      html_tables: payload.htmlTables,
      api_requests: requests.filter((item) => item.url.includes('/api/')),
      requests,
      body_excerpt: clean(payload.bodyText).slice(0, 2000),
    };

    fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
    console.log(outPath);
  } finally {
    await context.close().catch(() => null);
    await browser.close().catch(() => null);
  }
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
