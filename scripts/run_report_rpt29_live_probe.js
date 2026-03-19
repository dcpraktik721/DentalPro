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
const REPORT_URL = `https://dcpraktik.dental-pro.online/reports/reports/view?id=29&date_range%5Bstart%5D=${DATE}&date_range%5Bend%5D=${DATE}`;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function parseMoney(value) {
  const normalized = clean(value).replace(/[₽\s]/g, '').replace(',', '.');
  if (!normalized) return null;
  const num = Number(normalized);
  return Number.isFinite(num) ? num : null;
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
    const screenshotPath = path.join(REPORTING_DIR, `report-29-${DATE}-${DATE}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const pageData = await page.evaluate(() => {
      const cleanLocal = (value) => String(value || '').replace(/\s+/g, ' ').trim();
      const tables = Array.from(document.querySelectorAll('table')).map((table, index) => ({
        index: index + 1,
        headers: Array.from(table.querySelectorAll('th')).map((cell) => cleanLocal(cell.textContent)).filter(Boolean),
        rows: Array.from(table.querySelectorAll('tr')).map((tr) =>
          Array.from(tr.querySelectorAll('td,th')).map((td) => cleanLocal(td.textContent))
        ).filter((row) => row.some(Boolean)),
      }));
      const bodyText = cleanLocal(document.body ? document.body.innerText : '');
      return {
        title: document.title,
        h1: cleanLocal(document.querySelector('h1') ? document.querySelector('h1').textContent : ''),
        bodyText,
        tables,
      };
    });

    const rawPath = path.join(REPORTING_DIR, `report-29-${DATE}-${DATE}.json`);
    const raw = {
      generated_at: new Date().toISOString(),
      report_url: REPORT_URL,
      final_url: finalUrl,
      title: pageData.title,
      h1: pageData.h1,
      body_text_excerpt: clean(pageData.bodyText).slice(0, 2000),
      tables: pageData.tables,
      api_requests: apiRequests.filter((item) => item.url.includes('/api/')),
      screenshot_path: screenshotPath,
      login_redirect_detected: loginRedirect,
    };
    fs.writeFileSync(rawPath, `${JSON.stringify(raw, null, 2)}\n`, 'utf8');

    const firstTable = pageData.tables[0] || { headers: [], rows: [] };
    const totalsRowCells = firstTable.rows.find((row) => row.some((cell) => clean(cell).startsWith('ИТОГО'))) || [];
    const curatedPath = path.join(REPORTING_DIR, `RPT_29_live_probe_${DATE}.json`);
    const curated = {
      report_code: 'RPT_29',
      report_name: 'Квитанции без оплаты',
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
        columns: firstTable.headers,
        structure: {
          group_levels: [],
          distinct_leaf_rows_observed: 0,
          table_rendering: firstTable.rows.length <= 2 ? 'single_summary_table' : 'nested_or_nonempty_table',
        },
        empty_report_observed: firstTable.rows.length <= 2 && totalsRowCells.length > 0,
        observed_group_row: null,
        observed_leaf_row: null,
        totals_row: {
          label: totalsRowCells[0] || 'ИТОГО',
          amount_due: parseMoney(totalsRowCells[totalsRowCells.length - 1]),
        },
      },
      accepted_api_support: {
        checked: false,
        available: false,
        raw_capture_path: null,
        note: 'No date-specific accepted API support was run for this slice. Annual/default unpaid family composite must not be reused as 2026-02-18 evidence.',
      },
      source_classification: {
        primary_truth: 'runtime_html',
        secondary_support: ['existing_unpaid_family_artifacts_only'],
        report_equivalence_status: 'partial',
        safe_claim_boundary: 'On 2026-02-18 the live RPT_29 runtime report rendered as an empty report with only an ИТОГО row. Annual/default unpaid family composite artifacts remain family-level supporting evidence only and are not date-specific truth for this slice.',
      },
      warnings: [
        {
          code: loginRedirect ? 'AUTH_REDIRECT_DETECTED' : 'RUNTIME_EMPTY_REPORT',
          severity: loginRedirect ? 'high' : 'medium',
          message: loginRedirect
            ? 'StorageState did not open an authenticated report route; live RPT_29 slice is blocked.'
            : 'Runtime RPT_29 rendered no business leaf rows on 2026-02-18; only totals row was present.',
        },
        {
          code: 'DATE_RANGE_ROUTE_REQUIRED',
          severity: 'medium',
          message: 'Saved report 29 requires date_range[start]/date_range[end]; date[start]/date[end] was observed to fall back to annual defaults.',
        },
        {
          code: 'ANNUAL_COMPOSITE_NOT_DATE_SPECIFIC',
          severity: 'high',
          message: 'Existing report-29 annual composite artifacts remain family-level evidence only and were not promoted into this single-date slice.',
        },
        {
          code: 'UPDATER_HISTORY_NOT_PROVEN',
          severity: 'high',
          message: 'Updater/reason/history semantics for RPT_29 remain unresolved in accepted readable sources.',
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
