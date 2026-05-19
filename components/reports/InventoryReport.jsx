import { Download } from "lucide-react";

const ROWS = [
  { name: "Штангенциркуль ШЦ-I-150", category: "Измерительный", start: "15", received: "+2", written: "-1", end: "16" },
  { name: "Ключ гаечный 17мм", category: "Слесарный", start: "30", received: "+5", written: "-10", end: "25" },
  { name: "Микрометр МК-25", category: "Измерительный", start: "10", received: "+0", written: "-0", end: "10" }
];

export function InventoryReport() {
  return (
    <div className="bg-white border border-gray-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-gray-900">Отчет по инвентаризации</h3>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e]">
          <Download className="w-4 h-4" />
          Экспорт в Excel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Дата начала</label>
          <input
            type="date"
            defaultValue="2026-04-01"
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Дата окончания</label>
          <input
            type="date"
            defaultValue="2026-04-02"
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Категория</label>
          <select className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]">
            <option>Все категории</option>
            <option>Измерительный</option>
            <option>Слесарно-монтажный</option>
          </select>
        </div>
      </div>
      <div className="border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Наименование</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Категория</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Остаток на начало</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Поступило</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Списано</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Остаток на конец</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ROWS.map((row) => (
              <tr key={row.name}>
                <td className="px-6 py-4 text-sm text-gray-900">{row.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{row.category}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{row.start}</td>
                <td className="px-6 py-4 text-sm text-green-600">{row.received}</td>
                <td className="px-6 py-4 text-sm text-red-600">{row.written}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{row.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
