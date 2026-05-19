export function WriteoffForm() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl text-gray-900">Списание инструмента</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Инструмент</label>
          <input
            type="text"
            placeholder="Поиск инструмента..."
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Причина списания</label>
          <select className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]">
            <option>Износ</option>
            <option>Поломка</option>
            <option>Утрата</option>
            <option>Непригоден после поверки</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-2">Документ-основание</label>
        <input
          type="text"
          placeholder="Номер акта..."
          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-2">Комментарий</label>
        <textarea
          rows={3}
          placeholder="Дополнительная информация..."
          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
        />
      </div>
      <div className="bg-yellow-50 border border-yellow-200 p-4">
        <p className="text-sm text-yellow-900">
          <strong>Внимание:</strong> После списания инструмент будет исключен из учета и не сможет быть
          восстановлен.
        </p>
      </div>
      <div className="flex gap-4 justify-end">
        <button type="button" className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
          Отмена
        </button>
        <button type="button" className="px-6 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors">
          Списать инструмент
        </button>
      </div>
    </div>
  );
}
