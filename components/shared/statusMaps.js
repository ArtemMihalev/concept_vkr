export const INSTRUMENT_STATUS = {
  available: { text: "В наличии", className: "bg-green-50 text-green-700" },
  issued: { text: "Выдан", className: "bg-[#e0f2f1] text-[#0d9488]" },
  verification: { text: "На поверке", className: "bg-yellow-50 text-yellow-700" },
  written_off: { text: "Списан", className: "bg-gray-100 text-gray-600" }
};

export const VERIFICATION_STATUS = {
  scheduled: { text: "Запланирована", className: "bg-blue-50 text-blue-700" },
  in_progress: { text: "В процессе", className: "bg-[#e0f2f1] text-[#0d9488]" },
  completed: { text: "Завершена", className: "bg-green-50 text-green-700" },
  overdue: { text: "Просрочена", className: "bg-red-50 text-red-700" },
  failed: { text: "Не пройдена", className: "bg-red-50 text-red-700" }
};

export const ORDER_STATUS = {
  new: { text: "Новая", className: "bg-blue-50 text-blue-700" },
  processing: { text: "В обработке", className: "bg-yellow-50 text-yellow-700" },
  transferred: { text: "Передан", className: "bg-[#e0f2f1] text-[#0d9488]" },
  received: { text: "Получен", className: "bg-green-50 text-green-700" }
};

export const URGENCY = {
  soon: { text: "В ближайшие 7 дней", className: "bg-yellow-50 text-yellow-700" },
  later: { text: "Позже", className: "bg-blue-50 text-blue-700" },
  overdue: { text: "Просрочено", className: "bg-red-50 text-red-700" }
};

export function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("ru-RU");
}
