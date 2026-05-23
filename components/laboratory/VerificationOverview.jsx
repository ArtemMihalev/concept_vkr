import { useState } from "react";
import { ClipboardList, Play, Search } from "lucide-react";
import { useFetch } from "../api/useFetch.js";
import { api } from "../api/client.js";
import { VERIFICATION_STATUS, formatDate } from "../shared/statusMaps.js";
import { VerificationResultModal } from "./VerificationResultModal.jsx";

const STATUS_FILTERS = [
  { id: "all", label: "Все" },
  { id: "in_progress", label: "В процессе" },
  { id: "completed", label: "Завершены" },
  { id: "scheduled", label: "Запланированы" },
  { id: "overdue", label: "Просрочены" }
];

export function VerificationOverview() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [resultModal, setResultModal] = useState(null);

  const query = `/api/verifications?archive=all&status=${statusFilter}${search ? `&search=${encodeURIComponent(search)}` : ""}${dateFrom ? `&dateFrom=${dateFrom}` : ""}`;
  const { data, loading, reload } = useFetch(query, { deps: [query] });

  async function handleStart(id) {
    await api.post(`/api/verifications/${id}/start`);
    reload();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Обзор поверок</h2>
        <p className="text-gray-600 mt-1">Управление процессом поверки приборов</p>
      </div>

      <div className="bg-white border border-gray-200 p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по прибору или инв. номеру..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 text-sm border ${
                statusFilter === f.id
                  ? "bg-[#0d9488] text-white border-[#0d9488]"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="bg-white border border-gray-200 overflow-x-auto">
        {loading ? (
          <p className="p-6 text-gray-600">Загрузка...</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Прибор</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Инв. номер</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Статус</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Дата начала</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Результат</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(data || []).map((row) => {
                const badge = VERIFICATION_STATUS[row.status] || VERIFICATION_STATUS.scheduled;
                return (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{row.instrumentName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.inventoryNumber}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs ${badge.className}`}>{badge.text}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(row.startDate)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.resultLabel || "—"}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {row.status === "scheduled" && (
                          <button
                            type="button"
                            title="Начать поверку"
                            onClick={() => handleStart(row.id)}
                            className="text-[#0d9488] hover:text-[#0f766e]"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                        {(row.status === "in_progress" || row.status === "scheduled") && (
                          <button
                            type="button"
                            title="Внести результат"
                            onClick={() =>
                              setResultModal({
                                id: row.id,
                                instrumentName: row.instrumentName,
                                inventoryNumber: row.inventoryNumber
                              })
                            }
                            className="text-green-600 hover:text-green-700"
                          >
                            <ClipboardList className="w-4 h-4" />
                          </button>
                        )}
                        {row.result && (
                          <button type="button" className="text-xs text-gray-500 hover:text-gray-700">
                            Протокол
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <VerificationResultModal
        verification={resultModal}
        onClose={() => setResultModal(null)}
        onSaved={reload}
      />
    </div>
  );
}
