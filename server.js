const path = require("path");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { initDatabase, get, all } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

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
