import { Download } from "lucide-react";

const ROWS = [
  { datetime: "02.04.2026 10:30", type: "Выдача", typeClass: "bg-[#e0f2f1] text-[#0d9488]", instrument: "Штангенциркуль ШЦ-I-150", employee: "Иванов И.И.", qty: "1" },
  { datetime: "02.04.2026 10:15", type: "Возврат", typeClass: "bg-blue-50 text-blue-700", instrument: "Микрометр МК-25", employee: "Петров П.П.", qty: "1" },
  { datetime: "02.04.2026 09:45", type: "Выдача", typeClass: "bg-[#e0f2f1] text-[#0d9488]", instrument: "Ключ гаечный 17мм", employee: "Сидоров С.С.", qty: "2" }
];

export function MovementsReport() {
  return (
    <div className="bg-white border border-gray-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-gray-900">Движение инструментов</h3>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e]">
          <Download className="w-4 h-4" />
          Экспорт в Excel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Период</label>
          <select className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]">
            <option>Сегодня</option>
            <option>Вчера</option>
            <option>Последние 7 дней</option>
            <option>Последние 30 дней</option>
            <option>Произвольный период</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Тип операции</label>
          <select className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]">
            <option>Все операции</option>
            <option>Выдача</option>
            <option>Возврат</option>
            <option>Поступление</option>
            <option>Списание</option>
          </select>
        </div>
      </div>
      <div className="border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Дата и время</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Тип операции</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Инструмент</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Сотрудник</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Количество</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ROWS.map((row) => (
              <tr key={row.datetime + row.instrument}>
                <td className="px-6 py-4 text-sm text-gray-900">{row.datetime}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs ${row.typeClass}`}>{row.type}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{row.instrument}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{row.employee}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{row.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
