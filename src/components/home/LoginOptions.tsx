import type { UserRole } from "@/context/GlobalContext";
import { Button } from "@dasjideepak/mf-shared-ui";
import { RoleLoginCard } from "@/components/home/RoleLoginCard";
import { ShieldCheck, User } from "lucide-react";

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
              <User className="h-6 w-6 text-blue-600" aria-hidden="true" />
            </div>
          }
        />

        <RoleLoginCard
          title="Admin"
          description="Manage all users, system settings and platform analytics."
          onClick={() => onRoleLogin("admin")}
          icon={
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 transition-colors group-hover:bg-emerald-200">
              <ShieldCheck className="h-6 w-6 text-emerald-600" aria-hidden="true" />
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
