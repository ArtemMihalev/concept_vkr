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
      if (err) {
        reject(err);
        return;
      }
      resolve(this);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

async function seedUsers() {
  const existing = await get("SELECT COUNT(*) AS count FROM users");
  if (existing && existing.count > 0) {
    return;
  }

  const users = [
    {
      login: "irk_user",
      password: "irk123",
      fullName: "Кладовщик ИРК",
      role: "irk"
    },
    {
      login: "warehouse_user",
      password: "warehouse123",
      fullName: "Кладовщик инструментального склада",
      role: "tool-warehouse"
    },
    {
      login: "lab_user",
      password: "lab123",
      fullName: "Лаборант",
      role: "laboratory"
    }
  ];

  for (const user of users) {
    const hash = bcrypt.hashSync(user.password, 10);
    await run(
      "INSERT INTO users (login, password_hash, full_name, role) VALUES (?, ?, ?, ?)",
      [user.login, hash, user.fullName, user.role]
    );
  }
}

async function seedEmployees() {
  const existing = await get("SELECT COUNT(*) AS count FROM employees");
  if (existing && existing.count > 0) {
    return;
  }

  const employees = [
    ["Иванов И.И.", "Слесарь", "irk"],
    ["Петров П.П.", "Токарь", "tool-warehouse"],
    ["Сидоров С.С.", "Мастер", "irk"],
    ["Кузнецова А.А.", "Лаборант", "laboratory"]
  ];

  for (const employee of employees) {
    await run("INSERT INTO employees (full_name, position, department) VALUES (?, ?, ?)", employee);
  }
}

async function seedInstruments() {
  const existing = await get("SELECT COUNT(*) AS count FROM instruments");
  if (existing && existing.count > 0) {
    return;
  }

  const instruments = [
    ["Штангенциркуль ШЦ-I-150", "ИН-001234", "measuring", "available", "ИРК Цех №1"],
    ["Микрометр МК-25", "ИН-001235", "measuring", "in_use", "ИРК Цех №1"],
    ["Ключ гаечный 17мм", "ИН-001236", "hand_tool", "available", "Инструментальный склад"],
    ["Калибр-пробка", "ИН-001237", "measuring", "verification", "Метрологическая лаборатория"]
  ];

  for (const instrument of instruments) {
    await run(
      "INSERT INTO instruments (name, inventory_number, category, status, location) VALUES (?, ?, ?, ?, ?)",
      instrument
    );
  }
}

async function seedOperations() {
  const existing = await get("SELECT COUNT(*) AS count FROM operations");
  if (existing && existing.count > 0) {
    return;
  }

  const operations = [
    ["Выдача", 1, 1, "2026-05-05 10:30:00"],
    ["Возврат", 2, 2, "2026-05-05 10:15:00"],
    ["Выдача", 3, 3, "2026-05-05 09:45:00"]
  ];

  for (const operation of operations) {
    await run(
      "INSERT INTO operations (operation_type, instrument_id, employee_id, operation_at) VALUES (?, ?, ?, ?)",
      operation
    );
  }
}

async function initDatabase() {
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
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS instruments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      inventory_number TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('available', 'in_use', 'verification', 'retired')),
      location TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS operations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      operation_type TEXT NOT NULL,
      instrument_id INTEGER NOT NULL,
      employee_id INTEGER NOT NULL,
      operation_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (instrument_id) REFERENCES instruments(id),
      FOREIGN KEY (employee_id) REFERENCES employees(id)
    )
  `);

  await seedUsers();
  await seedEmployees();
  await seedInstruments();
  await seedOperations();
}

module.exports = {
  db,
  run,
  get,
  all,
  initDatabase
};
