# Scope Mobile Client Verified Library

Дата верификации: `2026-01-15`

Назначение:
- зафиксировать реально подтвержденные payload families для `scope-mobile_client`;
- отделить положительные read-ответы от token-blocked и no-safe-signal методов.

Источники доказательств:
- `projects/dentalpro-integration/artifacts/api/scope-runner/patient_mobile_client-2026-01-15.json`
- `projects/dentalpro-integration/docs/scope-mobile-user-verified-library-2026-01-15.md`

## Подтвержденные method families

| Показатель / family | API method | API key family | Пример значения на `2026-01-15` | Статус |
|---|---|---|---|---|
| `Филиалы` | `mobile/branches/all` | `data[].id`, `data[].displayName`, `data[].phone`, `data[].workTime`, `data[].address*` | `id=2`, `displayName=ООО НЬЮ ЛАЙФ ( СК ПRАКТИК )` | Доказано |
| `Доступные филиалы пользователя` | `mobile/branches/user` | `data[].id`, `data[].displayName`, `data[].phone`, `data[].workTime`, `data[].address*` | `id=2`, `phone=+73452699992` | Доказано |
| `Текущий пользователь` | `mobile/user/current` | `data.id`, `data.fio`, `data.type`, `data.permitted` | `id=71`, `fio=Корытников Р.В.` | Доказано |

## Parity с уже верифицированными scope

Подтвержденные payload families `scope-mobile_client` уже покрыты в
`scope-mobile_user`, поэтому общий registry не получает новых уникальных полей:
- `mobile/branches/all`
- `mobile/branches/user`
- `mobile/user/current`

## Что сознательно не включено

- `mobile/auth`, `mobile/messages/client/send`:
  write-методы, не исполнялись.
- `mobile/branches/info`, `mobile/client/info`, `mobile/client/records`, `mobile/client/variants`:
  отрицательные ответы, в том числе `this token does not contain client_id data`.
- `mobile/client/files`, `mobile/client/mediafiles`, `mobile/client/rentgens`, `mobile/messages/client/dialog`:
  `no_safe_signal`, field-level keys не доказаны.

## Вывод

`scope-mobile_client` пока даёт только базовые branch/user payload families и не даёт подтвержденных patient-specific fields этим токеном.
