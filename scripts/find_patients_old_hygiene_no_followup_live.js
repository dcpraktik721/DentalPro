#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { chromium } = require('/Users/macbook15/Downloads/YDIREKT code/projects/dentalpro-integration/scripts/lib/playwright');

const BASE = 'https://dcpraktik.dental-pro.online';
const LOGIN = process.env.DP_LOGIN || '';
const PASSWORD = process.env.DP_PASSWORD || '';
const DATE_START = process.env.DP_DATE_START || '2025-10-10';
const DATE_END = process.env.DP_DATE_END || '2026-03-18';
const THRESHOLD = process.env.DP_HYGIENE_THRESHOLD || '2025-10-10';
const OUT_DIR = process.env.DP_OUT_DIR || '/Users/macbook15/Downloads/MacAi/artifacts';

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function redactUrl(url) {
  return String(url || '')
    .replace(/([?&]token=)[^&]+/g, '$1<redacted>')
    .replace(/([?&]secret=)[^&]+/g, '$1<redacted>');
}

function parseRuDateFromTicket(value) {
  const text = clean(value);
  const match = text.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  if (!match) return null;
  return `${match[3]}-${match[2]}-${match[1]}`;
}

function extractDateOnly(value) {
  const text = clean(value);
  if (!text) return '';
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);
  return text;
}

function isHygienistVisit(task, doctorName = '') {
  const hay = `${clean(task.body)} ${clean(task.title)} ${clean(doctorName)}`.toLowerCase();
  return hay.includes('гигиен');
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
  await fillFirst(page, ['input[name="login"]', 'input[name="username"]', 'input[type="text"]'], LOGIN);
  await fillFirst(page, ['input[name="password"]', 'input[type="password"]'], PASSWORD);
  const navPromise = page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => null);
  const clicked = await clickFirst(page, ['button[type="submit"]', 'input[type="submit"]', 'button:has-text("Войти")']);
  if (!clicked) await page.keyboard.press('Enter');
  await navPromise;

  await page.goto(testPageUrl, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForTimeout(500);
  const meta = await page.evaluate(() => {
    const token = document.querySelector('input[name="token"]');
    const secret = document.querySelector('input[name="secret"]');
    return {
      token: token && token.value ? token.value.trim() : '',
      secret: secret && secret.value ? secret.value.trim() : '',
    };
  });
  if (!meta.token || !meta.secret) throw new Error('Failed to read token/secret from mobile/schedule test page');
  return { browser, context, token: meta.token, secret: meta.secret };
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
    const tasks = [];

    for (const doctor of doctors) {
      const doctorName = clean(doctor.tooltip || doctor.title || '');
      for (const task of doctor.tasks || []) {
        if (!task.patientID) continue;
        const icons = Array.isArray(task.icons) ? task.icons : [];
        const hygieneTicket = icons.find((icon) => clean(icon.title).startsWith('Последняя профгигиена:'));
        tasks.push({
          visit_id: String(task.id || ''),
          patient_id: String(task.patientID),
          patient_name_runtime: clean(task.title || ''),
          doctor_id: String(doctor.id || ''),
          doctor_name: doctorName,
          task_start_date: extractDateOnly(task.date_start),
          task_start_raw: clean(task.date_start),
          task_end_raw: clean(task.date_end),
          task_body: clean(task.body),
          has_hygiene_ticket: Boolean(hygieneTicket),
          hygiene_ticket_text: hygieneTicket ? clean(hygieneTicket.title) : '',
          hygiene_ticket_date: hygieneTicket ? parseRuDateFromTicket(hygieneTicket.title) : null,
          hygiene_icon_class: hygieneTicket ? clean(hygieneTicket.class) : '',
          is_hygienist_visit: isHygienistVisit(task, doctorName),
        });
      }
    }

    const byPatient = new Map();
    for (const task of tasks) {
      if (!byPatient.has(task.patient_id)) byPatient.set(task.patient_id, []);
      byPatient.get(task.patient_id).push(task);
    }

    const candidates = [];
    for (const [patientId, patientTasks] of byPatient.entries()) {
      const ticketRows = patientTasks.filter((row) => row.hygiene_ticket_date && row.hygiene_ticket_date < THRESHOLD);
      if (!ticketRows.length) continue;

      const latestObservedOldTicket = ticketRows
        .map((row) => row.hygiene_ticket_date)
        .sort()
        .slice(-1)[0];
      const latestObservedOldTicketRow = ticketRows
        .filter((row) => row.hygiene_ticket_date === latestObservedOldTicket)
        .sort((a, b) => a.task_start_date.localeCompare(b.task_start_date))
        .slice(-1)[0];

      const laterHygienistVisits = patientTasks
        .filter((row) => row.is_hygienist_visit && row.task_start_date > THRESHOLD)
        .sort((a, b) => a.task_start_date.localeCompare(b.task_start_date));

      candidates.push({
        patient_id: patientId,
        patient_name_runtime: ticketRows[0].patient_name_runtime,
        hygiene_ticket_date: latestObservedOldTicket,
        hygiene_ticket_text: latestObservedOldTicketRow?.hygiene_ticket_text || ticketRows[0].hygiene_ticket_text,
        observed_doctor_name: latestObservedOldTicketRow?.doctor_name || ticketRows[0].doctor_name,
        observed_visit_id: latestObservedOldTicketRow?.visit_id || ticketRows[0].visit_id,
        observed_service_label: latestObservedOldTicketRow?.task_body || ticketRows[0].task_body,
        had_hygienist_visit_after_threshold: laterHygienistVisits.length > 0 ? 'yes' : 'no',
        last_hygienist_visit_date: laterHygienistVisits.length ? laterHygienistVisits.slice(-1)[0].task_start_date : '',
        hygienist_doctor: laterHygienistVisits.length ? laterHygienistVisits.slice(-1)[0].doctor_name : '',
        source_of_check: 'mobile/schedule',
        proof_status: 'observed_in_api_response',
        observed_task_count_in_range: patientTasks.length,
        observed_old_hygiene_ticket_rows: ticketRows.length,
      });
    }

    const filtered = candidates
      .filter((row) => row.had_hygienist_visit_after_threshold === 'no')
      .sort((a, b) => (a.hygiene_ticket_date || '').localeCompare(b.hygiene_ticket_date || ''));

    const patientIds = filtered.map((row) => row.patient_id);
    const lookups = {};
    for (const id of patientIds) {
      const card = await fetchClient(request, token, secret, id);
      lookups[id] = card
        ? {
            patient_name_full: clean(card.data.displayName || card.data.display_name),
            patient_phone: clean(card.data.phone || card.data.mobile_phone),
            patient_card_url: card.patient_card_url,
            client_lookup_source: card.source_method,
          }
        : {
            patient_name_full: '',
            patient_phone: '',
            patient_card_url: '',
            client_lookup_source: '',
          };
    }

    const resultRows = filtered.map((row) => ({
      patient_id: row.patient_id,
      patient_name_full: lookups[row.patient_id].patient_name_full || row.patient_name_runtime,
      patient_phone: lookups[row.patient_id].patient_phone,
      hygiene_ticket_date: row.hygiene_ticket_date,
      had_hygienist_visit_after_threshold: row.had_hygienist_visit_after_threshold,
      last_hygienist_visit_date: row.last_hygienist_visit_date,
      hygienist_doctor: row.hygienist_doctor,
      observed_doctor_name: row.observed_doctor_name,
      observed_visit_id: row.observed_visit_id,
      observed_service_label: row.observed_service_label,
      source_of_check: row.source_of_check + (lookups[row.patient_id].client_lookup_source ? ` + ${lookups[row.patient_id].client_lookup_source}` : ''),
      proof_status: row.proof_status,
      patient_card_url: lookups[row.patient_id].patient_card_url,
      hygiene_ticket_text: row.hygiene_ticket_text,
      observed_task_count_in_range: row.observed_task_count_in_range,
      observed_old_hygiene_ticket_rows: row.observed_old_hygiene_ticket_rows,
    }));

    const out = {
      generated_at: new Date().toISOString(),
      live_run: true,
      threshold_date: THRESHOLD,
      schedule_window: { start: DATE_START, end: DATE_END },
      patient_universe_boundary:
        'Patients observed in live mobile/schedule within the selected date window. A full CRM-wide patient source with proven hygiene-ticket coverage was not established in this pass.',
      hygienist_visit_rule:
        "Task counted as hygienist visit if mobile/schedule task body/title/doctor runtime text contains 'гигиен'.",
      total_task_rows_scanned: tasks.length,
      distinct_patients_in_window: byPatient.size,
      patients_with_old_hygiene_ticket: candidates.length,
      patients_with_old_hygiene_ticket_and_no_hygienist_visit_after_threshold: resultRows.length,
      rows: resultRows,
    };

    const outPath = path.join(OUT_DIR, `patients_old_hygiene_no_followup_live_${DATE_START}_to_${DATE_END}.json`);
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
