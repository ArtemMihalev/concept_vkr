import { useState } from "react";
import { CircleCheckBig, ClipboardList, Plus, Search } from "lucide-react";

const VERIFICATIONS = [
  { id: 1, instrument: "Штангенциркуль ШЦ-I-150", invNumber: "ИН-001234", type: "Плановая", status: "in-progress", startDate: "08.04.2026", technician: "Смирнов А.В." },
  { id: 2, instrument: "Микрометр МК-25", invNumber: "ИН-001235", type: "Плановая", status: "completed", startDate: "05.04.2026", endDate: "07.04.2026", result: "Годен", technician: "Петрова Е.И." },
  { id: 3, instrument: "Калибр-пробка", invNumber: "ИН-001236", type: "Внеплановая", status: "in-progress", startDate: "09.04.2026", technician: "Смирнов А.В." },
  { id: 4, instrument: "Манометр МП-100", invNumber: "ИН-001240", type: "Плановая", status: "scheduled", startDate: "10.04.2026", technician: "Петрова Е.И." },
  { id: 5, instrument: "Индикатор ИЧ-10", invNumber: "ИН-001237", type: "Плановая", status: "failed", startDate: "03.04.2026", endDate: "05.04.2026", result: "Не годен", technician: "Смирнов А.В." }
];

function statusBadge(status) {
  const map = {
    scheduled: { text: "Запланирована", className: "bg-blue-50 text-blue-700" },
    "in-progress": { text: "В процессе", className: "bg-[#e0f2f1] text-[#0d9488]" },
    completed: { text: "Завершена", className: "bg-green-50 text-green-700" },
    failed: { text: "Не пройдена", className: "bg-red-50 text-red-700" }
  };
  return map[status];
}

export function VerificationsList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = VERIFICATIONS.filter((item) => {
    const matchesSearch =
      item.instrument.toLowerCase().includes(search.toLowerCase()) ||
      item.invNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Поверки</h2>
          <p className="text-gray-600 mt-1">Управление процессом поверки приборов</p>
        </div>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] transition-colors">
          <Plus className="w-5 h-5" />
          Запланировать поверку
        </button>
      </div>
      <div className="bg-white border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по прибору или инв. номеру..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
            />
          </div>
          <div className="flex gap-2">
            {[
              { id: "all", label: "Все" },
              { id: "in-progress", label: "В процессе" },
              { id: "scheduled", label: "Запланированные" }
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setStatusFilter(btn.id)}
                className={`px-4 py-2 border ${
                  statusFilter === btn.id
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
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Прибор</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Инв. номер</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Тип</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Статус</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Дата начала</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Результат</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Ответственный</th>
              <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((item) => {
              const badge = statusBadge(item.status);
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{item.instrument}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{item.invNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{item.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs ${badge.className}`}>{badge.text}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{item.startDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{item.result || "—"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{item.technician}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" className="text-[#0d9488] hover:text-[#0f766e]">
                        <ClipboardList className="w-4 h-4" />
                      </button>
                      {item.status === "in-progress" && (
                        <button type="button" className="text-green-600 hover:text-green-700">
                          <CircleCheckBig className="w-4 h-4" />
                        </button>
                      )}
                    </div>
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
