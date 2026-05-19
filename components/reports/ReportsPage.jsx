import { useState } from "react";
import { BarChart3, Calendar, FileText, TrendingUp } from "lucide-react";
import { TabSelector } from "../shared/TabSelector.jsx";
import { InventoryReport } from "./InventoryReport.jsx";
import { MovementsReport } from "./MovementsReport.jsx";
import { VerificationReport } from "./VerificationReport.jsx";
import { AnalyticsReport } from "./AnalyticsReport.jsx";

const REPORT_TABS = [
  { id: "inventory", name: "Инвентаризация", icon: FileText },
  { id: "movements", name: "Движение инструментов", icon: TrendingUp },
  { id: "verification", name: "График поверок", icon: Calendar },
  { id: "analytics", name: "Аналитика", icon: BarChart3 }
];

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState("inventory");

  function renderReport() {
    switch (activeTab) {
      case "inventory":
        return <InventoryReport />;
      case "movements":
        return <MovementsReport />;
      case "verification":
        return <VerificationReport />;
      case "analytics":
        return <AnalyticsReport />;
      default:
        return <InventoryReport />;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Отчеты</h2>
        <p className="text-gray-600 mt-1">Формирование отчетности и аналитики</p>
      </div>
      <TabSelector tabs={REPORT_TABS} activeId={activeTab} onChange={setActiveTab} />
      {renderReport()}
    </div>
  );
}
