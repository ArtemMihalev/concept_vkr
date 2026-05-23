import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useFetch } from "../../api/useFetch.js";
import { api } from "../../api/client.js";

export function IssueForm() {
  const { data: employees } = useFetch("/api/employees");
  const { data: instruments } = useFetch("/api/instruments?status=available");
  const [employeeId, setEmployeeId] = useState("");
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function addInstrument(inst) {
    if (selected.some((s) => s.instrumentId === inst.id)) return;
    setSelected([
      ...selected,
      {
        instrumentId: inst.id,
        name: inst.name,
        inventoryNumber: inst.inventoryNumber,
        toolType: inst.toolType,
        quantity: 1,
        maxQty: inst.stockQuantity
      }
    ]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!employeeId || selected.length === 0) {
      setMessage("Выберите сотрудника и инструменты");
      return;
    }
    setLoading(true);
    try {
      await api.post("/api/operations/issue", {
        employeeId: Number(employeeId),
        items: selected.map((s) => ({ instrumentId: s.instrumentId, quantity: s.quantity }))
      });
      setMessage("Инструменты выданы");
      setSelected([]);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl text-gray-900">Выдача инструмента</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Сотрудник</label>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2"
            required
          >
            <option value="">Выберите...</option>
            {(employees || []).map((e) => (
              <option key={e.id} value={e.id}>
                {e.fullName} — {e.position}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Добавить из каталога</label>
          <select
            defaultValue=""
            onChange={(e) => {
              const inst = (instruments || []).find((i) => String(i.id) === e.target.value);
              if (inst) addInstrument(inst);
              e.target.value = "";
            }}
            className="w-full border border-gray-300 px-4 py-2"
          >
            <option value="">Выберите инструмент...</option>
            {(instruments || []).map((i) => (
              <option key={i.id} value={i.id}>
                {i.name} {i.toolType === "measuring" ? `(${i.inventoryNumber})` : `— остаток ${i.stockQuantity}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selected.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm text-gray-900">Выбранные позиции</h4>
          {selected.map((item) => (
            <div key={item.instrumentId} className="flex items-center justify-between p-3 bg-gray-50">
              <div>
                <p className="text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.toolType === "measuring" ? `Инв. ${item.inventoryNumber}` : "Слесарный"}
                </p>
              </div>
              {item.toolType === "locksmith" && (
                <input
                  type="number"
                  min={1}
                  max={item.maxQty}
                  value={item.quantity}
                  onChange={(e) =>
                    setSelected(
                      selected.map((s) =>
                        s.instrumentId === item.instrumentId
                          ? { ...s, quantity: Number(e.target.value) }
                          : s
                      )
                    )
                  }
                  className="w-16 border border-gray-300 px-2 py-1"
                />
              )}
              <button type="button" onClick={() => setSelected(selected.filter((s) => s.instrumentId !== item.instrumentId))}>
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      )}

      {message && <p className="text-sm text-gray-700">{message}</p>}

      <div className="flex justify-end gap-4">
        <button type="submit" disabled={loading} className="px-6 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] disabled:opacity-60">
          {loading ? "Выдача..." : "Выдать инструменты"}
        </button>
      </div>
    </form>
  );
}
