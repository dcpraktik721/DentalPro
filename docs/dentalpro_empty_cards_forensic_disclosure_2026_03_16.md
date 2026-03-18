# 1. Forensic objective

This document is a read-only forensic technical disclosure of the already completed live browser-first DentalPRO pass for the report label `Пустые карты зв` on `2026-03-16`.

The purpose of this disclosure is to preserve every technically relevant fact that is directly supported by the produced artifacts so future engineers can reuse the pass for:

- browser automation continuation
- network/CDP interception continuation
- schema extraction continuation
- auth-flow analysis continuation
- report-family mapping
- engineering handoff

This document does not rerun DentalPRO, does not modify artifacts, and does not upgrade any claim beyond what the saved evidence proves.

# 2. Artifact inventory

| path | artifact type | parse status | forensic role |
|---|---|---|---|
| `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_browser_access_2026_03_16.json` | JSON | parsed | Primary source for access mode, session reuse, login requirement/success, cookie/session presence, and high-level auth limitations |
| `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json` | JSON | parsed | Primary source for request chain, response chain, filter contract, final filtered URL, and confirmed data-bearing endpoint |
| `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json` | JSON | parsed | Primary source for extracted headers, rows, row count, extraction method, and machine-readable row model |
| `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_export_empty_cards_2026_03_16.json` | JSON | parsed | Primary source for export non-use in this pass and export-related limitations |
| `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_js_auth_flow_analysis_2026_03_16.json` | JSON | parsed | Primary source for XTEA/client-side crypto observation and explicit non-reproduction of transport auth |
| `/Users/macbook15/Downloads/MacAi/docs/dentalpro_empty_cards_report_2026_03_16.md` | Markdown | parsed | Human-readable prior pass summary; useful corroborating layer, not the only evidence basis |
| `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_login_page_2026_03_16.html` | HTML | parsed | Raw page evidence for login form structure, `backto`, and direct observation of loaded `xtea` asset |
| `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` | HTML | parsed | Raw page evidence for confirmed report location, filter fields, selected status, table headers, row-bearing DOM, and absence of observed export control in this pass |

# 3. Pass scope and scope limits

What was attempted:

- browser-first access to DentalPRO
- practical login through the real login page if needed
- navigation to the target empty-cards registry page
- date-bound filtering for `2026-03-16`
- capture of request/response metadata around login, page open, and report load
- extraction of structured report data from the resulting runtime page
- check for export control in the live DOM of the reached page

What was not attempted or not reproduced:

- transport-only auth reproduction
- full client-side crypto/XTEA reverse engineering
- export trigger or file retrieval
- direct API extraction outside the browser session
- parity comparison between runtime and export
- detail-card drilling for every `/medblock/cards/view?id=...` link
- hidden endpoint discovery beyond what the pass actually touched

What was proven:

- browser UI login succeeded in practice
- a valid authenticated browser session existed after login
- the target data came from the filtered HTML response of `/medblock/cards/index?...`
- structured extraction produced `18` rows and `7` headers
- no export control was observed in the live DOM of this pass

What remains unknown:

- whether transport-only auth can be safely reproduced
- the exact client-side crypto flow and whether `pass=61fd...` is XTEA-derived, hash-derived, or otherwise transformed
- whether the page has a hidden or alternate export path not exercised in this pass
- whether pagination exists outside the captured HTML response
- whether an official API or session endpoint exists outside the observed browser flow

What this document can support:

- implementation of browser-session-backed access
- implementation of GET filter submission for this registry path
- implementation of table extraction for the observed HTML shape
- request/response interception setup focused on the proven path

What this document cannot support:

- claims of transport-auth reproducibility
- claims of official API availability
- claims of export support or export absence beyond this pass
- claims of parity between runtime and export

# 4. Access path and session model

- Entry URL: `https://dcpraktik.dental-pro.online/medblock/cards/index`
- Browser session reused: `false`
- Fresh browser UI login required: `true`
- Login succeeded: `true`
- Cookies/session state observed: `true`
- Access mode that actually succeeded: `browser_ui_login`

Evidence:

- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_browser_access_2026_03_16.json`
- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`

Directly proven session evidence:

- `DP_SESSION_5e08fbf41fbaa28e0b4b23b10b9281f4`
- `DP_COOKIE_506574ef03471cb94275687de0db1259`
- `DP_COOKIE_8f48f2c726c474b4fea91fd0b290a404`

These cookies are recorded in `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_browser_access_2026_03_16.json`. This proves authenticated session state existed in the browser context after UI login. It does not prove transport-only auth reproduction.

# 5. Auth behavior and client-side crypto

- Client-side crypto/XTEA observed: `true`
- Where observed: in the saved login HTML as a loaded JS asset reference to `/content/cache/assets/7.xtea.f90149642cb738981c5d7b10da326c9f.js`
- JS auth flow fully understood: `false`
- Transport-only auth reproduced: `false`
- Official API/session mechanism found: `false`

Direct evidence:

- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_js_auth_flow_analysis_2026_03_16.json`
- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_login_page_2026_03_16.html`
- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`

Directly observed auth-related facts:

- Login page loaded `xtea` JS asset.
- Login page contained `login`, `password`, and hidden `backto` fields.
- Captured browser request to `/user/ajax/login.json` used POST form data:
  `backto=L21lZGJsb2NrL2NhcmRzL2luZGV4&login=Корытников Р.В.&pass=61fd5547a130bc7125722c81be9d9619&captcha=`
- Captured response from `/user/ajax/login.json` returned JSON success with redirect to `/medblock/cards/index`.

Unknowns that remain:

- whether the `pass` field was produced by XTEA, hashing, or another client-side transform
- exact sequencing and parameters of the client-side auth transform
- whether the same auth flow can be replayed safely without a browser

This pass proves browser-backed auth success. It does not prove transport-auth success.

# 6. Confirmed report location

- Confirmed report path: `https://dcpraktik.dental-pro.online/medblock/cards/index`
- Confirmed report family: `Незаполненные карты / Пустые карты`
- Path type: registry path, not `/reports/reports/view?id=...`

Why this path is considered confirmed:

1. The request/response chain starts from `/medblock/cards/index` and returns the target runtime page after authentication.
2. The runtime page title is `Амбулаторные записи пациентов`.
3. The filtered data-bearing endpoint is the same registry path with GET query parameters.
4. The runtime extraction artifact stores the report family as `Незаполненные карты / Пустые карты`.

Evidence:

- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`
- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json`
- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html`

# 7. Confirmed filter contract

- Filter method: `GET`
- Filter action: `https://dcpraktik.dental-pro.online/medblock/cards/index`
- Date fields observed:
  - `filter[Filter][status_change_date][start]`
  - `filter[Filter][status_change_date][end]`
- Status field observed:
  - `filter[Filter][status][]`
- Optional fields observed in the final filtered request:
  - `filter[Filter][client_id]`
  - `filter[Filter][diagnosis_id]`
  - `filter[Filter][appointment_id]`
- Final filtered URL pattern:
  `https://dcpraktik.dental-pro.online/medblock/cards/index?filter%5BFilter%5D%5Bstatus_change_date%5D%5Bstart%5D=2026-03-16&filter%5BFilter%5D%5Bstatus_change_date%5D%5Bend%5D=2026-03-16&filter%5BFilter%5D%5Bstatus%5D%5B%5D=0&filter%5BFilter%5D%5Bclient_id%5D=&filter%5BFilter%5D%5Bdiagnosis_id%5D=&filter%5BFilter%5D%5Bappointment_id%5D=`

Directly proven status options from the network artifact:

- `0` -> `Пустая`
- `1` -> `Черновик`
- `2` -> `Отклонена`
- `3` -> `Подтверждена`
- `4` -> `Верифицирована`

Directly proven selected status in this pass:

- `value=0`, text `Пустая`

What is directly proven:

- the browser submitted a native GET form for the registry page
- the final query contained exact date and status parameters shown above
- the saved runtime HTML contained the exact date fields and selected status option for `Пустая`

What is not proven:

- that these are the only valid filters supported by the page globally
- that no additional hidden filter fields exist outside the captured HTML

Evidence:

- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`
- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html`

# 8. Runtime data path

Confirmed data-bearing path for this pass: `filtered HTML response`

Justification:

- The network artifact records exactly one data-bearing endpoint and classifies it as:
  - `kind: html_registry_page`
  - `usable: true`
  - note: `Runtime data was extracted directly from HTML table in filtered registry page`
- No data-bearing XHR/fetch endpoint is recorded for the actual report rows.
- The export artifact shows export was not used.
- The async/export endpoint list is empty in the network artifact.

Therefore, in this pass the report data path was not XHR/fetch, not export file, and not async job. It was the filtered HTML document response of `/medblock/cards/index?...`.

Evidence:

- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`
- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_export_empty_cards_2026_03_16.json`

# 9. Structured extraction method

- Headers were extracted into a machine-readable JSON array.
- Rows were extracted into a machine-readable JSON array of objects.
- Extraction was programmatic in the practical sense that structured JSON output exists for headers and rows; however, the exact DOM traversal code is not preserved as a separate artifact.
- Extraction was table-based.
- Extraction completeness is proven only with respect to the captured filtered HTML table represented in the saved runtime page and the saved JSON output.
- Recorded row count: `18`
- Recorded method label: `browser_session_html_table_after_native_get_form_submit`

What is directly proven:

- machine-readable extraction occurred
- it produced `7` headers and `18` rows
- row objects align to the header set

What is not separately proven:

- absence of hidden pagination outside the captured page
- absence of lazy-loaded rows outside the saved HTML

Evidence:

- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json`
- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html`

# 10. Exact extracted schema

Headers exactly as stored in the runtime extraction artifact:

1. `ID`
2. `Информация о карте`
3. `Пациент`
4. `Врач`
5. `Статус`
6. `Создано`
7. `Обновлено`

Evidence:

- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json`
- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html`

# 11. Exact extracted row model

The stored row model is a JSON object keyed by the exact header labels listed in section 10.

Observed row object shape:

```json
{
  "ID": "string",
  "Информация о карте": "string",
  "Пациент": "string",
  "Врач": "string",
  "Статус": "string",
  "Создано": "string",
  "Обновлено": "string"
}
```

Directly observed value behavior:

- all keys are present on the stored row objects in the sample
- values are stored as strings
- `Обновлено` may be an empty string

Evidence:

- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json`

# 12. Data sample

Exact sample from the extracted runtime artifact:

```json
[
  {
    "ID": "68389",
    "Информация о карте": "Дата: 16.03.2026 | Зуб(ы): №48 Осмотр хирурга Диагноз: K00.0 Адентия",
    "Пациент": "КОЛЯДЕНКО ЕВГЕНИЙ АЛЕКСАНДРОВИЧ",
    "Врач": "Дышлевой К.А.",
    "Статус": "Пустая",
    "Создано": "Дышлевой К.А. 16.03.2026 в 20:05:34",
    "Обновлено": ""
  },
  {
    "ID": "68387",
    "Информация о карте": "Дата: 16.03.2026 | Зуб(ы): №16 Лечение периодонтита 1 канал -2 посещение Диагноз: К04.5 Хронический апикальный периодонтит",
    "Пациент": "ЛАПЫКИНА МАРИНА МИХАЙЛОВНА",
    "Врач": "Зотов В.Д.",
    "Статус": "Пустая",
    "Создано": "Зотов В.Д. 16.03.2026 в 19:31:18",
    "Обновлено": ""
  },
  {
    "ID": "68386",
    "Информация о карте": "Дата: 16.03.2026 | Зуб(ы): №45 Прямая реставрация зуба жевательной зоны Диагноз: K02.1 Кариес дентина",
    "Пациент": "КОЛЧЕНКО ОЛЬГА КОНСТАНТИНОВНА",
    "Врач": "Аушева М.А.",
    "Статус": "Пустая",
    "Создано": "Аушева М.А. 16.03.2026 в 19:20:56",
    "Обновлено": ""
  }
]
```

Evidence:

- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json`

# 13. Export behavior

- Export control observed in this pass: `false`
- Export triggered: `false`
- File received: `false`
- File parsed: `false`
- Export contributed any data to the final result: `false`

What this pass directly proves:

- no export control was detected in the saved runtime DOM for this page during this pass
- final data came from runtime HTML extraction, not export

What this pass does not prove:

- that export does not exist globally for all empty-cards contexts
- that export cannot exist behind another role, another UI state, or another path

Evidence:

- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_export_empty_cards_2026_03_16.json`
- `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html`

# 14. Reusable engineering facts

| fact | evidence path | reuse value |
|---|---|---|
| Authenticated access succeeded through `browser_ui_login`, not session reuse | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_browser_access_2026_03_16.json` | Establishes the practical access mode for future automation runs when no valid session exists |
| The target report is reachable via `/medblock/cards/index`, not `/reports/reports/view?id=...` | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` | Prevents misclassification of this report as part of the saved-report registry family |
| Login redirect uses `backto=/medblock/cards/index` and login form stores hidden `backto=L21lZGJsb2NrL2NhcmRzL2luZGV4` | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_login_page_2026_03_16.html` | Useful for future browser-login scripting and auth-flow analysis |
| Client-side crypto was directly observed only as a loaded JS asset and an opaque `pass=` value in the login XHR | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_js_auth_flow_analysis_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_login_page_2026_03_16.html` | Useful for future auth reverse engineering without overstating reproduction success |
| The filter transport is a native GET form submit on the same registry route | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json` | Directly reusable for browser automation and replay inside an authenticated browser session |
| The exact proven date parameter names are `filter[Filter][status_change_date][start]` and `filter[Filter][status_change_date][end]` | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` | Direct input contract for future filter automation |
| The exact proven status field name is `filter[Filter][status][]` and selected value in this pass was `0` (`Пустая`) | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` | Direct input contract for status filtering |
| Additional observed query keys were `filter[Filter][client_id]`, `filter[Filter][diagnosis_id]`, and `filter[Filter][appointment_id]` with empty values in this pass | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` | Useful for future contract completion and optional filter handling |
| The data-bearing layer in this pass was the filtered HTML response, not a report-row XHR | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json` | Directs future interception work toward document navigation and saved HTML parsing |
| The runtime page exposes per-row links to `/medblock/cards/view?id=...` with a `back_url/backUrl` return path | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` | Useful for future detail-drill or card-level schema extraction |
| The extracted table schema is stable enough to model as `ID`, `Информация о карте`, `Пациент`, `Врач`, `Статус`, `Создано`, `Обновлено` for this pass | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` | Immediate input for schema extraction and downstream row-model design |
| The saved response artifact contains non-unique `response_id` values | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json` | Important caution for future CDP capture design and response-linking robustness |

# 15. Forbidden engineering assumptions

| forbidden assumption | why forbidden | what evidence is missing |
|---|---|---|
| Transport-only auth was reproduced | The artifacts explicitly say `transport_auth_reproduced: false` and `auth_flow_understood: false` | A validated replayable auth sequence and successful transport-only session establishment |
| XTEA was definitely the exact transform used for the login `pass` field | Only script presence and an opaque transformed `pass` value were observed | Proven algorithm, parameters, key material, sequencing, and validation against a reproduced login |
| This report belongs to the `/reports/reports/view?id=...` family | The pass proved the opposite: it used `/medblock/cards/index` | None; current evidence confirms registry-path behavior instead |
| The report data came from XHR/fetch JSON | The data-bearing endpoint is explicitly recorded as HTML registry page | A captured data-bearing XHR/fetch response carrying the rows |
| Export was verified as absent globally | Only this pass observed no export control in the captured runtime DOM | Alternative roles, alternate pages, hidden controls, or other export paths |
| Export parity was established | No export file was triggered or parsed | Export artifact, parsed file content, and content comparison against runtime data |
| The extracted `18` rows represent all possible data across the system | The artifacts prove `18` rows in the captured filtered HTML response only | Pagination proof, total-count proof, or server-side completeness proof |
| All optional filters supported by the page are fully known | Only a subset is directly proven by the saved HTML and filtered URL | Full filter census and DOM inventory under all UI states |
| `dppush/push/getConnectionString` or `license/notification/notify` were part of the report data path | They were observed as side traffic only | Evidence linking them to row acquisition |
| Official API support exists for this report | The artifacts explicitly say `official_api_or_session_found: false` | Verified API docs, endpoint contracts, or successful official session/API use |

# 16. Proven technical conclusions

| conclusion | evidence path(s) | status |
|---|---|---|
| A fresh browser UI login was required and succeeded for this pass | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_browser_access_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json` | proven |
| Authenticated session state existed in the browser after login | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_browser_access_2026_03_16.json` | proven |
| Client-side crypto/XTEA was observed as part of the loaded login page assets | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_js_auth_flow_analysis_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_login_page_2026_03_16.html` | proven |
| Client-side auth flow was not fully understood and transport-only auth was not reproduced | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_js_auth_flow_analysis_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_browser_access_2026_03_16.json` | proven |
| The target report was reached through `/medblock/cards/index` and filtered on the same route | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json` | proven |
| The date filter contract includes `filter[Filter][status_change_date][start]` and `filter[Filter][status_change_date][end]` | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` | proven |
| The status filter contract includes `filter[Filter][status][]` and selected status `0` (`Пустая`) in this pass | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` | proven |
| The actual data-bearing path in this pass was the filtered HTML response | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json` | proven |
| Structured runtime extraction completed successfully with `18` rows and `7` headers | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json` | proven |
| Export did not contribute data in this pass | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_export_empty_cards_2026_03_16.json` | proven |
| No export control was observed in the saved runtime DOM for this pass | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_export_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` | proven |
| The runtime page exposes card-level links that can support future detail extraction | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` | partially_proven |

# 17. Unknowns and blockers

- The exact client-side auth transform remains unknown.
- The exact role of the observed `xtea` asset in the login process remains unknown.
- The meaning of the transformed login field `pass=61fd5547a130bc7125722c81be9d9619` remains unknown.
- No official API/session endpoint was confirmed.
- No export path was exercised.
- Whether the page supports export under another UI state or role is unknown.
- Whether pagination exists outside the captured HTML is unknown.
- Whether the `18` rows represent the full result set or only the visible current page is not proven beyond the saved HTML.
- The response artifact contains non-unique response identifiers (`resp_6`, `resp_10` repeated), so response linkage should be treated carefully in future tooling.
- Responses for `req_11` and `req_12` are not present in the saved response chain; it is unknown whether capture ended before those responses were recorded or whether they were omitted by the pass.

# 18. What this pass does NOT prove

- It does not prove transport auth reproduction.
- It does not prove a fully understood XTEA/client-crypto login flow.
- It does not prove an official DentalPRO API for this report.
- It does not prove export support.
- It does not prove export absence outside this exact pass and DOM state.
- It does not prove parity between runtime and export.
- It does not prove system-wide completeness of the `18` extracted rows.
- It does not prove the absence of additional hidden filters or hidden endpoints.
- It does not prove that side requests to `dppush` or `license/notification` are relevant to report row retrieval.
- It does not prove that future runs will preserve identical DOM shape, request ordering, or session requirements.

# 19. Final forensic verdict

The completed pass proves a real browser-backed DentalPRO access path for `Пустые карты зв` on `2026-03-16`, with successful UI login, authenticated session establishment, native GET filtering on `/medblock/cards/index`, and structured extraction of `18` rows directly from the filtered HTML registry page. The pass does not prove transport-only auth, does not prove export support, and does not prove parity or completeness beyond the captured HTML response. For future implementation work, the strongest reusable facts are the browser-backed auth path, the exact GET filter contract, the HTML data-bearing route, the extracted table schema, and the existence of per-card detail links under `/medblock/cards/view?id=...`.

## Appendix A. Raw request table

| request_id | stage | method | full_url | query_params | post_data_present | post_data_summary | resource_type | why_it_matters |
|---|---|---|---|---|---|---|---|---|
| `req_1` | `report_registry` | `GET` | `https://dcpraktik.dental-pro.online/medblock/cards/index` | `{}` | no | — | `document` | Initial attempt to open the target registry path; triggered redirect to login |
| `req_2` | `login` | `GET` | `https://dcpraktik.dental-pro.online/user/login.html?backto=%2Fmedblock%2Fcards%2Findex` | `{"backto":"/medblock/cards/index"}` | no | — | `document` | Confirms actual login entry page and redirect target |
| `req_3` | `other` | `POST` | `https://dcpraktik.dental-pro.online/user/ajax/login.json` | `{}` | yes | `backto=L21lZGJsb2NrL2NhcmRzL2luZGV4&login=Корытников Р.В.&pass=61fd5547a130bc7125722c81be9d9619&captcha=` | `xhr` | Practical login request; proves browser auth used XHR POST to `login.json` |
| `req_4` | `report_registry` | `GET` | `https://dcpraktik.dental-pro.online/medblock/cards/index` | `{}` | no | — | `document` | First authenticated registry page load after login |
| `req_5` | `other` | `POST` | `https://dcpraktik.dental-pro.online/dppush/push/getConnectionString` | `{}` | no | — | `xhr` | Side-channel request observed after authenticated load; not proven data-bearing |
| `req_6` | `other` | `POST` | `https://dcpraktik.dental-pro.online/license/notification/notify` | `{}` | no | — | `xhr` | Side-channel request observed after authenticated load; not proven data-bearing |
| `req_7` | `report_registry` | `GET` | `https://dcpraktik.dental-pro.online/medblock/cards/index` | `{}` | no | — | `document` | Second base registry load captured before filter submit |
| `req_8` | `other` | `POST` | `https://dcpraktik.dental-pro.online/dppush/push/getConnectionString` | `{}` | no | — | `xhr` | Side-channel request observed around registry load |
| `req_9` | `other` | `POST` | `https://dcpraktik.dental-pro.online/license/notification/notify` | `{}` | no | — | `xhr` | Side-channel request observed around registry load |
| `req_10` | `report_registry` | `GET` | `https://dcpraktik.dental-pro.online/medblock/cards/index?filter%5BFilter%5D%5Bstatus_change_date%5D%5Bstart%5D=2026-03-16&filter%5BFilter%5D%5Bstatus_change_date%5D%5Bend%5D=2026-03-16&filter%5BFilter%5D%5Bstatus%5D%5B%5D=0&filter%5BFilter%5D%5Bclient_id%5D=&filter%5BFilter%5D%5Bdiagnosis_id%5D=&filter%5BFilter%5D%5Bappointment_id%5D=` | `{"filter[Filter][status_change_date][start]":"2026-03-16","filter[Filter][status_change_date][end]":"2026-03-16","filter[Filter][status][]":"0","filter[Filter][client_id]":"","filter[Filter][diagnosis_id]":"","filter[Filter][appointment_id]":""}` | no | — | `document` | Confirmed filtered data-bearing request for the target date and status |
| `req_11` | `other` | `POST` | `https://dcpraktik.dental-pro.online/dppush/push/getConnectionString` | `{}` | no | — | `xhr` | Side-channel request after filtered load; response not present in saved chain |
| `req_12` | `other` | `POST` | `https://dcpraktik.dental-pro.online/license/notification/notify` | `{}` | no | — | `xhr` | Side-channel request after filtered load; response not present in saved chain |

## Appendix B. Raw response table

| response_id | linked_request_id | stage | status | content_type | response_url | data_bearing | body_snippet_summary | why_it_matters |
|---|---|---|---:|---|---|---|---|---|
| `resp_1` | `req_1` | `report_registry` | `302` | `text/html; charset=UTF-8` | `https://dcpraktik.dental-pro.online/medblock/cards/index` | no | Redirected away from target registry | Confirms unauthenticated access to the registry path required login |
| `resp_2` | `req_2` | `login` | `200` | `text/html; charset=utf-8` | `https://dcpraktik.dental-pro.online/user/login.html?backto=%2Fmedblock%2Fcards%2Findex` | no | Login HTML with title `Авторизация` and loaded JS assets | Confirms real login page and raw auth surface |
| `resp_3` | `req_3` | `other` | `200` | `application/json; charset=utf-8` | `https://dcpraktik.dental-pro.online/user/ajax/login.json` | no | JSON success: `status:true`, `isauth:true`, `redirect:/medblock/cards/index` | Confirms browser-side login success |
| `resp_4` | `req_4` | `report_registry` | `200` | `text/html; charset=utf-8` | `https://dcpraktik.dental-pro.online/medblock/cards/index` | unclear | HTML page titled `Амбулаторные записи пациентов` | Confirms authenticated base registry load |
| `resp_6` | `req_5` | `other` | `200` | `application/json; charset=utf-8` | `https://dcpraktik.dental-pro.online/dppush/push/getConnectionString` | no | JSON with websocket connection string | Side-channel only; not proven report-data carrier |
| `resp_6` | `req_6` | `other` | `200` | `application/json; charset=utf-8` | `https://dcpraktik.dental-pro.online/license/notification/notify` | no | JSON `{"status":false}` | Side-channel only; not proven report-data carrier |
| `resp_7` | `req_7` | `report_registry` | `200` | `text/html; charset=utf-8` | `https://dcpraktik.dental-pro.online/medblock/cards/index` | unclear | Repeated base registry HTML page | Confirms pre-filter registry page state |
| `resp_10` | `req_9` | `other` | `200` | `application/json; charset=utf-8` | `https://dcpraktik.dental-pro.online/license/notification/notify` | no | Body snippet not preserved | Side-channel only |
| `resp_10` | `req_8` | `other` | `200` | `application/json; charset=utf-8` | `https://dcpraktik.dental-pro.online/dppush/push/getConnectionString` | no | Body snippet not preserved | Side-channel only |
| `resp_10` | `req_10` | `report_registry` | `200` | `text/html; charset=utf-8` | `https://dcpraktik.dental-pro.online/medblock/cards/index?filter%5BFilter%5D%5Bstatus_change_date%5D%5Bstart%5D=2026-03-16&filter%5BFilter%5D%5Bstatus_change_date%5D%5Bend%5D=2026-03-16&filter%5BFilter%5D%5Bstatus%5D%5B%5D=0&filter%5BFilter%5D%5Bclient_id%5D=&filter%5BFilter%5D%5Bdiagnosis_id%5D=&filter%5BFilter%5D%5Bappointment_id%5D=` | yes | Filtered HTML page titled `Амбулаторные записи пациентов` | Confirmed data-bearing response used for structured extraction |

Notes:

- The saved artifact uses non-unique response identifiers (`resp_6`, `resp_10` repeated). This is an artifact property and should not be normalized away without preserving the original evidence.
- No saved responses are present for `req_11` and `req_12`.

## Appendix C. Exact field contract

| field_name | source_layer | observed_in_headers | observed_in_rows | direct_or_derived | completeness_status | notes |
|---|---|---|---|---|---|---|
| `ID` | `runtime_html` | yes | yes | direct | proven | Header directly observed in `<th>` and present as row key in extraction artifact |
| `Информация о карте` | `runtime_html` | yes | yes | direct | proven | Header directly observed in `<th>` and present as row key in extraction artifact |
| `Пациент` | `runtime_html` | yes | yes | direct | proven | Header directly observed in `<th>` and present as row key in extraction artifact |
| `Врач` | `runtime_html` | yes | yes | direct | proven | Header directly observed in `<th>` and present as row key in extraction artifact |
| `Статус` | `runtime_html` | yes | yes | direct | proven | Header directly observed in `<th>` and present as row key in extraction artifact |
| `Создано` | `runtime_html` | yes | yes | direct | proven | Header directly observed in `<th>` and present as row key in extraction artifact |
| `Обновлено` | `runtime_html` | yes | yes | direct | proven | Header directly observed in `<th>` and present as row key in extraction artifact; values may be empty strings |

## Appendix D. Evidence map

| claim_or_fact | evidence_path | evidence_type | confidence | limitations |
|---|---|---|---|---|
| Access mode was `browser_ui_login` | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_browser_access_2026_03_16.json` | JSON artifact | High | High-level artifact, not raw browser trace |
| Login was required and succeeded | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_browser_access_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json` | JSON artifacts | High | Does not prove transport-only replay |
| Browser cookies/session state existed | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_browser_access_2026_03_16.json` | JSON artifact | High | Cookie presence alone does not prove how auth transform works |
| XTEA/client crypto was observed | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_js_auth_flow_analysis_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_login_page_2026_03_16.html` | JSON artifact + raw HTML | High | Observation is asset-level, not algorithm-level |
| Transport auth was not reproduced | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_js_auth_flow_analysis_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_browser_access_2026_03_16.json` | JSON artifacts | High | None |
| Confirmed report path is `/medblock/cards/index` | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` | JSON artifact + raw HTML | High | None |
| Filter contract uses GET with exact date/status keys | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` | JSON artifact + raw HTML | High | Only proven for observed pass and page state |
| Filtered HTML response was the data-bearing path | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json` | JSON artifact | High | Does not prove absence of alternative data paths |
| Structured extraction yielded `18` rows and `7` headers | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json` | JSON artifact | High | Completeness only proven for captured HTML/output |
| No export control was observed in this pass | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_export_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` | JSON artifact + raw HTML | High | Does not prove global export absence |
| Card-level detail links exist | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` | Raw HTML | Medium | Detail pages were not opened in this pass |
| Saved response identifiers are non-unique | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json` | JSON artifact | High | Artifact issue, not necessarily system behavior |

## Appendix E. Allowed vs forbidden claims

### Allowed claims

| claim | reason | evidence_path |
|---|---|---|
| Browser UI login succeeded and produced an authenticated session | Directly recorded in access artifact and login request/response chain | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_browser_access_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json` |
| The report was reached on `/medblock/cards/index` | Direct route and filtered route are both captured | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json` |
| The date filter contract includes `status_change_date[start]` and `status_change_date[end]` | Exact field names are recorded in filter contract and runtime HTML | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` |
| The status filter used `filter[Filter][status][]=0` for `Пустая` | Exact selected status is recorded and HTML shows selected option | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_empty_cards_runtime_page_2026_03_16.html` |
| Structured data was extracted from the filtered runtime HTML response | Network artifact marks the filtered HTML page as data-bearing and runtime extraction artifact stores headers/rows | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_network_capture_report_empty_cards_2026_03_16.json`, `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json` |
| The extracted dataset contains `18` rows with the observed 7-field schema | Directly recorded in the runtime extraction artifact | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_runtime_extraction_empty_cards_2026_03_16.json` |
| Export did not contribute to the final data in this pass | Export artifact explicitly records `export_triggered:false`, `file_received:false`, `file_parsed:false` | `/Users/macbook15/Downloads/MacAi/artifacts/dentalpro_export_empty_cards_2026_03_16.json` |

### Forbidden claims

| claim | reason forbidden | missing evidence |
|---|---|---|
| Transport-only auth works for DentalPRO | This pass explicitly did not reproduce it | Validated transport replay and authenticated non-browser request sequence |
| XTEA is the proven login transform | Only asset presence and opaque transformed `pass` value were observed | Algorithm confirmation, keys/params, successful reproduction |
| Export is unavailable for this report family in all contexts | Only this page state and this pass were observed | Alternate-role, alternate-state, or alternate-route export evidence |
| Export parity is confirmed | No export file was obtained or parsed | Export file and content comparison |
| The `18` rows are the full system truth for 2026-03-16 | The artifacts prove only what was in the captured HTML response | Pagination, total count, or server-side completeness evidence |
| DentalPRO exposes an official API/session mechanism for this report | The artifacts explicitly say no such mechanism was found | Official docs or a confirmed API/session endpoint |

