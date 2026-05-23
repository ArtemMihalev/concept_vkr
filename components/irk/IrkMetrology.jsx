import { useState } from "react";
import { Calendar, History } from "lucide-react";
import { TabSelector } from "../shared/TabSelector.jsx";
import { useFetch } from "../api/useFetch.js";
import { formatDate, URGENCY } from "../shared/statusMaps.js";

const TABS = [
  { id: "schedule", name: "График поверок", icon: Calendar },
  { id: "history", name: "Результаты поверок", icon: History }
];

export function IrkMetrology() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [search, setSearch] = useState("");

  const { data: schedule, loading: scheduleLoading } = useFetch(
    activeTab === "schedule" ? "/api/verifications/schedule" : null
  );

  const historyQuery =
    activeTab === "history"
      ? `/api/verifications?archive=true${dateFrom ? `&dateFrom=${dateFrom}` : ""}${dateTo ? `&dateTo=${dateTo}` : ""}${search ? `&search=${encodeURIComponent(search)}` : ""}`
      : null;
  const { data: history, loading: historyLoading } = useFetch(historyQuery, {
    deps: [historyQuery]
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Метрология</h2>
        <p className="text-gray-600 mt-1">График поверок и история результатов</p>
      </div>
      <TabSelector tabs={TABS} activeId={activeTab} onChange={setActiveTab} />

      {activeTab === "schedule" && (
        <div className="bg-white border border-gray-200 overflow-x-auto">
          {scheduleLoading ? (
            <p className="p-6 text-gray-600">Загрузка...</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Наименование</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Инв. номер</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Последняя поверка</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Следующая поверка</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {(schedule || []).map((row) => {
                  const urg = URGENCY[row.urgency] || URGENCY.later;
                  return (
                    <tr key={row.instrumentId} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm text-gray-900">{row.name}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{row.inventoryNumber}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{formatDate(row.lastVerificationDate)}</td>
                      <td className="px-6 py-3 text-sm text-gray-900">{formatDate(row.nextVerificationDate)}</td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-1 text-xs ${urg.className}`}>{urg.text}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "history" && (
        <>
          <div className="bg-white border border-gray-200 p-4 flex flex-wrap gap-4">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="border border-gray-300 px-3 py-2 text-sm"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="border border-gray-300 px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Инструмент / инв. номер"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="bg-white border border-gray-200 overflow-x-auto">
            {historyLoading ? (
              <p className="p-6 text-gray-600">Загрузка...</p>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Дата</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Инструмент</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Инв. номер</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Результат</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Примечание</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(history || []).map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm">{formatDate(row.endDate || row.startDate)}</td>
                      <td className="px-6 py-3 text-sm text-gray-900">{row.instrumentName}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{row.inventoryNumber}</td>
                      <td className="px-6 py-3 text-sm">
                        <span
                          className={
                            row.result === "fail"
                              ? "text-red-600"
                              : row.result === "pass"
                                ? "text-green-700"
                                : "text-gray-600"
                          }
                        >
                          {row.resultLabel || "—"}
                        </span>
                        {row.result === "fail" && (
                          <p className="text-xs text-gray-500 mt-1">Браковочное извещение создано автоматически</p>
                        )}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600">{row.comment || row.failReason || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
