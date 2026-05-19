import { AlertCircle, Calendar, ClipboardCheck, FlaskConical } from "lucide-react";
import { StatCard } from "../shared/StatCard.jsx";

const STATS = [
  { title: "На поверке", value: "47", change: "+3%", icon: FlaskConical, changeSuffix: " за неделю" },
  { title: "Поверено сегодня", value: "12", change: "+2", icon: ClipboardCheck, changeSuffix: " за неделю" },
  { title: "Просрочено", value: "5", change: "-1", icon: AlertCircle, changeSuffix: " за неделю" },
  { title: "Запланировано", value: "28", change: "+7", icon: Calendar, changeSuffix: " за неделю" }
];

const CURRENT = [
  { id: 1, instrument: "Штангенциркуль ШЦ-I-150", invNumber: "ИН-001234", startDate: "08.04.2026", estimatedEnd: "10.04.2026", status: "В процессе" },
  { id: 2, instrument: "Микрометр МК-25", invNumber: "ИН-001235", startDate: "09.04.2026", estimatedEnd: "11.04.2026", status: "В процессе" },
  { id: 3, instrument: "Калибр-пробка", invNumber: "ИН-001236", startDate: "09.04.2026", estimatedEnd: "09.04.2026", status: "Завершается" }
];

const SCHEDULED = [
  { id: 1, instrument: "Манометр МП-100", invNumber: "ИН-001240", scheduledDate: "10.04.2026", type: "Плановая" },
  { id: 2, instrument: "Термометр ТТ-150", invNumber: "ИН-001241", scheduledDate: "11.04.2026", type: "Плановая" },
  { id: 3, instrument: "Весы лабораторные ВЛ-200", invNumber: "ИН-001242", scheduledDate: "12.04.2026", type: "Внеплановая" }
];

function statusClass(status) {
  if (status === "В процессе") return "bg-[#e0f2f1] text-[#0d9488]";
  return "bg-yellow-50 text-yellow-700";
}

export function LabDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Метрологическая лаборатория</h2>
        <p className="text-gray-600 mt-1">Управление поверкой и калибровкой оборудования</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg text-gray-900">Текущие поверки</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {CURRENT.map((item) => (
                <div key={item.id} className="py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-900">{item.instrument}</p>
                    <span className={`px-3 py-1 text-xs ${statusClass(item.status)}`}>{item.status}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.invNumber}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Начало: {item.startDate}</span>
                    <span>•</span>
                    <span>Окончание: {item.estimatedEnd}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg text-gray-900">Расписание поверок</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {SCHEDULED.map((item) => (
                <div key={item.id} className="py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-900">{item.instrument}</p>
                    <span
                      className={`px-3 py-1 text-xs ${
                        item.type === "Плановая" ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-700"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{item.invNumber}</p>
                  <p className="text-sm text-gray-500">Дата: {item.scheduledDate}</p>
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
            <FlaskConical className="w-8 h-8 text-[#0d9488] mx-auto mb-2" />
            <p className="text-sm text-gray-900">Начать поверку</p>
          </button>
          <button type="button" className="p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all">
            <ClipboardCheck className="w-8 h-8 text-[#0d9488] mx-auto mb-2" />
            <p className="text-sm text-gray-900">Завершить поверку</p>
          </button>
          <button type="button" className="p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all">
            <Calendar className="w-8 h-8 text-[#0d9488] mx-auto mb-2" />
            <p className="text-sm text-gray-900">Планировать поверку</p>
          </button>
          <button type="button" className="p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all">
            <AlertCircle className="w-8 h-8 text-[#0d9488] mx-auto mb-2" />
            <p className="text-sm text-gray-900">Просроченные</p>
          </button>
        </div>
      </div>
    </div>
  );
}
