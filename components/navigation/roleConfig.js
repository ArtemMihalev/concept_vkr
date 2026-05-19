import {
  LayoutDashboard,
  Package,
  ArrowRightLeft,
  FileText,
  Archive,
  FlaskConical,
  ClipboardCheck
} from "lucide-react";

/** @typedef {"irk" | "tool-warehouse" | "laboratory"} UserRole */

/**
 * @param {UserRole | null} role
 * @returns {{ title: string; userName: string; tabs: { id: string; name: string; icon: import("lucide-react").LucideIcon }[] }}
 */
export function getShellConfig(role) {
  switch (role) {
    case "irk":
      return {
        title: "ИС Учета Инструментов ИРК",
        userName: "Кладовщик ИРК",
        tabs: [
          { id: "dashboard", name: "Панель управления", icon: LayoutDashboard },
          { id: "instruments", name: "Инструменты", icon: Package },
          { id: "operations", name: "Операции", icon: ArrowRightLeft },
          { id: "reports", name: "Отчеты", icon: FileText }
        ]
      };
    case "tool-warehouse":
      return {
        title: "Инструментальный склад",
        userName: "Кладовщик склада",
        tabs: [
          { id: "dashboard", name: "Обзор склада", icon: LayoutDashboard },
          { id: "inventory", name: "Складской учет", icon: Archive },
          { id: "operations", name: "Движения", icon: ArrowRightLeft },
          { id: "reports", name: "Отчеты", icon: FileText }
        ]
      };
    case "laboratory":
      return {
        title: "Метрологическая лаборатория",
        userName: "Лаборант",
        tabs: [
          { id: "dashboard", name: "Обзор", icon: ClipboardCheck },
          { id: "verifications", name: "Поверки", icon: Package },
          { id: "reports", name: "Отчеты", icon: FileText }
        ]
      };
    default:
      return { title: "", userName: "", tabs: [] };
  }
}
