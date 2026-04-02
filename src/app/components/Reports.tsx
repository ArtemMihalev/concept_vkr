import { useState } from 'react'
import { FileText, Download, Calendar, BarChart3, TrendingUp } from 'lucide-react'

type ReportType = 'inventory' | 'movements' | 'verification' | 'analytics'

export default function Reports() {
  const [activeReport, setActiveReport] = useState<ReportType>('inventory')

  const reports = [
    { id: 'inventory' as const, name: 'Инвентаризация', icon: FileText, color: 'bg-blue-500' },
    { id: 'movements' as const, name: 'Движение инструментов', icon: TrendingUp, color: 'bg-green-500' },
    { id: 'verification' as const, name: 'График поверок', icon: Calendar, color: 'bg-yellow-500' },
    { id: 'analytics' as const, name: 'Аналитика', icon: BarChart3, color: 'bg-purple-500' },
  ]

  const renderReport = () => {
    switch (activeReport) {
      case 'inventory':
        return <InventoryReport />
      case 'movements':
        return <MovementsReport />
      case 'verification':
        return <VerificationReport />
      case 'analytics':
        return <AnalyticsReport />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Отчеты</h2>
        <p className="text-gray-600 mt-1">Формирование отчетности и аналитики</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {reports.map((report) => {
          const Icon = report.icon
          const isActive = activeReport === report.id
          return (
            <button
              key={report.id}
              type="button"
              onClick={() => setActiveReport(report.id)}
              className={`p-6 rounded-lg border-2 transition-all ${
                isActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div
                className={`${report.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className={`font-medium text-center ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                {report.name}
              </p>
            </button>
          )
        })}
      </div>

      {renderReport()}
    </div>
  )
}

function InventoryReport() {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-xl font-semibold text-gray-900">Отчет по инвентаризации</h3>
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          Экспорт в Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Дата начала</label>
          <input
            type="date"
            defaultValue="2026-04-01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Дата окончания</label>
          <input
            type="date"
            defaultValue="2026-04-02"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Все категории</option>
            <option>Измерительный</option>
            <option>Слесарно-монтажный</option>
          </select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Наименование</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Категория</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Остаток на начало
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Поступило</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Списано</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Остаток на конец
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">Штангенциркуль ШЦ-I-150</td>
              <td className="px-6 py-4 text-sm text-gray-600">Измерительный</td>
              <td className="px-6 py-4 text-sm text-gray-900">15</td>
              <td className="px-6 py-4 text-sm text-green-600">+2</td>
              <td className="px-6 py-4 text-sm text-red-600">-1</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">16</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">Ключ гаечный 17мм</td>
              <td className="px-6 py-4 text-sm text-gray-600">Слесарный</td>
              <td className="px-6 py-4 text-sm text-gray-900">30</td>
              <td className="px-6 py-4 text-sm text-green-600">+5</td>
              <td className="px-6 py-4 text-sm text-red-600">-10</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">25</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">Микрометр МК-25</td>
              <td className="px-6 py-4 text-sm text-gray-600">Измерительный</td>
              <td className="px-6 py-4 text-sm text-gray-900">10</td>
              <td className="px-6 py-4 text-sm text-green-600">+0</td>
              <td className="px-6 py-4 text-sm text-red-600">-0</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function MovementsReport() {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-xl font-semibold text-gray-900">Движение инструментов</h3>
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          Экспорт в Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Период</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Сегодня</option>
            <option>Вчера</option>
            <option>Последние 7 дней</option>
            <option>Последние 30 дней</option>
            <option>Произвольный период</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Тип операции</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Все операции</option>
            <option>Выдача</option>
            <option>Возврат</option>
            <option>Поступление</option>
            <option>Списание</option>
          </select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата и время</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Тип операции</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Инструмент</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сотрудник</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Количество</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">02.04.2026 10:30</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Выдача</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">Штангенциркуль ШЦ-I-150</td>
              <td className="px-6 py-4 text-sm text-gray-600">Иванов И.И.</td>
              <td className="px-6 py-4 text-sm text-gray-900">1</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">02.04.2026 10:15</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Возврат</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">Микрометр МК-25</td>
              <td className="px-6 py-4 text-sm text-gray-600">Петров П.П.</td>
              <td className="px-6 py-4 text-sm text-gray-900">1</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">02.04.2026 09:45</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Выдача</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">Ключ гаечный 17мм</td>
              <td className="px-6 py-4 text-sm text-gray-600">Сидоров С.С.</td>
              <td className="px-6 py-4 text-sm text-gray-900">2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function VerificationReport() {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-xl font-semibold text-gray-900">График поверок мерительного инструмента</h3>
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          Экспорт в Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Период</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Текущий месяц</option>
            <option>Следующий месяц</option>
            <option>Следующие 3 месяца</option>
            <option>Весь год</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Все</option>
            <option>Просрочено</option>
            <option>Предстоит в течение 7 дней</option>
            <option>Предстоит в течение 30 дней</option>
          </select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Инструмент</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Инв. номер</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Последняя поверка</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Следующая поверка</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">Штангенциркуль ШЦ-I-150</td>
              <td className="px-6 py-4 text-sm text-gray-600">ИН-001234</td>
              <td className="px-6 py-4 text-sm text-gray-900">15.04.2025</td>
              <td className="px-6 py-4 text-sm text-gray-900">15.04.2026</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                  Через 13 дней
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">Микрометр МК-25</td>
              <td className="px-6 py-4 text-sm text-gray-600">ИН-001235</td>
              <td className="px-6 py-4 text-sm text-gray-900">18.04.2025</td>
              <td className="px-6 py-4 text-sm text-gray-900">18.04.2026</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                  Через 16 дней
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">Калибр-пробка</td>
              <td className="px-6 py-4 text-sm text-gray-600">ИН-001236</td>
              <td className="px-6 py-4 text-sm text-gray-900">28.03.2026</td>
              <td className="px-6 py-4 text-sm text-gray-900">01.04.2026</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                  Просрочено на 1 день
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AnalyticsReport() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Аналитика использования инструментов</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Средняя частота выдачи</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">47 шт/день</p>
            <p className="text-sm text-green-600 mt-1">+12% к прошлому месяцу</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Коэффициент возврата</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">98.5%</p>
            <p className="text-sm text-green-600 mt-1">Высокий показатель</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600">Среднее время использования</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">6.2 часа</p>
            <p className="text-sm text-gray-600 mt-1">За смену</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Топ-5 наиболее используемых инструментов</h4>
          <div className="space-y-3">
            {[
              { name: 'Ключ гаечный 17мм', count: 156, percent: 85 },
              { name: 'Отвертка шлицевая 5мм', count: 142, percent: 75 },
              { name: 'Штангенциркуль ШЦ-I-150', count: 98, percent: 55 },
              { name: 'Молоток слесарный', count: 87, percent: 45 },
              { name: 'Пассатижи', count: 76, percent: 40 },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-900">{item.name}</span>
                  <span className="text-gray-600">{item.count} выдач</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
