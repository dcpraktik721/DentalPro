# Documents State Machine

## Scope

This machine covers the patient documents surface under:
- `/cbase/detail.html?id=<client_id>&tab=addons%5Cdocstorage%5Cmodels%5CdocstorageCbaseTab`
- secondary URLs under `/docstorage/*`

## States

| State | Meaning | Evidence status |
|---|---|---|
| `documents_tab_loaded` | documents table or empty state rendered | confirmed |
| `document_row_available` | a document row with `doc_id` and metadata is available | confirmed |
| `document_download_ready` | download URL discovered | confirmed |
| `create_form_loaded` | create-doc form loaded via direct GET | confirmed |
| `document_generated` | new document created after submit | requires_live_validation |

## Triggers

| Trigger | Transport | Preconditions | Transition | Evidence status |
|---|---|---|---|---|
| Open documents tab | `GET /cbase/detail.html?...&tab=addons%5Cdocstorage%5Cmodels%5CdocstorageCbaseTab` | authenticated session | `documents_tab_loaded` | confirmed |
| Open create form | `GET /docstorage/forms/create_doc?...` | authenticated session, known client/company/package | `create_form_loaded` | confirmed |
| Download document | `GET /docstorage/pages/get_doc_file?id=<doc_id>` | known `doc_id` | `document_download_ready -> binary delivered` | confirmed |
| Submit create form | `POST /docstorage/forms/create_doc` | create form loaded, payload known | `create_form_loaded -> document_generated` | requires_live_validation |

## Confirmed mechanics

### Documents tab load

Safe parse conditions:
- documents table rows visible
- or known empty-state marker present

Side effects:
- none

### Download

Observed contract:
- direct GET to `/docstorage/pages/get_doc_file?id=<doc_id>`
- response is binary file download

Side effects:
- none

## Unconfirmed mechanics

### Create-doc submit

Known:
- bootstrap form URL is stable
- form is patient-specific through `party2_person_id=<client_id>`

Unknown:
- exact POST body schema
- whether generation is synchronous or deferred
- success message vs redirect vs modal refresh

Promotion status:
- `requires_live_validation`

## Rollback strategy

Confirmed:
- none needed for pure read/download path

Unconfirmed:
- rollback or deletion of newly generated documents

## Operational verdict

MacAI can safely:
- read the documents tab
- extract document metadata
- download existing documents

MacAI must not auto-generate new documents until the create-doc submit flow is traced live.
