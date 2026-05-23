import { useState } from "react";
import { Search } from "lucide-react";
import { useFetch } from "../api/useFetch.js";
import { formatDate } from "../shared/statusMaps.js";

const TYPE_LABELS = {
  transfer_to_irk: { text: "Передача в ИРК", className: "bg-[#e0f2f1] text-[#0d9488]" },
  receipt: { text: "Поступление", className: "bg-gray-100 text-gray-700" },
  issue: { text: "Выдача", className: "bg-blue-50 text-blue-700" }
};

export function WarehouseMovements() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [workshop, setWorkshop] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const query = `/api/warehouse/movements?type=${typeFilter}${workshop !== "all" ? `&workshop=${encodeURIComponent(workshop)}` : ""}${dateFrom ? `&dateFrom=${dateFrom}` : ""}${dateTo ? `&dateTo=${dateTo}` : ""}`;
  const { data, loading } = useFetch(query, { deps: [query] });

  const filtered = (data || []).filter(
    (row) =>
      row.itemName.toLowerCase().includes(search.toLowerCase()) ||
      row.workshop.toLowerCase().includes(search.toLowerCase())
  );

  const workshops = [...new Set((data || []).map((r) => r.workshop))];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Движение инструментов</h2>
        <p className="text-gray-600 mt-1">История операций склад ↔ ИРК</p>
      </div>

      <div className="bg-white border border-gray-200 p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["all", "transfer_to_irk", "receipt"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 text-sm border ${
                typeFilter === t ? "bg-[#0d9488] text-white border-[#0d9488]" : "border-gray-300"
              }`}
            >
              {t === "all" ? "Все типы" : TYPE_LABELS[t]?.text || t}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <select value={workshop} onChange={(e) => setWorkshop(e.target.value)} className="border border-gray-300 px-3 py-2 text-sm">
            <option value="all">Все цеха</option>
            {workshops.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border border-gray-300 px-3 py-2 text-sm" />
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border border-gray-300 px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-x-auto">
        {loading ? (
          <p className="p-6 text-gray-600">Загрузка...</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Дата</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Тип</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Наименование</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Кол-во</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Цех</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Документ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row) => {
                const meta = TYPE_LABELS[row.movementType] || { text: row.movementType, className: "bg-gray-100" };
                return (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{formatDate(row.movementAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs ${meta.className}`}>{meta.text}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.itemName}</td>
                    <td className="px-6 py-4 text-sm">{row.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.workshop}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.documentBasis || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
