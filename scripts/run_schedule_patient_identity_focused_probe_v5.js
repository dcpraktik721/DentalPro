const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const PROJECT_ROOT = '/Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright';
const requireFromProject = createRequire(path.join(PROJECT_ROOT, 'package.json'));
const { chromium } = requireFromProject('@playwright/test');

const STORAGE_STATE = path.join(PROJECT_ROOT, 'auth', 'dentalpro.storage.json');
const ART_DIR = '/Users/macbook15/Downloads/MacAi/artifacts';
const TARGET_DATE = '2026-03-10';
const SCHEDULE_URL = `https://dcpraktik.dental-pro.online/visits/schedule/index?date=${TARGET_DATE}`;
const VISITS_PATH = path.join(ART_DIR, `schedule_${TARGET_DATE}_visits.json`);
const BASE_IDENTITY_PATH = path.join(ART_DIR, `schedule_${TARGET_DATE}_patient_identity_probe_v4.json`);
const OUT_FILE = path.join(ART_DIR, `schedule_${TARGET_DATE}_patient_identity_probe_v5.json`);

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function surname(value) {
  return clean(value).split(' ')[0] || '';
}

function parsePhones(text) {
  const matches = clean(text).match(/(?:\+?7|8)\d{10}/g) || [];
  const uniq = [...new Set(matches)];
  return {
    phone_primary: uniq[0] || '',
    phone_secondary: uniq[1] || '',
    phone_raw: uniq.join('; '),
  };
}

async function closeTransientLayers(page) {
  for (let i = 0; i < 3; i += 1) {
    await page.keyboard.press('Escape').catch(() => {});
    await page.locator('body').click({ position: { x: 10, y: 10 }, force: true }).catch(() => {});
    await page.waitForTimeout(120);
  }
}

async function getMatchingPopup(page, taskPatientName) {
  const layers = await page.evaluate(() => {
    const cleanLocal = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
    return Array.from(document.querySelectorAll('.popover.show, .tooltip.show, .dropdown-menu.show, .modal.show, [role="dialog"]')).map((el, index) => ({
      index,
      selector: el.matches('.popover.show')
        ? '.popover.show'
        : el.matches('.tooltip.show')
          ? '.tooltip.show'
          : el.matches('.dropdown-menu.show')
            ? '.dropdown-menu.show'
            : el.matches('.modal.show')
              ? '.modal.show'
              : '[role="dialog"]',
      class_name: el.className || '',
      text: cleanLocal(el.innerText).slice(0, 2500),
      header_name: cleanLocal(el.querySelector('.sheduler_popover_header_name')?.textContent || ''),
      buttons: Array.from(el.querySelectorAll('button, a, [role="button"]')).map((node) => cleanLocal(node.innerText)).filter(Boolean),
    }));
  });

  const matched = layers.find((layer) => {
    if (!layer.text) return false;
    if (taskPatientName === 'Резерв для пациента' || taskPatientName === 'Обед') return layer.text.includes(taskPatientName);
    return surname(layer.header_name || layer.text) === surname(taskPatientName) || layer.text.includes(taskPatientName);
  });

  return { matched, layers };
}

async function openPopupByStrategy(page, visitId, patientName) {
  const strategies = [
    { method: 'task_click', selector: `#task-record-${visitId}` },
    { method: 'task_hover', selector: `#task-record-${visitId}` , action: 'hover'},
    { method: 'taskDnD_click', selector: `#task-record-${visitId} .taskDnD` },
    { method: 'taskDnD_hover', selector: `#task-record-${visitId} .taskDnD`, action: 'hover' },
    { method: 'taskIcons_click', selector: `#task-record-${visitId} .task-icons` },
    { method: 'taskTitle_click', selector: `#task-record-${visitId} .task-title-element` },
  ];

  for (const strategy of strategies) {
    const locator = page.locator(strategy.selector);
    if (await locator.count() === 0) continue;
    try {
      await locator.scrollIntoViewIfNeeded().catch(() => {});
      if (strategy.action === 'hover') {
        await locator.hover({ force: true });
      } else {
        await locator.click({ force: true });
      }
      await page.waitForTimeout(450);
      const { matched, layers } = await getMatchingPopup(page, patientName);
      if (matched) {
        return { strategy: strategy.method, matched, layers };
      }
    } catch (error) {
      // continue to next strategy
    }
    await closeTransientLayers(page);
  }
  const { layers } = await getMatchingPopup(page, patientName);
  return { strategy: 'none_worked', matched: null, layers };
}

async function probeVisit(page, visit, existing) {
  if (visit.patient_name === 'Резерв для пациента' || visit.patient_name === 'Обед') {
    return {
      ...existing,
      patient_id_proof: 'not_applicable_service_row',
      patient_card_url_proof: 'not_applicable_service_row',
      notes: [...(existing.notes || []), 'service row, patient_id not applicable'],
      evidence: `schedule_patient_identity_probe_v5:${visit.visit_id}`,
    };
  }

  await page.goto(SCHEDULE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await closeTransientLayers(page);
  const result = await openPopupByStrategy(page, visit.visit_id, visit.patient_name);
  const base = {
    ...existing,
    trigger_method: result.strategy,
    popup_observed: !!result.matched,
    popup_layer_count: result.layers.length,
    popup_linkage_state: result.matched ? 'proven_popup_linkage' : result.layers.length ? 'stale_or_unmatched_layer' : 'no_layer_observed',
    evidence: `schedule_patient_identity_probe_v5:${visit.visit_id}`,
  };

  if (!result.matched) return base;

  const phones = parsePhones(result.matched.text);
  const buttons = result.matched.buttons || [];
  base.patient_name_full = result.matched.header_name || base.patient_name_full || '';
  base.patient_name_full_proof = base.patient_name_full ? 'proven' : base.patient_name_full_proof;
  base.patient_phone_primary = phones.phone_primary || base.patient_phone_primary || '';
  base.patient_phone_secondary = phones.phone_secondary || base.patient_phone_secondary || '';
  base.patient_phone_raw = phones.phone_raw || base.patient_phone_raw || '';
  if (phones.phone_primary) {
    base.patient_contact_proof = 'proven';
    base.patient_contact_source = 'schedule_popup_text';
  }
  base.patient_identity_source_layer = 'schedule_popup';
  base.patient_identity_linkage_method = `focused_probe_v5:${result.strategy}`;
  base.popup_phone_detected = phones.phone_primary ? 'yes' : base.popup_phone_detected;
  base.popup_has_patient_info_button = buttons.includes('Информация о пациенте') ? 'yes' : 'no';
  base.popup_has_ambcard_button = buttons.includes('Амбулаторная карта') ? 'yes' : 'no';
  base.popup_has_treatment_plan_button = buttons.includes('План лечения') ? 'yes' : 'no';
  base.popup_has_questionnaire_button = buttons.includes('Заполнить анкету') ? 'yes' : 'no';
  base.popup_has_visit_result_action =
    buttons.includes('Отметить результат посещения') || buttons.includes('Пациент пришёл') || buttons.includes('Пациент не пришёл')
      ? 'yes'
      : 'no';
  base.popup_actions_raw = buttons.join('; ');

  if (base.popup_has_patient_info_button === 'yes') {
    try {
      await page.locator('.popover.show button.btn-scheduler-popup', { hasText: 'Информация о пациенте' }).first().click({ force: true, timeout: 5000 });
      await page.waitForTimeout(1200);
      const afterUrl = page.url();
      const patientIdMatch = afterUrl.match(/\/cbase\/detail\.html\?id=(\d+)/);
      if (patientIdMatch) {
        base.patient_id = patientIdMatch[1];
        base.patient_id_proof = 'proven';
        base.patient_card_url = afterUrl;
        base.patient_card_url_proof = 'proven';
        base.notes = [...(base.notes || []).filter((x) => !/did not yield/.test(x)), 'patient_id proven by focused v5 patient-info action'];
      } else {
        base.notes = [...(base.notes || []), 'focused v5 patient-info action still did not yield direct cbase/detail id'];
      }
    } catch (error) {
      base.notes = [...(base.notes || []), `focused v5 patient-info click error: ${clean(String(error)).slice(0, 200)}`];
    }
  }

  return base;
}

async function main() {
  const visits = JSON.parse(fs.readFileSync(VISITS_PATH, 'utf-8'));
  const base = JSON.parse(fs.readFileSync(BASE_IDENTITY_PATH, 'utf-8'));
  const unresolvedIds = new Set(base.filter((row) => !row.patient_id).map((row) => row.visit_id));
  const visitMap = new Map(visits.map((v) => [v.visit_id, v]));
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    storageState: STORAGE_STATE,
    viewport: { width: 1600, height: 1200 },
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();

  const merged = [];
  for (const row of base) {
    if (!unresolvedIds.has(row.visit_id)) {
      merged.push({ ...row, evidence: row.evidence || `schedule_patient_identity_probe_v4:${row.visit_id}` });
      continue;
    }
    merged.push(await probeVisit(page, visitMap.get(row.visit_id), row));
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(merged, null, 2), 'utf-8');
  await browser.close();
  console.log(OUT_FILE);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
