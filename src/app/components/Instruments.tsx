import { useState } from 'react'
import { Search, Plus, Edit, Trash2, AlertCircle } from 'lucide-react'

type InstrumentType = 'measuring' | 'locksmith'
type InstrumentStatus = 'available' | 'issued' | 'verification' | 'low-stock'

interface Instrument {
  id: number
  name: string
  type: InstrumentType
  category: string
  invNumber?: string
  quantity?: number
  status: InstrumentStatus
  location: string
  nextVerification?: string
}

export default function Instruments() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | InstrumentType>('all')

  const instruments: Instrument[] = [
    {
      id: 1,
      name: 'Штангенциркуль ШЦ-I-150',
      type: 'measuring',
      category: 'Измерительный',
      invNumber: 'ИН-001234',
      status: 'available',
      location: 'ИРК Цех №1',
      nextVerification: '15.04.2026',
    },
    {
      id: 2,
      name: 'Микрометр МК-25',
      type: 'measuring',
      category: 'Измерительный',
      invNumber: 'ИН-001235',
      status: 'issued',
      location: 'У рабочего: Иванов И.И.',
      nextVerification: '18.04.2026',
    },
    {
      id: 3,
      name: 'Ключ гаечный 17мм',
      type: 'locksmith',
      category: 'Слесарно-монтажный',
      quantity: 25,
      status: 'available',
      location: 'ИРК Цех №1',
    },
    {
      id: 4,
      name: 'Отвертка шлицевая 5мм',
      type: 'locksmith',
      category: 'Слесарно-монтажный',
      quantity: 5,
      status: 'low-stock',
      location: 'ИРК Цех №1',
    },
    {
      id: 5,
      name: 'Калибр-пробка',
      type: 'measuring',
      category: 'Измерительный',
      invNumber: 'ИН-001236',
      status: 'verification',
      location: 'Метрологическая лаборатория',
      nextVerification: '20.04.2026',
    },
  ]

  const getStatusBadge = (status: InstrumentStatus) => {
    const badges = {
      available: { text: 'В наличии', className: 'bg-green-100 text-green-700' },
      issued: { text: 'Выдан', className: 'bg-blue-100 text-blue-700' },
      verification: { text: 'На поверке', className: 'bg-yellow-100 text-yellow-700' },
      'low-stock': { text: 'Мало остатков', className: 'bg-red-100 text-red-700' },
    }
    return badges[status]
  }

  const filteredInstruments = instruments.filter((instrument) => {
    const matchesSearch = instrument.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || instrument.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Инструменты</h2>
          <p className="text-gray-600 mt-1">Управление каталогом инструментов</p>
        </div>
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Добавить инструмент
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Поиск по наименованию..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg border ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Все
            </button>
            <button
              type="button"
              onClick={() => setFilterType('measuring')}
              className={`px-4 py-2 rounded-lg border ${
                filterType === 'measuring'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Измерительный
            </button>
            <button
              type="button"
              onClick={() => setFilterType('locksmith')}
              className={`px-4 py-2 rounded-lg border ${
                filterType === 'locksmith'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Слесарный
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Наименование
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Категория
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Инв. номер / Кол-во
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Местонахождение
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Поверка
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInstruments.map((instrument) => {
              const statusBadge = getStatusBadge(instrument.status)
              return (
                <tr key={instrument.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{instrument.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{instrument.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {instrument.invNumber || `${instrument.quantity} шт.`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadge.className}`}
                    >
                      {statusBadge.text}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{instrument.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {instrument.nextVerification || '—'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" className="text-blue-600 hover:text-blue-900" aria-label="Редактировать">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button type="button" className="text-red-600 hover:text-red-900" aria-label="Удалить">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-900">
            Всего инструментов: {instruments.length}
          </p>
          <p className="text-sm text-blue-700 mt-1">
            В наличии: {instruments.filter((i) => i.status === 'available').length} • Выдано:{' '}
            {instruments.filter((i) => i.status === 'issued').length} • На поверке:{' '}
            {instruments.filter((i) => i.status === 'verification').length}
          </p>
        </div>
      </div>
    </div>
  )
}
