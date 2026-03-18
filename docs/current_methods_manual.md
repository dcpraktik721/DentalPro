# Current Methods Manual

## Purpose

Этот документ фиксирует только текущие методы, которые реально используются в repo и имеют локальный evidence basis.

## Canonical reading rule

1. Primary machine-readable registry: [methods_registry.json](/Users/macbook15/Downloads/MacAi/DentalPro/registry/methods_registry.json)
2. If a report conflicts with registry and local evidence, local evidence wins.
3. `cross_date_stable=false` means method must not be described as stable.

## Method families

### Runtime/auth

- `browser_first_route_access`
- `storageState_auth_reuse`
- `auth_smoke_check`
- `auth_refresh_via_login_form`

Use these only with `ready_with_limits` wording.

### Schedule runtime

- `schedule_dom_row_extraction`
- `popup_clean_click_probe`
- `chair_view_cross_map`

### Ticket layer

- `focused_rc_tooltip_extraction`

### Patient identity

- `patient_info_button_id_resolution`
- `direct_tab_url_access`

### Finance/reporting

- `patient_day_cash_matching`
- `proof_aware_schedule_workbook_build`
- `phase6a_cross_date_validation`

## Non-negotiable boundaries

- `schi-10` stays `inferred`
- cash stays `patient-day only`
- `2026-02-16` identity stays `subset-based reproducible`
- auth stays `ready_with_limits`

## Current non-methods that must not be promoted

- manual supporting ticket slices for February dates
- external February RPT_24 reference file
- any write-path behavior on patient dossier tabs
