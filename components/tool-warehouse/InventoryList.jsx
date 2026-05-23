import { useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useFetch } from "../api/useFetch.js";
import { api } from "../api/client.js";

const EMPTY_FORM = { name: "", category: "", quantity: 0, minQuantity: 0, location: "" };

export function InventoryList() {
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState("");

  const { data, loading, reload } = useFetch("/api/warehouse/stock");

  const filtered = (data || []).filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  async function handleSave(e) {
    e.preventDefault();
    try {
      if (form.id) {
        await api.put(`/api/warehouse/stock/${form.id}`, form);
      } else {
        await api.post("/api/warehouse/stock", form);
      }
      setForm(null);
      setMessage("Сохранено");
      reload();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Ошибка");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Удалить позицию?")) return;
    await api.delete(`/api/warehouse/stock/${id}`);
    reload();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl text-gray-900">Складской учёт</h2>
          <p className="text-gray-600 mt-1">Перечень инструмента на складе</p>
        </div>
        <button
          type="button"
          onClick={() => setForm({ ...EMPTY_FORM })}
          className="flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e]"
        >
          <Plus className="w-5 h-5" />
          Добавить позицию
        </button>
      </div>

      {message && <p className="text-sm text-gray-700">{message}</p>}

      <div className="bg-white border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по наименованию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-x-auto">
        {loading ? (
          <p className="p-6">Загрузка...</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Наименование</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Категория</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Количество</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Место</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                  <td className={`px-6 py-4 text-sm ${item.quantity < item.minQuantity ? "text-red-600" : ""}`}>
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.location}</td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" onClick={() => setForm({ ...item })} className="text-[#0d9488] mr-2">
                      <Pencil className="w-4 h-4 inline" />
                    </button>
                    <button type="button" onClick={() => handleDelete(item.id)} className="text-red-600">
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {form && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSave} className="w-full max-w-md bg-white border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg">{form.id ? "Редактировать" : "Новая позиция"}</h3>
            {["name", "category", "location"].map((field) => (
              <input
                key={field}
                required
                placeholder={field}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2"
              />
            ))}
            <input
              type="number"
              min={0}
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
              className="w-full border border-gray-300 px-3 py-2"
              placeholder="Количество"
            />
            <input
              type="number"
              min={0}
              value={form.minQuantity}
              onChange={(e) => setForm({ ...form, minQuantity: Number(e.target.value) })}
              className="w-full border border-gray-300 px-3 py-2"
              placeholder="Мин. остаток"
            />
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setForm(null)} className="px-4 py-2 border border-gray-300">
                Отмена
              </button>
              <button type="submit" className="px-4 py-2 bg-[#0d9488] text-white">
                Сохранить
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
