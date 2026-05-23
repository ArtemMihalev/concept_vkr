import { useState } from "react";
import { FileText, Package, Send } from "lucide-react";
import { TabSelector } from "../shared/TabSelector.jsx";
import { useFetch } from "../api/useFetch.js";
import { api } from "../api/client.js";
import { formatDate } from "../shared/statusMaps.js";

const TABS = [
  { id: "inventory", name: "Инвентаризация", icon: FileText },
  { id: "vouchers", name: "Вещевые квитанции", icon: Send },
  { id: "replenishment", name: "Заявки на пополнение", icon: Package }
];

export function IrkDocuments() {
  const [activeTab, setActiveTab] = useState("inventory");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [replenishItems, setReplenishItems] = useState([{ name: "", quantity: 1 }]);

  const docType =
    activeTab === "inventory"
      ? "inventory_report"
      : activeTab === "vouchers"
        ? "receipt_voucher"
        : "replenishment_request";

  const { data: documents, reload } = useFetch(`/api/documents?targetRole=irk&docType=${docType}`, {
    deps: [docType]
  });
  const { data: stock } = useFetch(activeTab === "replenishment" ? "/api/instruments?toolType=locksmith" : null);
  const { data: incomingOrders, reload: reloadOrders } = useFetch("/api/orders?status=transferred");

  async function generateInventory() {
    setBusy(true);
    try {
      await api.post("/api/documents/inventory-report");
      setMessage("Отчёт инвентаризации сформирован");
      reload();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setBusy(false);
    }
  }

  async function submitReplenishment() {
    const items = replenishItems.filter((i) => i.name && i.quantity > 0);
    if (items.length === 0) {
      setMessage("Добавьте позиции в заявку");
      return;
    }
    setBusy(true);
    try {
      await api.post("/api/documents/replenishment-request", { items });
      setMessage("Заявка на пополнение отправлена на склад");
      setReplenishItems([{ name: "", quantity: 1 }]);
      reload();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setBusy(false);
    }
  }

  function addLowStock() {
    const low = (stock || []).filter((s) => s.stockQuantity < s.totalQuantity * 0.3);
    setReplenishItems(
      low.map((s) => ({
        name: s.name,
        quantity: Math.max(1, s.totalQuantity - s.stockQuantity)
      }))
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Документы</h2>
        <p className="text-gray-600 mt-1">Отчёты, квитанции и заявки</p>
      </div>
      <TabSelector tabs={TABS} activeId={activeTab} onChange={setActiveTab} />

      {message && (
        <p className="text-sm bg-[#f0fdfa] border border-[#0d9488] px-4 py-2 text-gray-800">{message}</p>
      )}

      {activeTab === "inventory" && (
        <div className="bg-white border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-4">Сформировать отчёт по текущим остаткам ИРК</p>
          <button
            type="button"
            disabled={busy}
            onClick={generateInventory}
            className="px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] disabled:opacity-60"
          >
            Сформировать отчёт инвентаризации
          </button>
        </div>
      )}

      {activeTab === "replenishment" && (
        <div className="bg-white border border-gray-200 p-6 space-y-4">
          <button type="button" onClick={addLowStock} className="text-sm text-[#0d9488] hover:underline">
            Заполнить по низким остаткам
          </button>
          {replenishItems.map((item, idx) => (
            <div key={idx} className="flex gap-3">
              <input
                type="text"
                value={item.name}
                onChange={(e) => {
                  const next = [...replenishItems];
                  next[idx].name = e.target.value;
                  setReplenishItems(next);
                }}
                placeholder="Наименование"
                className="flex-1 border border-gray-300 px-3 py-2"
              />
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => {
                  const next = [...replenishItems];
                  next[idx].quantity = Number(e.target.value);
                  setReplenishItems(next);
                }}
                className="w-24 border border-gray-300 px-3 py-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setReplenishItems([...replenishItems, { name: "", quantity: 1 }])}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            + Позиция
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={submitReplenishment}
            className="px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e]"
          >
            Отправить заявку на склад
          </button>
        </div>
      )}

      {(incomingOrders || []).length > 0 && (
        <div className="bg-white border border-[#0d9488] p-6">
          <h3 className="text-gray-900 mb-4">Поступления со склада (ожидают подтверждения)</h3>
          <ul className="space-y-3">
            {incomingOrders.map((order) => (
              <li key={order.id} className="flex items-center justify-between border border-gray-100 p-3">
                <div>
                  <p className="text-sm text-gray-900">
                    {order.orderNumber} — {order.workshop}
                  </p>
                  <p className="text-xs text-gray-500">{order.documentBasis}</p>
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={async () => {
                    setBusy(true);
                    try {
                      await api.patch(`/api/orders/${order.id}/status`, { status: "received" });
                      setMessage(`Получение по заявке ${order.orderNumber} подтверждено`);
                      reloadOrders();
                    } catch (err) {
                      setMessage(err instanceof Error ? err.message : "Ошибка");
                    } finally {
                      setBusy(false);
                    }
                  }}
                  className="text-sm px-3 py-1 bg-[#0d9488] text-white"
                >
                  Подтвердить получение
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-gray-900">Сформированные документы</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {(documents || []).map((doc) => (
            <li key={doc.id} className="px-6 py-4">
              <p className="text-sm text-gray-900">{doc.title}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(doc.createdAt)} • {doc.status}
                {doc.targetRole && ` → ${doc.targetRole}`}
              </p>
            </li>
          ))}
          {(documents || []).length === 0 && (
            <li className="px-6 py-8 text-center text-sm text-gray-500">Документов пока нет</li>
          )}
        </ul>
      </div>
    </div>
  );
}
