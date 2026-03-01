import Link from "next/link";
import { Button } from "@dasjideepak/mf-shared-ui";
import type { AuthUser } from "@/context/GlobalContext";

interface AuthWelcomeCardProps {
  user: AuthUser;
  onLogout: () => void;
}

export function AuthWelcomeCard({ user, onLogout }: AuthWelcomeCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
            <span className="text-2xl font-bold text-indigo-600">{user.name.charAt(0)}</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Welcome back, {user.name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Signed in as{" "}
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
              {user.role}
            </span>
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <Link href="/dashboard" className="block">
            <Button className="w-full" size="lg">
              Go to Dashboard
            </Button>
          </Link>
          <Button variant="ghost" className="mt-3 w-full" onClick={onLogout}>
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
