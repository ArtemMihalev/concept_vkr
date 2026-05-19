import { useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

const ITEMS = [
  { id: 1, name: "Набор ключей гаечных 6-32мм", category: "Слесарный инструмент", quantity: 45, minQuantity: 20, unit: "шт", location: "Стеллаж А-12", supplier: "ИнструментСнаб" },
  { id: 2, name: "Дрель электрическая ДЭ-16", category: "Электроинструмент", quantity: 12, minQuantity: 5, unit: "шт", location: "Стеллаж Б-3", supplier: "ТехноТорг" },
  { id: 3, name: "Сверло по металлу 8мм", category: "Режущий инструмент", quantity: 3, minQuantity: 10, unit: "шт", location: "Ячейка В-45", supplier: "МеталлИнструмент" },
  { id: 4, name: "Молоток слесарный 500г", category: "Слесарный инструмент", quantity: 28, minQuantity: 15, unit: "шт", location: "Стеллаж А-8", supplier: "ИнструментСнаб" },
  { id: 5, name: "Угловая шлифмашина УШМ-125", category: "Электроинструмент", quantity: 8, minQuantity: 4, unit: "шт", location: "Стеллаж Б-7", supplier: "ТехноТорг" }
];

export function InventoryList() {
  const [search, setSearch] = useState("");

  const filtered = ITEMS.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Складской учет</h2>
          <p className="text-gray-600 mt-1">Управление складскими запасами</p>
        </div>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] transition-colors">
          <Plus className="w-5 h-5" />
          Добавить позицию
        </button>
      </div>
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
      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Наименование</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Категория</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Количество</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Мин. остаток</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Местоположение</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Поставщик</th>
              <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{item.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">{item.category}</div>
                </td>
                <td className="px-6 py-4">
                  <div className={`text-sm ${item.quantity < item.minQuantity ? "text-red-600" : "text-gray-900"}`}>
                    {item.quantity} {item.unit}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">
                    {item.minQuantity} {item.unit}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">{item.location}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">{item.supplier}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button type="button" className="text-[#0d9488] hover:text-[#0f766e]">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button type="button" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
