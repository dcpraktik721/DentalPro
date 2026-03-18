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
const INPUT_V5 = path.join(ART_DIR, `schedule_${TARGET_DATE}_patient_full_report_v5.json`);
const OUTPUT_JSON = path.join(ART_DIR, `schedule_${TARGET_DATE}_ticket_registry_probe_v1.json`);

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function classifyTicket(ticket) {
  const text = clean(ticket.tooltip_text);
  const iconClass = ticket.icon_class || '';

  if (!text) {
    return {
      normalized_category: 'tooltip_not_captured',
      proof_level: 'not_proven',
      notes: 'Tooltip text was not captured in live pass.',
    };
  }

  if (text.startsWith('ПроДокторов.')) {
    return {
      normalized_category: 'external_booking_source_info',
      proof_level: 'proven_from_exact_tooltip_text',
      notes: 'External booking source and source-side note are explicitly present in tooltip text.',
    };
  }
  if (text === 'Пациент подтвердил визит') {
    return {
      normalized_category: 'visit_confirmation',
      proof_level: 'proven_from_exact_tooltip_text',
      notes: 'Confirmation state is explicitly present in tooltip text.',
    };
  }
  if (/^Ребёнок \d+ лет$/.test(text)) {
    return {
      normalized_category: 'child_age_marker',
      proof_level: 'proven_from_exact_tooltip_text',
      notes: 'Child age marker is explicitly present in tooltip text.',
    };
  }
  if (text === 'Первичный пациент') {
    return {
      normalized_category: 'primary_patient_marker',
      proof_level: 'proven_from_exact_tooltip_text',
      notes: 'Primary patient marker is explicitly present in tooltip text.',
    };
  }
  if (text.startsWith('Добавлен:')) {
    return {
      normalized_category: 'document_or_contract_requirement',
      proof_level: 'proven_from_exact_tooltip_text',
      notes: 'Administrative/document requirement is explicitly present in tooltip text.',
    };
  }
  if (text.startsWith('Статус тикета:')) {
    return {
      normalized_category: 'ticket_status',
      proof_level: 'proven_from_exact_tooltip_text',
      notes: 'Ticket state is explicitly present in tooltip text.',
    };
  }
  if (text.startsWith('Квитанция ')) {
    return {
      normalized_category: 'cashbox_status_marker',
      proof_level: 'proven_from_exact_tooltip_text',
      notes: 'Cashbox state is explicitly present in tooltip text.',
    };
  }
  if (/^\d{2}\.\d{2}\.\d{4}\s+\d{2}:\d{2}:/.test(text)) {
    return {
      normalized_category: 'timeline_note',
      proof_level: 'proven_from_exact_tooltip_text',
      notes: 'Timestamped operational note is explicitly present in tooltip text.',
    };
  }
  if (iconClass.includes('schi-13')) {
    return {
      normalized_category: 'ticket_owner_or_responsible_marker',
      proof_level: 'structurally_observed',
      notes: 'Tooltip text captured, but business semantics need separate proof beyond current pass.',
    };
  }
  if (iconClass.includes('schi-10')) {
    return {
      normalized_category: 'secondary_flag_marker',
      proof_level: 'structurally_observed',
      notes: 'Tooltip text captured, but business semantics need separate proof beyond current pass.',
    };
  }
  if (iconClass.includes('schi-11')) {
    return {
      normalized_category: 'alert_marker',
      proof_level: 'structurally_observed',
      notes: 'Tooltip text captured, but business semantics need separate proof beyond current pass.',
    };
  }
  if (iconClass.includes('schi-5')) {
    return {
      normalized_category: 'mini_task_marker',
      proof_level: 'structurally_observed',
      notes: 'Tooltip text captured, but business semantics need separate proof beyond current pass.',
    };
  }

  return {
    normalized_category: 'unclassified_ticket_marker',
    proof_level: 'structurally_observed',
    notes: 'Tooltip captured, but no stronger exact-text rule exists yet.',
  };
}

function subsetRows(dataset) {
  return dataset.patient_schedule_full.filter((row) => {
    if (row.patient_id_proof === 'not_applicable_service_row') return false;
    return row.booking_origin === 'online_booking' || Boolean(row.ticket_state);
  });
}

async function closeLayers(page) {
  await page.keyboard.press('Escape').catch(() => {});
  await page.locator('body').click({ position: { x: 5, y: 5 }, force: true }).catch(() => {});
  await page.waitForTimeout(120);
}

async function probeVisit(page, row) {
  const selector = `#task-record-${row.visit_id}`;
  const card = page.locator(selector);
  await card.waitFor({ state: 'visible', timeout: 15000 });
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);

  const taskMeta = await card.evaluate((node) => {
    const attrs = {};
    for (const name of node.getAttributeNames()) attrs[name] = node.getAttribute(name);
    const iconClasses = Array.from(node.querySelectorAll('.task-icons i')).map((el) => el.getAttribute('class') || '').filter(Boolean);
    return {
      task_text: String(node.innerText || '').replace(/\s+/g, ' ').trim(),
      task_attrs: attrs,
      icon_classes: iconClasses,
      icon_count: iconClasses.length,
    };
  });

  const tickets = [];
  for (let i = 0; i < taskMeta.icon_count; i += 1) {
    const iconResult = await page.locator(`${selector} .task-icons i`).nth(i).evaluate(async (el, index) => {
      const reactPropsKey = Object.getOwnPropertyNames(el).find((k) => k.startsWith('__reactProps$'));
      const props = reactPropsKey ? el[reactPropsKey] : {};
      const attrs = {};
      for (const name of el.getAttributeNames()) attrs[name] = el.getAttribute(name);
      document.querySelectorAll('.rc-tooltip').forEach((node) => node.remove());
      if (props?.onMouseEnter) props.onMouseEnter({ target: el, currentTarget: el, type: 'mouseenter' });
      await new Promise((resolve) => setTimeout(resolve, 220));
      const tooltip = document.querySelector('.rc-tooltip');
      const tooltipText = tooltip ? String(tooltip.innerText || '').replace(/\s+/g, ' ').trim() : '';
      const tooltipHtml = tooltip ? String(tooltip.outerHTML || '').slice(0, 1200) : '';
      if (props?.onMouseLeave) props.onMouseLeave({ target: el, currentTarget: el, type: 'mouseleave' });
      return {
        ticket_order: index + 1,
        icon_class: attrs.class || '',
        icon_attrs: attrs,
        tooltip_text: tooltipText,
        tooltip_html: tooltipHtml,
        source_layer: 'rendered_rc_tooltip',
        linkage_method: 'live_react_onMouseEnter_on_icon_node',
        tooltip_proof: tooltipText ? 'proven_rendered_rc_tooltip' : 'not_proven',
      };
    }, i);

    const classified = classifyTicket(iconResult);
    tickets.push({ ...iconResult, ...classified });
  }

  await closeLayers(page);
  await card.click({ force: true });
  await page.waitForTimeout(350);
  const popup = await page.evaluate(() => {
    const el = document.querySelector('.popover.show');
    if (!el) return null;
    return {
      popup_text: String(el.innerText || '').replace(/\s+/g, ' ').trim(),
      patient_name_full: String(el.querySelector('.sheduler_popover_header_name')?.innerText || '').trim(),
      phone: String(el.querySelector('.telephony-call-button')?.getAttribute('data-phone') || '').trim(),
      info_text: String(el.querySelector('.sheduler_popover_header_info')?.innerText || '').replace(/\s+/g, ' ').trim(),
      actions: Array.from(el.querySelectorAll('button')).map((node) => String(node.innerText || '').replace(/\s+/g, ' ').trim()).filter(Boolean),
      popup_proof: 'proven_clean_click_popup',
    };
  });
  await closeLayers(page);

  return {
    visit_id: row.visit_id,
    patient_id: row.patient_id,
    patient_name_full: row.patient_name_full,
    doctor_name: row.doctor_name,
    cabinet_name: row.cabinet_name,
    start_time: row.start_time,
    end_time: row.end_time,
    visit_type: row.visit_type,
    task_family: row.task_family,
    booking_origin: row.booking_origin,
    ticket_state_from_v5: row.ticket_state,
    task_meta: taskMeta,
    popup,
    tickets,
    ticket_count: tickets.length,
    evidence: `live_ticket_registry_probe_v1:${row.visit_id}`,
  };
}

async function main() {
  const dataset = JSON.parse(fs.readFileSync(INPUT_V5, 'utf-8'));
  const rows = subsetRows(dataset);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    storageState: STORAGE_STATE,
    viewport: { width: 1600, height: 1200 },
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  await page.goto(SCHEDULE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

  const results = [];
  for (const row of rows) {
    results.push(await probeVisit(page, row));
  }

  const output = {
    target_date: TARGET_DATE,
    subset_rule: 'patient rows where booking_origin=online_booking OR ticket_state is non-empty',
    visit_count: results.length,
    registry: results,
  };

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(output, null, 2), 'utf-8');
  await browser.close();
  console.log(OUTPUT_JSON);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
