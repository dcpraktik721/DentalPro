# Schedule Operational Validation — 2026-02-16

**Date:** 2026-02-16 (Monday / понедельник)  
**Run date:** 2026-03-18  
**Auth:** Корытников Р.В. (Генеральный директор)  
**URL:** https://dcpraktik.dental-pro.online/visits/schedule/index?date=2026-02-16  
**Auth drift:** NOT detected — page loaded, no redirect to /login

---

## Schedule Layer

| Parameter | Result |
|-----------|--------|
| Page opens | ✅ YES |
| Date targeting works | ✅ YES |
| Route stable | ✅ YES |
| Total rows extracted | 69 |
| Patient rows | 67 |
| Service/non-patient slots | 2 (Обед + Резерв) |
| Doctors active | 12 |
| Cabinets confirmed | Кабинет 23 (Л), Кабинет 19 |
| Layout drift vs 10.03 | ❌ NONE |
| Chair-view cross-map | ✅ Works |
| Online booking visits | 2 (МАРЧЕНКО Н.С., МИНАКОВА Д.Ф.) |

**Doctors & Visit Counts:**

| Doctor | Specialization | Visits |
|--------|---------------|--------|
| Храпонова Н.А. | Гигиенисты | 4 |
| Оленев А.О. | Ортопеды | 5 |
| Гулямхайдаров А.А. | Ортодонты | 10 |
| Кулешов К.А. | Ортодонты | 5 |
| Мамонтова С.А. | Ортодонты | 7 |
| Буряк Л.А. | Терапевты | 3 |
| Жихар З.К. | Терапевты | 1 |
| Зотов В.Д. | Терапевты/Ортопеды | 8 |
| Аушева М.А. | Хирурги | 7 |
| Дышлевой К.А. | Хирурги | 5 |
| Иващенко А.Н. | Хирурги/Ортопеды | 7 |
| Логвинчук Д.Н. | Хирурги | 5 |

---

## Patient Identity Layer

| Parameter | Result |
|-----------|--------|
| Total patient rows | 67 |
| Popup probed | 5 (representative subset) |
| patient_id resolved (probed) | 5 / 5 (100%) |
| Total unresolved (full day) | ~62 (not probed — subset validation only) |
| Popup success rate | 100% on probed subset |
| Route drift | None |

**Probed subset patient IDs:**

| Patient | patient_id | Doctor | Notes |
|---------|-----------|--------|-------|
| МАРЧЕНКО Н.С. (гигиенист) | 15327 | Храпонова Н.А. | Online booking |
| ТКАЧЕНКО Ю.Д. | 17371 | Оленев А.О. | |
| ЗАБОЛОТНЫЙ А.С. | 17914 | Оленев А.О. | Имплантат |
| ХАМОШИНА Н.П. | 18988 | Оленев А.О. | 84y, Первичная консультация |
| ГРАЧЕВА А.П. | 12498 | Храпонова Н.А. | |

---

## Ticket Layer

| Parameter | Result |
|-----------|--------|
| Total icons observed | ~250–350 estimated (4–6 per 67 rows) |
| Unique icon families | 8 |
| schi-10 count | 0 |
| Tooltip captures | 3 |
| Core families stable | ✅ YES |
| Notable: lightning-bolt | ХАМОШИНА, ОЛЬДТ, МЕЗЕЦ |
| Notable: black-square | ХАМОШИНА, МАРЧЕНКО гигиенист |
| Notable: red-check (vs green) | ЯЛОВАЯ Ю.Е. (Кулешов) |

**Icon families observed:**

| Family | Interpretation |
|--------|---------------|
| green-check | Confirmed/payment status (dominant) |
| orange-tooth | Dental ticket type |
| orange-circle | Status indicator |
| green-list | Plan/notes |
| phone | Contact available |
| lightning-bolt | Special status (3 patients) |
| black-square | Flag (2 patients) |
| red-check | Alternate status (ЯЛОВАЯ) |

---

## Cash/Finance Layer

| Parameter | Result |
|-----------|--------|
| Rows with payment icon | 65 / 67 (97%) |
| Rows WITHOUT payment icon | 2 (ХАМОШИНА Н.П., ПРИСЯЖНЮК Е.А.) |
| Payment amounts on cards | Not visible |
| RPT_24 Feb data in repo | ❌ NO |
| Patient-day matching | ❌ BLOCKED |
| Cash visit-level claim | FORBIDDEN |

High payment icon prevalence (97%) on Feb 16 vs 0% on Feb 15 — Feb 15 visits were likely all unpaid at time of extraction (morning); Feb 16 data extracted later allowing payments to post.

---

## Key Findings

1. **Full Monday schedule confirmed** — 12 doctors, 67 patient visits. Comparable scale to 10.03 baseline (56 rows, 11 doctors).
2. **Гулямхайдаров А.А. dominant** — 10 visits, most of any doctor. Consistent with 10.03 (7 visits).
3. **schi-10 absent** — no schi-10 icons on this date. Cannot determine if date-sensitive or absent from orthodontic/surgical specializations.
4. **МАРЧЕНКО Н.С.** appears in both Гигиенисты (14:00–15:30) AND Мамонтова С.А. (16:00–16:30) — possible different patients with same name or double booking.
5. **Мамонтова С.А.** — new doctor not seen in 10.03 baseline. Orthodontist specialization.
6. **Дышлевой К.А.** — new doctor not seen in 10.03 baseline. Surgeon.

---

## Method Stability Assessment

| Method | Result on 2026-02-16 |
|--------|---------------------|
| browser_first_route_access | ✅ STABLE |
| direct_tab_url_access | ✅ STABLE |
| dom_extraction | ✅ STABLE |
| popup_clean_click_probe | ✅ STABLE (5/5 subset) |
| focused_rc_tooltip_extraction | ✅ STABLE (3 captures) |
| chair_view_cross_map | ✅ STABLE |
| patient-day cash matching | ❌ BLOCKED (no RPT_24 Feb) |
