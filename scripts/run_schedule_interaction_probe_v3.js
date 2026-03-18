const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const PROJECT_ROOT = '/Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright';
const requireFromProject = createRequire(path.join(PROJECT_ROOT, 'package.json'));
const { chromium } = requireFromProject('@playwright/test');

const STORAGE_STATE = path.join(PROJECT_ROOT, 'auth', 'dentalpro.storage.json');
const OUT_DIR = '/Users/macbook15/Downloads/MacAi/artifacts';
const TARGET_DATE = '2026-03-10';
const SCHEDULE_URL = `https://dcpraktik.dental-pro.online/visits/schedule/index?date=${TARGET_DATE}`;
const OUT_FILE = path.join(OUT_DIR, `schedule_${TARGET_DATE}_popup_linkage_v3.json`);

const CASES = [
  { family: 'standard_paid_followup', visit_id: '130410' },
  { family: 'no_show_mini', visit_id: '129734' },
  { family: 'online_booking_variant_paid', visit_id: '130231' },
  { family: 'online_booking_variant_unpaid', visit_id: '130329' },
  { family: 'reserve_slot', visit_id: '129505' },
  { family: 'treatment_ticket_outdated', visit_id: '130215' },
  { family: 'ortho_without_paid_icon', visit_id: '130119' },
  { family: 'reversal_mini', visit_id: '130087' },
  { family: 'mini_paid_orthodontic', visit_id: '130053' },
  { family: 'mini_primary_consultation', visit_id: '130195' },
  { family: 'stress_error_family', visit_id: '129821' },
  { family: 'status_open_family', visit_id: '130422' },
];

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function surname(value) {
  return clean(value).split(' ')[0] || '';
}

async function closeTransientLayers(page) {
  for (let i = 0; i < 3; i += 1) {
    await page.keyboard.press('Escape').catch(() => {});
    await page.locator('body').click({ position: { x: 10, y: 10 }, force: true }).catch(() => {});
    await page.waitForTimeout(120);
  }
}

async function getVisibleLayers(page) {
  return page.evaluate(() => {
    const cleanLocal = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
    const selectors = ['.popover.show', '.tooltip.show', '.dropdown-menu.show', '.modal.show', '[role="dialog"]'];
    return selectors.flatMap((selector) =>
      Array.from(document.querySelectorAll(selector)).map((el, index) => ({
        selector,
        index,
        class_name: el.className || '',
        text: cleanLocal(el.innerText).slice(0, 1800),
        buttons: Array.from(el.querySelectorAll('button, a, [role="button"]'))
          .map((node) => cleanLocal(node.innerText))
          .filter(Boolean),
        html_preview: (el.outerHTML || '').slice(0, 1800),
      })),
    );
  });
}

async function probeCase(page, testCase) {
  const selector = `#task-record-${testCase.visit_id}`;
  await page.goto(SCHEDULE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await closeTransientLayers(page);

  const task = page.locator(selector);
  await task.waitFor({ state: 'visible', timeout: 15000 });
  await task.scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);

  const taskData = await task.evaluate((node) => {
    const cleanLocal = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
    const attrs = {};
    for (const name of node.getAttributeNames()) attrs[name] = node.getAttribute(name);
    return {
      task_text: cleanLocal(node.innerText),
      task_html_preview: (node.outerHTML || '').slice(0, 1600),
      task_patient_name: cleanLocal(node.querySelector('.task-title-element')?.textContent || node.innerText.split('\n')[0]),
      attributes: attrs,
      icon_classes: Array.from(node.querySelectorAll('i')).map((el) => el.className || '').filter(Boolean),
    };
  });

  await task.click({ force: true });
  await page.waitForTimeout(450);
  let layers = await getVisibleLayers(page);
  let trigger_method = 'click';
  if (!layers.length) {
    await task.hover({ force: true }).catch(() => {});
    await page.waitForTimeout(300);
    layers = await getVisibleLayers(page);
    trigger_method = layers.length ? 'hover_fallback' : 'click_then_hover';
  }

  const matches = layers.filter((layer) => {
    if (!layer.text) return false;
    if (taskData.task_patient_name === 'Резерв для пациента') return /резерв/i.test(layer.text);
    return surname(layer.text) === surname(taskData.task_patient_name) || layer.text.includes(taskData.task_patient_name);
  });

  const linkage_state = matches.length
    ? 'proven_popup_linkage'
    : layers.length
      ? 'stale_or_structural_only'
      : 'no_layer_observed';

  const layer_type = matches.length
    ? (matches[0].selector.includes('popover') ? 'click_popup' : matches[0].selector.includes('tooltip') ? 'hover_tooltip' : 'unknown')
    : layers.length
      ? 'structural_only'
      : 'none';

  const result = {
    visit_id: testCase.visit_id,
    family: testCase.family,
    task_selector: selector,
    task_patient_name: taskData.task_patient_name,
    task_text: taskData.task_text,
    task_attributes: taskData.attributes,
    task_icon_classes: taskData.icon_classes,
    stale_prevention: 'hard_reload_per_case + escape/body-click close policy',
    trigger_method,
    popup_count: layers.length,
    visible_layers: layers,
    matched_layers: matches,
    linkage_state,
    layer_type,
    status: matches.length ? 'proven' : layers.length ? 'structurally_observed' : 'not_proven',
    evidence: `live_interaction_probe_v3:${testCase.visit_id}`,
  };

  await closeTransientLayers(page);
  return result;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    storageState: STORAGE_STATE,
    viewport: { width: 1600, height: 1200 },
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();

  const results = [];
  for (const testCase of CASES) {
    results.push(await probeCase(page, testCase));
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(results, null, 2), 'utf-8');
  await browser.close();
  console.log(OUT_FILE);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
