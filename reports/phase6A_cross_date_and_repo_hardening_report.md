# Phase 6A Report: Cross-Date Validation + Repo Hardening

**Generated:** 2026-03-18  
**Auth used:** Корытников Р.В. (Генеральный директор) / live browser  
**Baseline:** 2026-03-10  
**Validation dates:** 2026-02-15, 2026-02-16  
**Repo:** https://github.com/dcpraktik721/DentalPro  
**Previous phase:** 87652f8 (Phase 3 hardening, 2026-03-18)

---

## PART 1. Executive Summary

| Area | Result | Status | Notes |
|------|--------|--------|-------|
| Auth / Live access | ✅ Authenticated | RESOLVED | Корытников Р.В. login works; credentials verified |
| Live run 2026-02-15 | ✅ Completed | DONE | 6 rows, 2 doctors, 100% patient_id |
| Live run 2026-02-16 | ✅ Completed | DONE | 67 rows, 12 doctors, subset probed |
| Cross-date stable methods | 7 methods | PROVEN | core nav + popup + extraction stable |
| Cash enrichment cross-date | ❌ Blocked | OPEN | No RPT_24 Feb data in repo |
| storageState gap | ❌ Still open | OPEN | Not in repo — credentials login used as workaround |
| External SoT (worklog) | ⚠️ Stub created | PARTIAL | Structured extraction stub in docs/ |
| External SoT (api-dossier) | ⚠️ Stub created | PARTIAL | Awaiting local Mac migration |
| methods_registry | ✅ v1.3.0 | DONE | status populated, cross_date_stable added |
| Auth smoke-check script | ✅ Created | DONE | runtime/auth_smoke_check.js |

---

## PART 2. Repo Hardening Changes

| Area | What changed | Why it matters |
|------|-------------|----------------|
| `runtime/auth_smoke_check.js` | Created — static cookie check script | Detects auth drift before any live probe |
| `docs/auth_runtime_readiness.md` | Created — full auth drift protocol | Formalizes auth dependency handling |
| `docs/external_sot_extraction_worklog.md` | Created — structured extraction stub | Gap closure roadmap for master worklog |
| `registry/methods_registry.json` → v1.3.0 | status fields populated (was null), cross_date_validated added | Registry is now machine-readable for all 23 entries |
| 10 validation artifacts | Created in schedule/ | Cross-date evidence base for Feb 15 + Feb 16 |
| `reports/cross_date_validation_matrix.json` | Created — 12 methods × 3 dates | Machine-readable stability matrix |

---

## PART 3. External SoT Status

| Asset | Previous state | New state | Current status |
|-------|---------------|-----------|----------------|
| dentalpro-master-worklog.md | External, not in repo | Extraction stub in docs/ | ⚠️ PARTIAL — stub created, raw file pending Mac migration |
| report-api-verification-dossier-2026-03-09.md | External, not in repo | Referenced in methods_registry limitations | ❌ OPEN — needs Mac migration |
| doctor_patients_Geyushova_2026-02.json | In repo | Used for Feb context | ✅ IN_REPO (Feb Geyushova data) |
| RPT_24 Feb 2026 data | Not in repo | Not added | ❌ OPEN — needed for cash enrichment cross-date |

---

## PART 4. Auth and Runtime Readiness

| Check | Result | Risk | Next action |
|-------|--------|------|-------------|
| Корытников Р.В. credentials | ✅ Valid — login confirmed | Credential-based, not automated | Store as env var |
| storageState file | ❌ Not in repo | Silent auth drift for automated runs | Add auth_smoke_check before each run |
| smoke-check script | ✅ Created (runtime/auth_smoke_check.js) | Requires local Mac to run | Run on Mac before each session |
| Auth drift on Feb dates | ✅ Not detected — both dates loaded | Low on this session | Re-test if session > 24h old |
| Login redirect on date nav | ✅ Not triggered | — | Stable |

---

## PART 5. Validation Run — 2026-02-15

| Layer | Result | Metrics | Notes |
|-------|--------|---------|-------|
| Schedule | ✅ PASS | 6 rows, 2 doctors | Sunday — lighter but real day |
| Date mechanics | ✅ PASS | URL: ?date=2026-02-15 works | — |
| Doctors/cabinets | ✅ PASS | Храпонова + Литвинова, Каб 23 Л+П | — |
| Patient identity | ✅ PASS | 6/6 resolved (100%) | Full day probed |
| Ticket icons | ✅ PASS | 33 icons, 8 families, 2 tooltips | schi-10 = 0 |
| Cash enrichment | ❌ BLOCKED | 0/6 matched | No RPT_24 Feb data |
| schi-10 | ✅ Not present | 0 | Consistent with lighter day |
| Popup probe | ✅ PASS | 6/6 success | All patient IDs confirmed |

**Notable:** ИЗМАЙЛОВ + ИЗМАЙЛОВА siblings (5y+7y), АБИЛОВ with active DMS insurance.

---

## PART 6. Validation Run — 2026-02-16

| Layer | Result | Metrics | Notes |
|-------|--------|---------|-------|
| Schedule | ✅ PASS | 67 rows, 12 doctors | Full Monday — largest day in set |
| Date mechanics | ✅ PASS | URL: ?date=2026-02-16 works | — |
| Doctors/cabinets | ✅ PASS | 12 doctors incl. 2 new vs baseline | Мамонтова, Дышлевой = new |
| Patient identity | ✅ PASS (subset) | 5/5 probed resolved | Full day not probed (67 rows) |
| Ticket icons | ✅ PASS | ~300 est, 8 families, 3 tooltips | schi-10 = 0 |
| Cash enrichment | ❌ BLOCKED | 0/67 matched | No RPT_24 Feb data |
| Payment icon rate | 97% | 65/67 rows | Strong indicator but not cash proof |
| schi-10 | ✅ Not present | 0 | Date-sensitive finding |

**Notable:** ХАМОШИНА (84y), ЗАБОЛОТНЫЙ (имплантат), МАРЧЕНКО appears in 2 columns same day.

---

## PART 7. Cross-Date Comparison

| Method / Layer | 2026-03-10 | 2026-02-15 | 2026-02-16 | Verdict |
|----------------|-----------|-----------|-----------|---------|
| Schedule page load | ✅ | ✅ | ✅ | STABLE |
| Date URL routing | ✅ | ✅ Sunday | ✅ Monday | STABLE |
| DOM row extraction | 56 rows | 6 rows | 67 rows | STABLE (count varies) |
| Popup probe | ✅ subset | ✅ 6/6 | ✅ 5/5 | STABLE |
| patient_id closure | 54/56 (96.4%) | 6/6 (100%) | 5/5 (100%) | STABLE |
| Tooltip extraction | full | 2 captures | 3 captures | STABLE |
| Chair cross-map | ✅ | ✅ | ✅ | STABLE |
| schi-10 | 11 (inferred) | 0 | 0 | DATE-SENSITIVE |
| Doctor roster | 11 doctors | 2 doctors | 12 doctors | DATE-SENSITIVE (varies) |
| Cash enrichment | 91.1% | BLOCKED | BLOCKED | SINGLE-DATE |
| XLSX extraction | ✅ March | NOT TESTED | NOT TESTED | SINGLE-DATE |

---

## PART 8. Stable vs Date-Sensitive Methods

| Method | Stability verdict | Basis | Safe claim boundary |
|--------|------------------|-------|---------------------|
| browser_first_route_access | **CROSS-DATE STABLE** | 3 dates | Safe to claim globally stable |
| direct_tab_url_access | **CROSS-DATE STABLE** | 3 dates incl. Sunday | Safe to claim globally stable |
| dom_extraction | **CROSS-DATE STABLE** | 3 dates | Method stable; counts are date-dependent |
| popup_clean_click_probe | **CROSS-DATE STABLE** | 3 dates | Route contract unchanged |
| patient_id via popup | **CROSS-DATE STABLE** | 3 dates | Safe on all dates tested |
| tooltip_extraction | **CROSS-DATE STABLE (limited)** | 3 dates | Works; full CSS class access blocked |
| chair_view_cross_map | **CROSS-DATE STABLE** | 3 dates | Cabinet mapping unchanged |
| schi-10 observation | **DATE-SENSITIVE** | 10.03 only | inferred only; absent Feb — do not generalize |
| patient-day cash matching | **SINGLE-DATE** | 10.03 only | Proven only on March RPT_24 data |
| parsed_xlsx_extraction | **SINGLE-DATE** | 10.03 only | Method stable but data-dependent |
| storageState_auth_reuse | **BLOCKED** | Not in repo | Cannot claim cross-date automated |

---

## PART 9. Remaining Gaps

| Gap | Severity | Why still open | Next step |
|-----|----------|---------------|-----------|
| storageState not in repo | HIGH | Security policy — cannot commit active session tokens | Add env var support to all scripts; document in auth_runtime_readiness.md |
| RPT_24 Feb 2026 data | HIGH | Not pulled during session | Pull RPT_24 for 2026-02-01 to 2026-02-28 to enable Feb cash enrichment |
| dentalpro-master-worklog.md migration | MEDIUM | Local Mac access required | Migrate raw file, run extraction, update registry |
| report-api-verification-dossier migration | MEDIUM | Local Mac access required | Same as above |
| visit_id via data-id | MEDIUM | Requires JS execution (browser agent limitation) | Run extraction scripts on local Mac with Playwright |
| schi-10 cross-date proof | LOW | Absent Feb dates, inferred-only on baseline | Need date with known schi-10 visits to re-probe |
| Full day patient_id closure on Feb 16 | LOW | Only 5/67 probed | Extend popup probe to full day on local Mac |
| Write-path validation | MEDIUM | Not attempted | create-doc, visit result save, questionnaire submit — all untested |

---

## PART 10. Final Verdict

| Area | Verdict | Basis |
|------|---------|-------|
| Repo cross-date validated | **PARTIAL YES** | 7 core methods stable on 3 dates |
| Core navigation methods | **STABLE** | 3/3 dates passed |
| Patient identity layer | **STABLE** | 100% popup success on all tested dates |
| Ticket extraction | **STABLE (limited)** | Works on all dates; CSS class blocking is method constraint |
| Cash enrichment | **SINGLE-DATE ONLY** | RPT_24 Feb data not in repo |
| schi-10 | **DATE-SENSITIVE, INFERRED-ONLY** | Cannot promote above inferred |
| Auth gap | **OPEN** | storageState not in repo; credentials login is manual workaround |
| Execution readiness | **OPERATIONAL with constraints** | Can run schedule/patient layers; cash layer blocked |

### Summary answers

**1. Можно ли считать repo cross-date validated?**  
Да, с явными ограничениями. 7 методов подтверждены на трёх датах (10.03, 15.02, 16.02). Навигация, DOM-извлечение, popup-проба, patient_id closure — стабильны. Cash enrichment и XLSX-экстракция остаются single-date.

**2. Какие методы реально стабильны на нескольких датах?**  
browser_first_route_access, direct_tab_url_access, dom_extraction, popup_clean_click_probe, patient_id_via_popup, focused_rc_tooltip_extraction, chair_view_cross_map.

**3. Какие методы остаются single-date или subset-limited?**  
patient-day cash enrichment (RPT_24 March only), parsed_xlsx_extraction (March artifacts), schi-10 observation (10.03 only, inferred).

**4. Что сейчас главный blocker для полного execution-readiness?**  
(1) RPT_24 Feb 2026 data — нет в репо, cash layer неверифицирован на Feb.  
(2) storageState — не в репо, automated runs требуют credentials login.  
(3) visit_id extraction — требует JS execution, недоступного в browser agent mode.
