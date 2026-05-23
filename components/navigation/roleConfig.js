import {
  LayoutDashboard,
  Package,
  ArrowRightLeft,
  FileText,
  Archive,
  FlaskConical,
  ClipboardCheck,
  BookOpen,
  ShoppingCart,
  History
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
        title: "ИС Учёта Инструментов ИРК",
        userName: "Кладовщик ИРК",
        tabs: [
          { id: "dashboard", name: "Информационная панель", icon: LayoutDashboard },
          { id: "instruments", name: "Инструменты", icon: Package },
          { id: "operations", name: "Операции", icon: ArrowRightLeft },
          { id: "metrology", name: "Метрология", icon: FlaskConical },
          { id: "documents", name: "Документы", icon: FileText }
        ]
      };
    case "tool-warehouse":
      return {
        title: "Инструментальный склад",
        userName: "Кладовщик склада",
        tabs: [
          { id: "inventory", name: "Складской учёт", icon: Archive },
          { id: "orders", name: "Заказы", icon: ShoppingCart },
          { id: "movements", name: "Движение инструментов", icon: History }
        ]
      };
    case "laboratory":
      return {
        title: "Метрологическая лаборатория",
        userName: "Лаборант",
        tabs: [
          { id: "dashboard", name: "Информационная панель", icon: LayoutDashboard },
          { id: "verifications", name: "Обзор поверок", icon: ClipboardCheck },
          { id: "journal", name: "Журнал поверок", icon: BookOpen },
          { id: "documents", name: "Документы", icon: FileText }
        ]
      };
    default:
      return { title: "", userName: "", tabs: [] };
  }
}

/** @param {UserRole} role */
export function getDefaultTab(role) {
  if (role === "tool-warehouse") return "inventory";
  return "dashboard";
}
