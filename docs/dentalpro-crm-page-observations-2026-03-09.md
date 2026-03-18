# DentalPro CRM Page Observations

Дата фиксации: `2026-03-09`

Метод:
- browser-only обход через `puppeteer-mcp-server`
- сравнение с уже известной API-библиотекой и report research

## 1. Dashboard

Страница:
- `/dashboard/widgets/index`

Что найдено:
- левые навигационные ссылки всех основных модулей
- deep links в patient cards
- deep links в VIP, call-center, reports

Что полезно для проекта:
- быстрый discovery стартовых сущностей
- реальные ссылки на patient/card/report pages

## 2. База пациентов

Страница:
- `/cbase/index.html`

Что найдено:
- master list пациентов
- фильтры
- ссылки в `/cbase/detail.html?id=<patient_id>`

Что полезно для проекта:
- это главный список пациентов;
- отсюда удобно выбирать sample patients для проверки report/API rules.

## 3. Карточка пациента

Страница:
- `/cbase/detail.html?id=19141`

Что найдено:
- информационные блоки пациента
- финансовые агрегаты (`Сумма, потраченная`, `Сумма последней операции`)
- табы: анкета, контактный центр, файлы, история записей, история приёмов, касса, счета, ДМС, документы, семья, амбулаторные записи, ортодонтическая карта, рентген
- прямые переходы в `medblock/toothsmap` и `visits/pages/edit`

Что полезно для проекта:
- patient card это главный source-of-truth для межмодульных связей;
- через неё удобно связывать API, server-side tabs и сущности отчётов.

## 4. Планирование посещений

Страница:
- `/visits/pages/edit?id=19141`

Что найдено:
- patient finance snapshot
- набор treatment variants (`variantID`)
- блоки незапланированных, готовых, записанных и завершенных приемов
- прямые ссылки в `cashbox/forms/detail?id=<pay_id>`

Что полезно для проекта:
- важнейшая orchestration-страница;
- здесь пересекаются лечение, расписание, квитанции и patient balances.

## 5. Касса

Страница:
- `/cashbox/index`

Что найдено:
- списки квитанций по пациентам
- deep links в `/cashbox/forms/detail?id=<pay_id>`
- операции `sessionOpen`, `cashIn`, `cashOut`, `payment`, `reversal`
- отдельные подсекции `entity`, `division`, `payments`, `documentsPayments`, `marketplace`, `totals`

Что полезно для проекта:
- основной список финансовых документов;
- отлично подходит для поиска edge cases по xray, unpaid, reversal и split payments.

## 6. Detail квитанции

Страница:
- `/cashbox/forms/detail?id=87102`

Что найдено:
- табы `Позиции`, `История`, `Платежи`, `Опции`, `Комментарий`
- строка позиции с ценой/количеством/скидкой
- история событий с инициатором и временем
- платежи с формой оплаты и пользователем

Что полезно для проекта:
- канонический server-side источник скрытых полей;
- именно эта страница позволяет закрывать `Кем изменено`, `Причина`, `Создатель`, `Платежи`.

## 7. Отчётный модуль

Страница:
- `/reports/reports/index`

Что найдено:
- список конкретных report ids
- список report templates через `/reports/reports/add?code=<code>`
- совпадение реальных report names с уже исследованными id `18`, `24`, `29`, `45`, `4`

Что полезно для проекта:
- реестр отчётов и backend codes;
- отсюда можно строить systematic discovery по report ids и code mappings.

## 8. Рентген кабинет

Страницы:
- `/xray/Images/index`
- `/xray/Images/detail?id=29791`

Что найдено:
- список исследований с пациентом, датой и типом снимка
- detail с `Создано`, `Обновлено`, пациентом, телефоном, филиалом и выбором типа исследования
- связь с планом лечения и patient card

Что полезно для проекта:
- помогает уточнять xray-specific server-side правила;
- подтверждает, что xray — отдельный доменный контур, а не просто строка в кассе.

## 9. Расписание

Страница:
- `/visits/schedule/index?date=2026-03-07`

Что найдено:
- отделения, врачи, временная сетка, записи пациентов и служебные блоки
- вспомогательные действия: стоимость приемов, стоимость услуг, редактирование графика работы клиники

Что полезно для проекта:
- уже связано с verified API `mobile/schedule`;
- страница полезна как эталон визуальной проверки против API-only таблиц.

## 10. Табель

Страница:
- `/timesheet/Timesheets/index`

Что найдено:
- график / актуально / отработано / опоздания / ранние уходы
- экспорт в Excel
- links в `timesheet/Timesheets/*` и `stompro/admin/dayGraphWizard`

Что полезно для проекта:
- важный HR/operations контур;
- потенциальный источник для отчетов по рабочим часам и lateness.

## 11. Call-center

Страница:
- `/callcentr/Tickets/index`

Что найдено:
- фильтры по модулю, врачу, отделению, пациенту
- состояния `Новые`, `Просроченные`, `Обработанные`
- список тикетов с телефонами и задачей `Позвонить`

Что полезно для проекта:
- call-center пересекается с расписанием, waitlist и patient CRM;
- полезный кандидат для будущих composite reports.

## 12. Амбулаторные записи

Страница:
- `/medblock/cards/index`

Что найдено:
- список medical cards
- patient links в `cbase/detail...CardTab`
- doctor/status/created/updated
- direct links в `/medblock/cards/view?id=<card_id>`

Что полезно для проекта:
- канонический список медицинских приемов;
- полезен для точной привязки treatment records к пациенту и врачу.

## 13. Сравнение с текущими знаниями проекта

Что подтвердилось заново:
- `Расписание` действительно является отдельным каноническим экраном, а не просто visual shell
- `cashbox/forms/detail` действительно содержит недостающие server-side поля истории
- `reports/reports/index` действительно является реестром report ids и report templates
- `cbase/detail` действительно является главным patient hub
- `xray/Images/detail` действительно нужен как отдельный server-side xray source

Что стало яснее:
- `visits/pages/edit` это не вторичный экран, а центральный planner/ledger пациента
- `medblock/cards/index` и `cbase/detail&tab=CardTab` представляют один и тот же медицинский контур с двух сторон
- `timesheet` связан с `stompro/admin/dayGraphWizard`, значит графики сотрудников живут глубже, чем только в mobile API

## 14. Что исследовать следующими волнами

Волна 2:
- `medblock/cards/view?id=<card_id>`
- `cashbox/totals`
- `cashbox/payments`
- `reports/reports/edit?id=<report_id>` по всем ключевым отчетам
- `callcentr/history.html`
- `messages/pages/index`

Волна 3:
- `warehouse/*`
- `salary/*`
- `task/*`
- `semaphore/*`
- `iblock/*`
- `stompro/admin/*`

## 15. Практический вывод

Для проекта уже можно считать установленными следующие канонические страницы:
- patient master list: `/cbase/index.html`
- patient hub: `/cbase/detail.html?id=<patient_id>`
- planning hub: `/visits/pages/edit?id=<patient_id>`
- schedule hub: `/visits/schedule/index`
- cashbox hub: `/cashbox/index`
- payment detail: `/cashbox/forms/detail?id=<pay_id>`
- report registry: `/reports/reports/index`
- xray hub: `/xray/Images/index`
- xray detail: `/xray/Images/detail?id=<image_id>`
- medblock list: `/medblock/cards/index`
- timesheet hub: `/timesheet/Timesheets/index`
- call-center hub: `/callcentr/Tickets/index`

Это уже достаточная структурная база, чтобы дальше разбирать DentalPro не хаотично, а по устойчивым доменным хабам.

## 16. Волна 2: уточнения

### 16.1 Detail медкарты

Страница:
- `/medblock/cards/view?id=68106`

Что найдено:
- верхняя строка пациента с возрастом и номером карты;
- быстрые переходы в `Амбулаторные записи`, `Карта пациента`, `Квитанции`, `План лечения`;
- вкладки `Информация по приёму`, `Услуги в приёме`, `Рентгенограмма`, `Состояние до лечения`, `Состояние после лечения`;
- отдельная ссылка `История изменений`;
- ссылка на редактирование шаблона карты `/medblock/settings/cards/edit?id=<template_id>`.

Что полезно для проекта:
- `medblock/cards/view` это не просто форма редактирования, а канонический detail screen приёма;
- отсюда видно, что medblock связан сразу с patient hub, cashbox hub, toothsmap и xray.

### 16.2 Сообщения

Страница:
- `/messages/pages/index`

Что найдено:
- разделы `Диалоги`, `Пользователи`, `Маркетинг`;
- сущности представлены как именованные рабочие пространства;
- есть подмаршруты `messages/pages/add`, `messages/pages/invite?id=<id>`, `messages/pages/delete?id=<id>`;
- в самих сообщениях часто лежат внешние рабочие документы и ссылки на Google/Yandex.

Что полезно для проекта:
- модуль сообщений можно использовать как источник организационного контекста и операционных документов;
- это отдельный CRM-контур знаний, а не только чат.

### 16.3 История вызовов

Страница:
- `/callcentr/history.html`

Что найдено:
- отдельный call log экран;
- фильтры по периоду, пациенту, номеру, типу звонка, сотруднику, статусу и оценке;
- ссылки в coordinator-specific очереди `callcentr/Tickets/index?managerUserID=...`.

Что полезно для проекта:
- модуль call-center имеет минимум два слоя: ticket queue и call history;
- телефонная аналитика и качество обработки звонков живут не в reports, а прямо в отдельной operational ветке CRM.

### 16.4 Реальные cashbox-подмаршруты

Страница-источник:
- `/cashbox/index`

Что найдено:
- реальные внутренние разделы кассы:
  - `/cashbox/payments`
  - `/cashbox/documentsPayments`
  - `/cashbox/totals`
  - `/cashbox/entity`
  - `/cashbox/division/index`
  - `/cashbox/marketplace`
  - `/cashbox/priceAppointments`
  - `/cashbox/priceService`
- guessed routes с суффиксом `/index` для `payments/totals` были неверны.

Что полезно для проекта:
- cashbox нужно исследовать по реальным ссылкам из UI, а не по guessed путям;
- `payments`, `documentsPayments`, `totals` являются отдельными подсистемами кассового контура.
