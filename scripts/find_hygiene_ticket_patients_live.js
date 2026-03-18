#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { chromium } = require('/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/scripts/lib/playwright');

const BASE = 'https://dcpraktik.dental-pro.online';
const LOGIN = process.env.DP_LOGIN || '';
const PASSWORD = process.env.DP_PASSWORD || '';
const DATE_START = process.env.DP_DATE_START || '2026-03-01';
const DATE_END = process.env.DP_DATE_END || '2026-03-31';
const THRESHOLD = process.env.DP_HYGIENE_THRESHOLD || '2025-10-10';
const LIMIT = Number(process.env.DP_LIMIT || 10);
const OUT_DIR = process.env.DP_OUT_DIR || '/Users/macbook15/Downloads/MacAi/artifacts';

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function parseRuDate(value) {
  const text = clean(value);
  const match = text.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  if (!match) return null;
  return `${match[3]}-${match[2]}-${match[1]}`;
}

function redactUrl(url) {
  return String(url || '')
    .replace(/([?&]token=)[^&]+/g, '$1<redacted>')
    .replace(/([?&]secret=)[^&]+/g, '$1<redacted>');
}

async function fillFirst(page, selectors, value) {
  for (const selector of selectors) {
    const el = page.locator(selector).first();
    if (await el.count()) {
      await el.fill('');
      await el.fill(value);
      return true;
    }
  }
  return false;
}

async function clickFirst(page, selectors) {
  for (const selector of selectors) {
    const el = page.locator(selector).first();
    if (await el.count()) {
      await el.click({ timeout: 5000 });
      return true;
    }
  }
  return false;
}

async function getTokenAndContext() {
  if (!LOGIN || !PASSWORD) throw new Error('Missing DP_LOGIN/DP_PASSWORD');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const loginUrl = `${BASE}/user/login.html?backto=%2Fapisettings%2Fapi%2Findex`;
  const testPageUrl = `${BASE}/apisettings/api/test?method=mobile/schedule`;

  await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForTimeout(500);
  await fillFirst(page, ['input[name="login"]','input[name="username"]','input[type="text"]'], LOGIN);
  await fillFirst(page, ['input[name="password"]','input[type="password"]'], PASSWORD);
  const navPromise = page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => null);
  const clicked = await clickFirst(page, ['button[type="submit"]','input[type="submit"]','button:has-text("Войти")']);
  if (!clicked) await page.keyboard.press('Enter');
  await navPromise;
  await page.goto(testPageUrl, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForTimeout(500);

  const formMeta = await page.evaluate(() => {
    const token = document.querySelector('input[name="token"]');
    const secret = document.querySelector('input[name="secret"]');
    return {
      token: token && token.value ? token.value.trim() : '',
      secret: secret && secret.value ? secret.value.trim() : '',
    };
  });
  if (!formMeta.token || !formMeta.secret) throw new Error('Failed to read token/secret from mobile/schedule test page');

  return { browser, context, token: formMeta.token, secret: formMeta.secret };
}

async function apiGet(request, method, token, secret, params = {}) {
  const search = new URLSearchParams({ token, secret, ...params });
  const url = `${BASE}/api/${method}?${search.toString()}`;
  const res = await request.get(url, { timeout: 120000 });
  const bodyText = await res.text();
  let json = null;
  try {
    json = JSON.parse(bodyText);
  } catch {
    json = null;
  }
  return { ok: res.ok(), status: res.status(), url: redactUrl(url), json, body_excerpt: clean(bodyText).slice(0, 400) };
}

async function fetchSchedule(request, token, secret) {
  const resp = await apiGet(request, 'mobile/schedule', token, secret, {
    date_start: DATE_START,
    date_end: DATE_END,
  });
  if (!resp.ok || !resp.json || !Array.isArray(resp.json.data)) throw new Error('mobile/schedule failed');
  return resp;
}

async function fetchClient(request, token, secret, id) {
  for (const method of ['i/client', 'mobile/client/getByID']) {
    const resp = await apiGet(request, method, token, secret, { id: String(id) });
    if (!resp.ok || !resp.json || resp.json.status === false) continue;
    const data = Array.isArray(resp.json.data) ? resp.json.data[0] : resp.json.data;
    if (data && (data.displayName || data.display_name || data.phone || data.mobile_phone || data.id)) {
      return {
        source_method: method,
        patient_card_url: `${BASE}/cbase/detail.html?id=${id}`,
        data,
      };
    }
  }
  return null;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const { browser, context, token, secret } = await getTokenAndContext();
  const request = context.request;
  try {
    const scheduleResp = await fetchSchedule(request, token, secret);
    const doctors = scheduleResp.json.data;
    const candidates = [];
    for (const doctor of doctors) {
      for (const task of doctor.tasks || []) {
        const icons = Array.isArray(task.icons) ? task.icons : [];
        const hygieneIcon = icons.find((icon) => clean(icon.title).startsWith('Последняя профгигиена:'));
        if (!hygieneIcon) continue;
        const hygieneIso = parseRuDate(hygieneIcon.title);
        if (!hygieneIso || hygieneIso >= THRESHOLD) continue;
        if (!task.patientID) continue;
        candidates.push({
          visit_id: String(task.id || ''),
          patient_id: String(task.patientID),
          patient_name_runtime: clean(task.title || ''),
          doctor_id: String(doctor.id || ''),
          doctor_name: clean(doctor.tooltip || doctor.title || ''),
          date_start: clean(task.date_start),
          date_end: clean(task.date_end),
          service_label: clean(task.body),
          hygiene_ticket_text: clean(hygieneIcon.title),
          hygiene_date: hygieneIso,
          hygiene_icon_class: clean(hygieneIcon.class),
          source: 'mobile/schedule',
          evidence_url: scheduleResp.url,
        });
      }
    }

    const uniquePatientIds = [...new Set(candidates.map((row) => row.patient_id))];
    const enriched = [];
    for (const patientId of uniquePatientIds) {
      const baseRows = candidates.filter((row) => row.patient_id === patientId);
      const card = await fetchClient(request, token, secret, patientId);
      const data = card ? card.data : null;
      const out = {
        patient_id: patientId,
        patient_name_full: clean((data && (data.displayName || data.display_name)) || baseRows[0].patient_name_runtime),
        patient_phone: clean((data && (data.phone || data.mobile_phone)) || ''),
        patient_card_url: card ? card.patient_card_url : '',
        client_lookup_source: card ? card.source_method : '',
        hygiene_date: baseRows.map((r) => r.hygiene_date).sort()[0],
        hygiene_ticket_text: baseRows[0].hygiene_ticket_text,
        visit_count_with_old_hygiene_ticket: baseRows.length,
        sample_visit_id: baseRows[0].visit_id,
        sample_doctor_name: baseRows[0].doctor_name,
        sample_service_label: baseRows[0].service_label,
        first_seen_schedule_start: baseRows.map((r) => r.date_start).sort()[0],
        proof: 'observed_in_api_response',
      };
      enriched.push(out);
      if (enriched.length >= LIMIT) break;
    }

    const out = {
      generated_at: new Date().toISOString(),
      live_run: true,
      date_range: { start: DATE_START, end: DATE_END },
      threshold_date: THRESHOLD,
      source_layer: 'mobile/schedule + i/client/mobile/client/getByID',
      note: 'This is a live operational slice over schedule-visible patients in the selected period, not a proven full CRM-wide patient inventory.',
      total_old_hygiene_task_rows: candidates.length,
      distinct_patient_count: uniquePatientIds.length,
      selected_limit: LIMIT,
      selected_patients: enriched,
    };
    const outPath = path.join(OUT_DIR, `patients_old_hygiene_live_${DATE_START}_to_${DATE_END}.json`);
    fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
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
