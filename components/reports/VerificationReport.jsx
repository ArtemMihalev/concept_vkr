import { Download } from "lucide-react";

const ROWS = [
  { instrument: "Штангенциркуль ШЦ-I-150", inv: "ИН-001234", last: "15.04.2025", next: "15.04.2026", status: "Через 13 дней", statusClass: "bg-yellow-50 text-yellow-700" },
  { instrument: "Микрометр МК-25", inv: "ИН-001235", last: "18.04.2025", next: "18.04.2026", status: "Через 16 дней", statusClass: "bg-green-50 text-green-700" },
  { instrument: "Калибр-пробка", inv: "ИН-001236", last: "28.03.2026", next: "01.04.2026", status: "Просрочено на 1 день", statusClass: "bg-red-50 text-red-700" }
];

export function VerificationReport() {
  return (
    <div className="bg-white border border-gray-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-gray-900">График поверок мерительного инструмента</h3>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e]">
          <Download className="w-4 h-4" />
          Экспорт в Excel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Период</label>
          <select className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]">
            <option>Текущий месяц</option>
            <option>Следующий месяц</option>
            <option>Следующие 3 месяца</option>
            <option>Весь год</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Статус</label>
          <select className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]">
            <option>Все</option>
            <option>Просрочено</option>
            <option>Предстоит в течение 7 дней</option>
            <option>Предстоит в течение 30 дней</option>
          </select>
        </div>
      </div>
      <div className="border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Инструмент</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Инв. номер</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Последняя поверка</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Следующая поверка</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ROWS.map((row) => (
              <tr key={row.inv}>
                <td className="px-6 py-4 text-sm text-gray-900">{row.instrument}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{row.inv}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{row.last}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{row.next}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs ${row.statusClass}`}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
