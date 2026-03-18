# Schedule 2026-03-10 Operational Dump Master

## PART 1. Executive Result
| Area | Result | Status | Notes |
| --- | --- | --- | --- |
| Access/auth | authenticated | proven | https://dcpraktik.dental-pro.online/visits/schedule/index?date=2026-03-10 |
| Date targeting | https://dcpraktik.dental-pro.online/visits/schedule/index?date=2026-03-10 | proven | Direct URL query + datepicker selectDay both observed |
| Runtime schedule container | #schedule-day-container | proven | Primary schedule root with scheduler dataset attributes |
| Doctors extracted | 11 | proven | Doctor view columns |
| Cabinets extracted | 10 | proven | Recovered through chair view toggle |
| Visits extracted | 56 | proven | Task cards on 2026-03-10 doctor view |
| Network trace | 308 | proven | Document + assets + interaction-related requests |

## PART 2. Page and Date Mechanics
| Item | Extracted Value | Evidence | Status |
| --- | --- | --- | --- |
| Current URL | https://dcpraktik.dental-pro.online/visits/schedule/index?date=2026-03-10 | page.url() | proven |
| Page title | Расписание на день | document.title | proven |
| Visible date | 10.03.2026 | #schedule-day-container input.form-control-clear | proven |
| Root data-date | 2026-03-10 | #schedule-day-container[data-date] | proven |
| Direct route pattern | /visits/schedule/index?date=YYYY-MM-DD | URL after date switch | proven |
| Datepicker select pattern | td[data-action="selectDay"][data-day="10.03.2026"] | datepicker DOM | proven |
| Day navigation controls | prev / today / next buttons | title attrs in switcher-overflow | proven |

## PART 3. DOM Structure
| Container / Entity | Selector / Path | Meaning | Status |
| --- | --- | --- | --- |
| Schedule root | #schedule-day-container | Primary runtime container | proven |
| Toolbar | #schedule-day-container > div:nth-child(1) | Date picker, view switches, actions | proven |
| Group tabs | #schedule-day-container > div:nth-child(2) | Doctor group filters | proven |
| Scheduler body | .scheduler-body | Main grid body | proven |
| Timeline | .timeline | Hour labels and time grid rows | proven |
| Columns | .columns-col | Doctor or chair columns depending on mode | proven |
| Visit cards | [id^="task-record-"] | Runtime visit/task blocks | proven |

## PART 4. Schedule Entities
| Entity Type | Count | Extraction Status | Notes |
| --- | --- | --- | --- |
| doctors | 11 | proven | Doctor view columns |
| cabinets | 10 | proven | Chair view columns |
| timeslots | 65 | proven | Timeline + helper slots |
| visits | 56 | proven | Task cards |
| statuses | 54 | structurally_observed | Derived from classes/icons/text |
| modals | 0 | partial | Interaction-triggered layers |
| tooltips | 372 | partial | Interaction-triggered layers |
| filters | 10 | proven | Group tabs + date controls |
| actions | 31 | proven | Href/data-action inventory |

## PART 5. Visit Card Findings
| Visit / Selector | Extracted Fields | Popup/Modal | Linked Requests | Status |
| --- | --- | --- | --- | --- |
| 130410 / #task-record-130410 | САВИНОВ А. В.; 09:00-10:45; Повторная консультация гигиениста | 4 | 0 | proven |
| 129458 / #task-record-129458 | БЕВЗА В. А.; 11:30-12:30; Продолжение лечения гигиенист | 4 | 0 | proven |
| 130382 / #task-record-130382 | ЗЕЛЕНСКИХ Н. С.; 13:00-14:00; Повторная консультация гигиениста | 4 | 0 | proven |
| 130119 / #task-record-130119 | ХЕХЛЕР Ю. М.; 10:00-11:00; Продолжение лечения врача ортопеда | 4 | 0 | proven |
| 130483 / #task-record-130483 | САВИНОВ А. В.; 12:00-12:30; | Снятие диагностического оттиска | 4 | 0 | proven |
| 129591 / #task-record-129591 | ЮГАЙ В. В.; 10:00-10:45; Повторный прием со сплинтом | 4 | 0 | proven |
| 129734 / #task-record-129734 | ПРИСЯЖНЮК Е. А.; 10:45-11:00; Неявка | 4 | 0 | proven |
| 130053 / #task-record-130053 | ФЕДОРОВА Н. В.; 11:15-11:30; Повторная консультация врача ортодонта | 4 | 0 | proven |
| 130231 / #task-record-130231 | ХУТ-ОГЛЫ Д. И.; 12:00-13:00; Онлайн запись | 4 | 0 | proven |
| 130329 / #task-record-130329 | ТЮТЮНОВА С. Р.; 13:00-14:00; Онлайн запись | 4 | 0 | proven |
| 129677 / #task-record-129677 | САВИНКОВА В. С.; 14:00-14:30; Первичная консультация ортодонта | 4 | 0 | proven |
| 129505 / #task-record-129505 | Резерв для пациента; 15:30-16:00 | 4 | 0 | proven |
| 129459 / #task-record-129459 | БЕВЗА В. А.; 16:30-17:00; Продолжение лечения ортодонт | 5 | 0 | proven |
| 130087 / #task-record-130087 | ЧИЖОВА Е. А.; 17:30-17:45; Повторная консультация врача-ортодонта | 6 | 0 | proven |
| 130215 / #task-record-130215 | ФОМЕНКО А. Ю.; 14:00-15:00; Прямая реставрация зуба жевательной зоны | 6 | 0 | proven |

## PART 6. Network and API Findings
| Request / Endpoint | Purpose | Relation to Schedule | Confidence | Status |
| --- | --- | --- | --- | --- |
| GET /visits/schedule/index?date=2026-03-10 | schedule_document | high | High | proven |
| GET /content/cache/assets/calendar.05f0e5006e798f2d468757a836fc708b.js | other | medium | Medium | proven |
| GET /content/cache/assets/schedule.94a5688cc76a38b6004d3dbee2b9e0a1.js | other | medium | Medium | proven |
| GET /content/cache/assets/schedule-icons.931fefa167a556f2fbe18537dec397de.css | other | medium | Medium | proven |
| GET /content/cache/assets/doctorCalendar.ee8c105634775c09aeb5151a61cfec68.css | other | medium | Medium | proven |
| GET /content/cache/assets/recordCalendar.d86c4911f8191dbd8b557a4e3f89aa55.css | other | medium | Medium | proven |
| GET /content/cache/assets/visits.84b16c8608c22d52891f1101467ddac0.css | other | medium | Medium | proven |

## PART 7. Hidden Data and Attributes
| Source | Data Found | Why It Matters | Status |
| --- | --- | --- | --- |
| schedule root dataset | {"id":"schedule-day-container","class":"schedule-container","data-update-interval":"15","data-interval":"15","data-interval-height":"15","data-column-width":"250","data-record-font | Carries interval, column width, filter branches, visible date state | proven |
| window.mvcfg | {"keys":["version","container","blocks_id","useajaxloader","timeoutajaxloader","money_symbol","notify_cron_interval","debug","timezone_offset","client","price_rounding","notify_sou | Global runtime config and plugin context | proven |
| window.mvUser.data | null | Authenticated user identity and auth state | proven |
| task card attributes | id/class/style/icon classes | Task ids and status/icon markers | proven |

## PART 8. Problems and Recoveries
| Problem | Attempted Fix | Outcome | Residual Gap |
| --- | --- | --- | --- |
| P7 | content-surname reconciliation against trigger task patient; stale layer filtering | partial_recovery | popup linkage is proven only for matching patient-surname cases; other links remain not proven |

## PART 9. What Can Already Be Used Operationally
| Data Area | Usability | Constraints | Readiness |
| --- | --- | --- | --- |
| Doctor/day schedule grid | usable | date targeting is stable in this pass; future passes should still cross-check visible input and URL | ready |
| Visit card roster | usable | task card contains partial entity only | ready_with_limits |
| Doctor->column mapping | usable | derived from doctor view column headers/add links | ready |
| Visit->cabinet mapping | usable | depends on chair view cross-map by task id | ready_with_limits |
| Tooltip/modal layer | usable with caution | interaction layer captured, but exact trigger linkage is only partial after stale-popup filtering | validation_required |
| XHR/API layer | limited | schedule appears HTML-first in this pass | ready_with_limits |

## PART 10. Final Conclusion
| Area | Verdict | Basis | Next Step |
| --- | --- | --- | --- |
| Date mechanics | proven via query + datepicker | URL and selectDay cell observed | treat query date as primary control |
| Schedule load model | HTML-first runtime schedule | task cards and columns present in post-load DOM | look for delegated detail endpoints only if needed |
| Operational entity extraction | doctor/timeslot/visit extraction workable now | structured DOM parse succeeded | normalize into custom schedule model |
| Cabinet extraction | recoverable through chair view | same task ids visible in chair mode | promote chair cross-map as optional secondary pass |
| Runtime date state | consistent in this pass | visible input, URL and root data-date aligned on 2026-03-10 | keep cross-checking all three on future passes |

### Completeness
- Schedule dump completeness for 10.03.2026: high on doctor/timeslot/visit/runtime structure, medium on cabinets and interaction detail layers, medium on transport internals.

### Top 5 operational findings
1. Date can be opened directly via `/visits/schedule/index?date=2026-03-10`.
2. The page is a server-rendered nested div grid, not a table or canvas timeline.
3. Visit/task entities are addressable by stable DOM ids `task-record-<visit_id>`.
4. Cabinet mapping is obtainable by switching from doctor view to chair view and reconciling by the same `task-record-<id>`.
5. The root schedule dataset keeps operational config (`data-interval=15`, `data-column-width=250`, branches filter) and, on this pass, matched the selected date.

### Top 5 remaining gaps
1. No strong evidence yet for a dedicated schedule JSON/XHR data endpoint in this pass.
2. Task-card interaction layer is only partially proven; shared popup persistence required stale-layer filtering.
3. Doctor-to-cabinet relation is recovered indirectly via task-id cross-map between doctor view and chair view, not from one explicit source field.
4. Status semantics live mostly in icon/class combinations, not in explicit normalized fields.
5. Interaction-triggered request linkage stayed empty for the proven popups in this pass.

### Next 10 actions
1. Build a reusable schedule extractor around `?date=` query targeting.
2. Treat `task-record-<id>` as the base visit key in schedule runtime models.
3. Add a second pass for chair view whenever cabinet attribution matters.
4. Capture per-task click behavior on a focused subset of status/icon families.
5. Correlate `/visits/forms/*` and `/stompro/scheduler/*` endpoints to task types.
6. Build a normalized status dictionary from icon class combinations.
7. Test whether doctor filter selection introduces new transport calls.
8. Test service record modal `/visits/forms/serviceRecord` separately as a schedule-side special case.
9. Compare schedule visit ids against accepted API schedule/task ids where possible.
10. Promote a governed schedule-source model with explicit primary/secondary layers.
