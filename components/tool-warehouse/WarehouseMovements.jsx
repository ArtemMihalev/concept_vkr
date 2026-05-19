import { useState } from "react";
import { ArrowRightLeft, ArrowUp, Package, Search } from "lucide-react";

const MOVEMENTS = [
  { id: 1, date: "09.04.2026", time: "11:20", type: "issue", item: "Набор ключей гаечных 6-32мм", quantity: 2, department: "Цех №3", employee: "Сергеев А.П." },
  { id: 2, date: "09.04.2026", time: "11:05", type: "return", item: "Дрель электрическая ДЭ-16", quantity: 1, department: "Цех №1", employee: "Кузнецов В.И." },
  { id: 3, date: "09.04.2026", time: "10:30", type: "receipt", item: "Молоток слесарный 500г", quantity: 20, department: "Склад", employee: "Система" },
  { id: 4, date: "09.04.2026", time: "10:15", type: "issue", item: "Угловая шлифмашина УШМ-125", quantity: 3, department: "Цех №2", employee: "Николаев М.С." },
  { id: 5, date: "08.04.2026", time: "16:40", type: "return", item: "Молоток слесарный 500г", quantity: 2, department: "Цех №3", employee: "Сергеев А.П." }
];

function typeMeta(type) {
  const map = {
    issue: { text: "Выдача", className: "bg-[#e0f2f1] text-[#0d9488]", icon: ArrowRightLeft },
    return: { text: "Возврат", className: "bg-blue-50 text-blue-700", icon: ArrowUp },
    receipt: { text: "Поступление", className: "bg-gray-100 text-gray-700", icon: Package }
  };
  return map[type];
}

export function WarehouseMovements() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = MOVEMENTS.filter((row) => {
    const matchesSearch =
      row.item.toLowerCase().includes(search.toLowerCase()) ||
      row.employee.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || row.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Движения инструментов</h2>
        <p className="text-gray-600 mt-1">История перемещений товарно-материальных ценностей</p>
      </div>
      <div className="bg-white border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по наименованию или сотруднику..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
            />
          </div>
          <div className="flex gap-2">
            {[
              { id: "all", label: "Все" },
              { id: "issue", label: "Выдача" },
              { id: "return", label: "Возврат" }
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
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Дата и время</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Тип операции</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Наименование</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Количество</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Подразделение</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Сотрудник</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((row) => {
              const meta = typeMeta(row.type);
              const Icon = meta.icon;
              return (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{row.date}</div>
                    <div className="text-sm text-gray-500">{row.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs ${meta.className}`}>
                      <Icon className="w-3 h-3" />
                      {meta.text}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{row.item}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{row.quantity} шт.</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{row.department}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{row.employee}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
