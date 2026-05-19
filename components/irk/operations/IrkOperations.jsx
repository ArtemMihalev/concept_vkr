import { useState } from "react";
import { ArrowRightLeft, ArrowUp, Package, Trash2 } from "lucide-react";
import { TabSelector } from "../../shared/TabSelector.jsx";
import { IssueForm } from "./IssueForm.jsx";
import { ReturnForm } from "./ReturnForm.jsx";
import { ReceiptForm } from "./ReceiptForm.jsx";
import { WriteoffForm } from "./WriteoffForm.jsx";

const OPERATION_TABS = [
  { id: "issue", name: "Выдача инструмента", icon: ArrowRightLeft },
  { id: "return", name: "Возврат инструмента", icon: ArrowUp },
  { id: "receipt", name: "Поступление", icon: Package },
  { id: "writeoff", name: "Списание", icon: Trash2 }
];

export function IrkOperations() {
  const [activeTab, setActiveTab] = useState("issue");

  function renderForm() {
    switch (activeTab) {
      case "issue":
        return <IssueForm />;
      case "return":
        return <ReturnForm />;
      case "receipt":
        return <ReceiptForm />;
      case "writeoff":
        return <WriteoffForm />;
      default:
        return <IssueForm />;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Операции</h2>
        <p className="text-gray-600 mt-1">Управление движением инструментов</p>
      </div>
      <TabSelector tabs={OPERATION_TABS} activeId={activeTab} onChange={setActiveTab} />
      <div className="bg-white border border-gray-200 p-6">{renderForm()}</div>
    </div>
  );
}
