# Ticket Semantic Closure v2

## Executive verdict
- `schi-10`: not fully proven; normalized only as `coordinator_person_reference_marker` with proof level `inferred`.
- `schi-3` non-external cases: normalized as `free_text_note_marker` with proof level `proven_from_exact_tooltip_text`.

## schi-10
- cases: 11
- unique tooltip values: Летаева К.К., Ольховская С.В.
- proven facts:
  - live rendered tooltip text on schi-10 is a person name
  - the only observed names are Ольховская С.В. and Летаева К.К.
  - both names are present in schedule runtime DOM as coordinator-linked entities via ЦОЗ координатора links
- not proven:
  - the schi-10 icon explicitly means coordinator in icon-local tooltip text
  - the schi-10 person always equals booking owner or a single canonical business role across all visits

| visit_id | patient | doctor | tooltip_text | verdict |
|---|---|---|---|---|
| 129677 | САВИНКОВА ВИКТОРИЯ СЕРГЕЕВНА | Гулямхайдаров А.А. | Летаева К.К. | inferred coordinator_person_reference_marker |
| 129956 | РУКИНА ОЛЬГА МОИСЕЕВНА | Жихар З.К. | Ольховская С.В. | inferred coordinator_person_reference_marker |
| 130195 | ЗАГВАЗДИН АЛЕКСЕЙ НИКОЛАЕВИЧ | Аушева М.А. | Ольховская С.В. | inferred coordinator_person_reference_marker |
| 130457 | КОЛЧЕНКО ОЛЬГА КОНСТАНТИНОВНА | Аушева М.А. | Летаева К.К. | inferred coordinator_person_reference_marker |
| 130240 | МЕЛЬНИКОВА НАТАЛЬЯ НИКОЛАЕВНА | Геюшова Я.Н. | Ольховская С.В. | inferred coordinator_person_reference_marker |
| 129965 | БЕЛОСЛУДЦЕВ ПАВЕЛ ЮРЬЕВИЧ | Геюшова Я.Н. | Летаева К.К. | inferred coordinator_person_reference_marker |
| 130244 | АННИНА СВЕТЛАНА ПАВЛОВНА | Геюшова Я.Н. | Летаева К.К. | inferred coordinator_person_reference_marker |
| 129670 | ШАПОШНИКОВ АЛЕКСАНДР ВАЛЕРИЕВИЧ | Иващенко А.Н. | Ольховская С.В. | inferred coordinator_person_reference_marker |
| 130496 | ШАРУХО ГАЛИНА ВАСИЛЬЕВНА | Иващенко А.Н. | Ольховская С.В. | inferred coordinator_person_reference_marker |
| 130442 | ГЕРТ АЛЕКСЕЙ ВЛАДИМИРОВИЧ | Иващенко А.Н. | Ольховская С.В. | inferred coordinator_person_reference_marker |
| 129467 | СЕНЧЕНКО ЛАРИСА ВИКТОРОВНА | Логвинчук Д.Н. | Ольховская С.В. | inferred coordinator_person_reference_marker |

## schi-3 non-external
- cases: 2
| visit_id | patient | doctor | tooltip_text | verdict |
|---|---|---|---|---|
| 130369 | БИННАТОВ ФАРРУХ МУСА ОГЛЫ | Аушева М.А. | раньше не может | proven free_text_note_marker |
| 129467 | СЕНЧЕНКО ЛАРИСА ВИКТОРОВНА | Логвинчук Д.Н. | имплантация медентика 2.5 ,2.6 ,3.6 ,3.7 | proven free_text_note_marker |

## Final answer
- `schi-10` cannot be upgraded to fully proven canonical role semantics in this pass.
- `schi-3` non-external cases can be normalized now as free-text note markers for the observed cases on 2026-03-10.