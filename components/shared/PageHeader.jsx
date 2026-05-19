/**
 * @param {{ title: string; subtitle: string; action?: import("react").ReactNode }} props
 */
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-1">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}
