import { useState } from 'react'
import { ArrowDown, ArrowUp, Package, Trash2 } from 'lucide-react'

type OperationType = 'issue' | 'return' | 'receipt' | 'writeoff'

export default function Operations() {
  const [activeOperation, setActiveOperation] = useState<OperationType>('issue')

  const operations = [
    { id: 'issue' as const, name: 'Выдача инструмента', icon: ArrowDown, color: 'bg-blue-500' },
    { id: 'return' as const, name: 'Возврат инструмента', icon: ArrowUp, color: 'bg-green-500' },
    { id: 'receipt' as const, name: 'Поступление', icon: Package, color: 'bg-purple-500' },
    { id: 'writeoff' as const, name: 'Списание', icon: Trash2, color: 'bg-red-500' },
  ]

  const renderOperationForm = () => {
    switch (activeOperation) {
      case 'issue':
        return <IssueForm />
      case 'return':
        return <ReturnForm />
      case 'receipt':
        return <ReceiptForm />
      case 'writeoff':
        return <WriteOffForm />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Операции</h2>
        <p className="text-gray-600 mt-1">Управление движением инструментов</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {operations.map((op) => {
          const Icon = op.icon
          const isActive = activeOperation === op.id
          return (
            <button
              key={op.id}
              type="button"
              onClick={() => setActiveOperation(op.id)}
              className={`p-6 rounded-lg border-2 transition-all ${
                isActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div
                className={`${op.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className={`font-medium text-center ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                {op.name}
              </p>
            </button>
          )
        })}
      </div>

      <div className="bg-white rounded-lg shadow p-6">{renderOperationForm()}</div>
    </div>
  )
}

function IssueForm() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Выдача инструмента</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Работник</label>
          <input
            type="text"
            placeholder="Поиск по ФИО или табельному номеру..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-900">Иванов Иван Иванович</p>
            <p className="text-sm text-gray-600">Таб. №12345 • Участок №1 • Слесарь</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Инструмент</label>
          <input
            type="text"
            placeholder="Поиск инструмента..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Выбранные инструменты</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Штангенциркуль ШЦ-I-150</p>
              <p className="text-sm text-gray-600">Инв. номер: ИН-001234</p>
            </div>
            <button type="button" className="text-red-600 hover:text-red-700" aria-label="Удалить из списка">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Ключ гаечный 17мм</p>
              <p className="text-sm text-gray-600">Количество: 2 шт.</p>
            </div>
            <button type="button" className="text-red-600 hover:text-red-700" aria-label="Удалить из списка">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Отмена
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Выдать инструменты
        </button>
      </div>
    </div>
  )
}

function ReturnForm() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Возврат инструмента</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Работник</label>
        <input
          type="text"
          placeholder="Поиск по ФИО или табельному номеру..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Инструменты на руках</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Штангенциркуль ШЦ-I-150</p>
              <p className="text-sm text-gray-600">Инв. номер: ИН-001234 • Выдан: 02.04.2026 10:30</p>
            </div>
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option>Исправен</option>
              <option>Поврежден</option>
              <option>Требует поверки</option>
            </select>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Ключ гаечный 17мм</p>
              <p className="text-sm text-gray-600">Количество: 2 шт. • Выдан: 02.04.2026 10:30</p>
            </div>
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option>Исправен</option>
              <option>Поврежден</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Отмена
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Принять возврат
        </button>
      </div>
    </div>
  )
}

function ReceiptForm() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Поступление инструмента</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Документ-основание</label>
          <input
            type="text"
            placeholder="Номер накладной..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Дата поступления</label>
          <input
            type="date"
            defaultValue="2026-04-02"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Инструменты</label>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Наименование"
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Кол-во"
              className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Добавить
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Добавленные позиции</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Отвертка шлицевая 5мм</p>
              <p className="text-sm text-gray-600">Количество: 10 шт.</p>
            </div>
            <button type="button" className="text-red-600 hover:text-red-700" aria-label="Удалить позицию">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Отмена
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Оприходовать
        </button>
      </div>
    </div>
  )
}

function WriteOffForm() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Списание инструмента</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Инструмент</label>
          <input
            type="text"
            placeholder="Поиск инструмента..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Причина списания</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Износ</option>
            <option>Поломка</option>
            <option>Утрата</option>
            <option>Непригоден после поверки</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Документ-основание</label>
        <input
          type="text"
          placeholder="Номер акта..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Комментарий</label>
        <textarea
          rows={3}
          placeholder="Дополнительная информация..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-900">
          <strong>Внимание:</strong> После списания инструмент будет исключен из учета и не сможет быть
          восстановлен.
        </p>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Отмена
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Списать инструмент
        </button>
      </div>
    </div>
  )
}
