# Schedule Ticket Registry V2

- target_date: `2026-03-10`
- basis: `ticket_registry_v1 + schedule_2026-03-10_ticket_semantic_probe_v2.json`
- broad rerun: `no`

## Quality Control

| Metric | Value |
|---|---:|
| visits_total | 54 |
| tickets_total | 304 |
| tickets_with_proven_semantics_v2 | 293 |
| tickets_with_inferred_semantics_v2 | 11 |
| visits_with_any_inferred_ticket_semantics_v2 | 11 |
| schi_10_ticket_count | 11 |
| schi_3_external_source_count | 3 |
| schi_3_free_text_count | 2 |

## Final Semantic Closure

- `schi-10` -> `coordinator_person_reference_marker`, proof=`inferred`, safe_for_global_reuse=`no`.
- `schi-3` with exact `ПроДокторов.` tooltip -> `external_booking_source_info`, proof=`proven`, safe_for_global_reuse=`conditional`.
- `schi-3` non-external observed cases -> `free_text_note_marker`, proof=`proven`, safe_for_global_reuse=`conditional`.

## Visit-Level Propagation

- `visits_registry_v2` now contains aggregated semantic fields from `ticket_dictionary_v2`.
- Downstream consumers no longer need to interpret ticket semantics from raw `icon_class` alone.