import { useState } from 'react'
import {
  LayoutDashboard,
  Package,
  ArrowRightLeft,
  FileText,
  Settings,
  Bell,
  Search,
  User,
  Menu,
  X,
} from 'lucide-react'
import Dashboard from './components/Dashboard'
import Instruments from './components/Instruments'
import Operations from './components/Operations'
import Reports from './components/Reports'

type TabType = 'dashboard' | 'instruments' | 'operations' | 'reports'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const tabs = [
    { id: 'dashboard' as TabType, name: 'Панель управления', icon: LayoutDashboard },
    { id: 'instruments' as TabType, name: 'Инструменты', icon: Package },
    { id: 'operations' as TabType, name: 'Операции', icon: ArrowRightLeft },
    { id: 'reports' as TabType, name: 'Отчеты', icon: FileText },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'instruments':
        return <Instruments />
      case 'operations':
        return <Operations />
      case 'reports':
        return <Reports />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label={sidebarOpen ? 'Скрыть меню' : 'Показать меню'}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            ИС Учета Инструментов ИРК
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Поиск..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="button" className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button type="button" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium">Кладовщик ИРК</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r border-gray-200 p-4 shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                )
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Настройки</span>
              </button>
            </div>
          </aside>
        )}

        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
