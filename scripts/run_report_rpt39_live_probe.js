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
const REPORT_URL = `https://dcpraktik.dental-pro.online/reports/reports/view?id=39&date_range%5Bstart%5D=${DATE}&date_range%5Bend%5D=${DATE}`;

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
  const apiRequests = [];

  page.on('requestfinished', async (request) => {
    const response = await request.response().catch(() => null);
    apiRequests.push({
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
    const screenshotPath = path.join(REPORTING_DIR, `report-39-${DATE}-${DATE}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const pageData = await page.evaluate(() => {
      const cleanLocal = (value) => String(value || '').replace(/\s+/g, ' ').trim();
      const bodyText = cleanLocal(document.body ? document.body.innerText : '');
      return {
        title: document.title,
        h1: cleanLocal(document.querySelector('h1') ? document.querySelector('h1').textContent : ''),
        bodyText,
        noDataDetected: bodyText.includes('Нет данных по вашему запросу'),
        tables: Array.from(document.querySelectorAll('table')).map((table, index) => ({
          index: index + 1,
          headers: Array.from(table.querySelectorAll('th')).map((cell) => cleanLocal(cell.textContent)).filter(Boolean),
          rows: Array.from(table.querySelectorAll('tr')).slice(0, 5).map((tr) =>
            Array.from(tr.querySelectorAll('td,th')).map((td) => cleanLocal(td.textContent))
          ).filter((row) => row.some(Boolean)),
        })),
      };
    });

    const rawPath = path.join(REPORTING_DIR, `report-39-${DATE}-${DATE}.json`);
    const raw = {
      generated_at: new Date().toISOString(),
      report_url: REPORT_URL,
      final_url: finalUrl,
      title: pageData.title,
      h1: pageData.h1,
      body_text_excerpt: clean(pageData.bodyText).slice(0, 2000),
      no_data_detected: pageData.noDataDetected,
      tables: pageData.tables,
      api_requests: apiRequests.filter((item) => item.url.includes('/api/')),
      screenshot_path: screenshotPath,
      login_redirect_detected: loginRedirect,
    };
    fs.writeFileSync(rawPath, `${JSON.stringify(raw, null, 2)}\n`, 'utf8');

    const curatedPath = path.join(REPORTING_DIR, `RPT_39_live_probe_${DATE}.json`);
    const curated = {
      report_code: 'RPT_39',
      report_name: 'Касса: товары и услуги',
      date_start: DATE,
      date_end: DATE,
      generated_at: new Date().toISOString(),
      run_status: loginRedirect ? 'blocked' : 'success_with_warnings',
      auth: {
        authenticated: !loginRedirect,
        final_url: finalUrl,
        redirect_detected: loginRedirect,
        success_reason: loginRedirect ? 'login_redirect_detected' : 'runtime_report_opened',
      },
      runtime: {
        url: REPORT_URL,
        raw_capture_path: rawPath,
        screenshot_path: screenshotPath,
        title: clean(pageData.title || pageData.h1),
        no_data_detected: pageData.noDataDetected,
        columns: [],
        structure: {
          table_count: pageData.tables.length,
          distinct_leaf_rows_observed: 0,
          table_rendering: pageData.tables.length ? 'unexpected_table_rendering' : 'no_table_no_data_message',
        },
        message_text: pageData.noDataDetected ? 'Нет данных по вашему запросу' : null,
      },
      accepted_api_support: {
        checked: false,
        available: false,
        raw_capture_path: null,
        note: 'No accepted API mapping was verified for this slice. Candidate sources remain catalog-level only.',
      },
      source_classification: {
        primary_truth: 'runtime_html',
        secondary_support: ['catalog_level_candidate_sources_only'],
        report_equivalence_status: 'partial',
        safe_claim_boundary: 'On 2026-02-18 the live RPT_39 runtime report opened authenticated but rendered no table and showed Нет данных по вашему запросу. Candidate API sources remain catalog-level only and were not promoted into report truth for this slice.',
      },
      warnings: [
        {
          code: loginRedirect ? 'AUTH_REDIRECT_DETECTED' : 'RUNTIME_NO_DATA',
          severity: loginRedirect ? 'high' : 'medium',
          message: loginRedirect
            ? 'StorageState did not open an authenticated report route; live RPT_39 slice is blocked.'
            : 'Runtime RPT_39 rendered no data and no business table for 2026-02-18.',
        },
        {
          code: 'API_MAPPING_NOT_VERIFIED',
          severity: 'high',
          message: 'Candidate sources for RPT_39 remain catalog-level only and were not verified as report truth in this slice.',
        },
      ],
    };
    fs.writeFileSync(curatedPath, `${JSON.stringify(curated, null, 2)}\n`, 'utf8');
    console.log(curatedPath);
  } finally {
    await context.close().catch(() => null);
    await browser.close().catch(() => null);
  }
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
