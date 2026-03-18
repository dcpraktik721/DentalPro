# Task Graph Blueprint: Ultimate Patient Dossier

Patient under test: `КАРАСЕВА КСЕНИЯ СЕРГЕЕВНА`

Confirmed `client_id`: `15900`

Date of live verification: `2026-03-14`

Base profile URL:

- `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900`

## 1. Tab Dictionary

The base card exposes two classes of tabs:

- internal bootstrap panes on the base page, without `&tab=...`
- direct server-rendered tabs addressed through `&tab=...`

| Logical section | URL / target | Kind | Verdict | Notes |
|---|---|---|---|---|
| Информация о пациенте | `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900` | base page pane | verified | accordion DOM already present in page |
| Комментарии | `#client-comments` on base page `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900` | internal pane | verified | no `&tab=` URL; DOM is already rendered in base page |
| Анкета | `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=cbase%5Ctabs%5Cquestionnaire` | direct tab | discovered | not required in current dossier |
| Контактный центр | `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=cbase%5Ctabs%5CContactCenter` | direct tab | discovered | not required in current dossier |
| Файлы пациента | `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=addons%5Cfiles%5Cmodels%5Ccbase` | direct tab | verified | server-rendered file cards |
| История записей | `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=schedule2%5Ccbase%5Chistory` | direct tab | verified | schedule table |
| История приёмов | `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=medical%5Ccbase%5Chistory` | direct tab | verified | medical-history table |
| Касса | `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=cashbox%5Ccbase%5Cpays` | direct tab | verified | cashbox cards, not a plain table |
| Счета | `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=cashbox%5Ccbase%5Cbills` | direct tab | verified | account-state view |
| ДМС | `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=insurance%5Ctabs%5CDmsDocs` | direct tab | verified | empty-state page in this case |
| Документы | `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=addons%5Cdocstorage%5Cmodels%5CdocstorageCbaseTab` | direct tab | verified | documents table + direct download links |
| Семья | `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=addons%5Cfamily%5Cmodels%5CfamilyCbaseTab` | direct tab | verified | empty-state page in this case |
| Амбулаторные записи | `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=addons%5Cmedblock%5CLogic%5CCbaseTabs%5CCardTab` | direct tab | verified | medcards table |
| Ортодонтическая карта | `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=addons%5Cmedblock%5CLogic%5CCbaseTabs%5COrthodonticsTab` | direct tab | discovered | not required in current dossier |
| Рентген кабинет | `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=addons%5Cxray%5CInjections%5CxrayCbaseTabs` | direct tab | verified | xray cards |

Secondary fast-paths discovered inside tabs:

| Purpose | URL pattern | Verdict |
|---|---|---|
| File search modal | `https://dcpraktik.dental-pro.online/files/collection/find?collectionID=5820` | verified |
| File upload modal | `https://dcpraktik.dental-pro.online/files/form/upload?collectionID=5820&clientID=15900` | verified |
| File create-folder modal | `https://dcpraktik.dental-pro.online/files/form/createFolder?collectionID=5820&clientID=15900` | verified |
| File download | `https://dcpraktik.dental-pro.online/files/form/download?fileID=<file_id>&filename=<filename>` | verified |
| File text preview | `https://dcpraktik.dental-pro.online/files/form/text?id=<file_id>&filename=<filename>` | verified |
| Document create form | `https://dcpraktik.dental-pro.online/docstorage/forms/create_doc?package_code=docs_private_person&our_company_id=2&party2_person_id=15900` | verified |
| Document download | `https://dcpraktik.dental-pro.online/docstorage/pages/get_doc_file?id=<doc_id>` | verified |
| Xray detail | `https://dcpraktik.dental-pro.online/xray/Images/detail?id=<xray_id>` | verified |
| Xray workorder | `https://dcpraktik.dental-pro.online/workorder/custom/form?groupID=8&patientID=15900&object=xray&objectID=<xray_id>&branchID=2` | verified |
| Xray print doc | `https://dcpraktik.dental-pro.online/docstorage/clientsdocs/create?branch_id=2&client_id=15900&code=xray_print&xray_id=<xray_id>` | verified |

## 2. Data Extraction Scripts

All scripts below are intended for `web_evaluate` / in-browser execution.

### 2.1 Base patient profile

Run on:

- `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900`

```js
(() => {
  const sections = [...document.querySelectorAll('.accordion-item')].map(item => {
    const title = item.querySelector('.accordion-button')?.innerText.trim() || null;
    const fields = [...item.querySelectorAll('.accordion-collapse .row.hide_wrapper > .col-9 > .row')]
      .map(row => {
        const label = row.querySelector('label')?.innerText.trim() || null;
        const field = row.querySelector('.cbaseFields');
        const value = field
          ? ([...field.querySelectorAll('p,span,div,a')].map(x => x.innerText.trim()).filter(Boolean).join(' | ') || field.innerText.trim())
          : null;
        return label && value ? { label, value } : null;
      })
      .filter(Boolean);
    return { title, fields };
  }).filter(section => section.fields.length);

  const body = document.body.innerText;
  const totalSpent = (body.match(/Сумма, потраченная пациентом в клинике:\s*([\d\s.,]+₽)/) || [])[1] || null;
  const lastOp = body.match(/Сумма последней операции:\s*([\d\s.,]+₽)\.\s*Дата:\s*([^\n]+)/);
  const cardBlock = [...document.querySelectorAll('*')]
    .map(el => (el.innerText || '').trim())
    .find(text => /^Номер карты\n/i.test(text)) || null;

  return {
    title: document.title,
    sections,
    totalSpent,
    lastOperation: lastOp ? { amount: lastOp[1], date: lastOp[2] } : null,
    cardBlock
  };
})();
```

### 2.2 Comments pane

Run on the same base page:

- `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900`

```js
(() => {
  const pane = document.querySelector('#client-comments');
  if (!pane) throw new Error('comments pane not found');

  const meta = pane.querySelector('.js-comment');
  const comments = [...pane.querySelectorAll('.comment-list__list > li, .comment-list__list .list-group-item')].map(li => {
    const textNode = li.querySelector('.text.text-break');
    const authorMeta = li.querySelector('small.text-muted')?.innerText.trim() || '';
    const badges = [...li.querySelectorAll('.badge')].map(b => b.innerText.trim()).filter(Boolean);
    return {
      text: (textNode?.innerText || '').replace(/\s+/g, ' ').trim(),
      authorMeta,
      badges
    };
  });

  return {
    meta: meta ? {
      requestFor: meta.getAttribute('data-request-for'),
      commentID: meta.getAttribute('data-comment-id'),
      commentTitle: meta.getAttribute('data-comment-title'),
      commentPlugin: meta.getAttribute('data-comment-plugin'),
      commentClient: meta.getAttribute('data-comment-client')
    } : null,
    comments
  };
})();
```

### 2.3 Files tab

Run on:

- `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=addons%5Cfiles%5Cmodels%5Ccbase`

```js
(() => {
  const rows = [...document.querySelectorAll('a[href*="/files/form/download"], a[href*="/files/form/text"]')].map(a => {
    const href = a.getAttribute('href');
    const raw = ((a.closest('li,.card,.file,.row,div,tr') || a.parentElement)?.innerText || a.innerText || '')
      .replace(/\s+/g, ' ')
      .trim();
    const fileID = (href.match(/[?&](?:fileID|id)=([^&]+)/i) || [])[1] || null;
    const filename = (() => {
      const m = href.match(/[?&]filename=([^&]+)/i);
      if (m) return decodeURIComponent(m[1]).trim();
      return (a.innerText || '').split(' - ')[0].trim() || null;
    })();
    const meta = raw.match(/ - (\d{2}\.\d{2}\.\d{4} в \d{2}:\d{2}:\d{2}) \(([^)]+)\)$/);
    return {
      fileID,
      kind: href.includes('/files/form/text') ? 'text-preview' : 'download',
      filename,
      url: new URL(href, location.origin).toString(),
      uploadedAt: meta ? meta[1] : null,
      size: meta ? meta[2] : null,
      raw
    };
  });

  const collectionActions = [...document.querySelectorAll('a[href]')]
    .map(a => new URL(a.getAttribute('href'), location.origin).toString())
    .filter(href => /files\/collection\/find|files\/form\/upload|files\/form\/createFolder/i.test(href));

  return { rows, collectionActions };
})();
```

### 2.4 Schedule history

Run on:

- `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=schedule2%5Ccbase%5Chistory`

```js
(() => {
  const table = [...document.querySelectorAll('table')].find(t => {
    const h = t.querySelector('thead')?.innerText || '';
    return h.includes('Тип записи') && h.includes('Квитанция');
  });
  if (!table) throw new Error('schedule history table not found');

  return [...table.querySelectorAll('tbody > tr')]
    .map(tr => [...tr.children].filter(el => el.tagName === 'TD').map(td => td.innerText.trim()).filter(Boolean))
    .filter(cells => cells.length >= 10 && /^\d+$/.test(cells[0]))
    .map(cells => ({
      recordID: cells[0],
      recordType: cells[1],
      appointment: cells[2],
      doctor: cells[3],
      dateTime: cells[4],
      sms: cells[5],
      receipt: cells[6],
      calls: cells[7],
      reason: cells[8],
      deleteReason: cells[9]
    }));
})();
```

### 2.5 Medical history

Run on:

- `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=medical%5Ccbase%5Chistory`

```js
(() => {
  const table = [...document.querySelectorAll('table')].find(t => {
    const h = t.querySelector('thead')?.innerText || '';
    return h.includes('Прием') && h.includes('Решение');
  });
  if (!table) throw new Error('medical history table not found');

  return [...table.querySelectorAll('tbody > tr')]
    .map(tr => [...tr.children].filter(el => el.tagName === 'TD').map(td => td.innerText.trim()).filter(Boolean))
    .filter(cells => cells.length >= 8 && /^\d+$/.test(cells[0]))
    .map(cells => ({
      id: cells[0],
      appointment: cells[1],
      branch: cells[2],
      doctor: cells[3],
      problem: cells[4],
      solution: cells[5],
      scheduled: cells[6],
      scheduleTime: cells[7]
    }));
})();
```

### 2.6 Cashbox payments

Run on:

- `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=cashbox%5Ccbase%5Cpays`

```js
(() => {
  const text = el => (el?.innerText || el?.textContent || '').trim();

  return [...document.querySelectorAll('.cashbox_card')].map(card => {
    const raw = text(card);
    const lines = raw.split('\n').map(s => s.trim()).filter(Boolean);
    const created = lines.find(x => /создал/i.test(x)) || '';
    const orgStatus = lines.find(x => /Оплачена|Не оплачена|Отменена|Сторнирована|В процессе оплаты|Подтверждена/.test(x)) || '';
    const dateIndex = lines.findIndex(x => /^\d{2}\.\d{2}\.\d{4}$/.test(x));
    const amountLine = dateIndex >= 0 ? (lines[dateIndex + 1] || '') : '';
    const discountLine = lines.find(x => /^Скидка\s+/i.test(x)) || '';
    const amountParts = amountLine ? amountLine.match(/\d[\d\s]*\.\d{2}\s*₽/g) || [] : [];

    return {
      title: lines[0] || '',
      created,
      orgStatus,
      date: dateIndex >= 0 ? lines[dateIndex] : '',
      amountLine,
      amountParts,
      discountLine,
      raw
    };
  });
})();
```

### 2.7 Bills / debt accounts

Run on:

- `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=cashbox%5Ccbase%5Cbills`

```js
(() => {
  const text = el => (el?.innerText || el?.textContent || '').trim();

  const accounts = [...document.querySelectorAll('.bills-container .nav-link')].map(link => {
    const lines = text(link).split('\n').map(s => s.trim()).filter(Boolean);
    return {
      account: lines[0] || '',
      state: lines[1] || ''
    };
  });

  const transactionTables = [...document.querySelectorAll('table')].map(table => ({
    headers: [...table.querySelectorAll('thead th')].map(th => text(th)),
    rows: [...table.querySelectorAll('tbody > tr')].map(tr => text(tr)).filter(Boolean)
  }));

  return { accounts, transactionTables };
})();
```

### 2.8 DMS tab

Run on:

- `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=insurance%5Ctabs%5CDmsDocs`

```js
(() => {
  const body = document.body.innerText;
  return {
    bodyText: body,
    isEmpty: /Записей нет/.test(body),
    addContractButton: !![...document.querySelectorAll('a,button')].find(el => /Добавить договор/i.test(el.innerText || '')),
    addPolicyButton: !![...document.querySelectorAll('a,button')].find(el => /Добавить полис/i.test(el.innerText || ''))
  };
})();
```

### 2.9 Documents tab

Run on:

- `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=addons%5Cdocstorage%5Cmodels%5CdocstorageCbaseTab`

```js
(() => {
  const text = el => (el?.innerText || el?.textContent || '').trim();
  const table = document.querySelector('table');
  if (!table) throw new Error('documents table not found');

  const headers = [...table.querySelectorAll('thead th')].map(th => text(th));
  const rows = [...table.querySelectorAll('tbody > tr')].map(tr => {
    const cells = [...tr.querySelectorAll('td')];
    const download = tr.querySelector('a[href*="/docstorage/pages/get_doc_file?id="]')?.getAttribute('href') || null;
    return {
      id: text(cells[0]),
      docType: text(cells[1]),
      docNumber: text(cells[2]),
      docDate: text(cells[3]),
      validTo: text(cells[4]),
      clinicSigner: text(cells[5]),
      relations: text(cells[6]),
      created: text(cells[7]),
      scanned: text(cells[8]),
      docView: text(cells[9]),
      status: text(cells[10]),
      downloadURL: download ? new URL(download, location.origin).toString() : null
    };
  }).filter(row => row.id);

  const createDocURL = document.querySelector('a[href*="/docstorage/forms/create_doc?"]')?.getAttribute('href') || null;

  return {
    headers,
    createDocURL: createDocURL ? new URL(createDocURL, location.origin).toString() : null,
    rows
  };
})();
```

### 2.10 Family tab

Run on:

- `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=addons%5Cfamily%5Cmodels%5CfamilyCbaseTab`

```js
(() => {
  const body = document.body.innerText;
  const table = document.querySelector('table');
  return {
    isEmpty: /Нет данных о семье пациента/i.test(body),
    rows: table
      ? [...table.querySelectorAll('tbody > tr')].map(tr => [...tr.cells].map(td => td.innerText.trim()))
      : [],
    bodyText: body
  };
})();
```

### 2.11 Medcards

Run on:

- `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=addons%5Cmedblock%5CLogic%5CCbaseTabs%5CCardTab`

```js
(() => {
  const table = [...document.querySelectorAll('table')].find(t => {
    const h = t.querySelector('thead')?.innerText || '';
    return h.includes('Информация о карте') && h.includes('Статус');
  });
  if (!table) throw new Error('medcards table not found');

  const parseInfo = txt => {
    const lines = txt.split('\n').map(s => s.trim()).filter(Boolean);
    return {
      dateTeeth: lines[0] || '',
      title: lines[1] || '',
      diagnosis: (lines.find(x => x.startsWith('Диагноз:')) || '').replace(/^Диагноз:\s*/, '')
    };
  };

  const rows = [...table.querySelectorAll('tbody > tr')]
    .map(tr => [...tr.children].filter(el => el.tagName === 'TD').map(td => td.innerText.trim()))
    .filter(cells => cells.length >= 6 && /^\d+$/.test(cells[0]))
    .map(cells => ({
      cardID: cells[0],
      ...parseInfo(cells[1]),
      doctor: cells[2],
      status: cells[3],
      created: cells[4],
      updated: cells[5]
    }));

  return {
    rows,
    lastCard: rows[0] || null
  };
})();
```

### 2.12 Xray cabinet

Run on:

- `https://dcpraktik.dental-pro.online/cbase/detail.html?id=15900&tab=addons%5Cxray%5CInjections%5CxrayCbaseTabs`

```js
(() => {
  const rows = [...document.querySelectorAll('.XRay_card')].map(card => {
    const detailHref = card.querySelector('.XRay_controls a[href*="/xray/Images/detail?id="]')?.getAttribute('href') || null;
    const xrayID = (detailHref?.match(/[?&]id=(\d+)/) || [])[1] || null;
    const img = card.querySelector('.XRay_imgs img');
    const printHref = card.querySelector('a[href*="code=xray_print"]')?.getAttribute('href') || null;
    const workorderHref = card.querySelector('a[href*="/workorder/custom/form"]')?.getAttribute('href') || null;

    return {
      xrayID,
      observedAt: card.querySelector('.XRay_date')?.innerText.trim() || null,
      note: card.querySelector('.XRay_note')?.innerText.trim() || null,
      imageURL: img ? new URL(img.getAttribute('data-src') || img.getAttribute('src'), location.origin).toString() : null,
      detailURL: detailHref ? new URL(detailHref, location.origin).toString() : null,
      workorderURL: workorderHref ? new URL(workorderHref, location.origin).toString() : null,
      printURL: printHref ? new URL(printHref, location.origin).toString() : null
    };
  });

  return {
    rows,
    allDates: rows.map(r => r.observedAt).filter(Boolean)
  };
})();
```

## 3. Live Verification Results

### 3.1 Patient profile

- `client_id = 15900`
- `Фамилия = КАРАСЕВА`
- `Имя = КСЕНИЯ`
- `Отчество = СЕРГЕЕВНА`
- `Дата рождения = 09.05.1985 (40 лет)`
- `Пол = Женский`
- `Мобильный телефон = 79091905646`
- `E-mail = Нет информации`
- `Дата первого приёма = 22.11.2024`
- `Дата последнего приёма = 23.11.2024`
- `Номер карты = ООО НЬЮ ЛАЙФ ( СК ПRАКТИК ) / № В5905`
- `Сумма, потраченная пациентом в клинике = 31 455.00 ₽`
- `Сумма последней операции = 30 905.00 ₽`
- `Дата последней операции = 23.11.2024 11:23`

### 3.2 Comments

Found `4` comments in `#client-comments`:

1. `осмотр`
   - `Написал: Наталья Поняева 13.03.2026 12:08:00`
2. `ПЛ Логвинчук 22.11.24`
   - `Написал: Елизавета Столярова 23.11.2024 11:31:20`
3. `забота 22.11.2024`
   - `Написал: Светлана Брокерт 21.11.2024 13:10:24`
4. `Скидка 50% Квиз`
   - `Написал: Наталья Поняева 14.11.2024 18:59:34`

### 3.3 Files

Found `9` file entries:

| file_id | type | filename | uploaded_at |
|---|---|---|---|
| `390894` | `text-preview` | `0000324662_00017_137810261_t_a_l___766628_199 (3)` | `22.11.2024 в 09:48:43` |
| `390895` | `download` | `IMG_0094.JPG` | `22.11.2024 в 09:57:41` |
| `390896` | `download` | `IMG_0095.JPG` | `22.11.2024 в 09:57:41` |
| `390897` | `download` | `IMG_0096.JPG` | `22.11.2024 в 09:57:41` |
| `390898` | `download` | `IMG_0097.JPG` | `22.11.2024 в 09:57:42` |
| `390899` | `download` | `IMG_0098.JPG` | `22.11.2024 в 09:57:42` |
| `390901` | `download` | `IMG_0100.JPG` | `22.11.2024 в 09:57:42` |
| `391050` | `download` | `заключ.терапевта.jpeg` | `22.11.2024 в 19:26:03` |
| `391093` | `download` | `image.jpg` | `23.11.2024 в 11:30:56` |

### 3.4 Schedule history

Found `4` schedule rows:

| record_id | appointment | doctor | datetime | receipt |
|---|---|---|---|---|
| `130676` | `Повторная консультация врача-терапевта` | `Аушева М.А.` | `14.03.2026 12:30-13:00` | `Отсутствует` |
| `99569` | `Удаление` | `Логвинчук Д.Н.` | `23.11.2024 10:30-11:30` | `Отсутствует` |
| `99570` | `Операция` | `Лукьяненко А.В.` | `23.11.2024 10:30-11:30` | `Оплачена` |
| `98993` | `Первичная консультация хирурга` | `Логвинчук Д.Н.` | `22.11.2024 10:00-10:30` | `Оплачена` |

### 3.5 Medical history

Found `9` medical-history rows. Top rows:

| id | appointment | doctor | scheduled | schedule_time |
|---|---|---|---|---|
| `723950` | `Повторная консультация врача-терапевта` | `Аушева М.А.` | `Да` | `14.03.2026 12:30-13:00` |
| `601563` | `Удаление 1 степени` | `Логвинчук Д.Н.` | `Нет` | `-` |
| `601559` | `Удаление 1 степени` | `Логвинчук Д.Н.` | `Нет` | `-` |
| `601551` | `Удаление 1 степени` | `Логвинчук Д.Н.` | `Нет` | `-` |

### 3.6 Cashbox payments

Found `4` cashbox entries:

| title | date | created | org_status |
|---|---|---|---|
| `87392 - Рентген №: 29917 Ортопантомография (1)` | `14.03.2026` | `14.03.2026 в 12:48:00 создал Желудкова М.В.` | `ООО НЬЮ ЛАЙФ ( СК ПRАКТИК ) Оплачена Наличная оплата, Виртуальный` |
| `63710 - Зуб(ы):0 Операция (2)` | `23.11.2024` | `23.11.2024 в 11:05:38 создал Лукьяненко А.В.` | `ООО НЬЮ ЛАЙФ ( СК ПRАКТИК ) Оплачена Банковская карта, ФР` |
| `63709 - Зуб(ы):18, 28, 38 Удаление 1 степени (4)` | `23.11.2024` | `23.11.2024 в 11:02:12 создал Логвинчук Д.Н.` | `ООО НЬЮ ЛАЙФ ( СК ПRАКТИК ) Оплачена Банковская карта, ФР` |
| `63674 - Зуб(ы):0 Первичная консультация хирурга (1)` | `22.11.2024` | `22.11.2024 в 10:29:26 создал Логвинчук Д.Н.` | `ООО НЬЮ ЛАЙФ ( СК ПRАКТИК ) Оплачена Банковская карта, ФР` |

### 3.7 Bills / debt accounts

All three account states are empty:

- `Персональный счёт пациента -> Счет еще не открыт`
- `Долговой счёт пациента -> Счет еще не открыт`
- `Заёмный счёт -> Счет еще не открыт`

All transaction grids returned `Транзакций не найдено`.

### 3.8 DMS

This patient has no DMS records on the live tab.

Observed state:

- `Записей нет`
- `Добавить договор`
- `Добавить полис`

### 3.9 Documents

Found `5` generated documents:

| id | type | date | status |
|---|---|---|---|
| `82718` | `Акт выполненных работ` | `23.11.2024` | `Подписан` |
| `82682` | `Акт выполненных работ` | `22.11.2024` | `Подписан` |
| `82681` | `Акт выполненных работ` | `22.11.2024` | `Подписан` |
| `82678` | `ПРОВЕДЕНИЕ МЕДИЦИНСКОГО РЕНТГЕНОЛОГИЧЕСКОГО ОБСЛЕДОВАНИЯ` | `22.11.2024` | `Подписан` |
| `82677` | `Пакет документов НЬЮ ЛАЙФ` | `22.11.2024` | `Подписан` |

Download fast-paths were present for all five rows.

### 3.10 Family

No family data found.

Observed state:

- `Нет данных о семье пациента. Вы можете создать семью пациента, сделав его основным членом этой семьи, либо добавить к имеющейся семье`

### 3.11 Medcards

Found `3` medcards:

| card_id | date_teeth | title | doctor | status |
|---|---|---|---|---|
| `50611` | `Дата: 23.11.2024 | Зуб(ы): Все зубы` | `Операция` | `Лукьяненко А.В.` | `Подтверждена` |
| `50610` | `Дата: 23.11.2024 | Зуб(ы): №18, 28, 38` | `Удаление 1 степени` | `Логвинчук Д.Н.` | `Подтверждена` |
| `50585` | `Дата: 22.11.2024 | Зуб(ы): Все зубы` | `Первичная консультация хирурга` | `Логвинчук Д.Н.` | `Подтверждена` |

Required highlight:

- last medcard date observed in register: `23.11.2024`
- last medcard status: `Подтверждена`

### 3.12 Xray cabinet

Found `2` xray cards.

All xray dates:

- `14.03.2026 12:47`
- `22.11.2024 10:16`

Details:

| xray_id | observed_at | note |
|---|---|---|
| `29917` | `14.03.2026 12:47` | `Ортопантомография` |
| `21209` | `22.11.2024 10:16` | `Компьютерная томография` |

## 4. Edge Cases

1. `Комментарии` is not a `&tab=` URL.
   It is an internal bootstrap pane on the base profile page with selector `#client-comments`. No direct server tab URL was exposed in DOM.

2. `Информация о пациенте` is also a base-page pane.
   All accordion sections are already present in DOM even when collapsed; no click is required.

3. `Файлы пациента` is not a table.
   It is a server-rendered list of cards/rows with direct `download` and `text-preview` links. The strongest deterministic path is DOM scraping plus the direct file URLs.

4. `Касса` is not a clean table.
   The page uses `.cashbox_card` blocks. Amount extraction needs line-based parsing because discount cards may contain multiple money values on one block.

5. `ДМС` is an empty-state page for this patient.
   No table was rendered; the only useful output is the explicit `Записей нет` state and the presence of `Добавить договор` / `Добавить полис`.

6. `Семья` is also an empty-state page for this patient.
   No table or relation rows were rendered.

7. `Документы` table has a normal `<thead>`, but naive table parsing can accidentally duplicate the first row into headers if the scraper uses fallback selectors.
   Use `thead th` first, then `tbody > tr`.

8. `Рентген кабинет` is card-based, not table-based.
   Stable selectors are `.XRay_card`, `.XRay_date`, `.XRay_note`, and `.XRay_controls a[href*="/xray/Images/detail?id="]`.

## 5. Expected Local Artifact Shape

Recommended final bundle for MacAI:

```json
{
  "patient": {},
  "comments": [],
  "files": [],
  "schedule_history": [],
  "medical_history": [],
  "payments": [],
  "bills": {},
  "dms": {},
  "documents": [],
  "family": {},
  "medcards": [],
  "xrays": []
}
```
