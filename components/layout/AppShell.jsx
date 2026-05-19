import {
  Bell,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  X
} from "lucide-react";

/**
 * @param {{
 *   title: string;
 *   userDisplayName: string;
 *   sidebarOpen: boolean;
 *   onToggleSidebar: () => void;
 *   tabs: { id: string; name: string; icon: import("lucide-react").LucideIcon }[];
 *   activeTab: string;
 *   onTabChange: (id: string) => void;
 *   onLogout: () => void;
 *   children: import("react").ReactNode;
 * }} props
 */
export function AppShell({
  title,
  userDisplayName,
  sidebarOpen,
  onToggleSidebar,
  tabs,
  activeTab,
  onTabChange,
  onLogout,
  children
}) {
  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="bg-[#0d9488] border-b border-[#0f766e] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 hover:bg-[#0f766e] transition-colors text-white"
            aria-label={sidebarOpen ? "Скрыть меню" : "Показать меню"}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="text-xl text-white">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Поиск..."
              className="pl-10 pr-4 py-2 bg-[#0f766e] border border-[#14b8a6] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
          <button
            type="button"
            className="p-2 hover:bg-[#0f766e] transition-colors relative text-white"
            aria-label="Уведомления"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500" />
          </button>
          <button type="button" className="flex items-center gap-2 px-3 py-2 hover:bg-[#0f766e] transition-colors text-white">
            <User className="w-5 h-5" />
            <span className="text-sm">{userDisplayName}</span>
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="p-2 hover:bg-[#0f766e] transition-colors text-white"
            title="Сменить профиль"
            aria-label="Выйти"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r border-gray-200 p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onTabChange(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                      active
                        ? "bg-[#f0fdfa] text-[#0d9488] border-l-4 border-[#0d9488]"
                        : "text-gray-700 hover:bg-gray-50 border-l-4 border-transparent"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-l-4 border-transparent"
              >
                <Settings className="w-5 h-5" />
                <span>Настройки</span>
              </button>
            </div>
          </aside>
        )}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
