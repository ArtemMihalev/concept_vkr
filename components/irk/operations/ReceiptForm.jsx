import { useState } from "react";
import { api } from "../../api/client.js";

export function ReceiptForm() {
  const [documentBasis, setDocumentBasis] = useState("");
  const [operationDate, setOperationDate] = useState(new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState([{ name: "", category: "Слесарно-монтажный", quantity: 1 }]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/operations/receipt", { documentBasis, operationDate, items });
      setMessage("Поступление оформлено");
      setItems([{ name: "", category: "Слесарно-монтажный", quantity: 1 }]);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl text-gray-900">Поступление</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Документ-основание</label>
          <input
            type="text"
            value={documentBasis}
            onChange={(e) => setDocumentBasis(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Дата</label>
          <input
            type="date"
            value={operationDate}
            onChange={(e) => setOperationDate(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2"
            required
          />
        </div>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <input
              type="text"
              placeholder="Наименование"
              value={item.name}
              onChange={(e) => {
                const next = [...items];
                next[idx].name = e.target.value;
                setItems(next);
              }}
              className="flex-1 border border-gray-300 px-3 py-2"
              required
            />
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => {
                const next = [...items];
                next[idx].quantity = Number(e.target.value);
                setItems(next);
              }}
              className="w-24 border border-gray-300 px-3 py-2"
            />
          </div>
        ))}
        <button type="button" onClick={() => setItems([...items, { name: "", category: "Слесарно-монтажный", quantity: 1 }])} className="text-sm text-[#0d9488]">
          + Позиция
        </button>
      </div>
      {message && <p className="text-sm">{message}</p>}
      <button type="submit" disabled={loading} className="px-6 py-2 bg-[#0d9488] text-white">
        Оформить поступление
      </button>
    </form>
  );
}
