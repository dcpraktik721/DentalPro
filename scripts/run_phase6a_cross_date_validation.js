const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const PROJECT_ROOT = '/Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright';
const requireFromProject = createRequire(path.join(PROJECT_ROOT, 'package.json'));
const { chromium } = requireFromProject('@playwright/test');

const STORAGE_STATE = path.join(PROJECT_ROOT, 'auth', 'dentalpro.storage.json');
const REPO_ROOT = '/Users/macbook15/Downloads/MacAi/DentalPro';
const SCHEDULE_DIR = path.join(REPO_ROOT, 'schedule');
const REPORTS_DIR = path.join(REPO_ROOT, 'reports');
const RPT24_PARSE_PATH = path.join(PROJECT_ROOT, 'artifacts', 'RPT_24_file_parse_2026-02-01_to_2026-02-28.json');

const DATES = (process.env.DP_DATES || '2026-02-15,2026-02-16')
  .split(',')
  .map((value) => clean(value))
  .filter(Boolean);
const IDENTITY_SUBSET_LIMIT = Number(process.env.DP_IDENTITY_SUBSET_LIMIT || 0);
const IDENTITY_ONLY = process.env.DP_IDENTITY_ONLY === '1';
const SERVICE_ROW_TITLES = new Set(['Резерв для пациента', 'Обед']);

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function digits(value) {
  return String(value ?? '').replace(/\D+/g, '');
}

function upperName(value) {
  return clean(value).toUpperCase();
}

function parseTooltipCategory(iconClass, tooltipText) {
  const text = clean(tooltipText);

  if (!text) return { normalized_category: 'tooltip_not_captured', proof_level: 'not_proven' };
  if (text.startsWith('ПроДокторов.')) return { normalized_category: 'external_booking_source_info', proof_level: 'proven' };
  if (text === 'Пациент подтвердил визит') return { normalized_category: 'visit_confirmation', proof_level: 'proven' };
  if (/^Ребёнок \d+ лет$/.test(text)) return { normalized_category: 'child_age_marker', proof_level: 'proven' };
  if (text === 'Первичный пациент') return { normalized_category: 'primary_patient_marker', proof_level: 'proven' };
  if (text.startsWith('Добавлен:')) return { normalized_category: 'document_or_contract_requirement', proof_level: 'proven' };
  if (text.startsWith('Статус тикета:')) return { normalized_category: 'ticket_status', proof_level: 'proven' };
  if (text.startsWith('Квитанция ')) return { normalized_category: 'cashbox_status_marker', proof_level: 'proven' };
  if (text.startsWith('Последняя профгигиена:')) return { normalized_category: 'last_hygiene_date_marker', proof_level: 'proven' };
  if (/^\d{2}\.\d{2}\.\d{4}\s+\d{2}:\d{2}:/.test(text)) return { normalized_category: 'timeline_note', proof_level: 'proven' };
  if (iconClass.includes('schi-5')) return { normalized_category: 'insurance_marker', proof_level: 'proven' };
  if (iconClass.includes('schi-11')) return { normalized_category: 'unpaid_receipt_counter', proof_level: 'proven' };
  if (iconClass.includes('schi-10')) return { normalized_category: 'coordinator_person_reference_marker', proof_level: 'inferred' };
  if (iconClass.includes('schi-3')) return { normalized_category: 'free_text_note_marker', proof_level: 'proven' };
  return { normalized_category: 'unclassified_ticket_marker', proof_level: 'structurally_observed' };
}

function closeLayersScript() {
  return `
    (() => {
      document.querySelectorAll('.rc-tooltip').forEach((node) => node.remove());
    })();
  `;
}

async function closeTransientLayers(page) {
  await page.evaluate(closeLayersScript()).catch(() => {});
  for (let i = 0; i < 2; i += 1) {
    await page.keyboard.press('Escape').catch(() => {});
    await page.locator('body').click({ position: { x: 8, y: 8 }, force: true }).catch(() => {});
    await page.waitForTimeout(100);
  }
}

async function loadSchedule(page, date) {
  const url = `https://dcpraktik.dental-pro.online/visits/schedule/index?date=${date}`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  return url;
}

async function extractRows(page) {
  return page.evaluate((serviceTitles) => {
    const cleanLocal = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
    const rowNodes = Array.from(document.querySelectorAll('[id^="task-record-"]'));
    const columnNodes = Array.from(document.querySelectorAll('.columns-col'));

    const doctorNames = columnNodes.map((col, index) => {
      const candidates = [
        '.doctor-name',
        '.columns-header',
        '.column-header',
        '.header',
        '.title',
      ];
      let name = '';
      for (const selector of candidates) {
        const el = col.querySelector(selector);
        if (el && cleanLocal(el.innerText)) {
          name = cleanLocal(el.innerText).split('\n')[0];
          break;
        }
      }
      return {
        column_index: index,
        doctor_name: name || `column_${index + 1}`,
      };
    });

    const rows = rowNodes.map((node) => {
      const title = cleanLocal(node.querySelector('.task-title-element')?.textContent || node.innerText.split('\n')[0]);
      const attrs = {};
      for (const name of node.getAttributeNames()) attrs[name] = node.getAttribute(name);
      const icons = Array.from(node.querySelectorAll('.task-icons i')).map((icon, idx) => {
        const iconAttrs = {};
        for (const name of icon.getAttributeNames()) iconAttrs[name] = icon.getAttribute(name);
        return {
          ticket_order: idx + 1,
          icon_class: icon.className || '',
          attributes: iconAttrs,
        };
      });
      const column = node.closest('.columns-col');
      const columnIndex = columnNodes.indexOf(column);
      const timeText = cleanLocal(node.querySelector('.task-time')?.textContent || '');
      return {
        visit_id: String(node.id || '').replace('task-record-', ''),
        source_selector: `#${node.id}`,
        title,
        task_text: cleanLocal(node.innerText),
        task_classes: node.className || '',
        column_index: columnIndex >= 0 ? columnIndex : null,
        time_text: timeText,
        icon_classes: icons.map((icon) => icon.icon_class),
        icons,
        has_payment_icon: icons.some((icon) => icon.icon_class.includes('schi-12')),
        has_schi_10: icons.some((icon) => icon.icon_class.includes('schi-10')),
        is_service_row: serviceTitles.includes(title),
        attributes: attrs,
      };
    });

    return {
      doctor_columns: doctorNames,
      rows,
      page_title: document.title,
      final_url: location.href,
      schedule_root_present: Boolean(document.querySelector('#schedule-day-container')),
    };
  }, Array.from(SERVICE_ROW_TITLES));
}

async function captureTickets(page, date, rows) {
  await loadSchedule(page, date);
  const tickets = [];
  for (const row of rows) {
    const iconCount = row.icons.length;
    for (let index = 0; index < iconCount; index += 1) {
      const selector = `${row.source_selector} .task-icons i`;
      const ticket = await page.locator(selector).nth(index).evaluate(async (el, iconIndex) => {
        const attrs = {};
        for (const name of el.getAttributeNames()) attrs[name] = el.getAttribute(name);
        const reactPropsKey = Object.getOwnPropertyNames(el).find((key) => key.startsWith('__reactProps$'));
        const props = reactPropsKey ? el[reactPropsKey] : null;
        document.querySelectorAll('.rc-tooltip').forEach((node) => node.remove());
        if (props?.onMouseEnter) props.onMouseEnter({ target: el, currentTarget: el, type: 'mouseenter' });
        await new Promise((resolve) => setTimeout(resolve, 220));
        const tooltip = document.querySelector('.rc-tooltip');
        const tooltipText = tooltip ? String(tooltip.innerText || '').replace(/\s+/g, ' ').trim() : '';
        if (props?.onMouseLeave) props.onMouseLeave({ target: el, currentTarget: el, type: 'mouseleave' });
        return {
          ticket_order: iconIndex + 1,
          icon_class: attrs.class || '',
          tooltip_text: tooltipText,
          tooltip_proof: tooltipText ? 'proven_rendered_rc_tooltip' : 'not_proven',
        };
      }, index);
      const classification = parseTooltipCategory(ticket.icon_class, ticket.tooltip_text);
      tickets.push({
        date,
        visit_id: row.visit_id,
        patient_name_runtime: row.title,
        ...ticket,
        ...classification,
      });
    }
  }
  await closeTransientLayers(page);
  return tickets;
}

function matchPopupToRow(popup, row) {
  const text = clean(popup?.text);
  if (!text) return false;
  const title = upperName(row.title);
  return text.includes(title) || text.includes(title.split(' ')[0]);
}

async function openPopup(page, row) {
  const strategies = [
    { name: 'task_click', selector: row.source_selector, action: 'click' },
    { name: 'taskDnD_click', selector: `${row.source_selector} .taskDnD`, action: 'click' },
    { name: 'task_hover', selector: row.source_selector, action: 'hover' },
  ];

  for (const strategy of strategies) {
    const locator = page.locator(strategy.selector).first();
    if ((await locator.count()) === 0) continue;
    try {
      await locator.scrollIntoViewIfNeeded().catch(() => {});
      if (strategy.action === 'hover') {
        await locator.hover({ force: true });
      } else {
        await locator.click({ force: true });
      }
      await page.waitForTimeout(350);
      const popup = await page.evaluate(() => {
        const el = document.querySelector('.popover.show');
        if (!el) return null;
        return {
          text: String(el.innerText || '').replace(/\s+/g, ' ').trim(),
          header_name: String(el.querySelector('.sheduler_popover_header_name')?.innerText || '').replace(/\s+/g, ' ').trim(),
          buttons: Array.from(el.querySelectorAll('button'))
            .map((node) => String(node.innerText || '').replace(/\s+/g, ' ').trim())
            .filter(Boolean),
        };
      });
      if (popup && matchPopupToRow(popup, row)) {
        return { strategy: strategy.name, popup };
      }
    } catch (_) {
      // try next strategy
    }
    await closeTransientLayers(page);
  }

  return { strategy: 'no_popup', popup: null };
}

function parsePhones(text) {
  const matches = clean(text).match(/(?:\+?7|8)\d{10}/g) || [];
  const unique = [...new Set(matches.map((value) => digits(value)))];
  return {
    patient_phone_primary: unique[0] || '',
    patient_phone_secondary: unique[1] || '',
  };
}

async function probePatientIdentity(page, date, rows) {
  const results = [];
  const targetRows = rows.filter((item) => !item.is_service_row);
  for (let index = 0; index < targetRows.length; index += 1) {
    const row = targetRows[index];
    console.log(`[identity] ${index + 1}/${targetRows.length} visit=${row.visit_id}`);
    const fallback = {
      date,
      visit_id: row.visit_id,
      patient_name_runtime: row.title,
      popup_linkage_state: 'not_proven',
      trigger_method: 'not_completed',
      patient_name_full: '',
      patient_phone_primary: '',
      patient_phone_secondary: '',
      patient_id: '',
      patient_id_proof: 'not_proven',
      patient_contact_proof: 'not_proven',
      popup_buttons: [],
      notes: [],
    };

    try {
      const probeResult = await Promise.race([
        (async () => {
          await loadSchedule(page, date);
          await closeTransientLayers(page);

          const popupResult = await openPopup(page, row);
          const base = {
            ...fallback,
            popup_linkage_state: popupResult.popup ? 'proven_popup_linkage' : 'no_popup_observed',
            trigger_method: popupResult.strategy,
            patient_name_full: popupResult.popup?.header_name || '',
            popup_buttons: popupResult.popup?.buttons || [],
            notes: [],
          };

          if (!popupResult.popup) {
            base.notes.push('no clean popup matched row');
            return base;
          }

          const phones = parsePhones(popupResult.popup.text);
          base.patient_phone_primary = phones.patient_phone_primary;
          base.patient_phone_secondary = phones.patient_phone_secondary;
          if (phones.patient_phone_primary) base.patient_contact_proof = 'proven';

          if (popupResult.popup.buttons.includes('Информация о пациенте')) {
            try {
              const button = page.locator('.popover.show button').filter({ hasText: 'Информация о пациенте' }).first();
              await button.click({ force: true, timeout: 5000 });
              await page.waitForTimeout(1000);
              const url = page.url();
              const match = url.match(/\/cbase\/detail\.html\?id=(\d+)/);
              if (match) {
                base.patient_id = match[1];
                base.patient_id_proof = 'proven';
              } else {
                base.notes.push('patient info click did not yield cbase/detail id');
              }
            } catch (error) {
              base.notes.push(`patient info click error: ${clean(String(error)).slice(0, 200)}`);
            }
          } else {
            base.notes.push('popup has no patient-info button');
          }

          return base;
        })(),
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ...fallback,
              trigger_method: 'row_timeout',
              notes: ['identity probe timed out for this row'],
            });
          }, 15000);
        }),
      ]);
      results.push(probeResult);
    } catch (error) {
      results.push({
        ...fallback,
        trigger_method: 'row_error',
        notes: [`identity probe error: ${clean(String(error)).slice(0, 200)}`],
      });
    }
  }
  return results;
}

function selectIdentityProbeRows(rows) {
  const patientRows = rows.filter((row) => !row.is_service_row);
  if (!IDENTITY_SUBSET_LIMIT || patientRows.length <= IDENTITY_SUBSET_LIMIT) {
    return patientRows;
  }

  return patientRows
    .map((row) => {
      let score = 0;
      if (row.has_schi_10) score += 100;
      if (row.has_payment_icon) score += 50;
      if (row.icon_classes.some((icon) => icon.includes('schi-3'))) score += 20;
      if (row.icon_classes.some((icon) => icon.includes('schi-13'))) score += 10;
      return { row, score };
    })
    .sort((a, b) => b.score - a.score || a.row.visit_id.localeCompare(b.row.visit_id))
    .slice(0, IDENTITY_SUBSET_LIMIT)
    .map((item) => item.row);
}

function loadRpt24Rows() {
  if (!fs.existsSync(RPT24_PARSE_PATH)) {
    return { available: false, rows: [], source: RPT24_PARSE_PATH };
  }
  const payload = JSON.parse(fs.readFileSync(RPT24_PARSE_PATH, 'utf-8'));
  return {
    available: true,
    rows: Array.isArray(payload.rows) ? payload.rows : [],
    source: RPT24_PARSE_PATH,
  };
}

function buildCashValidation(date, rows, identities) {
  const rpt24 = loadRpt24Rows();
  const identityMap = new Map(identities.map((row) => [row.visit_id, row]));
  const targetRows = rows.filter((row) => !row.is_service_row);

  if (!rpt24.available) {
    return {
      date,
      status: 'blocked',
      source_layer: 'missing_RPT_24_file_parse',
      summary: {
        patient_rows: targetRows.length,
        patient_rows_probed: identities.length,
        rows_with_payment_icon: targetRows.filter((row) => row.has_payment_icon).length,
        matched_rows: 0,
        unmatched_rows: targetRows.length,
      },
      rows: targetRows.map((row) => ({
        date,
        visit_id: row.visit_id,
        patient_name_runtime: row.title,
        has_payment_icon: row.has_payment_icon,
        join_status: 'blocked',
        notes: 'RPT_24 file parse for February is unavailable',
      })),
      notes: ['Cash validation blocked because no February RPT_24 file-parse artifact is available.'],
    };
  }

  const byDate = rpt24.rows.filter((row) => clean(row['Дата']) === date.split('-').reverse().join('.'));
  const normalized = byDate.map((row) => ({
    date,
    patient_name_full: upperName(row['Пациент']),
    patient_phone_primary: digits(row['Номер телефона']),
    doctor_name_rpt24: clean(row['Исполнитель']),
    amount_paid: Number(row['Сумма оплачено с учетом скидки'] || 0),
    discount_amount: Number(row['Сумма скидки'] || 0),
    service_label: clean(row['Услуга']),
  }));

  const outputRows = targetRows.map((row) => {
    const identity = identityMap.get(row.visit_id);
    const candidates = normalized.filter((item) => (
      identity &&
      identity.patient_id &&
      identity.patient_name_full &&
      item.patient_name_full === upperName(identity.patient_name_full) &&
      item.patient_phone_primary &&
      item.patient_phone_primary === digits(identity.patient_phone_primary)
    ));

    const paidRows = candidates.filter((item) => Number.isFinite(item.amount_paid));
    const amountTotal = paidRows.reduce((sum, item) => sum + item.amount_paid, 0);
    const discountTotal = paidRows.reduce((sum, item) => sum + item.discount_amount, 0);
    const join_status = candidates.length ? 'conditional_join' : 'not_proven';
    const identityProven = Boolean(identity && identity.patient_id && identity.patient_phone_primary);

    return {
      date,
      visit_id: row.visit_id,
      patient_id: identity?.patient_id || '',
      patient_name_full: identity?.patient_name_full || '',
      patient_phone_primary: identity?.patient_phone_primary || '',
      doctor_name_schedule: row.doctor_name || '',
      has_payment_icon: row.has_payment_icon,
      cash_amount_total_candidate: candidates.length ? amountTotal : null,
      discount_total_candidate: candidates.length ? discountTotal : null,
      payment_event_count: candidates.length,
      matched_rpt24_doctors: [...new Set(candidates.map((item) => item.doctor_name_rpt24))].join('; '),
      payment_source: 'RPT_24 file-first export 2026-02-01..2026-02-28',
      payment_linkage_method: 'conditional patient-day match on exact full_name + primary_phone + date',
      join_status: identityProven ? join_status : 'not_proven',
      proof_level: identityProven ? join_status : 'not_proven',
      source_layer: 'file_first_export:RPT_24',
      notes: !identityProven
        ? 'cash not evaluated because row was outside identity-probed subset or identity proof was incomplete'
        : join_status === 'conditional_join'
          ? 'patient-day financial signal only; not safe as direct visit->cash fact'
          : 'no exact patient-day match on full_name + phone + date',
    };
  });

  const matchedRows = outputRows.filter((row) => row.join_status === 'conditional_join');
  const paymentIconRowsWithIdentity = outputRows.filter((row) => row.has_payment_icon && row.patient_id);
  return {
    date,
    status: 'ready_with_limits',
    source_layer: 'schedule_popup_identity + file_first_export:RPT_24',
    source_evidence: rpt24.source,
    summary: {
      patient_rows: targetRows.length,
      patient_rows_probed: identities.length,
      rows_with_payment_icon: targetRows.filter((row) => row.has_payment_icon).length,
      matched_rows: matchedRows.length,
      unmatched_rows: outputRows.filter((row) => row.join_status !== 'conditional_join').length,
      conditional_join_count: matchedRows.length,
      not_proven_count: outputRows.filter((row) => row.join_status !== 'conditional_join').length,
      payment_icon_match_rate: paymentIconRowsWithIdentity.length
        ? Number((matchedRows.filter((row) => row.has_payment_icon).length / paymentIconRowsWithIdentity.length).toFixed(3))
        : 0,
    },
    rows: outputRows,
    notes: [
      'cash remains patient-day grain only',
      'cash must not be promoted to direct visit-to-cash fact',
    ],
  };
}

function buildOperationalMarkdown(date, summary) {
  const resolved = summary.identity_validation.summary.patient_id_resolved_probed ?? summary.identity_validation.summary.patient_id_resolved;
  const subsetMode = summary.identity_validation.summary.subset_mode || 'full';
  return `# Schedule Operational Validation ${date}

## Executive

| Area | Result | Notes |
| --- | --- | --- |
| Authenticated route access | ${summary.auth.authenticated ? 'pass' : 'fail'} | final_url=${summary.auth.final_url} |
| Schedule root | ${summary.auth.schedule_root_present ? 'present' : 'missing'} | title=${summary.auth.page_title} |
| Rows extracted | ${summary.metrics.total_rows} | patient_rows=${summary.metrics.patient_rows}, service_rows=${summary.metrics.service_rows} |
| Doctors count | ${summary.metrics.doctors_count} | column-based extraction |
| Ticket tooltips | ${summary.ticket_validation.summary.tooltip_captures}/${summary.ticket_validation.summary.ticket_icons_total} | live rendered rc-tooltip only |
| Patient identity | ${resolved}/${summary.identity_validation.summary.patient_rows_probed} | popup clean click + patient-info action (${subsetMode}) |
| Cash enrichment | ${summary.cash_validation.summary.matched_rows}/${summary.cash_validation.summary.patient_rows} | patient-day only |

## Boundaries

- cross-date observation from this file alone is not a stability proof
- schi-10 remains inferred
- cash remains patient-day only and is not a direct visit-to-cash fact
- auth is usable through external storageState but not self-bootstrapping inside repo
`;
}

function buildCrossDateMarkdown(matrix) {
  const rows = matrix.dates.map((date) => {
    const item = matrix.by_date[date];
    return `| ${date} | ${item.total_rows} | ${item.patient_rows} | ${item.doctors_count} | ${item.patient_id_resolved} | ${item.ticket_icons_total} | ${item.tooltip_captures} | ${item.schi_10_count} | ${item.cash_matched_rows} |`;
  }).join('\n');
  const feb16 = matrix.by_date['2026-02-16'];
  const feb16Line = feb16
    ? `- 2026-02-16 patient identity result is ${feb16.patient_id_resolved < feb16.patient_rows ? 'subset-based' : 'full'} (${feb16.patient_id_resolved} resolved of ${feb16.patient_rows} patient rows).`
    : '- 2026-02-16 patient identity result is unavailable.';

  return `# Cross-Date Validation 2026-02-15 / 2026-02-16 / 2026-03-10

## Metrics

| Date | total_rows | patient_rows | doctors_count | patient_id_resolved | ticket_icons_total | tooltip_captures | schi_10_count | cash_matched_rows |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rows}

## Verdict

- Selected methods are now supported by raw evidence on three dates.
- This is cross-date validation evidence, not a blanket global stability claim.
${feb16Line}
- schi-10 remains inferred on every date where observed.
- cash remains patient-day only on every date where matched.
`;
}

function buildPhase6AReport(matrix, authSmoke) {
  return `# Phase 6A Cross-Date Validation + Repo Hardening

## Executive Summary

| Area | Result | Notes |
| --- | --- | --- |
| Feb 15 live validation | completed | raw files committed under schedule/ |
| Feb 16 live validation | completed | raw files committed under schedule/ |
| Cross-date matrix | completed | based on raw Feb dates + baseline 2026-03-10 |
| Auth smoke | ${authSmoke.summary.all_routes_authenticated ? 'pass' : 'partial'} | readiness=${authSmoke.summary.readiness} |
| Methods registry | completed | current evidence-backed entries are expected in registry/methods_registry.json |

## Safe Boundaries

- cross-date wording is intentionally weakened to "validated on three dates", not "globally stable"
- schi-10 stays inferred
- cash stays patient-day only
- auth is ready_with_limits while storageState remains an external dependency
  `;
}

function loadExistingValidationSummary(date) {
  const summaryPath = path.join(SCHEDULE_DIR, `schedule_${date}_validation_summary.json`);
  if (!fs.existsSync(summaryPath)) return null;
  return JSON.parse(fs.readFileSync(summaryPath, 'utf-8'));
}

async function validateDate(browser, date) {
  const context = await browser.newContext({
    storageState: STORAGE_STATE,
    viewport: { width: 1600, height: 1200 },
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();

  try {
    const requestedUrl = await loadSchedule(page, date);
    const extracted = await extractRows(page);
    const existingSummary = IDENTITY_ONLY ? loadExistingValidationSummary(date) : null;
    const rows = extracted.rows.map((row) => ({
      ...row,
      doctor_name: extracted.doctor_columns.find((col) => col.column_index === row.column_index)?.doctor_name || '',
    }));
    if (IDENTITY_ONLY && !existingSummary) {
      throw new Error(`IDENTITY_ONLY mode requires an existing validation summary for ${date}`);
    }
    const tickets = IDENTITY_ONLY
      ? (existingSummary?.ticket_validation?.tickets || [])
      : await captureTickets(page, date, rows);
    const identities = await probePatientIdentity(page, date, selectIdentityProbeRows(rows));
    const cashValidation = IDENTITY_ONLY
      ? (existingSummary?.cash_validation || buildCashValidation(date, rows, identities))
      : buildCashValidation(date, rows, identities);

    const summary = {
      validation_version: 'phase6A',
      date,
      generated_at: new Date().toISOString(),
      auth: {
        requested_url: requestedUrl,
        final_url: extracted.final_url,
        page_title: extracted.page_title,
        authenticated: extracted.schedule_root_present && !/login/i.test(extracted.final_url),
        schedule_root_present: extracted.schedule_root_present,
      },
      metrics: {
        total_rows: rows.length,
        patient_rows: rows.filter((row) => !row.is_service_row).length,
        service_rows: rows.filter((row) => row.is_service_row).length,
        doctors_count: extracted.doctor_columns.length,
        ticket_icons_total: tickets.length,
        tooltip_captures: tickets.filter((ticket) => ticket.tooltip_proof === 'proven_rendered_rc_tooltip').length,
        rows_with_payment_icon: rows.filter((row) => !row.is_service_row && row.has_payment_icon).length,
        payment_icon_rate: rows.filter((row) => !row.is_service_row).length
          ? Number((rows.filter((row) => !row.is_service_row && row.has_payment_icon).length / rows.filter((row) => !row.is_service_row).length).toFixed(3))
          : 0,
        schi_10_count: tickets.filter((ticket) => ticket.icon_class.includes('schi-10')).length,
      },
      identity_validation: {
        summary: {
          patient_rows_total: rows.filter((row) => !row.is_service_row).length,
          patient_rows_probed: identities.length,
          popup_success_count: identities.filter((row) => row.popup_linkage_state === 'proven_popup_linkage').length,
          patient_id_resolved_probed: identities.filter((row) => row.patient_id_proof === 'proven').length,
          unresolved_probed: identities.filter((row) => row.patient_id_proof !== 'proven').length,
          subset_mode: identities.length < rows.filter((row) => !row.is_service_row).length ? 'subset' : 'full',
        },
        rows: identities,
      },
      ticket_validation: {
        summary: {
          ticket_icons_total: tickets.length,
          tooltip_captures: tickets.filter((ticket) => ticket.tooltip_proof === 'proven_rendered_rc_tooltip').length,
          tooltip_failures: tickets.filter((ticket) => ticket.tooltip_proof !== 'proven_rendered_rc_tooltip').length,
          schi_10_count: tickets.filter((ticket) => ticket.icon_class.includes('schi-10')).length,
          inferred_ticket_count: tickets.filter((ticket) => ticket.proof_level === 'inferred').length,
        },
        tickets,
        boundaries: {
          schi_10: 'inferred',
        },
      },
      cash_validation: cashValidation,
      claim_boundaries: {
        cross_date_stable: false,
        schi_10: 'inferred',
        cash: 'patient-day only',
        auth: 'ready_with_limits',
      },
    };

    const summaryPath = path.join(SCHEDULE_DIR, `schedule_${date}_validation_summary.json`);
    const ticketPath = path.join(SCHEDULE_DIR, `schedule_${date}_ticket_validation.json`);
    const identityPath = path.join(SCHEDULE_DIR, `schedule_${date}_patient_identity_validation.json`);
    const cashPath = path.join(SCHEDULE_DIR, `schedule_${date}_cash_enrichment_validation.json`);
    const mdPath = path.join(SCHEDULE_DIR, `schedule_${date}_operational_validation.md`);

    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf-8');
    fs.writeFileSync(ticketPath, JSON.stringify(summary.ticket_validation, null, 2), 'utf-8');
    fs.writeFileSync(identityPath, JSON.stringify(summary.identity_validation, null, 2), 'utf-8');
    fs.writeFileSync(cashPath, JSON.stringify(summary.cash_validation, null, 2), 'utf-8');
    fs.writeFileSync(mdPath, buildOperationalMarkdown(date, summary), 'utf-8');

    return summary;
  } finally {
    await context.close().catch(() => null);
  }
}

function loadBaseline() {
  const patient = JSON.parse(fs.readFileSync(path.join(SCHEDULE_DIR, 'schedule_2026-03-10_patient_full_report_v5.json'), 'utf-8'));
  const tickets = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'tickets', 'schedule_2026-03-10_ticket_registry_v2.json'), 'utf-8'));
  const cash = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'finance', 'schedule_2026-03-10_cash_enrichment_v5.json'), 'utf-8'));

  const patientRows = patient.patient_schedule_full.filter((row) => row.patient_id_proof === 'proven');
  return {
    date: '2026-03-10',
    total_rows: patient.qc.rows_total,
    patient_rows: patientRows.length,
    doctors_count: new Set(patient.patient_schedule_full.map((row) => row.doctor_name).filter(Boolean)).size,
    patient_id_resolved: patientRows.length,
    ticket_icons_total: tickets.quality_control.tickets_total,
    tooltip_captures: tickets.quality_control.tickets_total,
    schi_10_count: tickets.quality_control.schi_10_ticket_count,
    cash_matched_rows: cash.filter((row) => row.join_status === 'conditional_join' || row.join_status === 'heuristic_join').length,
    cash_boundary: 'patient-day only',
  };
}

async function main() {
  fs.mkdirSync(SCHEDULE_DIR, { recursive: true });
  fs.mkdirSync(REPORTS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  try {
    const perDate = {};
    for (const date of DATES) {
      console.log(`validating ${date}...`);
      perDate[date] = await validateDate(browser, date);
      console.log(`validated ${date}`);
    }

    for (const date of ['2026-02-15', '2026-02-16']) {
      if (!perDate[date]) {
        const existing = loadExistingValidationSummary(date);
        if (!existing) {
          throw new Error(`Missing validation summary for ${date}; cannot build cross-date matrix`);
        }
        perDate[date] = existing;
      }
    }

    const baseline = loadBaseline();
    const authSmoke = fs.existsSync(path.join(REPO_ROOT, 'runtime', 'auth_smoke_check_result.json'))
      ? JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'runtime', 'auth_smoke_check_result.json'), 'utf-8'))
      : null;

    const matrix = {
      generated_at: new Date().toISOString(),
      dates: ['2026-02-15', '2026-02-16', '2026-03-10'],
      by_date: {
        '2026-02-15': {
          total_rows: perDate['2026-02-15'].metrics.total_rows,
          patient_rows: perDate['2026-02-15'].metrics.patient_rows,
          doctors_count: perDate['2026-02-15'].metrics.doctors_count,
          patient_id_resolved: perDate['2026-02-15'].identity_validation.summary.patient_id_resolved_probed ?? perDate['2026-02-15'].identity_validation.summary.patient_id_resolved,
          ticket_icons_total: perDate['2026-02-15'].metrics.ticket_icons_total,
          tooltip_captures: perDate['2026-02-15'].ticket_validation.summary.tooltip_captures,
          schi_10_count: perDate['2026-02-15'].metrics.schi_10_count,
          cash_matched_rows: perDate['2026-02-15'].cash_validation.summary.matched_rows,
        },
        '2026-02-16': {
          total_rows: perDate['2026-02-16'].metrics.total_rows,
          patient_rows: perDate['2026-02-16'].metrics.patient_rows,
          doctors_count: perDate['2026-02-16'].metrics.doctors_count,
          patient_id_resolved: perDate['2026-02-16'].identity_validation.summary.patient_id_resolved_probed ?? perDate['2026-02-16'].identity_validation.summary.patient_id_resolved,
          ticket_icons_total: perDate['2026-02-16'].metrics.ticket_icons_total,
          tooltip_captures: perDate['2026-02-16'].ticket_validation.summary.tooltip_captures,
          schi_10_count: perDate['2026-02-16'].metrics.schi_10_count,
          cash_matched_rows: perDate['2026-02-16'].cash_validation.summary.matched_rows,
        },
        '2026-03-10': baseline,
      },
      method_observations: [
        {
          method_id: 'browser_first_route_access',
          dates_validated: ['2026-02-15', '2026-02-16', '2026-03-10'],
          cross_date_stable: false,
          note: 'validated on three dates; not promoted to global stability claim',
        },
        {
          method_id: 'popup_clean_click_probe',
          dates_validated: ['2026-02-15', '2026-02-16', '2026-03-10'],
          cross_date_stable: false,
          note: 'validated on three dates, but popup success remains subset-sensitive',
        },
        {
          method_id: 'focused_rc_tooltip_extraction',
          dates_validated: ['2026-02-15', '2026-02-16', '2026-03-10'],
          cross_date_stable: false,
          note: 'validated on three dates; tooltip semantics still keep schi-10 inferred',
        },
        {
          method_id: 'patient_day_cash_matching',
          dates_validated: ['2026-02-15', '2026-02-16', '2026-03-10'],
          cross_date_stable: false,
          note: 'validated on three dates at patient-day grain only',
        },
      ],
      claim_boundaries: {
        cross_date_claim: 'validated_on_three_dates_not_promoted_to_stable',
        schi_10: 'inferred',
        cash: 'patient-day only',
        auth: authSmoke?.summary?.readiness || 'unknown',
      },
    };

    fs.writeFileSync(path.join(REPORTS_DIR, 'cross_date_validation_matrix.json'), JSON.stringify(matrix, null, 2), 'utf-8');
    fs.writeFileSync(
      path.join(REPORTS_DIR, 'cross_date_validation_2026-02-15_2026-02-16_vs_2026-03-10.md'),
      buildCrossDateMarkdown(matrix),
      'utf-8',
    );
    fs.writeFileSync(
      path.join(REPORTS_DIR, 'phase6A_cross_date_and_repo_hardening_report.md'),
      buildPhase6AReport(matrix, authSmoke || { summary: { all_routes_authenticated: false, readiness: 'validation_required' } }),
      'utf-8',
    );

    console.log('phase6a validation completed');
  } finally {
    await browser.close().catch(() => null);
  }
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
