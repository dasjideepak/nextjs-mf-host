import type { ReactNode } from "react";

interface RoleLoginCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}

export function RoleLoginCard({ title, description, icon, onClick }: RoleLoginCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-xl border-2 border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:border-indigo-500 hover:shadow-md"
    >
      {icon}
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </button>
  );
}
