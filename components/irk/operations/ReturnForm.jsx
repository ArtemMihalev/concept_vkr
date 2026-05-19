export function ReturnForm() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl text-gray-900">Возврат инструмента</h3>
      <div>
        <label className="block text-sm text-gray-700 mb-2">Работник</label>
        <input
          type="text"
          placeholder="Поиск по ФИО или табельному номеру..."
          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
        />
      </div>
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm text-gray-900 mb-3">Инструменты на руках</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-gray-50">
            <input type="checkbox" className="w-4 h-4 text-[#0d9488]" />
            <div className="flex-1">
              <p className="text-gray-900">Штангенциркуль ШЦ-I-150</p>
              <p className="text-sm text-gray-600">Инв. номер: ИН-001234 • Выдан: 02.04.2026 10:30</p>
            </div>
            <select className="px-3 py-1 border border-gray-300 text-sm">
              <option>Исправен</option>
              <option>Поврежден</option>
              <option>Требует поверки</option>
            </select>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50">
            <input type="checkbox" className="w-4 h-4 text-[#0d9488]" />
            <div className="flex-1">
              <p className="text-gray-900">Ключ гаечный 17мм</p>
              <p className="text-sm text-gray-600">Количество: 2 шт. • Выдан: 02.04.2026 10:30</p>
            </div>
            <select className="px-3 py-1 border border-gray-300 text-sm">
              <option>Исправен</option>
              <option>Поврежден</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <button type="button" className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
          Отмена
        </button>
        <button type="button" className="px-6 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] transition-colors">
          Принять возврат
        </button>
      </div>
    </div>
  );
}
