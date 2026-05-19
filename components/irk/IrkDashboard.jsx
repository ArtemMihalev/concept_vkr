import { AlertCircle, Calendar, Package, TrendingUp, Users } from "lucide-react";
import { StatCard } from "../shared/StatCard.jsx";

const STATS = [
  { title: "Всего инструментов", value: "1,248", change: "+12%", icon: Package },
  { title: "Выдано сегодня", value: "87", change: "+5%", icon: Users },
  { title: "На поверке", value: "23", change: "0%", icon: Calendar },
  { title: "Требует внимания", value: "8", change: "+2", icon: AlertCircle }
];

const RECENT_OPS = [
  { id: 1, type: "Выдача", instrument: "Штангенциркуль ШЦ-I-150", employee: "Иванов И.И.", time: "10:30" },
  { id: 2, type: "Возврат", instrument: "Микрометр МК-25", employee: "Петров П.П.", time: "10:15" },
  { id: 3, type: "Выдача", instrument: "Ключ гаечный 17мм", employee: "Сидоров С.С.", time: "09:45" },
  { id: 4, type: "Поступление", instrument: "Отвертка шлицевая 5мм", employee: "Система", time: "09:30" }
];

const UPCOMING = [
  { id: 1, instrument: "Штангенциркуль ШЦ-I-150", invNumber: "ИН-001234", dueDate: "15.04.2026", daysLeft: 13 },
  { id: 2, instrument: "Микрометр МК-25", invNumber: "ИН-001235", dueDate: "18.04.2026", daysLeft: 16 },
  { id: 3, instrument: "Калибр-пробка", invNumber: "ИН-001236", dueDate: "20.04.2026", daysLeft: 18 }
];

function opBadgeClass(type) {
  if (type === "Выдача") return "bg-[#e0f2f1] text-[#0d9488]";
  if (type === "Возврат") return "bg-blue-50 text-blue-700";
  return "bg-gray-100 text-gray-700";
}

function daysLeftClass(days) {
  if (days < 7) return "text-red-600";
  if (days < 14) return "text-yellow-600";
  return "text-gray-600";
}

export function IrkDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Панель управления</h2>
        <p className="text-gray-600 mt-1">Обзор состояния инструментального хозяйства</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg text-gray-900">Последние операции</h3>
          </div>
          <div className="p-6 space-y-4">
            {RECENT_OPS.map((op) => (
              <div key={op.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <p className="text-gray-900">{op.instrument}</p>
                  <p className="text-sm text-gray-600">{op.employee}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 text-xs ${opBadgeClass(op.type)}`}>{op.type}</span>
                  <p className="text-sm text-gray-500 mt-1">{op.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg text-gray-900">Предстоящие поверки</h3>
          </div>
          <div className="p-6 space-y-4">
            {UPCOMING.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <p className="text-gray-900">{item.instrument}</p>
                  <p className="text-sm text-gray-600">{item.invNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{item.dueDate}</p>
                  <p className={`text-sm mt-1 ${daysLeftClass(item.daysLeft)}`}>
                    Через {item.daysLeft} дней
                  </p>
                </div>
              </div>
            ))}
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
            <Calendar className="w-8 h-8 text-[#0d9488] mx-auto mb-2" />
            <p className="text-sm text-gray-900">Отправить на поверку</p>
          </button>
          <button type="button" className="p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all">
            <AlertCircle className="w-8 h-8 text-[#0d9488] mx-auto mb-2" />
            <p className="text-sm text-gray-900">Списать инструмент</p>
          </button>
        </div>
      </div>
    </div>
  );
}
