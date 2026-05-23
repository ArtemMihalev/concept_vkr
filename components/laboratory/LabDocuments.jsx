import { FileText, ShieldAlert } from "lucide-react";
import { useFetch } from "../api/useFetch.js";
import { formatDate } from "../shared/statusMaps.js";

export function LabDocuments() {
  const { data: rejections, loading: loadRej } = useFetch("/api/documents?docType=rejection_notice&targetRole=irk");
  const { data: certificates, loading: loadCert } = useFetch("/api/documents?docType=certificate&targetRole=irk");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Документы</h2>
        <p className="text-gray-600 mt-1">Браковочные извещения и сертификаты</p>
      </div>

      <section className="bg-white border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          <h3 className="text-gray-900">Браковочные извещения → кладовщику ИРК</h3>
        </div>
        {loadRej ? (
          <p className="p-6 text-gray-600">Загрузка...</p>
        ) : (
          <DocList docs={rejections} emptyText="Нет браковочных извещений" />
        )}
      </section>

      <section className="bg-white border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#0d9488]" />
          <h3 className="text-gray-900">Сертификаты мерительного инструмента</h3>
        </div>
        {loadCert ? (
          <p className="p-6 text-gray-600">Загрузка...</p>
        ) : (
          <DocList docs={certificates} emptyText="Нет сертификатов" showNextDate />
        )}
      </section>
    </div>
  );
}

function DocList({ docs, emptyText, showNextDate }) {
  return (
    <ul className="divide-y divide-gray-200">
      {(docs || []).map((doc) => (
        <li key={doc.id} className="px-6 py-4">
          <p className="text-sm text-gray-900">{doc.title}</p>
          <p className="text-xs text-gray-500 mt-1">{formatDate(doc.createdAt)}</p>
          {showNextDate && doc.payload?.nextDate && (
            <p className="text-xs text-[#0d9488] mt-1">След. поверка: {formatDate(doc.payload.nextDate)}</p>
          )}
          {doc.payload?.failReason && (
            <p className="text-xs text-red-600 mt-1">Причина: {doc.payload.failReason}</p>
          )}
        </li>
      ))}
      {(docs || []).length === 0 && <li className="px-6 py-8 text-center text-sm text-gray-500">{emptyText}</li>}
    </ul>
  );
}
