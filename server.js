const path = require("path");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { initDatabase, get, all, run } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

app.use(cors());
app.use(express.json());

function createToken(user) {
  return jwt.sign({ sub: user.id, login: user.login, role: user.role }, JWT_SECRET, { expiresIn: "12h" });
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    res.status(401).json({ error: "Не передан токен авторизации" });
    return;
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Недействительный токен" });
  }
}

function requireRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: "Недостаточно прав для этой операции" });
      return;
    }
    next();
  };
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  const now = new Date();
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

function verificationUrgency(nextDate) {
  const days = daysUntil(nextDate);
  if (days === null) return "later";
  if (days < 0) return "overdue";
  if (days <= 7) return "soon";
  return "later";
}

async function createNotification(targetRole, title, message) {
  await run("INSERT INTO notifications (target_role, title, message) VALUES (?, ?, ?)", [
    targetRole,
    title,
    message
  ]);
}

async function createDocument(docType, title, payload, targetRole, createdByRole, relatedType, relatedId) {
  const result = await run(
    `INSERT INTO documents (doc_type, title, payload_json, status, related_entity_type, related_entity_id, target_role, created_by_role)
     VALUES (?, ?, ?, 'created', ?, ?, ?, ?)`,
    [docType, title, JSON.stringify(payload), relatedType || null, relatedId || null, targetRole, createdByRole]
  );
  return result.lastID;
}

// ——— Auth ———

app.post("/api/auth/login", async (req, res) => {
  try {
    const { role, login, password } = req.body || {};
    if (!role || !login || !password) {
      res.status(400).json({ error: "role, login и password обязательны" });
      return;
    }
    const user = await get("SELECT * FROM users WHERE login = ? AND role = ?", [login, role]);
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      res.status(401).json({ error: "Неверный логин, пароль или роль" });
      return;
    }
    res.json({
      token: createToken(user),
      user: { id: user.id, login: user.login, fullName: user.full_name, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка авторизации", details: error.message });
  }
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { role, login, password, fullName } = req.body || {};
    if (!role || !login || !password || !fullName) {
      res.status(400).json({ error: "role, login, password и fullName обязательны" });
      return;
    }
    const allowedRoles = new Set(["irk", "tool-warehouse", "laboratory"]);
    if (!allowedRoles.has(role)) {
      res.status(400).json({ error: "Некорректная роль" });
      return;
    }
    const existing = await get("SELECT id FROM users WHERE login = ?", [String(login).trim()]);
    if (existing) {
      res.status(409).json({ error: "Пользователь с таким логином уже существует" });
      return;
    }
    const passwordHash = bcrypt.hashSync(String(password), 10);
    const result = await run(
      "INSERT INTO users (login, password_hash, full_name, role) VALUES (?, ?, ?, ?)",
      [String(login).trim(), passwordHash, String(fullName).trim(), role]
    );
    const user = { id: result.lastID, login: String(login).trim(), full_name: String(fullName).trim(), role };
    res.status(201).json({
      token: createToken(user),
      user: { id: user.id, login: user.login, fullName: user.full_name, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка регистрации", details: error.message });
  }
});

app.get("/api/me", authMiddleware, async (req, res) => {
  try {
    const user = await get("SELECT id, login, full_name, role FROM users WHERE id = ?", [req.user.sub]);
    if (!user) {
      res.status(404).json({ error: "Пользователь не найден" });
      return;
    }
    res.json({ id: user.id, login: user.login, fullName: user.full_name, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения профиля", details: error.message });
  }
});

// ——— Employees ———

app.get("/api/employees", authMiddleware, async (_req, res) => {
  try {
    const rows = await all(
      `SELECT id, full_name AS fullName, position, department, specialization, created_at AS createdAt
       FROM employees ORDER BY full_name`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ——— Instruments (ИРК каталог) ———

app.get("/api/instruments", authMiddleware, async (req, res) => {
  try {
    const { toolType, status, location, search } = req.query;
    let sql = `
      SELECT i.id, i.name, i.inventory_number AS inventoryNumber, i.tool_type AS toolType,
             i.category_name AS categoryName, i.status, i.location,
             i.total_quantity AS totalQuantity, i.stock_quantity AS stockQuantity,
             i.last_verification_date AS lastVerificationDate,
             i.next_verification_date AS nextVerificationDate,
             e.full_name AS issuedToName
      FROM instruments i
      LEFT JOIN employees e ON e.id = i.issued_to_employee_id
      WHERE 1=1`;
    const params = [];
    if (toolType && toolType !== "all") {
      sql += " AND i.tool_type = ?";
      params.push(toolType);
    }
    if (status && status !== "all") {
      sql += " AND i.status = ?";
      params.push(status);
    }
    if (location && location !== "all") {
      sql += " AND i.location LIKE ?";
      params.push(`%${location}%`);
    }
    if (search) {
      sql += " AND (i.name LIKE ? OR i.inventory_number LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }
    sql += " ORDER BY i.name";
    res.json(await all(sql, params));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/instruments/locations", authMiddleware, async (_req, res) => {
  try {
    const rows = await all("SELECT DISTINCT location FROM instruments ORDER BY location");
    res.json(rows.map((r) => r.location));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ——— IRK Dashboard ———

app.get("/api/dashboard/irk", authMiddleware, requireRoles("irk"), async (_req, res) => {
  try {
    const verificationDue = await all(`
      SELECT name, inventory_number AS inventoryNumber, next_verification_date AS dueDate
      FROM instruments
      WHERE tool_type = 'measuring' AND status != 'written_off'
        AND next_verification_date IS NOT NULL
        AND date(next_verification_date) <= date('now', '+30 days')
      ORDER BY next_verification_date
      LIMIT 20
    `);

    const verificationDueMapped = verificationDue.map((row) => ({
      ...row,
      daysLeft: daysUntil(row.dueDate),
      urgency: verificationUrgency(row.dueDate)
    }));

    const shiftSets = await all(`
      SELECT id, shift_name AS shiftName, shift_date AS shiftDate,
             specialization, status, tools_json AS toolsJson
      FROM shift_sets ORDER BY shift_date DESC LIMIT 10
    `);

    const overdueIssued = await all(`
      SELECT e.full_name AS employeeName, i.name AS instrumentName,
             i.inventory_number AS inventoryNumber, o.operation_at AS issuedAt,
             CAST(julianday('now') - julianday(o.operation_at) AS INTEGER) AS daysOverdue
      FROM operations o
      JOIN instruments i ON i.id = o.instrument_id
      JOIN employees e ON e.id = o.employee_id
      WHERE o.operation_type = 'issue' AND i.status = 'issued'
        AND julianday('now') - julianday(o.operation_at) > 14
      ORDER BY daysOverdue DESC
      LIMIT 20
    `);

    res.json({
      verificationDue: verificationDueMapped,
      shiftSets: shiftSets.map((s) => ({ ...s, tools: JSON.parse(s.toolsJson || "[]") })),
      overdueIssued
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ——— Lab Dashboard ———

app.get("/api/dashboard/laboratory", authMiddleware, requireRoles("laboratory"), async (_req, res) => {
  try {
    const current = await all(`
      SELECT v.id, i.name AS instrumentName, i.inventory_number AS inventoryNumber,
             v.start_date AS startDate, v.status
      FROM verifications v JOIN instruments i ON i.id = v.instrument_id
      WHERE v.status = 'in_progress' ORDER BY v.start_date DESC
    `);
    const overdue = await all(`
      SELECT v.id, i.name AS instrumentName, i.inventory_number AS inventoryNumber,
             i.next_verification_date AS dueDate
      FROM verifications v JOIN instruments i ON i.id = v.instrument_id
      WHERE v.status = 'overdue' OR (i.next_verification_date IS NOT NULL AND date(i.next_verification_date) < date('now'))
      ORDER BY i.next_verification_date
    `);
    const scheduled = await all(`
      SELECT v.id, i.name AS instrumentName, i.inventory_number AS inventoryNumber,
             v.start_date AS scheduledDate, v.verification_type AS verificationType
      FROM verifications v JOIN instruments i ON i.id = v.instrument_id
      WHERE v.status = 'scheduled'
        AND date(v.start_date) BETWEEN date('now') AND date('now', '+30 days')
      ORDER BY v.start_date
    `);
    res.json({ current, overdue, scheduled });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ——— Verifications ———

app.get("/api/verifications", authMiddleware, async (req, res) => {
  try {
    const { status, search, dateFrom, dateTo, archive } = req.query;
    let sql = `
      SELECT v.id, v.status, v.verification_type AS verificationType,
             v.start_date AS startDate, v.end_date AS endDate,
             v.result, v.fail_reason AS failReason, v.comment,
             v.next_verification_date AS nextVerificationDate,
             i.name AS instrumentName, i.inventory_number AS inventoryNumber,
             i.tool_type AS toolType,
             u.full_name AS labUserName
      FROM verifications v
      JOIN instruments i ON i.id = v.instrument_id
      LEFT JOIN users u ON u.id = v.lab_user_id
      WHERE 1=1`;
    const params = [];
    if (archive === "true") {
      sql += " AND v.status IN ('completed', 'failed') AND v.result IS NOT NULL";
    } else if (archive !== "all") {
      sql += " AND v.status != 'completed' OR v.result IS NULL";
    }
    if (status && status !== "all") {
      sql += " AND v.status = ?";
      params.push(status);
    }
    if (search) {
      sql += " AND (i.name LIKE ? OR i.inventory_number LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }
    if (dateFrom) {
      sql += " AND date(v.start_date) >= date(?)";
      params.push(dateFrom);
    }
    if (dateTo) {
      sql += " AND date(v.start_date) <= date(?)";
      params.push(dateTo);
    }
    sql += " ORDER BY v.start_date DESC";
    const rows = await all(sql, params);
    res.json(
      rows.map((r) => ({
        ...r,
        resultLabel: r.result === "pass" ? "Годен" : r.result === "fail" ? "Не годен" : null
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/verifications/schedule", authMiddleware, async (req, res) => {
  try {
    const rows = await all(`
      SELECT i.id AS instrumentId, i.name, i.inventory_number AS inventoryNumber,
             i.last_verification_date AS lastVerificationDate,
             i.next_verification_date AS nextVerificationDate, i.status
      FROM instruments i
      WHERE i.tool_type = 'measuring' AND i.status != 'written_off'
      ORDER BY i.next_verification_date
    `);
    res.json(
      rows.map((r) => ({
        ...r,
        urgency: verificationUrgency(r.nextVerificationDate),
        daysLeft: daysUntil(r.nextVerificationDate)
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/verifications/:id/start", authMiddleware, requireRoles("laboratory"), async (req, res) => {
  try {
    await run(
      "UPDATE verifications SET status = 'in_progress', start_date = date('now') WHERE id = ?",
      [req.params.id]
    );
    const v = await get("SELECT instrument_id FROM verifications WHERE id = ?", [req.params.id]);
    if (v) {
      await run("UPDATE instruments SET status = 'verification' WHERE id = ?", [v.instrument_id]);
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/verifications/:id/result", authMiddleware, requireRoles("laboratory"), async (req, res) => {
  try {
    const { result, failReason, comment, nextVerificationDate } = req.body || {};
    if (!result || !["pass", "fail"].includes(result)) {
      res.status(400).json({ error: "result должен быть pass или fail" });
      return;
    }
    const verification = await get(
      `SELECT v.*, i.name AS instrumentName, i.inventory_number AS inventoryNumber
       FROM verifications v JOIN instruments i ON i.id = v.instrument_id WHERE v.id = ?`,
      [req.params.id]
    );
    if (!verification) {
      res.status(404).json({ error: "Поверка не найдена" });
      return;
    }

    const endDate = new Date().toISOString().slice(0, 10);
    const nextDate =
      nextVerificationDate ||
      (result === "pass"
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
        : null);

    await run(
      `UPDATE verifications SET status = 'completed', end_date = ?, result = ?,
       fail_reason = ?, comment = ?, next_verification_date = ?, lab_user_id = ?
       WHERE id = ?`,
      [endDate, result, failReason || null, comment || null, nextDate, req.user.sub, req.params.id]
    );

    if (result === "pass") {
      await run(
        `UPDATE instruments SET status = 'available', last_verification_date = ?, next_verification_date = ?
         WHERE id = ?`,
        [endDate, nextDate, verification.instrument_id]
      );
      await createDocument(
        "certificate",
        `Сертификат: ${verification.instrumentName}`,
        { instrumentId: verification.instrument_id, inventoryNumber: verification.inventoryNumber, nextDate },
        "irk",
        "laboratory",
        "verification",
        verification.id
      );
      await createNotification(
        "irk",
        "Сертификат поверки",
        `Инструмент ${verification.instrumentName} (${verification.inventoryNumber}) признан годным.`
      );
    } else {
      await run("UPDATE instruments SET status = 'written_off' WHERE id = ?", [verification.instrument_id]);
      await createDocument(
        "rejection_notice",
        `Браковочное извещение: ${verification.instrumentName}`,
        {
          instrumentId: verification.instrument_id,
          inventoryNumber: verification.inventoryNumber,
          failReason,
          comment
        },
        "irk",
        "laboratory",
        "verification",
        verification.id
      );
      await createNotification(
        "irk",
        "Браковочное извещение",
        `Инструмент ${verification.instrumentName} (${verification.inventoryNumber}) не годен: ${failReason || "без указания причины"}.`
      );
    }

    res.json({ ok: true, nextVerificationDate: nextDate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/verifications/request-send", authMiddleware, requireRoles("laboratory"), async (req, res) => {
  try {
    const { instrumentId } = req.body || {};
    const instrument = await get("SELECT name, inventory_number FROM instruments WHERE id = ?", [instrumentId]);
    if (!instrument) {
      res.status(404).json({ error: "Инструмент не найден" });
      return;
    }
    await createNotification(
      "irk",
      "Запрос отправки на поверку",
      `Лаборатория запрашивает отправку: ${instrument.name} (${instrument.inventory_number}).`
    );
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ——— Operations (ИРК) ———

app.get("/api/operations", authMiddleware, async (req, res) => {
  try {
    const { employeeId, type } = req.query;
    let sql = `
      SELECT o.id, o.operation_type AS operationType, o.operation_at AS operationAt,
             o.quantity, o.document_basis AS documentBasis, o.condition_state AS conditionState,
             o.writeoff_reason AS writeoffReason,
             i.id AS instrumentId, i.name AS instrumentName, i.inventory_number AS inventoryNumber,
             i.tool_type AS toolType, i.stock_quantity AS stockQuantity,
             e.full_name AS employeeName
      FROM operations o
      JOIN instruments i ON i.id = o.instrument_id
      JOIN employees e ON e.id = o.employee_id
      WHERE 1=1`;
    const params = [];
    if (employeeId) {
      sql += " AND o.employee_id = ?";
      params.push(employeeId);
    }
    if (type) {
      sql += " AND o.operation_type = ?";
      params.push(type);
    }
    sql += " ORDER BY o.operation_at DESC";
    res.json(await all(sql, params));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/operations/issued/:employeeId", authMiddleware, async (req, res) => {
  try {
    const rows = await all(
      `SELECT i.id, i.name, i.inventory_number AS inventoryNumber, i.tool_type AS toolType,
              o.id AS operationId, o.operation_at AS issuedAt, o.quantity
       FROM instruments i
       JOIN operations o ON o.instrument_id = i.id AND o.employee_id = ?
       WHERE i.status = 'issued' AND i.issued_to_employee_id = ?
       ORDER BY o.operation_at DESC`,
      [req.params.employeeId, req.params.employeeId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/operations/issue", authMiddleware, requireRoles("irk"), async (req, res) => {
  try {
    const { employeeId, items } = req.body || {};
    if (!employeeId || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "employeeId и items обязательны" });
      return;
    }
    for (const item of items) {
      const instrument = await get("SELECT * FROM instruments WHERE id = ?", [item.instrumentId]);
      if (!instrument) {
        res.status(400).json({ error: `Инструмент ${item.instrumentId} не найден` });
        return;
      }
      const qty = item.quantity || 1;
      if (instrument.tool_type === "locksmith" && instrument.stock_quantity < qty) {
        res.status(400).json({ error: `Недостаточно остатка: ${instrument.name}` });
        return;
      }
      if (instrument.tool_type === "measuring" && instrument.status !== "available") {
        res.status(400).json({ error: `Инструмент недоступен: ${instrument.name}` });
        return;
      }
      await run(
        `INSERT INTO operations (operation_type, instrument_id, employee_id, operation_at, quantity)
         VALUES ('issue', ?, ?, datetime('now'), ?)`,
        [item.instrumentId, employeeId, qty]
      );
      if (instrument.tool_type === "measuring") {
        await run(
          "UPDATE instruments SET status = 'issued', stock_quantity = 0, issued_to_employee_id = ? WHERE id = ?",
          [employeeId, item.instrumentId]
        );
      } else {
        await run(
          "UPDATE instruments SET stock_quantity = stock_quantity - ?, issued_to_employee_id = ? WHERE id = ?",
          [qty, employeeId, item.instrumentId]
        );
      }
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/operations/return", authMiddleware, requireRoles("irk"), async (req, res) => {
  try {
    const { employeeId, items } = req.body || {};
    for (const item of items || []) {
      await run(
        `INSERT INTO operations (operation_type, instrument_id, employee_id, operation_at, quantity, condition_state)
         VALUES ('return', ?, ?, datetime('now'), ?, ?)`,
        [item.instrumentId, employeeId, item.quantity || 1, item.condition || "good"]
      );
      const instrument = await get("SELECT tool_type, total_quantity FROM instruments WHERE id = ?", [
        item.instrumentId
      ]);
      if (instrument?.tool_type === "measuring") {
        const newStatus = item.condition === "damaged" ? "written_off" : "available";
        await run(
          "UPDATE instruments SET status = ?, stock_quantity = 1, issued_to_employee_id = NULL WHERE id = ?",
          [newStatus, item.instrumentId]
        );
      } else {
        await run(
          "UPDATE instruments SET stock_quantity = MIN(total_quantity, stock_quantity + ?), issued_to_employee_id = NULL WHERE id = ?",
          [item.quantity || 1, item.instrumentId]
        );
      }
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/operations/receipt", authMiddleware, requireRoles("irk"), async (req, res) => {
  try {
    const { documentBasis, operationDate, items } = req.body || {};
    for (const item of items || []) {
      let instrument = await get("SELECT id FROM instruments WHERE name = ?", [item.name]);
      if (!instrument) {
        const invNum = `ИН-${Date.now()}-${Math.floor(Math.random() * 1000)}-L`;
        const result = await run(
          `INSERT INTO instruments (name, inventory_number, tool_type, category_name, status, location, total_quantity, stock_quantity)
           VALUES (?, ?, 'locksmith', ?, 'available', 'ИРК Цех №1', ?, ?)`,
          [item.name, invNum, item.category || "Слесарно-монтажный", item.quantity, item.quantity]
        );
        instrument = { id: result.lastID };
      } else {
        await run(
          "UPDATE instruments SET total_quantity = total_quantity + ?, stock_quantity = stock_quantity + ? WHERE id = ?",
          [item.quantity, item.quantity, instrument.id]
        );
      }
      await run(
        `INSERT INTO operations (operation_type, instrument_id, employee_id, operation_at, quantity, document_basis)
         VALUES ('receipt', ?, 1, ?, ?, ?)`,
        [instrument.id, operationDate || new Date().toISOString(), item.quantity, documentBasis]
      );
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/operations/writeoff", authMiddleware, requireRoles("irk"), async (req, res) => {
  try {
    const { instrumentId, reason, documentBasis } = req.body || {};
    await run(
      `INSERT INTO operations (operation_type, instrument_id, employee_id, operation_at, writeoff_reason, document_basis)
       VALUES ('writeoff', ?, 1, datetime('now'), ?, ?)`,
      [instrumentId, reason, documentBasis]
    );
    await run(
      "UPDATE instruments SET status = 'written_off', stock_quantity = 0, issued_to_employee_id = NULL WHERE id = ?",
      [instrumentId]
    );
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ——— Documents ———

app.get("/api/documents", authMiddleware, async (req, res) => {
  try {
    const { docType, targetRole } = req.query;
    let sql = `SELECT id, doc_type AS docType, title, payload_json AS payloadJson, status,
                      related_entity_type AS relatedEntityType, related_entity_id AS relatedEntityId,
                      target_role AS targetRole, created_by_role AS createdByRole, created_at AS createdAt
               FROM documents WHERE 1=1`;
    const params = [];
    if (docType) {
      sql += " AND doc_type = ?";
      params.push(docType);
    }
    if (targetRole) {
      sql += " AND (target_role = ? OR target_role IS NULL)";
      params.push(targetRole);
    }
    sql += " ORDER BY created_at DESC";
    const rows = await all(sql, params);
    res.json(rows.map((r) => ({ ...r, payload: JSON.parse(r.payloadJson || "{}") })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/documents/receipt-voucher", authMiddleware, requireRoles("irk"), async (req, res) => {
  try {
    const { instrumentIds } = req.body || {};
    const instruments = await all(
      `SELECT name, inventory_number AS inventoryNumber FROM instruments WHERE id IN (${(instrumentIds || []).map(() => "?").join(",") || "0"})`,
      instrumentIds || []
    );
    const docId = await createDocument(
      "receipt_voucher",
      `Вещевая квитанция от ${new Date().toLocaleDateString("ru-RU")}`,
      { instruments },
      "laboratory",
      "irk",
      null,
      null
    );
    for (const id of instrumentIds || []) {
      await run("UPDATE instruments SET status = 'verification' WHERE id = ?", [id]);
    }
    res.json({ ok: true, documentId: docId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/documents/replenishment-request", authMiddleware, requireRoles("irk"), async (req, res) => {
  try {
    const { items } = req.body || {};
    const docId = await createDocument(
      "replenishment_request",
      `Заявка на пополнение от ${new Date().toLocaleDateString("ru-RU")}`,
      { items },
      "tool-warehouse",
      "irk",
      null,
      null
    );
    res.json({ ok: true, documentId: docId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/documents/inventory-report", authMiddleware, requireRoles("irk"), async (_req, res) => {
  try {
    const items = await all(`
      SELECT name, inventory_number AS inventoryNumber, tool_type AS toolType,
             category_name AS categoryName, status, location,
             total_quantity AS totalQuantity, stock_quantity AS stockQuantity
      FROM instruments WHERE status != 'written_off' ORDER BY name
    `);
    const docId = await createDocument(
      "inventory_report",
      `Инвентаризация от ${new Date().toLocaleDateString("ru-RU")}`,
      { items, generatedAt: new Date().toISOString() },
      "irk",
      "irk",
      null,
      null
    );
    res.json({ ok: true, documentId: docId, items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ——— Notifications ———

app.get("/api/notifications", authMiddleware, async (req, res) => {
  try {
    const rows = await all(
      `SELECT id, title, message, is_read AS isRead, created_at AS createdAt
       FROM notifications WHERE target_role = ? ORDER BY created_at DESC LIMIT 50`,
      [req.user.role]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/notifications/remind", authMiddleware, requireRoles("irk"), async (req, res) => {
  try {
    const { employeeName, instrumentName } = req.body || {};
    await createNotification(
      "irk",
      "Напоминание о возврате",
      `Напоминание для ${employeeName}: вернуть ${instrumentName}.`
    );
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ——— Warehouse ———

app.get("/api/warehouse/stock", authMiddleware, requireRoles("tool-warehouse", "irk"), async (_req, res) => {
  try {
    const rows = await all(
      `SELECT id, name, category, quantity, min_quantity AS minQuantity, location, created_at AS createdAt
       FROM warehouse_stock ORDER BY name`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/warehouse/stock", authMiddleware, requireRoles("tool-warehouse"), async (req, res) => {
  try {
    const { name, category, quantity, minQuantity, location } = req.body || {};
    const result = await run(
      "INSERT INTO warehouse_stock (name, category, quantity, min_quantity, location) VALUES (?, ?, ?, ?, ?)",
      [name, category, quantity || 0, minQuantity || 0, location]
    );
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/warehouse/stock/:id", authMiddleware, requireRoles("tool-warehouse"), async (req, res) => {
  try {
    const { name, category, quantity, minQuantity, location } = req.body || {};
    await run(
      "UPDATE warehouse_stock SET name = ?, category = ?, quantity = ?, min_quantity = ?, location = ? WHERE id = ?",
      [name, category, quantity, minQuantity, location, req.params.id]
    );
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/warehouse/stock/:id", authMiddleware, requireRoles("tool-warehouse"), async (req, res) => {
  try {
    await run("DELETE FROM warehouse_stock WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/warehouse/movements", authMiddleware, async (req, res) => {
  try {
    const { type, workshop, dateFrom, dateTo } = req.query;
    let sql = `SELECT id, movement_type AS movementType, item_name AS itemName, quantity,
                      workshop, document_basis AS documentBasis, movement_at AS movementAt
               FROM warehouse_movements WHERE 1=1`;
    const params = [];
    if (type && type !== "all") {
      sql += " AND movement_type = ?";
      params.push(type);
    }
    if (workshop && workshop !== "all") {
      sql += " AND workshop LIKE ?";
      params.push(`%${workshop}%`);
    }
    if (dateFrom) {
      sql += " AND date(movement_at) >= date(?)";
      params.push(dateFrom);
    }
    if (dateTo) {
      sql += " AND date(movement_at) <= date(?)";
      params.push(dateTo);
    }
    sql += " ORDER BY movement_at DESC";
    res.json(await all(sql, params));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ——— Orders ———

app.get("/api/orders", authMiddleware, async (req, res) => {
  try {
    const { status } = req.query;
    let sql = `SELECT id, order_number AS orderNumber, workshop, status,
                      document_basis AS documentBasis, created_at AS createdAt,
                      transferred_at AS transferredAt, received_at AS receivedAt
               FROM orders WHERE 1=1`;
    const params = [];
    if (status && status !== "all") {
      sql += " AND status = ?";
      params.push(status);
    }
    sql += " ORDER BY created_at DESC";
    const orders = await all(sql, params);
    for (const order of orders) {
      order.items = await all(
        `SELECT id, name, quantity_requested AS quantityRequested, quantity_reserved AS quantityReserved
         FROM order_items WHERE order_id = ?`,
        [order.id]
      );
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/api/orders/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status, documentBasis } = req.body || {};
    const order = await get("SELECT * FROM orders WHERE id = ?", [req.params.id]);
    if (!order) {
      res.status(404).json({ error: "Заявка не найдена" });
      return;
    }

    if (status === "processing" && req.user.role === "tool-warehouse") {
      await run("UPDATE orders SET status = 'processing' WHERE id = ?", [req.params.id]);
    } else if (status === "transferred" && req.user.role === "tool-warehouse") {
      const items = await all("SELECT * FROM order_items WHERE order_id = ?", [req.params.id]);
      for (const item of items) {
        const stock = await get("SELECT * FROM warehouse_stock WHERE name = ?", [item.name]);
        if (stock && stock.quantity >= item.quantity_requested) {
          await run("UPDATE warehouse_stock SET quantity = quantity - ? WHERE id = ?", [
            item.quantity_requested,
            stock.id
          ]);
          await run(
            `INSERT INTO warehouse_movements (movement_type, item_name, quantity, workshop, document_basis, movement_at)
             VALUES ('transfer_to_irk', ?, ?, ?, ?, datetime('now'))`,
            [item.name, item.quantity_requested, order.workshop, documentBasis]
          );
        }
      }
      await run(
        "UPDATE orders SET status = 'transferred', document_basis = ?, transferred_at = datetime('now') WHERE id = ?",
        [documentBasis, req.params.id]
      );
      await createNotification(
        "irk",
        "Передача со склада",
        `Заявка ${order.order_number} передана в ИРК. Документ: ${documentBasis || "—"}.`
      );
    } else if (status === "received" && req.user.role === "irk") {
      await run("UPDATE orders SET status = 'received', received_at = datetime('now') WHERE id = ?", [req.params.id]);
    } else {
      res.status(403).json({ error: "Недопустимый переход статуса" });
      return;
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/orders/:id/reserve", authMiddleware, requireRoles("tool-warehouse"), async (req, res) => {
  try {
    const items = await all("SELECT * FROM order_items WHERE order_id = ?", [req.params.id]);
    for (const item of items) {
      const stock = await get("SELECT quantity FROM warehouse_stock WHERE name = ?", [item.name]);
      const reserved = Math.min(item.quantity_requested, stock?.quantity || 0);
      await run("UPDATE order_items SET quantity_reserved = ? WHERE id = ?", [reserved, item.id]);
    }
    await run("UPDATE orders SET status = 'processing' WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API endpoint не найден" });
});

app.use(express.static(path.join(__dirname, "client-dist")));
app.use(express.static(path.join(__dirname)));

initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database init error:", error);
    process.exit(1);
  });
