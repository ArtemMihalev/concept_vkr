import { useState } from "react";
import { Check, Package } from "lucide-react";
import { useFetch } from "../api/useFetch.js";
import { api } from "../api/client.js";
import { ORDER_STATUS, formatDate } from "../shared/statusMaps.js";

export function OrdersList() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [documentBasis, setDocumentBasis] = useState("");
  const [message, setMessage] = useState("");

  const query = statusFilter === "all" ? "/api/orders" : `/api/orders?status=${statusFilter}`;
  const { data: orders, loading, reload } = useFetch(query, { deps: [statusFilter] });

  const selected = (orders || []).find((o) => o.id === selectedId);

  async function handleReserve() {
    if (!selectedId) return;
    try {
      await api.post(`/api/orders/${selectedId}/reserve`);
      setMessage("Резерв сформирован, статус: в обработке");
      reload();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Ошибка");
    }
  }

  async function handleTransfer() {
    if (!selectedId || !documentBasis.trim()) {
      setMessage("Укажите документ-основание");
      return;
    }
    try {
      await api.patch(`/api/orders/${selectedId}/status`, {
        status: "transferred",
        documentBasis: documentBasis.trim()
      });
      setMessage("Передача подтверждена, остатки на складе уменьшены");
      setDocumentBasis("");
      reload();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Ошибка");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Заказы</h2>
        <p className="text-gray-600 mt-1">Заявки от ИРК на пополнение инструмента</p>
      </div>

      {message && <p className="text-sm bg-[#f0fdfa] border border-[#0d9488] px-4 py-2">{message}</p>}

      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "Все" },
          { id: "new", label: "Новые" },
          { id: "processing", label: "В обработке" },
          { id: "transferred", label: "Передан" },
          { id: "received", label: "Получен" }
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setStatusFilter(f.id)}
            className={`px-3 py-1.5 text-sm border ${
              statusFilter === f.id ? "bg-[#0d9488] text-white border-[#0d9488]" : "border-gray-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200">
          {loading ? (
            <p className="p-6 text-gray-600">Загрузка...</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {(orders || []).map((order) => {
                const badge = ORDER_STATUS[order.status] || ORDER_STATUS.new;
                return (
                  <li key={order.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(order.id)}
                      className={`w-full text-left px-6 py-4 hover:bg-gray-50 ${selectedId === order.id ? "bg-[#f0fdfa]" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">{order.orderNumber}</span>
                        <span className={`px-2 py-1 text-xs ${badge.className}`}>{badge.text}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatDate(order.createdAt)} • {order.workshop}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="bg-white border border-gray-200 p-6">
          {selected ? (
            <>
              <h3 className="text-lg text-gray-900 mb-4">Заявка {selected.orderNumber}</h3>
              <p className="text-sm text-gray-600 mb-4">Цех: {selected.workshop}</p>
              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="pb-2">Позиция</th>
                    <th className="pb-2">Запрошено</th>
                    <th className="pb-2">Резерв</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.items.map((item) => (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="py-2">{item.name}</td>
                      <td className="py-2">{item.quantityRequested}</td>
                      <td className="py-2">{item.quantityReserved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {selected.status === "new" && (
                <button
                  type="button"
                  onClick={handleReserve}
                  className="flex items-center gap-2 px-4 py-2 border border-[#0d9488] text-[#0d9488] hover:bg-[#f0fdfa] mb-3"
                >
                  <Package className="w-4 h-4" />
                  Проверить наличие и зарезервировать
                </button>
              )}

              {(selected.status === "new" || selected.status === "processing") && (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Документ-основание (накладная)"
                    value={documentBasis}
                    onChange={(e) => setDocumentBasis(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={handleTransfer}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e]"
                  >
                    <Check className="w-4 h-4" />
                    Подтвердить передачу в ИРК
                  </button>
                </div>
              )}

              {selected.status === "transferred" && (
                <p className="text-sm text-gray-600">
                  Передано. Документ: {selected.documentBasis || "—"}. Ожидается подтверждение получения в ИРК.
                </p>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-sm">Выберите заявку из списка</p>
          )}
        </div>
      </div>
    </div>
  );
}
