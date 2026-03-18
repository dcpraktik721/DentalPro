# Schedule Operational Validation — 2026-02-15

**Date:** 2026-02-15 (Sunday / воскресенье)  
**Run date:** 2026-03-18  
**Auth:** Корытников Р.В. (Генеральный директор)  
**URL:** https://dcpraktik.dental-pro.online/visits/schedule/index?date=2026-02-15  
**Auth drift:** NOT detected — page loaded, no redirect to /login

---

## Schedule Layer

| Parameter | Result |
|-----------|--------|
| Page opens | ✅ YES |
| Date targeting works | ✅ YES |
| Route stable | ✅ YES |
| Total rows | 6 |
| Patient rows | 6 |
| Service/non-patient slots | 0 |
| Doctors active | 2 |
| Cabinets active | 2 (Кабинет 23 Л + П) |
| Specializations | Гигиенисты + Ортодонты only |
| Layout drift vs 10.03 | ❌ NONE — same column structure |
| Chair-view cross-map | ✅ Works (Кабинет 23 Л→Гигиенисты, Кабинет 23 П→Ортодонты) |

**Doctors & Visits:**

| Doctor | Specialization | Visits | Cabinet |
|--------|---------------|--------|---------|
| Храпонова Н.А. | Гигиенисты | 5 | Кабинет 23 (Л) |
| Литвинова Е. | Ортодонты | 1 | Кабинет 23 (П) |

**Visit list:**

| # | Patient | Time | Doctor | Patient ID |
|---|---------|------|--------|------------|
| 1 | АБИЛОВ Т.А. | 10:00–11:15 | Храпонова Н.А. | 17733 |
| 2 | ФЕШКОВА А.И. | 11:30–13:00 | Храпонова Н.А. | 13779 |
| 3 | БАШЕВА Е.Е. | 13:00–14:30 | Храпонова Н.А. | 19044 |
| 4 | ИЗМАЙЛОВ Р.А. | 14:30–15:15 | Храпонова Н.А. | 6264 |
| 5 | ИЗМАЙЛОВА А.А. | 15:15–16:00 | Храпонова Н.А. | 6348 |
| 6 | КОЗЛОВА К.А. | 12:00–12:30 | Литвинова Е. | 2133 |

---

## Patient Identity Layer

| Parameter | Result |
|-----------|--------|
| Total rows | 6 |
| Rows probed (popup) | 6 / 6 |
| patient_id resolved | 6 / 6 (100%) |
| Unresolved | 0 |
| Popup success rate | 100% |
| Route drift | None |

All patients resolved via `popup_clean_click_probe` → `/cbase/detail.html?id=XXXXX`.

Notable: ИЗМАЙЛОВ (id=6264, 5y) + ИЗМАЙЛОВА (id=6348, 7y) — siblings, same phone, same doctor.

---

## Ticket Layer

| Parameter | Result |
|-----------|--------|
| Total icons observed | 33 |
| Unique icon families | 8 |
| schi-10 count | 0 |
| Tooltip captures | 2 |
| Core families stable | ✅ YES |
| New families vs baseline | yellow-lightning-bolt, red-heart |

New families likely exist in baseline but not surfaced on 10.03 — not confirmed as drift.

---

## Cash/Finance Layer

| Parameter | Result |
|-----------|--------|
| RPT_24 Feb data in repo | ❌ NO |
| Patient-day matching possible | ❌ BLOCKED |
| Payment icons on cards | 0 (all visits unpaid at extraction) |
| Cash visit-level claim | FORBIDDEN |

---

## Key Findings

1. **Sunday schedule confirmed real** — 6 visits on Sunday is a significant operational finding. Not a blank day.
2. **100% patient_id resolution** — all 6 popups opened successfully, full identity closure.
3. **Cash layer blocked** — no RPT_24 Feb data to match against.
4. **Ticket extraction functional** — icons visible, tooltips captured, schi-10 absent.
5. **Only 2 doctors active** — lighter day vs 10.03 (11 doctors). Expected for Sunday.

---

## Method Stability Assessment

| Method | Result on 2026-02-15 |
|--------|---------------------|
| browser_first_route_access | ✅ STABLE |
| direct_tab_url_access | ✅ STABLE |
| dom_extraction | ✅ STABLE |
| popup_clean_click_probe | ✅ STABLE (6/6) |
| focused_rc_tooltip_extraction | ✅ STABLE (limited) |
| chair_view_cross_map | ✅ STABLE |
| patient-day cash matching | ❌ BLOCKED (no data) |
