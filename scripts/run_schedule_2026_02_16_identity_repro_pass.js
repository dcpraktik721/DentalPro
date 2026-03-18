const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const PROJECT_ROOT = '/Users/macbook15/Downloads/YDIREKT_code/mac-ai-os/dentalpro-playwright';
const requireFromProject = createRequire(path.join(PROJECT_ROOT, 'package.json'));
const { chromium } = requireFromProject('@playwright/test');

const REPO_ROOT = '/Users/macbook15/Downloads/MacAi/DentalPro';
const SCHEDULE_DIR = path.join(REPO_ROOT, 'schedule');
const STORAGE_STATE = path.join(PROJECT_ROOT, 'auth', 'dentalpro.storage.json');
const DATE = '2026-02-16';
const SUBSET_LIMIT = 40;

const REFERENCE_ROWS_PATH = path.join(SCHEDULE_DIR, 'schedule_2026-02-16_patient_identity_validation.json');
const REFERENCE_SUMMARY_PATH = path.join(SCHEDULE_DIR, 'schedule_2026-02-16_validation_summary.json');
const OUT_JSON = path.join(SCHEDULE_DIR, 'schedule_2026-02-16_identity_repro_pass.json');
const OUT_MD = path.join(SCHEDULE_DIR, 'schedule_2026-02-16_identity_repro_diff.md');
const AUTH_REFRESH_RESULT = path.join(REPO_ROOT, 'runtime', 'auth_refresh_result.json');
const AUTH_SMOKE_RESULT = path.join(REPO_ROOT, 'runtime', 'auth_smoke_check_result.json');

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

function loadJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
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

    const doctorColumns = columnNodes.map((col, index) => {
      const candidates = ['.doctor-name', '.columns-header', '.column-header', '.header', '.title'];
      let name = '';
      for (const selector of candidates) {
        const el = col.querySelector(selector);
        if (el && cleanLocal(el.innerText)) {
          name = cleanLocal(el.innerText).split('\n')[0];
          break;
        }
      }
      return { column_index: index, doctor_name: name || `column_${index + 1}` };
    });

    const rows = rowNodes.map((node) => {
      const title = cleanLocal(node.querySelector('.task-title-element')?.textContent || node.innerText.split('\n')[0]);
      const icons = Array.from(node.querySelectorAll('.task-icons i')).map((icon) => ({
        icon_class: icon.className || '',
      }));
      const column = node.closest('.columns-col');
      const columnIndex = columnNodes.indexOf(column);
      return {
        visit_id: String(node.id || '').replace('task-record-', ''),
        source_selector: `#${node.id}`,
        title,
        column_index: columnIndex >= 0 ? columnIndex : null,
        icon_classes: icons.map((icon) => icon.icon_class),
        has_payment_icon: icons.some((icon) => icon.icon_class.includes('schi-12')),
        has_schi_10: icons.some((icon) => icon.icon_class.includes('schi-10')),
        is_service_row: serviceTitles.includes(title),
      };
    });

    return {
      page_title: document.title,
      final_url: location.href,
      schedule_root_present: Boolean(document.querySelector('#schedule-day-container')),
      doctor_columns: doctorColumns,
      rows,
    };
  }, Array.from(SERVICE_ROW_TITLES));
}

function selectIdentityProbeRows(rows) {
  const patientRows = rows.filter((row) => !row.is_service_row);
  if (patientRows.length <= SUBSET_LIMIT) return patientRows;
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
    .slice(0, SUBSET_LIMIT)
    .map((item) => item.row);
}

function matchPopupToRow(popup, row) {
  const text = clean(popup?.text);
  if (!text) return false;
  const title = upperName(row.title);
  return text.includes(title) || text.includes(title.split(' ')[0]);
}

async function openPopupDetailed(page, row) {
  const strategies = [
    { name: 'task_click', selector: row.source_selector, action: 'click' },
    { name: 'taskDnD_click', selector: `${row.source_selector} .taskDnD`, action: 'click' },
    { name: 'task_hover', selector: row.source_selector, action: 'hover' },
  ];

  let stalePopupSeen = false;
  let stalePopupText = '';

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
        return { strategy: strategy.name, popup, stale_popup_seen: stalePopupSeen, stale_popup_text: stalePopupText };
      }
      if (popup && popup.text) {
        stalePopupSeen = true;
        stalePopupText = clean(popup.text).slice(0, 200);
      }
    } catch (_) {
      // try next strategy
    }
    await closeTransientLayers(page);
  }

  return { strategy: 'no_popup', popup: null, stale_popup_seen: stalePopupSeen, stale_popup_text: stalePopupText };
}

function parsePhones(text) {
  const matches = clean(text).match(/(?:\\+?7|8)\\d{10}/g) || [];
  const unique = [...new Set(matches.map((value) => digits(value)))];
  return {
    patient_phone_primary: unique[0] || '',
    patient_phone_secondary: unique[1] || '',
  };
}

function classifyOldFailure(row) {
  if (row.patient_id_proof === 'proven') return '';
  if (row.notes?.some((note) => note.includes('timed out'))) return 'timeout';
  if (row.notes?.some((note) => note.includes('patient info click did not yield'))) return 'missing_patient_link';
  if (row.notes?.some((note) => note.includes('patient info click error'))) return 'other';
  if (row.notes?.some((note) => note.includes('no clean popup matched row'))) return 'modal_not_opened';
  return 'other';
}

function asSet(items) {
  return new Set(items);
}

function setDiff(left, right) {
  return [...left].filter((value) => !right.has(value));
}

function setIntersect(left, right) {
  return [...left].filter((value) => right.has(value));
}

function countBy(items, keyFn) {
  const out = {};
  for (const item of items) {
    const key = keyFn(item) || '';
    out[key] = (out[key] || 0) + 1;
  }
  return out;
}

async function main() {
  const referenceSummary = loadJson(REFERENCE_SUMMARY_PATH);
  const referenceRowsPayload = loadJson(REFERENCE_ROWS_PATH);
  const referenceRows = Array.isArray(referenceRowsPayload.rows) ? referenceRowsPayload.rows : [];
  const authRefresh = fs.existsSync(AUTH_REFRESH_RESULT) ? loadJson(AUTH_REFRESH_RESULT) : null;
  const authSmoke = fs.existsSync(AUTH_SMOKE_RESULT) ? loadJson(AUTH_SMOKE_RESULT) : null;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    storageState: STORAGE_STATE,
    viewport: { width: 1600, height: 1200 },
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();

  try {
    const requestedUrl = await loadSchedule(page, DATE);
    const extracted = await extractRows(page);
    const authOk = extracted.schedule_root_present && !/login/i.test(extracted.final_url);

    const allRows = extracted.rows.map((row) => ({
      ...row,
      doctor_name: extracted.doctor_columns.find((col) => col.column_index === row.column_index)?.doctor_name || '',
    }));
    const targetRows = selectIdentityProbeRows(allRows);

    const reproRows = [];
    for (let index = 0; index < targetRows.length; index += 1) {
      const row = targetRows[index];
      console.log(`[repro] ${index + 1}/${targetRows.length} visit=${row.visit_id}`);

      const result = await Promise.race([
        (async () => {
          await loadSchedule(page, DATE);
          await closeTransientLayers(page);

          const rowLog = {
            row_index: index + 1,
            visit_id: row.visit_id,
            patient_name: row.title,
            doctor_name: row.doctor_name,
            popup_opened: 'no',
            patient_id_extracted: 'no',
            patient_id: '',
            failure_reason: '',
            notes: [],
          };

          if (/login/i.test(page.url())) {
            rowLog.failure_reason = 'login_redirect';
            rowLog.notes.push('login redirect observed before popup probing');
            return rowLog;
          }

          const popupResult = await openPopupDetailed(page, row);
          if (popupResult.popup) {
            rowLog.popup_opened = 'yes';
            const phones = parsePhones(popupResult.popup.text);
            if (phones.patient_phone_primary) rowLog.notes.push(`phone=${phones.patient_phone_primary}`);
          } else {
            rowLog.failure_reason = popupResult.stale_popup_seen ? 'stale_popup' : 'modal_not_opened';
            if (popupResult.stale_popup_text) rowLog.notes.push(`stale_popup_text=${popupResult.stale_popup_text}`);
            return rowLog;
          }

          if (!popupResult.popup.buttons.includes('Информация о пациенте')) {
            rowLog.failure_reason = 'missing_patient_link';
            rowLog.notes.push('popup has no patient-info button');
            return rowLog;
          }

          try {
            const button = page.locator('.popover.show button').filter({ hasText: 'Информация о пациенте' }).first();
            await button.click({ force: true, timeout: 5000 });
            await page.waitForTimeout(1000);
            const currentUrl = page.url();
            if (/login/i.test(currentUrl)) {
              rowLog.failure_reason = 'login_redirect';
              rowLog.notes.push('login redirect after patient-info click');
              return rowLog;
            }
            const match = currentUrl.match(/\/cbase\/detail\.html\?id=(\d+)/);
            if (match) {
              rowLog.patient_id_extracted = 'yes';
              rowLog.patient_id = match[1];
              return rowLog;
            }
            rowLog.failure_reason = 'missing_patient_link';
            rowLog.notes.push('patient info click did not yield cbase/detail id');
            return rowLog;
          } catch (error) {
            rowLog.failure_reason = 'other';
            rowLog.notes.push(clean(String(error)).slice(0, 200));
            return rowLog;
          }
        })(),
        new Promise((resolve) => setTimeout(() => resolve({
          row_index: index + 1,
          visit_id: row.visit_id,
          patient_name: row.title,
          doctor_name: row.doctor_name,
          popup_opened: 'no',
          patient_id_extracted: 'no',
          patient_id: '',
          failure_reason: 'timeout',
          notes: ['row-level timeout after 15000ms'],
        }), 15000)),
      ]);

      reproRows.push(result);
    }

    const refResolved = asSet(referenceRows.filter((row) => row.patient_id_proof === 'proven').map((row) => row.visit_id));
    const newResolved = asSet(reproRows.filter((row) => row.patient_id_extracted === 'yes').map((row) => row.visit_id));
    const refFailed = asSet(referenceRows.filter((row) => row.patient_id_proof !== 'proven').map((row) => row.visit_id));
    const newFailed = asSet(reproRows.filter((row) => row.patient_id_extracted !== 'yes').map((row) => row.visit_id));

    const oldFailureRows = referenceRows
      .filter((row) => row.patient_id_proof !== 'proven')
      .map((row) => ({ visit_id: row.visit_id, failure_reason: classifyOldFailure(row) }));
    const newFailureRows = reproRows
      .filter((row) => row.patient_id_extracted !== 'yes')
      .map((row) => ({ visit_id: row.visit_id, failure_reason: row.failure_reason || 'other' }));

    const changedRows = [];
    const byOld = new Map(referenceRows.map((row) => [row.visit_id, row]));
    const byNew = new Map(reproRows.map((row) => [row.visit_id, row]));
    for (const visitId of new Set([...byOld.keys(), ...byNew.keys()])) {
      const oldRow = byOld.get(visitId);
      const newRow = byNew.get(visitId);
      if (!oldRow || !newRow) {
        changedRows.push({
          visit_id: visitId,
          old_status: oldRow ? (oldRow.patient_id_proof === 'proven' ? 'resolved' : 'unresolved') : 'not_in_old_subset',
          new_status: newRow ? (newRow.patient_id_extracted === 'yes' ? 'resolved' : 'unresolved') : 'not_in_new_subset',
        });
        continue;
      }
      const oldStatus = oldRow.patient_id_proof === 'proven' ? 'resolved' : 'unresolved';
      const newStatus = newRow.patient_id_extracted === 'yes' ? 'resolved' : 'unresolved';
      const oldFailure = classifyOldFailure(oldRow);
      const newFailure = newRow.failure_reason || '';
      if (oldStatus !== newStatus || oldFailure !== newFailure || clean(oldRow.patient_id) !== clean(newRow.patient_id)) {
        changedRows.push({
          visit_id: visitId,
          patient_name: newRow.patient_name || oldRow.patient_name_runtime,
          old_status: oldStatus,
          new_status: newStatus,
          old_patient_id: clean(oldRow.patient_id),
          new_patient_id: clean(newRow.patient_id),
          old_failure_reason: oldFailure,
          new_failure_reason: newFailure,
        });
      }
    }

    const oldSummary = referenceSummary.identity_validation.summary;
    const newSummary = {
      patient_rows_total: targetRows.length ? extracted.rows.filter((row) => !row.is_service_row).length : 0,
      patient_rows_probed: reproRows.length,
      popup_success_count: reproRows.filter((row) => row.popup_opened === 'yes').length,
      patient_id_resolved_probed: reproRows.filter((row) => row.patient_id_extracted === 'yes').length,
      unresolved_probed: reproRows.filter((row) => row.patient_id_extracted !== 'yes').length,
      subset_mode: reproRows.length < extracted.rows.filter((row) => !row.is_service_row).length ? 'subset' : 'full',
    };

    let finalVerdict = 'partially reproducible';
    let trustVerdict = 'old 24/40 trusted with limits';
    if (
      oldSummary.patient_rows_probed === newSummary.patient_rows_probed
      && oldSummary.popup_success_count === newSummary.popup_success_count
      && oldSummary.patient_id_resolved_probed === newSummary.patient_id_resolved_probed
      && oldSummary.unresolved_probed === newSummary.unresolved_probed
      && changedRows.length === 0
    ) {
      finalVerdict = 'reproducible';
      trustVerdict = 'old 24/40 trusted';
    } else if (newSummary.patient_rows_probed === 0 || /login/i.test(extracted.final_url)) {
      finalVerdict = 'not reproducible';
      trustVerdict = 'old 24/40 not trusted until auth/state issue is resolved';
    }
    const followupVerdict = newSummary.patient_id_resolved_probed < extracted.rows.filter((row) => !row.is_service_row).length
      ? 'yes, another follow-up beyond 40 is still useful if broader February identity closure is needed'
      : 'no, further follow-up beyond 40 is not required for this scope';

    const payload = {
      generated_at: new Date().toISOString(),
      date: DATE,
      method_scope: 'identity_only_repro_pass',
      subset_limit: SUBSET_LIMIT,
      auth: {
        refresh_result_path: path.relative(REPO_ROOT, AUTH_REFRESH_RESULT),
        smoke_result_path: path.relative(REPO_ROOT, AUTH_SMOKE_RESULT),
        refresh_status: authRefresh?.status || 'unknown',
        smoke_readiness: authSmoke?.summary?.readiness || 'unknown',
        runtime_authenticated: authOk,
        final_url: extracted.final_url,
      },
      reference_result: {
        patient_rows_total: 67,
        patient_rows_probed: 40,
        popup_success_count: 30,
        patient_id_resolved_probed: 24,
        unresolved_probed: 16,
      },
      old_summary: oldSummary,
      repro_summary: newSummary,
      overlaps: {
        resolved_rows_overlap: setIntersect(refResolved, newResolved),
        resolved_rows_only_old: setDiff(refResolved, newResolved),
        resolved_rows_only_new: setDiff(newResolved, refResolved),
        failed_rows_overlap: setIntersect(refFailed, newFailed),
        failed_rows_only_old: setDiff(refFailed, newFailed),
        failed_rows_only_new: setDiff(newFailed, refFailed),
        old_failure_reason_counts: countBy(oldFailureRows, (row) => row.failure_reason),
        new_failure_reason_counts: countBy(newFailureRows, (row) => row.failure_reason),
      },
      changed_rows: changedRows,
      row_logs: reproRows,
      verdict: {
        reproducibility: finalVerdict,
        trust: trustVerdict,
        further_followup_beyond_40: followupVerdict,
      },
    };

    fs.writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2), 'utf-8');

    const diffLines = [
      '# Identity Repro Diff 2026-02-16',
      '',
      '## Reference',
      '',
      `- old patient_rows_total = ${oldSummary.patient_rows_total}`,
      `- old patient_rows_probed = ${oldSummary.patient_rows_probed}`,
      `- old popup_success_count = ${oldSummary.popup_success_count}`,
      `- old patient_id_resolved_probed = ${oldSummary.patient_id_resolved_probed}`,
      `- old unresolved_probed = ${oldSummary.unresolved_probed}`,
      '',
      '## Repro result',
      '',
      `- new patient_rows_total = ${newSummary.patient_rows_total}`,
      `- new patient_rows_probed = ${newSummary.patient_rows_probed}`,
      `- new popup_success_count = ${newSummary.popup_success_count}`,
      `- new patient_id_resolved_probed = ${newSummary.patient_id_resolved_probed}`,
      `- new unresolved_probed = ${newSummary.unresolved_probed}`,
      '',
      '## Comparison',
      '',
      `- exact same summary metrics: ${oldSummary.patient_rows_probed === newSummary.patient_rows_probed && oldSummary.popup_success_count === newSummary.popup_success_count && oldSummary.patient_id_resolved_probed === newSummary.patient_id_resolved_probed && oldSummary.unresolved_probed === newSummary.unresolved_probed ? 'yes' : 'no'}`,
      `- changed rows count: ${changedRows.length}`,
      `- resolved overlap count: ${payload.overlaps.resolved_rows_overlap.length}`,
      `- resolved only old count: ${payload.overlaps.resolved_rows_only_old.length}`,
      `- resolved only new count: ${payload.overlaps.resolved_rows_only_new.length}`,
      `- failed overlap count: ${payload.overlaps.failed_rows_overlap.length}`,
      `- failed only old count: ${payload.overlaps.failed_rows_only_old.length}`,
      `- failed only new count: ${payload.overlaps.failed_rows_only_new.length}`,
      '',
      '## Failure reason overlap',
      '',
      `- old failure reasons: ${JSON.stringify(payload.overlaps.old_failure_reason_counts)}`,
      `- new failure reasons: ${JSON.stringify(payload.overlaps.new_failure_reason_counts)}`,
      '',
      '## Changed rows',
      '',
      '| Visit ID | Patient | Old status | New status | Old failure | New failure |',
      '| --- | --- | --- | --- | --- | --- |',
    ];

    if (changedRows.length === 0) {
      diffLines.push('| n/a | n/a | n/a | n/a | n/a | n/a |');
    } else {
      for (const row of changedRows) {
        diffLines.push(`| ${row.visit_id} | ${clean(row.patient_name)} | ${clean(row.old_status)} | ${clean(row.new_status)} | ${clean(row.old_failure_reason)} | ${clean(row.new_failure_reason)} |`);
      }
    }

    diffLines.push(
      '',
      '## Final verdict',
      '',
      `- ${finalVerdict}`,
      `- ${trustVerdict}`,
      `- ${followupVerdict}`,
      '',
      '## Safe boundary',
      '',
      '- schi-10 remains inferred',
      '- cash remains patient-day only',
      '- auth remains ready_with_limits',
    );

    fs.writeFileSync(OUT_MD, diffLines.join('\n') + '\n', 'utf-8');
    console.log(OUT_JSON);
    console.log(OUT_MD);
  } finally {
    await context.close().catch(() => null);
    await browser.close().catch(() => null);
  }
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
