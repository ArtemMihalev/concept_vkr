import { useState } from "react";
import { AlertCircle, Pencil, Plus, Search, Trash2 } from "lucide-react";

const INSTRUMENTS = [
  {
    id: 1,
    name: "Штангенциркуль ШЦ-I-150",
    type: "measuring",
    category: "Измерительный",
    invNumber: "ИН-001234",
    status: "available",
    location: "ИРК Цех №1",
    nextVerification: "15.04.2026"
  },
  {
    id: 2,
    name: "Микрометр МК-25",
    type: "measuring",
    category: "Измерительный",
    invNumber: "ИН-001235",
    status: "issued",
    location: "У рабочего: Иванов И.И.",
    nextVerification: "18.04.2026"
  },
  {
    id: 3,
    name: "Ключ гаечный 17мм",
    type: "locksmith",
    category: "Слесарно-монтажный",
    quantity: 25,
    status: "available",
    location: "ИРК Цех №1"
  },
  {
    id: 4,
    name: "Отвертка шлицевая 5мм",
    type: "locksmith",
    category: "Слесарно-монтажный",
    quantity: 5,
    status: "low-stock",
    location: "ИРК Цех №1"
  },
  {
    id: 5,
    name: "Калибр-пробка",
    type: "measuring",
    category: "Измерительный",
    invNumber: "ИН-001236",
    status: "verification",
    location: "Метрологическая лаборатория",
    nextVerification: "20.04.2026"
  }
];

function statusBadge(status) {
  const map = {
    available: { text: "В наличии", className: "bg-green-50 text-green-700" },
    issued: { text: "Выдан", className: "bg-[#e0f2f1] text-[#0d9488]" },
    verification: { text: "На поверке", className: "bg-yellow-50 text-yellow-700" },
    "low-stock": { text: "Мало остатков", className: "bg-red-50 text-red-700" }
  };
  return map[status];
}

export function InstrumentsList() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = INSTRUMENTS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Инструменты</h2>
          <p className="text-gray-600 mt-1">Управление каталогом инструментов</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Добавить инструмент
        </button>
      </div>

      <div className="bg-white border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по наименованию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
            />
          </div>
          <div className="flex gap-2">
            {[
              { id: "all", label: "Все" },
              { id: "measuring", label: "Измерительный" },
              { id: "locksmith", label: "Слесарный" }
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setTypeFilter(btn.id)}
                className={`px-4 py-2 border ${
                  typeFilter === btn.id
                    ? "bg-[#0d9488] text-white border-[#0d9488]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Наименование</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Категория</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Инв. номер / Кол-во</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Статус</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Местонахождение</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Поверка</th>
              <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((item) => {
              const badge = statusBadge(item.status);
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{item.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.invNumber || `${item.quantity} шт.`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs ${badge.className}`}>{badge.text}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{item.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{item.nextVerification || "—"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
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
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-[#f0fdfa] border border-[#0d9488] p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[#0d9488] flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-gray-900">Всего инструментов: {INSTRUMENTS.length}</p>
          <p className="text-sm text-gray-700 mt-1">
            В наличии: {INSTRUMENTS.filter((d) => d.status === "available").length} • Выдано:{" "}
            {INSTRUMENTS.filter((d) => d.status === "issued").length} • На поверке:{" "}
            {INSTRUMENTS.filter((d) => d.status === "verification").length}
          </p>
        </div>
      </div>
    </div>
  );
}
