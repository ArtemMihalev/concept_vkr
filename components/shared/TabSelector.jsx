/**
 * @param {{ tabs: { id: string; name: string; icon: import("lucide-react").LucideIcon }[]; activeId: string; onChange: (id: string) => void }} props
 */
export function TabSelector({ tabs, activeId, onChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeId === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`p-6 border-2 transition-all ${
              active ? "border-[#0d9488] bg-[#f0fdfa]" : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="bg-[#f0fdfa] w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Icon className="w-6 h-6 text-[#0d9488]" />
            </div>
            <p className={`text-center ${active ? "text-[#0d9488]" : "text-gray-900"}`}>{tab.name}</p>
          </button>
        );
      })}
    </div>
  );
}
