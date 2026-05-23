import { useState } from "react";
import { useFetch } from "../../api/useFetch.js";
import { api } from "../../api/client.js";

export function ReturnForm() {
  const { data: employees } = useFetch("/api/employees");
  const [employeeId, setEmployeeId] = useState("");
  const { data: issued, reload } = useFetch(
    employeeId ? `/api/operations/issued/${employeeId}` : null,
    { deps: [employeeId] }
  );
  const [returns, setReturns] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const items = Object.entries(returns)
      .filter(([, v]) => v.checked)
      .map(([instrumentId, v]) => ({
        instrumentId: Number(instrumentId),
        quantity: 1,
        condition: v.condition
      }));
    if (items.length === 0) {
      setMessage("Отметьте возвращённые инструменты");
      return;
    }
    setLoading(true);
    try {
      await api.post("/api/operations/return", { employeeId: Number(employeeId), items });
      setMessage("Возврат принят");
      setReturns({});
      reload();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl text-gray-900">Возврат инструмента</h3>
      <div>
        <label className="block text-sm text-gray-700 mb-2">Сотрудник</label>
        <select
          value={employeeId}
          onChange={(e) => {
            setEmployeeId(e.target.value);
            setReturns({});
          }}
          className="w-full border border-gray-300 px-4 py-2"
          required
        >
          <option value="">Выберите...</option>
          {(employees || []).map((e) => (
            <option key={e.id} value={e.id}>
              {e.fullName}
            </option>
          ))}
        </select>
      </div>

      {employeeId && (
        <div className="space-y-3">
          <h4 className="text-sm text-gray-900">Выданный инструмент</h4>
          {(issued || []).map((item) => (
            <div key={item.id} className="flex flex-wrap items-center gap-4 p-3 bg-gray-50">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={returns[item.id]?.checked || false}
                  onChange={(e) =>
                    setReturns({
                      ...returns,
                      [item.id]: { ...returns[item.id], checked: e.target.checked, condition: "good" }
                    })
                  }
                />
                {item.name} ({item.inventoryNumber})
              </label>
              {returns[item.id]?.checked && (
                <select
                  value={returns[item.id]?.condition || "good"}
                  onChange={(e) =>
                    setReturns({ ...returns, [item.id]: { ...returns[item.id], condition: e.target.value } })
                  }
                  className="border border-gray-300 px-2 py-1 text-sm"
                >
                  <option value="good">Исправен</option>
                  <option value="damaged">Повреждён</option>
                </select>
              )}
            </div>
          ))}
          {(issued || []).length === 0 && <p className="text-sm text-gray-500">Нет выданного инструмента</p>}
        </div>
      )}

      {message && <p className="text-sm text-gray-700">{message}</p>}

      <button type="submit" disabled={loading} className="px-6 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e]">
        Принять возврат
      </button>
    </form>
  );
}
