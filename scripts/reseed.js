/**
 * Полное пересоздание демо-данных.
 * Запуск: npm run db:reseed  (остановите сервер npm start, если файл БД занят)
 */
process.env.FORCE_SEED = "1";

const { initDatabase, db, all } = require("../db");

initDatabase()
  .then(async () => {
    const counts = await all(`
      SELECT 'instruments' AS t, COUNT(*) AS c FROM instruments
      UNION SELECT 'employees', COUNT(*) FROM employees
      UNION SELECT 'verifications', COUNT(*) FROM verifications
      UNION SELECT 'orders', COUNT(*) FROM orders
      UNION SELECT 'warehouse_stock', COUNT(*) FROM warehouse_stock
      UNION SELECT 'documents', COUNT(*) FROM documents
      UNION SELECT 'notifications', COUNT(*) FROM notifications
    `);
    console.log("Демо-данные загружены:");
    counts.forEach((r) => console.log(`  ${r.t}: ${r.c}`));
    console.log("\nУчётные записи:");
    console.log("  ИРК:     irk_user / irk123");
    console.log("  Склад:   warehouse_user / warehouse123");
    console.log("  Лаб.:    lab_user / lab123");
    db.close();
  })
  .catch((err) => {
    console.error("Ошибка загрузки:", err.message);
    console.error("Подсказка: остановите сервер (npm start) и повторите npm run db:reseed");
    process.exit(1);
  });
