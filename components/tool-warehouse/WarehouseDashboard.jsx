import { AlertTriangle, Archive, Package, TrendingUp } from "lucide-react";
import { StatCard } from "../shared/StatCard.jsx";

const STATS = [
  { title: "Всего позиций", value: "2,847", change: "+18%", icon: Package },
  { title: "Выдано сегодня", value: "142", change: "+8%", icon: TrendingUp },
  { title: "Низкие остатки", value: "34", change: "+5", icon: AlertTriangle },
  { title: "На складе", value: "2,705", change: "+12%", icon: Archive }
];

const RECENT = [
  { id: 1, type: "Выдача", item: "Набор ключей гаечных 6-32мм", quantity: 2, department: "Цех №3", time: "11:20" },
  { id: 2, type: "Возврат", item: "Дрель электрическая ДЭ-16", quantity: 1, department: "Цех №1", time: "11:05" },
  { id: 3, type: "Поступление", item: "Молоток слесарный 500г", quantity: 20, department: "Склад", time: "10:30" },
  { id: 4, type: "Выдача", item: "Угловая шлифмашина УШМ-125", quantity: 3, department: "Цех №2", time: "10:15" }
];

const LOW_STOCK = [
  { id: 1, item: "Сверло по металлу 8мм", current: 3, minimum: 10, needed: 7 },
  { id: 2, item: "Диск отрезной 125мм", current: 5, minimum: 15, needed: 10 },
  { id: 3, item: "Электроды ОК-46", current: 2, minimum: 8, needed: 6 }
];

function typeBadgeClass(type) {
  if (type === "Выдача") return "bg-[#e0f2f1] text-[#0d9488]";
  if (type === "Возврат") return "bg-blue-50 text-blue-700";
  return "bg-gray-100 text-gray-700";
}

export function WarehouseDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Панель управления складом</h2>
        <p className="text-gray-600 mt-1">Общая статистика инструментального склада</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg text-gray-900">Последние движения</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {RECENT.map((op) => (
                <div key={op.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="text-gray-900">{op.item}</p>
                    <p className="text-sm text-gray-600">
                      {op.department} • {op.quantity} шт.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 text-xs ${typeBadgeClass(op.type)}`}>{op.type}</span>
                    <p className="text-sm text-gray-500 mt-1">{op.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg text-gray-900">Требуется пополнение</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {LOW_STOCK.map((item) => (
                <div key={item.id} className="py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-900">{item.item}</p>
                    <span className="text-sm text-red-600">-{item.needed} шт.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100">
                      <div
                        className="h-2 bg-red-500"
                        style={{ width: `${(item.current / item.minimum) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">
                      {item.current}/{item.minimum}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 p-6">
        <h3 className="text-lg text-gray-900 mb-4">Быстрые действия</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button type="button" className="p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all">
            <Package className="w-8 h-8 text-[#0d9488] mx-auto mb-2" />
            <p className="text-sm text-gray-900">Выдать инструмент</p>
          </button>
          <button type="button" className="p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all">
            <TrendingUp className="w-8 h-8 text-[#0d9488] mx-auto mb-2" />
            <p className="text-sm text-gray-900">Принять возврат</p>
          </button>
          <button type="button" className="p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all">
            <Archive className="w-8 h-8 text-[#0d9488] mx-auto mb-2" />
            <p className="text-sm text-gray-900">Оприходовать</p>
          </button>
          <button type="button" className="p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all">
            <AlertTriangle className="w-8 h-8 text-[#0d9488] mx-auto mb-2" />
            <p className="text-sm text-gray-900">Заказать инструмент</p>
          </button>
        </div>
      </div>
    </div>
  );
}
