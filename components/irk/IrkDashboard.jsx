import { useState } from "react";
import { Bell, Calendar, Package, Send } from "lucide-react";
import { useFetch } from "../api/useFetch.js";
import { api } from "../api/client.js";
import { formatDate, URGENCY } from "../shared/statusMaps.js";

export function IrkDashboard() {
  const { data, loading, reload } = useFetch("/api/dashboard/irk");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleReceiptVoucher() {
    setBusy(true);
    try {
      const instruments = await api.get("/api/instruments?toolType=measuring&status=available");
      const toSend = instruments
        .filter((i) => i.nextVerificationDate && daysLeft(i.nextVerificationDate) <= 30)
        .map((i) => i.id)
        .slice(0, 5);
      if (toSend.length === 0) {
        setMessage("Нет инструментов для отправки на поверку");
        return;
      }
      await api.post("/api/documents/receipt-voucher", { instrumentIds: toSend });
      setMessage("Вещевая квитанция сформирована");
      reload();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setBusy(false);
    }
  }

  async function handleRemind(row) {
    setBusy(true);
    try {
      await api.post("/api/notifications/remind", {
        employeeName: row.employeeName,
        instrumentName: row.instrumentName
      });
      setMessage(`Напоминание отправлено: ${row.employeeName}`);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <p className="text-gray-600">Загрузка панели...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Информационная панель</h2>
        <p className="text-gray-600 mt-1">Оперативный контроль инструментального хозяйства ИРК</p>
      </div>

      {message && (
        <div className="bg-[#f0fdfa] border border-[#0d9488] px-4 py-3 text-sm text-gray-800">{message}</div>
      )}

      <div className="bg-white border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#0d9488]" />
            <h3 className="text-lg text-gray-900">Требуют отправки на поверку</h3>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={handleReceiptVoucher}
            className="flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] disabled:opacity-60 text-sm"
          >
            <Send className="w-4 h-4" />
            Сформировать вещевую квитанцию
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Наименование</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Инв. номер</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Крайний срок</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(data?.verificationDue || []).map((row, idx) => {
                const urg = URGENCY[row.urgency] || URGENCY.later;
                return (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-900">{row.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{row.inventoryNumber}</td>
                    <td className="px-6 py-3 text-sm text-gray-900">{formatDate(row.dueDate)}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 text-xs ${urg.className}`}>{urg.text}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center gap-2">
          <Package className="w-5 h-5 text-[#0d9488]" />
          <h3 className="text-lg text-gray-900">Подготовка наборов к смене</h3>
        </div>
        <div className="p-6 space-y-4">
          {(data?.shiftSets || []).map((set) => (
            <div key={set.id} className="border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-900">
                  {set.shiftName} — {formatDate(set.shiftDate)}
                </p>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700">{set.specialization}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Статус: {set.status === "ready" ? "Готов" : "Подготовка"}</p>
              <ul className="text-sm text-gray-700 list-disc list-inside">
                {(set.tools || []).map((t, i) => (
                  <li key={i}>
                    {t.name} — {t.qty} шт.
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center gap-2">
          <Bell className="w-5 h-5 text-red-500" />
          <h3 className="text-lg text-gray-900">Отсутствующие инструменты</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">ФИО</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Инструмент</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Дата выдачи</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Дней просрочки</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(data?.overdueIssued || []).map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-900">{row.employeeName}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {row.instrumentName} ({row.inventoryNumber})
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{formatDate(row.issuedAt)}</td>
                  <td className="px-6 py-3 text-sm text-red-600">{row.daysOverdue}</td>
                  <td className="px-6 py-3 text-right">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => handleRemind(row)}
                      className="text-sm text-[#0d9488] hover:text-[#0f766e]"
                    >
                      Отправить напоминание
                    </button>
                  </td>
                </tr>
              ))}
              {(data?.overdueIssued || []).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                    Просроченных выдач нет
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function daysLeft(dateStr) {
  const d = new Date(dateStr);
  return Math.ceil((d - new Date()) / (1000 * 60 * 60 * 24));
}
