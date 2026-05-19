import { Trash2 } from "lucide-react";

export function IssueForm() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl text-gray-900">Выдача инструмента</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Работник</label>
          <input
            type="text"
            placeholder="Поиск по ФИО или табельному номеру..."
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          />
          <div className="mt-2 p-3 bg-gray-50">
            <p className="text-sm text-gray-900">Иванов Иван Иванович</p>
            <p className="text-sm text-gray-600">Таб. №12345 • Участок №1 • Слесарь</p>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Инструмент</label>
          <input
            type="text"
            placeholder="Поиск инструмента..."
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          />
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm text-gray-900 mb-3">Выбранные инструменты</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50">
            <div>
              <p className="text-gray-900">Штангенциркуль ШЦ-I-150</p>
              <p className="text-sm text-gray-600">Инв. номер: ИН-001234</p>
            </div>
            <button type="button" className="text-red-600 hover:text-red-700">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50">
            <div>
              <p className="text-gray-900">Ключ гаечный 17мм</p>
              <p className="text-sm text-gray-600">Количество: 2 шт.</p>
            </div>
            <button type="button" className="text-red-600 hover:text-red-700">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <button type="button" className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
          Отмена
        </button>
        <button type="button" className="px-6 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] transition-colors">
          Выдать инструменты
        </button>
      </div>
    </div>
  );
}
