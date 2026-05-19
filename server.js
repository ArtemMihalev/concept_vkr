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
  return jwt.sign(
    {
      sub: user.id,
      login: user.login,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "12h" }
  );
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    res.status(401).json({ error: "Не передан токен авторизации" });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: "Недействительный токен" });
  }
}

app.post("/api/auth/login", async (req, res) => {
  try {
    const { role, login, password } = req.body || {};
    if (!role || !login || !password) {
      res.status(400).json({ error: "role, login и password обязательны" });
      return;
    }

    const user = await get("SELECT * FROM users WHERE login = ? AND role = ?", [login, role]);
    if (!user) {
      res.status(401).json({ error: "Неверный логин, пароль или роль" });
      return;
    }

    const isValidPassword = bcrypt.compareSync(password, user.password_hash);
    if (!isValidPassword) {
      res.status(401).json({ error: "Неверный логин, пароль или роль" });
      return;
    }

    const token = createToken(user);
    res.json({
      token,
      user: {
        id: user.id,
        login: user.login,
        fullName: user.full_name,
        role: user.role
      }
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

    const normalizedLogin = String(login).trim();
    const normalizedFullName = String(fullName).trim();
    const normalizedRole = String(role).trim();

    const allowedRoles = new Set(["irk", "tool-warehouse", "laboratory"]);
    if (!allowedRoles.has(normalizedRole)) {
      res.status(400).json({ error: "Некорректная роль" });
      return;
    }

    if (normalizedLogin.length < 3 || normalizedLogin.length > 64) {
      res.status(400).json({ error: "Логин должен быть от 3 до 64 символов" });
      return;
    }

    if (String(password).length < 4 || String(password).length > 128) {
      res.status(400).json({ error: "Пароль должен быть от 4 до 128 символов" });
      return;
    }

    if (normalizedFullName.length < 3 || normalizedFullName.length > 128) {
      res.status(400).json({ error: "ФИО должно быть от 3 до 128 символов" });
      return;
    }

    const existing = await get("SELECT id FROM users WHERE login = ?", [normalizedLogin]);
    if (existing) {
      res.status(409).json({ error: "Пользователь с таким логином уже существует" });
      return;
    }

    const passwordHash = bcrypt.hashSync(String(password), 10);
    const result = await run(
      "INSERT INTO users (login, password_hash, full_name, role) VALUES (?, ?, ?, ?)",
      [normalizedLogin, passwordHash, normalizedFullName, normalizedRole]
    );

    const user = {
      id: result.lastID,
      login: normalizedLogin,
      full_name: normalizedFullName,
      role: normalizedRole
    };

    const token = createToken(user);
    res.status(201).json({
      token,
      user: {
        id: user.id,
        login: user.login,
        fullName: user.full_name,
        role: user.role
      }
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
    res.json({
      id: user.id,
      login: user.login,
      fullName: user.full_name,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения профиля", details: error.message });
  }
});

app.get("/api/employees", authMiddleware, async (_req, res) => {
  try {
    const rows = await all(
      "SELECT id, full_name AS fullName, position, department, created_at AS createdAt FROM employees ORDER BY id DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения сотрудников", details: error.message });
  }
});

app.get("/api/instruments", authMiddleware, async (_req, res) => {
  try {
    const rows = await all(
      "SELECT id, name, inventory_number AS inventoryNumber, category, status, location, created_at AS createdAt FROM instruments ORDER BY id DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения инструментов", details: error.message });
  }
});

app.get("/api/operations", authMiddleware, async (_req, res) => {
  try {
    const rows = await all(
      `SELECT
         o.id,
         o.operation_type AS operationType,
         o.operation_at AS operationAt,
         i.name AS instrumentName,
         i.inventory_number AS inventoryNumber,
         e.full_name AS employeeName
       FROM operations o
       JOIN instruments i ON i.id = o.instrument_id
       JOIN employees e ON e.id = o.employee_id
       ORDER BY o.operation_at DESC`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения операций", details: error.message });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// If /api route is not found, return JSON (avoid index.html being parsed as JSON on frontend)
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API endpoint не найден" });
});

// Static site hosting (put AFTER API routes)
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
