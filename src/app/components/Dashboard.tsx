import { AlertCircle, TrendingUp, Package, Users, Calendar } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    { title: 'Всего инструментов', value: '1,248', change: '+12%', icon: Package, color: 'bg-blue-500' },
    { title: 'Выдано сегодня', value: '87', change: '+5%', icon: Users, color: 'bg-green-500' },
    { title: 'На поверке', value: '23', change: '0%', icon: Calendar, color: 'bg-yellow-500' },
    { title: 'Требует внимания', value: '8', change: '+2', icon: AlertCircle, color: 'bg-red-500' },
  ]

  const recentOperations = [
    { id: 1, type: 'Выдача', instrument: 'Штангенциркуль ШЦ-I-150', employee: 'Иванов И.И.', time: '10:30' },
    { id: 2, type: 'Возврат', instrument: 'Микрометр МК-25', employee: 'Петров П.П.', time: '10:15' },
    { id: 3, type: 'Выдача', instrument: 'Ключ гаечный 17мм', employee: 'Сидоров С.С.', time: '09:45' },
    { id: 4, type: 'Поступление', instrument: 'Отвертка шлицевая 5мм', employee: 'Система', time: '09:30' },
  ]

  const upcomingVerifications = [
    { id: 1, instrument: 'Штангенциркуль ШЦ-I-150', invNumber: 'ИН-001234', dueDate: '15.04.2026', daysLeft: 13 },
    { id: 2, instrument: 'Микрометр МК-25', invNumber: 'ИН-001235', dueDate: '18.04.2026', daysLeft: 16 },
    { id: 3, instrument: 'Калибр-пробка', invNumber: 'ИН-001236', dueDate: '20.04.2026', daysLeft: 18 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Панель управления</h2>
        <p className="text-gray-600 mt-1">Обзор состояния инструментального хозяйства</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-2">{stat.change} за месяц</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Последние операции</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOperations.map((operation) => (
                <div
                  key={operation.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{operation.instrument}</p>
                    <p className="text-sm text-gray-600">{operation.employee}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        operation.type === 'Выдача'
                          ? 'bg-blue-100 text-blue-700'
                          : operation.type === 'Возврат'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {operation.type}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{operation.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Предстоящие поверки</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingVerifications.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.instrument}</p>
                    <p className="text-sm text-gray-600">{item.invNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{item.dueDate}</p>
                    <p
                      className={`text-sm mt-1 ${
                        item.daysLeft < 7
                          ? 'text-red-600'
                          : item.daysLeft < 14
                            ? 'text-yellow-600'
                            : 'text-gray-600'
                      }`}
                    >
                      Через {item.daysLeft} дней
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            type="button"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Выдать инструмент</p>
          </button>
          <button
            type="button"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Принять возврат</p>
          </button>
          <button
            type="button"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
          >
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Отправить на поверку</p>
          </button>
          <button
            type="button"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors"
          >
            <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Списать инструмент</p>
          </button>
        </div>
      </div>
    </div>
  )
}
