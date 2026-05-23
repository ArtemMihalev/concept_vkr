const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");

const dataDir = path.join(__dirname, "data");
const dbPath = path.join(dataDir, "is.sqlite");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

/** @param {number} days */
function addDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/** @param {number} days @param {string} [time] */
function addDaysAt(days, time = "10:00:00") {
  return `${addDays(days)} ${time}`;
}

async function columnExists(table, column) {
  const rows = await all(`PRAGMA table_info(${table})`);
  return rows.some((r) => r.name === column);
}

async function ensureColumn(table, column, definition) {
  const exists = await columnExists(table, column);
  if (!exists) {
    await run(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}

async function tableEmpty(table) {
  const row = await get(`SELECT COUNT(*) AS count FROM ${table}`);
  return !row || row.count === 0;
}

async function shouldSkip(force) {
  if (force) return false;
  return !(await tableEmpty("instruments"));
}

async function clearDemoData() {
  await run("PRAGMA foreign_keys = OFF");
  await run("DELETE FROM notifications");
  await run("DELETE FROM documents");
  await run("DELETE FROM order_items");
  await run("DELETE FROM orders");
  await run("DELETE FROM warehouse_movements");
  await run("DELETE FROM verifications");
  await run("DELETE FROM operations");
  await run("DELETE FROM shift_sets");
  await run("DELETE FROM instruments");
  await run("DELETE FROM employees");
  await run("DELETE FROM warehouse_stock");
  await run("DELETE FROM users");
  await run("PRAGMA foreign_keys = ON");
}

async function resetInstrumentSchema() {
  await run("PRAGMA foreign_keys = OFF");
  await run("DROP TABLE IF EXISTS operations");
  await run("DROP TABLE IF EXISTS verifications");
  await run("DROP TABLE IF EXISTS instruments");

  await run(`
    CREATE TABLE instruments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      inventory_number TEXT NOT NULL UNIQUE,
      tool_type TEXT NOT NULL DEFAULT 'measuring',
      category_name TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'available',
      location TEXT NOT NULL,
      total_quantity INTEGER NOT NULL DEFAULT 1,
      stock_quantity INTEGER NOT NULL DEFAULT 1,
      issued_to_employee_id INTEGER,
      last_verification_date TEXT,
      next_verification_date TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (issued_to_employee_id) REFERENCES employees(id)
    )
  `);

  await run(`
    CREATE TABLE operations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      operation_type TEXT NOT NULL,
      instrument_id INTEGER NOT NULL,
      employee_id INTEGER NOT NULL,
      operation_at TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      document_basis TEXT,
      condition_state TEXT,
      writeoff_reason TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (instrument_id) REFERENCES instruments(id),
      FOREIGN KEY (employee_id) REFERENCES employees(id)
    )
  `);

  await run(`
    CREATE TABLE verifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      instrument_id INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'scheduled',
      verification_type TEXT NOT NULL DEFAULT 'planned',
      start_date TEXT,
      end_date TEXT,
      result TEXT,
      fail_reason TEXT,
      comment TEXT,
      next_verification_date TEXT,
      lab_user_id INTEGER,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (instrument_id) REFERENCES instruments(id),
      FOREIGN KEY (lab_user_id) REFERENCES users(id)
    )
  `);

  await run("PRAGMA foreign_keys = ON");
}

async function seedUsers(force) {
  if (!force && !(await tableEmpty("users"))) return;

  const users = [
    { login: "irk_user", password: "irk123", fullName: "Кладовщик ИРК", role: "irk" },
    { login: "warehouse_user", password: "warehouse123", fullName: "Кладовщик инструментального склада", role: "tool-warehouse" },
    { login: "lab_user", password: "lab123", fullName: "Смирнов А.В.", role: "laboratory" }
  ];

  for (const user of users) {
    const hash = bcrypt.hashSync(user.password, 10);
    await run(
      "INSERT INTO users (login, password_hash, full_name, role) VALUES (?, ?, ?, ?)",
      [user.login, hash, user.fullName, user.role]
    );
  }
}

async function seedEmployees(force) {
  if (await shouldSkip(force)) return;

  const employees = [
    ["Иванов Иван Иванович", "Слесарь", "Цех №1", "locksmith"],
    ["Петров Пётр Петрович", "Токарь", "Цех №2", "machining"],
    ["Сидоров Сергей Сергеевич", "Мастер", "Цех №1", "locksmith"],
    ["Кузнецова Анна Александровна", "Лаборант", "Метрологическая лаборатория", "metrology"],
    ["Сергеев Андрей Павлович", "Слесарь", "Цех №3", "locksmith"],
    ["Николаев Михаил Сергеевич", "Фрезеровщик", "Цех №2", "machining"],
    ["Волков Дмитрий Игоревич", "Слесарь", "Цех №3", "locksmith"],
    ["Морозова Елена Викторовна", "Контролёр", "ОТК", "quality"]
  ];

  for (const e of employees) {
    await run(
      "INSERT INTO employees (full_name, position, department, specialization) VALUES (?, ?, ?, ?)",
      e
    );
  }
}

/**
 * @returns {Promise<Record<string, number>>}
 */
async function getEmployeeIdMap() {
  const rows = await all("SELECT id, full_name FROM employees");
  const find = (part) => rows.find((r) => r.full_name.includes(part))?.id || null;
  return {
    ivanov: find("Иванов"),
    sidorov: find("Сидоров"),
    sergeev: find("Сергеев")
  };
}

async function seedInstruments(force) {
  if (await shouldSkip(force)) {
    const rows = await all("SELECT id, inventory_number FROM instruments");
    return Object.fromEntries(rows.map((r) => [r.inventory_number, r.id]));
  }

  const emp = await getEmployeeIdMap();

  const items = [
    // [name, inv, type, category, status, location, total, stock, issuedTo, lastVer, nextVer]
    ["Штангенциркуль ШЦ-I-150", "ИН-001234", "measuring", "Измерительный", "available", "ИРК Цех №1", 1, 1, null, addDays(-365), addDays(45)],
    ["Микрометр МК-25-0.01", "ИН-001235", "measuring", "Измерительный", "issued", "У рабочего: Иванов И.И.", 1, 0, emp.ivanov, addDays(-400), addDays(90)],
    ["Калибр-пробка 6Н7", "ИН-001238", "measuring", "Измерительный", "verification", "Метрологическая лаборатория", 1, 0, null, addDays(-180), addDays(180)],
    ["Манометр МП-100", "ИН-001240", "measuring", "Измерительный", "available", "ИРК Цех №2", 1, 1, null, addDays(-300), addDays(5)],
    ["Индикатор ИЧ-10", "ИН-001237", "measuring", "Измерительный", "available", "ИРК Цех №1", 1, 1, null, addDays(-400), addDays(-30)],
    ["Термометр ТТ-150", "ИН-001241", "measuring", "Измерительный", "available", "ИРК Цех №2", 1, 1, null, addDays(-200), addDays(3)],
    ["Весы лабораторные ВЛ-200", "ИН-001242", "measuring", "Измерительный", "available", "ИРК Цех №1", 1, 1, null, addDays(-100), addDays(20)],
    ["Глубиномер ШГ-160", "ИН-001243", "measuring", "Измерительный", "written_off", "Архив", 1, 0, null, addDays(-500), addDays(-100)],
    ["Уровень пузырьковый УП-600", "ИН-001244", "measuring", "Измерительный", "issued", "У рабочего: Сергеев А.П.", 1, 0, emp.sergeev, addDays(-350), addDays(120)],
    ["Ключ гаечный 17мм", "ИН-L-001", "locksmith", "Слесарно-монтажный", "available", "ИРК Цех №1", 25, 18, null, null, null],
    ["Отвертка шлицевая 5мм", "ИН-L-002", "locksmith", "Слесарно-монтажный", "available", "ИРК Цех №1", 30, 5, null, null, null],
    ["Пассатижи комбинированные 200мм", "ИН-L-003", "locksmith", "Слесарно-монтажный", "available", "ИРК Цех №1", 15, 12, null, null, null],
    ["Молоток слесарный 500г", "ИН-L-004", "locksmith", "Слесарно-монтажный", "issued", "У рабочего: Сидоров С.С.", 10, 4, emp.sidorov, null, null],
    ["Напильник плоский №2", "ИН-L-005", "locksmith", "Слесарно-монтажный", "available", "ИРК Цех №2", 20, 20, null, null, null],
    ["Шаблон сварочный УС-1", "ИН-L-006", "locksmith", "Слесарно-монтажный", "available", "ИРК Цех №3", 8, 2, null, null, null]
  ];

  for (const i of items) {
    await run(
      `INSERT INTO instruments (
        name, inventory_number, tool_type, category_name, status, location,
        total_quantity, stock_quantity, issued_to_employee_id,
        last_verification_date, next_verification_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      i
    );
  }

  const rows = await all("SELECT id, inventory_number FROM instruments");
  return Object.fromEntries(rows.map((r) => [r.inventory_number, r.id]));
}

async function seedOperations(force, invMap) {
  if (await shouldSkip(force)) return;

  const emp = await getEmployeeIdMap();

  const ops = [
    ["issue", invMap["ИН-001235"], emp.ivanov, addDaysAt(-20), 1, null, null],
    ["issue", invMap["ИН-001244"], emp.sergeev, addDaysAt(-18), 1, null, null],
    ["issue", invMap["ИН-L-004"], emp.sidorov, addDaysAt(-16), 1, null, null],
    ["issue", invMap["ИН-001234"], emp.ivanov, addDaysAt(-2), 1, null, null],
    ["return", invMap["ИН-001234"], emp.ivanov, addDaysAt(-1), 1, null, "good"],
    ["issue", invMap["ИН-L-001"], emp.ivanov, addDaysAt(-5), 1, null, null],
    ["receipt", invMap["ИН-L-005"], emp.ivanov, addDaysAt(-10), 5, "Приходная накладная №412", null],
    ["writeoff", invMap["ИН-001243"], emp.ivanov, addDaysAt(-60), 1, "Акт списания №18", "wear"]
  ];

  for (const op of ops) {
    const [type, instId, empId, at, qty, doc, cond] = op;
    await run(
      `INSERT INTO operations (operation_type, instrument_id, employee_id, operation_at, quantity, document_basis, condition_state, writeoff_reason)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [type, instId, empId, at, qty, doc, cond, type === "writeoff" ? "wear" : null]
    );
  }
}

async function seedWarehouseStock(force) {
  if (await shouldSkip(force)) return;

  const items = [
    ["Набор ключей гаечных 6-32мм", "Слесарный инструмент", 45, 20, "Стеллаж А-12"],
    ["Дрель электрическая ДЭ-16", "Электроинструмент", 12, 5, "Стеллаж Б-3"],
    ["Сверло по металлу 8мм", "Режущий инструмент", 3, 10, "Ячейка В-45"],
    ["Молоток слесарный 500г", "Слесарный инструмент", 28, 15, "Стеллаж А-8"],
    ["Угловая шлифмашина УШМ-125", "Электроинструмент", 8, 4, "Стеллаж Б-7"],
    ["Ключ гаечный 17мм", "Слесарный инструмент", 50, 25, "Стеллаж А-5"],
    ["Отвертка шлицевая 5мм", "Слесарный инструмент", 40, 15, "Стеллаж А-6"],
    ["Диск отрезной 125мм", "Расходные материалы", 5, 15, "Ячейка Г-12"],
    ["Электроды ОК-46 3мм", "Расходные материалы", 2, 8, "Ячейка Г-15"],
    ["Пассатижи комбинированные 200мм", "Слесарный инструмент", 22, 10, "Стеллаж А-9"]
  ];

  for (const item of items) {
    await run(
      "INSERT INTO warehouse_stock (name, category, quantity, min_quantity, location) VALUES (?, ?, ?, ?, ?)",
      item
    );
  }
}

async function seedVerifications(force, invMap) {
  if (await shouldSkip(force)) return;

  const labUser = await get("SELECT id FROM users WHERE role = 'laboratory' LIMIT 1");

  const rows = [
    [invMap["ИН-001238"], "in_progress", "planned", addDays(-3), null, null, null, null, labUser?.id, null],
    [invMap["ИН-001240"], "scheduled", "planned", addDays(5), null, null, null, null, labUser?.id, null],
    [invMap["ИН-001241"], "scheduled", "planned", addDays(12), null, null, null, null, labUser?.id, null],
    [invMap["ИН-001242"], "scheduled", "unplanned", addDays(25), null, null, null, null, labUser?.id, null],
    [invMap["ИН-001235"], "completed", "planned", addDays(-30), addDays(-28), "pass", null, addDays(335), labUser?.id, null],
    [invMap["ИН-001234"], "completed", "planned", addDays(-90), addDays(-88), "pass", null, addDays(275), labUser?.id, null],
    [invMap["ИН-001237"], "overdue", "planned", addDays(-60), null, null, null, null, labUser?.id, null],
    [invMap["ИН-001243"], "completed", "planned", addDays(-120), addDays(-118), "fail", "accuracy", addDays(-100), labUser?.id, "Отклонение показаний за пределы допуска"],
    [invMap["ИН-001244"], "scheduled", "planned", addDays(8), null, null, null, null, labUser?.id, null]
  ];

  for (const r of rows) {
    await run(
      `INSERT INTO verifications (
        instrument_id, status, verification_type, start_date, end_date,
        result, fail_reason, next_verification_date, lab_user_id, comment
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      r
    );
  }
}

async function seedOrders(force) {
  if (await shouldSkip(force)) return;

  const orders = [
    ["ЗН-2026-0045", "Цех №1", "new", null, addDaysAt(-1)],
    ["ЗН-2026-0044", "Цех №3", "processing", null, addDaysAt(-3)],
    ["ЗН-2026-0042", "Цех №1", "new", null, addDaysAt(-2)],
    ["ЗН-2026-0041", "Цех №3", "processing", null, addDaysAt(-5)],
    ["ЗН-2026-0038", "Цех №2", "transferred", "Накладная №128", addDaysAt(-7)],
    ["ЗН-2026-0035", "Цех №2", "received", "Накладная №120", addDaysAt(-14)]
  ];

  for (const o of orders) {
    await run(
      `INSERT INTO orders (order_number, workshop, status, document_basis, created_at, transferred_at, received_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        o[0],
        o[1],
        o[2],
        o[3],
        o[4],
        o[2] === "transferred" || o[2] === "received" ? addDaysAt(-5) : null,
        o[2] === "received" ? addDaysAt(-3) : null
      ]
    );
  }

  const orderItems = {
    "ЗН-2026-0045": [
      ["Ключ гаечный 17мм", 10, 0],
      ["Отвертка шлицевая 5мм", 15, 0]
    ],
    "ЗН-2026-0044": [
      ["Набор ключей гаечных 6-32мм", 5, 5],
      ["Сверло по металлу 8мм", 20, 3]
    ],
    "ЗН-2026-0042": [
      ["Пассатижи комбинированные 200мм", 8, 0],
      ["Молоток слесарный 500г", 5, 0]
    ],
    "ЗН-2026-0041": [
      ["Набор ключей гаечных 6-32мм", 5, 5],
      ["Угловая шлифмашина УШМ-125", 2, 2]
    ],
    "ЗН-2026-0038": [
      ["Дрель электрическая ДЭ-16", 2, 2],
      ["Отвертка шлицевая 5мм", 10, 10]
    ],
    "ЗН-2026-0035": [
      ["Молоток слесарный 500г", 10, 10],
      ["Диск отрезной 125мм", 15, 15]
    ]
  };

  for (const [num, items] of Object.entries(orderItems)) {
    const order = await get("SELECT id FROM orders WHERE order_number = ?", [num]);
    for (const [name, req, res] of items) {
      await run(
        "INSERT INTO order_items (order_id, name, quantity_requested, quantity_reserved) VALUES (?, ?, ?, ?)",
        [order.id, name, req, res]
      );
    }
  }
}

async function seedWarehouseMovements(force) {
  if (await shouldSkip(force)) return;

  const moves = [
    ["transfer_to_irk", "Набор ключей гаечных 6-32мм", 2, "Цех №3", "Накладная №125", addDaysAt(-1, "11:20:00")],
    ["receipt", "Молоток слесарный 500г", 20, "Склад", "Приход №88", addDaysAt(-2, "10:30:00")],
    ["transfer_to_irk", "Угловая шлифмашина УШМ-125", 3, "Цех №2", "Накладная №124", addDaysAt(-3, "10:15:00")],
    ["transfer_to_irk", "Дрель электрическая ДЭ-16", 2, "Цех №2", "Накладная №128", addDaysAt(-7, "14:00:00")],
    ["transfer_to_irk", "Отвертка шлицевая 5мм", 10, "Цех №2", "Накладная №128", addDaysAt(-7, "14:05:00")],
    ["receipt", "Диск отрезной 125мм", 50, "Склад", "Приход №91", addDaysAt(-10, "09:00:00")],
    ["transfer_to_irk", "Ключ гаечный 17мм", 10, "Цех №1", "Накладная №130", addDaysAt(-4, "08:30:00")],
    ["receipt", "Электроды ОК-46 3мм", 30, "Склад", "Приход №85", addDaysAt(-15, "16:00:00")]
  ];

  for (const m of moves) {
    await run(
      "INSERT INTO warehouse_movements (movement_type, item_name, quantity, workshop, document_basis, movement_at) VALUES (?, ?, ?, ?, ?, ?)",
      m
    );
  }
}

async function seedShiftSets(force) {
  if (await shouldSkip(force)) return;

  const sets = [
    ["Смена А (день)", addDays(0), "Слесарь", "preparing", [{ name: "Ключ гаечный 17мм", qty: 2 }, { name: "Отвертка шлицевая 5мм", qty: 1 }]],
    ["Смена Б (день)", addDays(0), "Токарь", "ready", [{ name: "Штангенциркуль ШЦ-I-150", qty: 1 }, { name: "Микрометр МК-25-0.01", qty: 1 }]],
    ["Смена В (ночь)", addDays(1), "Слесарь", "preparing", [{ name: "Пассатижи комбинированные 200мм", qty: 1 }, { name: "Молоток слесарный 500г", qty: 1 }]],
    ["Смена А (день)", addDays(1), "Фрезеровщик", "preparing", [{ name: "Уровень пузырьковый УП-600", qty: 1 }]]
  ];

  for (const s of sets) {
    await run(
      "INSERT INTO shift_sets (shift_name, shift_date, specialization, status, tools_json) VALUES (?, ?, ?, ?, ?)",
      [s[0], s[1], s[2], s[3], JSON.stringify(s[4])]
    );
  }
}

async function seedDocuments(force, invMap) {
  if (await shouldSkip(force)) return;

  const docs = [
    [
      "inventory_report",
      `Инвентаризация от ${new Date().toLocaleDateString("ru-RU")}`,
      JSON.stringify({ itemsCount: 14 }),
      "irk",
      "irk"
    ],
    [
      "receipt_voucher",
      "Вещевая квитанция №12 — отправка в лабораторию",
      JSON.stringify({
        instruments: [
          { name: "Манометр МП-100", inventoryNumber: "ИН-001240" },
          { name: "Термометр ТТ-150", inventoryNumber: "ИН-001241" }
        ]
      }),
      "laboratory",
      "irk"
    ],
    [
      "receipt_voucher",
      "Вещевая квитанция №11 — Калибр-пробка",
      JSON.stringify({ instruments: [{ name: "Калибр-пробка 6Н7", inventoryNumber: "ИН-001238" }] }),
      "laboratory",
      "irk"
    ],
    [
      "replenishment_request",
      "Заявка на пополнение ЗП-2026-09",
      JSON.stringify({
        items: [
          { name: "Отвертка шлицевая 5мм", quantity: 20 },
          { name: "Шаблон сварочный УС-1", quantity: 6 }
        ]
      }),
      "tool-warehouse",
      "irk"
    ],
    [
      "certificate",
      "Сертификат: Микрометр МК-25-0.01",
      JSON.stringify({ instrumentId: invMap["ИН-001235"], inventoryNumber: "ИН-001235", nextDate: addDays(335) }),
      "irk",
      "laboratory"
    ],
    [
      "certificate",
      "Сертификат: Штангенциркуль ШЦ-I-150",
      JSON.stringify({ instrumentId: invMap["ИН-001234"], inventoryNumber: "ИН-001234", nextDate: addDays(275) }),
      "irk",
      "laboratory"
    ],
    [
      "rejection_notice",
      "Браковочное извещение: Глубиномер ШГ-160",
      JSON.stringify({
        instrumentId: invMap["ИН-001243"],
        inventoryNumber: "ИН-001243",
        failReason: "accuracy",
        comment: "Отклонение показаний за пределы допуска"
      }),
      "irk",
      "laboratory"
    ]
  ];

  for (const d of docs) {
    await run(
      `INSERT INTO documents (doc_type, title, payload_json, status, target_role, created_by_role)
       VALUES (?, ?, ?, 'created', ?, ?)`,
      d
    );
  }
}

async function seedNotifications(force) {
  if (await shouldSkip(force)) return;

  const notes = [
    ["irk", "Сертификат поверки", "Микрометр МК-25-0.01 (ИН-001235) признан годным. Следующая поверка: " + addDays(335)],
    ["irk", "Браковочное извещение", "Глубиномер ШГ-160 (ИН-001243) не годен: отклонение точности."],
    ["irk", "Передача со склада", "Заявка ЗН-2026-0038 передана в ИРК. Документ: Накладная №128."],
    ["irk", "Запрос отправки на поверку", "Лаборатория запрашивает отправку: Индикатор ИЧ-10 (ИН-001237)."],
    ["irk", "Напоминание о возврате", "Напоминание для Иванов И.И.: вернуть Микрометр МК-25-0.01."],
    ["laboratory", "Вещевая квитанция", "Получена вещевая квитанция №12 на 2 прибора."],
    ["tool-warehouse", "Заявка на пополнение", "ИРК направил заявку ЗП-2026-09 на 2 позиции."]
  ];

  for (const n of notes) {
    await run("INSERT INTO notifications (target_role, title, message) VALUES (?, ?, ?)", n);
  }
}

async function initDatabase() {
  const force = process.env.FORCE_SEED === "1";

  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      login TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('irk', 'tool-warehouse', 'laboratory')),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      position TEXT NOT NULL,
      department TEXT NOT NULL,
      specialization TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS instruments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      inventory_number TEXT NOT NULL UNIQUE,
      tool_type TEXT NOT NULL DEFAULT 'measuring',
      category_name TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'available',
      location TEXT NOT NULL,
      total_quantity INTEGER NOT NULL DEFAULT 1,
      stock_quantity INTEGER NOT NULL DEFAULT 1,
      issued_to_employee_id INTEGER,
      last_verification_date TEXT,
      next_verification_date TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (issued_to_employee_id) REFERENCES employees(id)
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS operations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      operation_type TEXT NOT NULL,
      instrument_id INTEGER NOT NULL,
      employee_id INTEGER NOT NULL,
      operation_at TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      document_basis TEXT,
      condition_state TEXT,
      writeoff_reason TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (instrument_id) REFERENCES instruments(id),
      FOREIGN KEY (employee_id) REFERENCES employees(id)
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS verifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      instrument_id INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'scheduled',
      verification_type TEXT NOT NULL DEFAULT 'planned',
      start_date TEXT,
      end_date TEXT,
      result TEXT,
      fail_reason TEXT,
      comment TEXT,
      next_verification_date TEXT,
      lab_user_id INTEGER,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (instrument_id) REFERENCES instruments(id),
      FOREIGN KEY (lab_user_id) REFERENCES users(id)
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doc_type TEXT NOT NULL,
      title TEXT NOT NULL,
      payload_json TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      related_entity_type TEXT,
      related_entity_id INTEGER,
      target_role TEXT,
      created_by_role TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS warehouse_stock (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 0,
      min_quantity INTEGER NOT NULL DEFAULT 0,
      location TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT NOT NULL UNIQUE,
      workshop TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      document_basis TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      transferred_at TEXT,
      received_at TEXT
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      quantity_requested INTEGER NOT NULL,
      quantity_reserved INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS warehouse_movements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      movement_type TEXT NOT NULL,
      item_name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      workshop TEXT NOT NULL,
      document_basis TEXT,
      movement_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      target_role TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      is_read INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS shift_sets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      shift_name TEXT NOT NULL,
      shift_date TEXT NOT NULL,
      specialization TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'preparing',
      tools_json TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await ensureColumn("employees", "specialization", "TEXT");
  await ensureColumn("instruments", "tool_type", "TEXT NOT NULL DEFAULT 'measuring'");
  await ensureColumn("instruments", "category_name", "TEXT NOT NULL DEFAULT ''");
  await ensureColumn("instruments", "total_quantity", "INTEGER NOT NULL DEFAULT 1");
  await ensureColumn("instruments", "stock_quantity", "INTEGER NOT NULL DEFAULT 1");
  await ensureColumn("instruments", "issued_to_employee_id", "INTEGER");
  await ensureColumn("instruments", "last_verification_date", "TEXT");
  await ensureColumn("instruments", "next_verification_date", "TEXT");
  await ensureColumn("operations", "quantity", "INTEGER NOT NULL DEFAULT 1");
  await ensureColumn("operations", "document_basis", "TEXT");
  await ensureColumn("operations", "condition_state", "TEXT");
  await ensureColumn("operations", "writeoff_reason", "TEXT");
  await ensureColumn("verifications", "comment", "TEXT");

  if (force) {
    await clearDemoData();
    await resetInstrumentSchema();
  }

  await seedUsers(force);
  await seedEmployees(force);
  const invMap = await seedInstruments(force);
  await seedOperations(force, invMap);
  await seedWarehouseStock(force);
  await seedVerifications(force, invMap);
  await seedOrders(force);
  await seedWarehouseMovements(force);
  await seedShiftSets(force);
  await seedDocuments(force, invMap);
  await seedNotifications(force);
}

module.exports = {
  db,
  run,
  get,
  all,
  initDatabase,
  clearDemoData
};
