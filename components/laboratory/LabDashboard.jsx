import { AlertCircle, Calendar, ClipboardCheck, Send } from "lucide-react";
import { useFetch } from "../api/useFetch.js";
import { api } from "../api/client.js";
import { formatDate } from "../shared/statusMaps.js";

/**
 * @param {{ onNavigate?: (tab: string) => void }} props
 */
export function LabDashboard({ onNavigate }) {
  const { data, loading, reload } = useFetch("/api/dashboard/laboratory");

  async function requestSend(instrumentId) {
    await api.post("/api/verifications/request-send", { instrumentId });
    reload();
  }

  if (loading) return <p className="text-gray-600">Загрузка...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Информационная панель</h2>
        <p className="text-gray-600 mt-1">Метрологическая лаборатория</p>
      </div>

      <div className="bg-white border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-[#0d9488]" />
          <h3 className="text-lg text-gray-900">Текущие поверки</h3>
        </div>
        <div className="p-6 space-y-3">
          {(data?.current || []).map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-gray-900">{item.instrumentName}</p>
                <p className="text-sm text-gray-600">{item.inventoryNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate?.("verifications")}
                className="text-sm px-3 py-1 bg-[#0d9488] text-white hover:bg-[#0f766e]"
              >
                Внести результат
              </button>
            </div>
          ))}
          {(data?.current || []).length === 0 && (
            <p className="text-sm text-gray-500">Нет поверок в процессе</p>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <h3 className="text-lg text-gray-900">Просроченные поверки</h3>
        </div>
        <div className="p-6 space-y-3">
          {(data?.overdue || []).map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-gray-900">{item.instrumentName}</p>
                <p className="text-sm text-gray-600">{item.inventoryNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => requestSend(item.id)}
                className="flex items-center gap-1 text-sm text-[#0d9488] hover:text-[#0f766e]"
              >
                <Send className="w-4 h-4" />
                Запросить отправку
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#0d9488]" />
          <h3 className="text-lg text-gray-900">Запланированные на ближайшие 30 дней</h3>
        </div>
        <div className="p-6 space-y-3">
          {(data?.scheduled || []).map((item) => (
            <div key={item.id} className="py-2 border-b border-gray-100">
              <p className="text-gray-900">{item.instrumentName}</p>
              <p className="text-sm text-gray-600">
                {item.inventoryNumber} • {formatDate(item.scheduledDate)} • {item.verificationType}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
