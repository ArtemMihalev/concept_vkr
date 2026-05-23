import { useState } from "react";
import { Download, Search } from "lucide-react";
import { useFetch } from "../api/useFetch.js";
import { formatDate } from "../shared/statusMaps.js";

export function VerificationJournal() {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const query = `/api/verifications?archive=true${search ? `&search=${encodeURIComponent(search)}` : ""}${dateFrom ? `&dateFrom=${dateFrom}` : ""}${dateTo ? `&dateTo=${dateTo}` : ""}`;
  const { data, loading } = useFetch(query, { deps: [query] });

  function exportCsv() {
    const rows = data || [];
    const header = "Дата;Инструмент;Инв.номер;Результат;Причина брака;Лаборант\n";
    const body = rows
      .map(
        (r) =>
          `${formatDate(r.endDate || r.startDate)};${r.instrumentName};${r.inventoryNumber};${r.resultLabel || ""};${r.failReason || ""};${r.labUserName || ""}`
      )
      .join("\n");
    const blob = new Blob(["\uFEFF" + header + body], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "journal_verifications.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl text-gray-900">Журнал поверок</h2>
          <p className="text-gray-600 mt-1">Архив завершённых поверок</p>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-sm"
        >
          <Download className="w-4 h-4" />
          Экспорт записей
        </button>
      </div>

      <div className="bg-white border border-gray-200 p-4 flex flex-wrap gap-4">
        <div className="flex-1 relative min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Инв. номер или наименование..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          />
        </div>
        <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border border-gray-300 px-3 py-2 text-sm" />
        <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border border-gray-300 px-3 py-2 text-sm" />
      </div>

      <div className="bg-white border border-gray-200 overflow-x-auto">
        {loading ? (
          <p className="p-6 text-gray-600">Загрузка...</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Дата поверки</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Инструмент</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Инв. номер</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Результат</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Причина брака</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">ФИО лаборанта</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(data || []).map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{formatDate(row.endDate || row.startDate)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.instrumentName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.inventoryNumber}</td>
                  <td className="px-6 py-4 text-sm">{row.resultLabel || "—"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.failReason || "—"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.labUserName || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
