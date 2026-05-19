const TOP_TOOLS = [
  { name: "Ключ гаечный 17мм", count: 156, percent: 85 },
  { name: "Отвертка шлицевая 5мм", count: 142, percent: 75 },
  { name: "Штангенциркуль ШЦ-I-150", count: 98, percent: 55 },
  { name: "Молоток слесарный", count: 87, percent: 45 },
  { name: "Пассатижи", count: 76, percent: 40 }
];

export function AnalyticsReport() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 p-6">
        <h3 className="text-xl text-gray-900 mb-4">Аналитика использования инструментов</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-[#f0fdfa] border border-[#0d9488]">
            <p className="text-sm text-gray-600">Средняя частота выдачи</p>
            <p className="text-2xl text-gray-900 mt-2">47 шт/день</p>
            <p className="text-sm text-[#0d9488] mt-1">+12% к прошлому месяцу</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200">
            <p className="text-sm text-gray-600">Коэффициент возврата</p>
            <p className="text-2xl text-gray-900 mt-2">98.5%</p>
            <p className="text-sm text-green-600 mt-1">Высокий показатель</p>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200">
            <p className="text-sm text-gray-600">Среднее время использования</p>
            <p className="text-2xl text-gray-900 mt-2">6.2 часа</p>
            <p className="text-sm text-gray-600 mt-1">За смену</p>
          </div>
        </div>
        <div className="border-t pt-4">
          <h4 className="text-gray-900 mb-3">Топ-5 наиболее используемых инструментов</h4>
          <div className="space-y-3">
            {TOP_TOOLS.map((tool) => (
              <div key={tool.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-900">{tool.name}</span>
                  <span className="text-gray-600">{tool.count} выдач</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div className="bg-[#0d9488] h-2" style={{ width: `${tool.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
