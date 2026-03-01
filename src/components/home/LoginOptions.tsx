import type { UserRole } from "@/context/GlobalContext";
import { Button } from "@dasjideepak/mf-shared-ui";
import { RoleLoginCard } from "@/components/home/RoleLoginCard";

interface LoginOptionsProps {
  onRoleLogin: (role: UserRole) => void;
  onQuickDemo: () => void;
}

export function LoginOptions({ onRoleLogin, onQuickDemo }: LoginOptionsProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <RoleLoginCard
          title="Customer"
          description="View orders, manage your profile and account settings."
          onClick={() => onRoleLogin("customer")}
          icon={
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 transition-colors group-hover:bg-blue-200">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          }
        />

        <RoleLoginCard
          title="Admin"
          description="Manage all users, system settings and platform analytics."
          onClick={() => onRoleLogin("admin")}
          icon={
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 transition-colors group-hover:bg-emerald-200">
              <svg
                className="h-6 w-6 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </div>
          }
        />
      </div>

      <div className="rounded-xl border border-dashed border-indigo-300 bg-indigo-50/40 p-4 text-center">
        <p className="text-sm text-indigo-700">Need a quick tour? Start with a one-click demo login.</p>
        <Button variant="secondary" className="mt-3" onClick={onQuickDemo}>
          Quick Demo Login
        </Button>
      </div>
    </>
  );
}
