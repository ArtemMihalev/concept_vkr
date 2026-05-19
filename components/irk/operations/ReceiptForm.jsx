import { Trash2 } from "lucide-react";

export function ReceiptForm() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl text-gray-900">Поступление инструмента</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Документ-основание</label>
          <input
            type="text"
            placeholder="Номер накладной..."
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Дата поступления</label>
          <input
            type="date"
            defaultValue="2026-04-02"
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-2">Инструменты</label>
        <div className="space-y-3">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Наименование"
              className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
            />
            <input
              type="number"
              placeholder="Кол-во"
              className="w-24 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
            />
            <button type="button" className="px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e]">
              Добавить
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm text-gray-900 mb-3">Добавленные позиции</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50">
            <div>
              <p className="text-gray-900">Отвертка шлицевая 5мм</p>
              <p className="text-sm text-gray-600">Количество: 10 шт.</p>
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
          Оприходовать
        </button>
      </div>
    </div>
  );
}
