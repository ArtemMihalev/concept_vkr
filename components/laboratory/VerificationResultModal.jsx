import { useState } from "react";
import { X } from "lucide-react";
import { api } from "../api/client.js";

const FAIL_REASONS = [
  { id: "wear", label: "Износ" },
  { id: "accuracy", label: "Отклонение точности" },
  { id: "damage", label: "Повреждение" }
];

/**
 * @param {{ verification: { id: number; instrumentName: string; inventoryNumber: string } | null; onClose: () => void; onSaved: () => void }} props
 */
export function VerificationResultModal({ verification, onClose, onSaved }) {
  const [result, setResult] = useState("pass");
  const [failReason, setFailReason] = useState("wear");
  const [comment, setComment] = useState("");
  const [nextDate, setNextDate] = useState("");
  const [autoNext, setAutoNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!verification) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post(`/api/verifications/${verification.id}/result`, {
        result,
        failReason: result === "fail" ? failReason : null,
        comment,
        nextVerificationDate: autoNext ? undefined : nextDate
      });
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-lg bg-white border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg text-gray-900">Внесение результата поверки</h3>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-gray-600">
            {verification.instrumentName} ({verification.inventoryNumber})
          </p>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Результат</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" checked={result === "pass"} onChange={() => setResult("pass")} />
                Годен
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" checked={result === "fail"} onChange={() => setResult("fail")} />
                Не годен
              </label>
            </div>
          </div>
          {result === "fail" && (
            <>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Причина брака</label>
                <select
                  value={failReason}
                  onChange={(e) => setFailReason(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2"
                >
                  {FAIL_REASONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Комментарий</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 px-3 py-2"
                />
              </div>
            </>
          )}
          {result === "pass" && (
            <div>
              <label className="flex items-center gap-2 text-sm mb-2">
                <input type="checkbox" checked={autoNext} onChange={(e) => setAutoNext(e.target.checked)} />
                Дата следующей поверки (+1 год, автоматически)
              </label>
              {!autoNext && (
                <input
                  type="date"
                  value={nextDate}
                  onChange={(e) => setNextDate(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2"
                  required
                />
              )}
            </div>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700">
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] disabled:opacity-60"
            >
              {loading ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
