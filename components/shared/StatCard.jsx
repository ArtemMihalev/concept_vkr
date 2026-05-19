/**
 * @param {{ title: string; value: string; change: string; changeSuffix?: string; icon: import("lucide-react").LucideIcon }} props
 */
export function StatCard({ title, value, change, changeSuffix = " за месяц", icon: Icon }) {
  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl text-gray-900 mt-2">{value}</p>
          <p className="text-sm text-[#0d9488] mt-2">
            {change}
            {changeSuffix}
          </p>
        </div>
        <div className="bg-[#f0fdfa] p-3">
          <Icon className="w-6 h-6 text-[#0d9488]" />
        </div>
      </div>
    </div>
  );
}
