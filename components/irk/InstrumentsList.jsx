import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useFetch } from "../api/useFetch.js";
import { INSTRUMENT_STATUS, formatDate } from "../shared/statusMaps.js";

const TYPE_OPTIONS = [
  { id: "all", label: "Все типы" },
  { id: "locksmith", label: "Слесарный" },
  { id: "measuring", label: "Мерительный" }
];

const STATUS_OPTIONS = [
  { id: "all", label: "Все статусы" },
  { id: "available", label: "В наличии" },
  { id: "issued", label: "Выдан" },
  { id: "verification", label: "На поверке" },
  { id: "written_off", label: "Списан" }
];

export function InstrumentsList() {
  const [search, setSearch] = useState("");
  const [toolType, setToolType] = useState("all");
  const [status, setStatus] = useState("all");
  const [location, setLocation] = useState("all");

  const query = useMemo(() => {
    const p = new URLSearchParams();
    if (toolType !== "all") p.set("toolType", toolType);
    if (status !== "all") p.set("status", status);
    if (location !== "all") p.set("location", location);
    if (search) p.set("search", search);
    return `/api/instruments?${p.toString()}`;
  }, [toolType, status, location, search]);

  const { data: instruments, loading } = useFetch(query, { deps: [query] });
  const { data: locations } = useFetch("/api/instruments/locations");

  const list = instruments || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Инструменты</h2>
        <p className="text-gray-600 mt-1">Каталог слесарного и мерительного инструмента</p>
      </div>

      <div className="bg-white border border-gray-200 p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по наименованию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {TYPE_OPTIONS.map((o) => (
            <FilterBtn key={o.id} active={toolType === o.id} onClick={() => setToolType(o.id)} label={o.label} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((o) => (
            <FilterBtn key={o.id} active={status === o.id} onClick={() => setStatus(o.id)} label={o.label} />
          ))}
        </div>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="all">Все места хранения</option>
          {(locations || []).map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white border border-gray-200 overflow-x-auto">
        {loading ? (
          <p className="p-6 text-gray-600">Загрузка...</p>
        ) : (
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Наименование</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Категория</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Инв. / Кол-во</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Остаток</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Статус</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Место хранения</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">След. поверка</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {list.map((item) => {
                const badge = INSTRUMENT_STATUS[item.status] || INSTRUMENT_STATUS.available;
                const isMeasuring = item.toolType === "measuring";
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.categoryName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {isMeasuring ? item.inventoryNumber : `${item.totalQuantity} шт.`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {isMeasuring ? "1 ед." : `${item.stockQuantity} / ${item.totalQuantity}`}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs ${badge.className}`}>{badge.text}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {isMeasuring ? formatDate(item.nextVerificationDate) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function FilterBtn({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-sm border ${
        active ? "bg-[#0d9488] text-white border-[#0d9488]" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}
