import { useState } from "react";
import { FlaskConical, Package, Wrench } from "lucide-react";
import { setAuthToken } from "../api/client.js";

const ROLE_LABELS = {
  irk: "Кладовщик ИРК",
  "tool-warehouse": "Кладовщик инструментального склада",
  laboratory: "Лаборант"
};

const PROFILES = [
  {
    id: "irk",
    title: "Кладовщик ИРК",
    description: "Учет измерительных и слесарно-монтажных инструментов",
    icon: Package
  },
  {
    id: "tool-warehouse",
    title: "Кладовщик инструментального склада",
    description: "Управление общим инструментальным складом",
    icon: Wrench
  },
  {
    id: "laboratory",
    title: "Лаборант",
    description: "Работа с поверкой и калибровкой оборудования",
    icon: FlaskConical
  }
];

/**
 * @param {{ onAuthSuccess: (user: { id: number; login: string; fullName: string; role: string; token?: string }) => void }} props
 */
export function AuthScreen({ onAuthSuccess }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const url = isRegister ? "/api/auth/register" : "/api/auth/login";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: selectedRole,
          login,
          password,
          ...(isRegister ? { fullName } : {})
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка входа");
      if (data.token) setAuthToken(data.token);
      onAuthSuccess({ ...data.user, token: data.token });
      setSelectedRole(null);
      setLogin("");
      setPassword("");
      setFullName("");
      setIsRegister(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка входа");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-[#0d9488] border-b border-[#0f766e]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-white text-2xl">Информационная система учета инструментов</h1>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-3">Выберите профиль</h2>
            <p className="text-gray-600">Выберите роль для работы с системой</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROFILES.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setSelectedRole(p.id);
                    setError("");
                  }}
                  className="group bg-white border-2 border-gray-200 p-8 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all text-left"
                >
                  <div className="w-14 h-14 bg-[#f0fdfa] flex items-center justify-center mb-6 group-hover:bg-[#0d9488] transition-colors">
                    <Icon className="w-7 h-7 text-[#0d9488] group-hover:text-white" />
                  </div>
                  <h3 className="text-lg text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-600">{p.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </main>
      {selectedRole && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-white border border-gray-200 p-6">
            <h3 className="text-xl text-gray-900 mb-2">{isRegister ? "Регистрация" : "Вход в систему"}</h3>
            <p className="text-sm text-gray-600 mb-5">
              Выбран профиль: {ROLE_LABELS[selectedRole]}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-sm text-gray-700 mb-1">ФИО</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/40"
                    placeholder="Введите ФИО"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm text-gray-700 mb-1">Логин</label>
                <input
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/40"
                  placeholder="Введите логин"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Пароль</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/40"
                  placeholder="Введите пароль"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setFullName("");
                  setIsRegister((v) => !v);
                }}
                className="text-sm text-[#0d9488] hover:text-[#0f766e] underline underline-offset-2"
              >
                {isRegister ? "У меня уже есть аккаунт" : "Зарегистрироваться"}
              </button>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole(null);
                    setError("");
                    setFullName("");
                    setIsRegister(false);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] disabled:opacity-70 transition-colors"
                >
                  {loading ? (isRegister ? "Регистрируем..." : "Входим...") : isRegister ? "Зарегистрироваться" : "Войти"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
