import { useState } from "react";
import { useFetch } from "../../api/useFetch.js";
import { api } from "../../api/client.js";

const REASONS = [
  { id: "wear", label: "Износ" },
  { id: "damage", label: "Поломка" },
  { id: "loss", label: "Утрата" },
  { id: "unfit", label: "Непригоден" }
];

export function WriteoffForm() {
  const { data: instruments } = useFetch("/api/instruments");
  const [instrumentId, setInstrumentId] = useState("");
  const [reason, setReason] = useState("wear");
  const [documentBasis, setDocumentBasis] = useState("");
  const [message, setMessage] = useState("");

  const available = (instruments || []).filter((i) => i.status !== "written_off");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/api/operations/writeoff", {
        instrumentId: Number(instrumentId),
        reason,
        documentBasis
      });
      setMessage("Инструмент списан и исключён из учёта");
      setInstrumentId("");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Ошибка");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl text-gray-900">Списание</h3>
      <div>
        <label className="block text-sm text-gray-700 mb-1">Инструмент</label>
        <select
          value={instrumentId}
          onChange={(e) => setInstrumentId(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2"
          required
        >
          <option value="">Выберите...</option>
          {available.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name} {i.inventoryNumber ? `(${i.inventoryNumber})` : ""}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-1">Причина</label>
        <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full border border-gray-300 px-4 py-2">
          {REASONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>
      </div>
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
      {message && <p className="text-sm text-gray-700">{message}</p>}
      <button type="submit" className="px-6 py-2 bg-red-600 text-white hover:bg-red-700">
        Списать
      </button>
    </form>
  );
}
