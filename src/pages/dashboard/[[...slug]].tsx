import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/compat/router";
import { useGlobalContext } from "@/context/GlobalContext";
import { Button, Badge } from "@dasjideepak/mf-shared-ui";
import { AlertTriangle } from "lucide-react";

function RemoteUnavailable({ remoteName }: { remoteName: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-red-200 bg-red-50/50 px-6 py-16 text-center">
      <AlertTriangle className="h-12 w-12 text-red-400" aria-hidden="true" />
      <h3 className="mt-4 text-lg font-semibold text-red-800">Remote Unavailable</h3>
      <p className="mt-1 text-sm text-red-600">
        {remoteName} failed to load. Please ensure the remote server is running.
      </p>
    </div>
  );
}

const CustomerDashboardShell = dynamic(
  () =>
    import("remote1/DashboardShell").catch(() => ({
      default: () => <RemoteUnavailable remoteName="Customer App (remote1)" />,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white py-16">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
          <p className="mt-3 text-sm text-gray-500">Loading Customer App...</p>
        </div>
      </div>
    ),
  },
);

const AdminDashboardShell = dynamic(
  () =>
    import("remote2/DashboardShell").catch(() => ({
      default: () => <RemoteUnavailable remoteName="Admin App (remote2)" />,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white py-16">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600" />
          <p className="mt-3 text-sm text-gray-500">Loading Admin App...</p>
        </div>
      </div>
    ),
  },
);

export default function DashboardGatewayPage() {
  const router = useRouter();
  const {
    isHydrated,
    isAuthenticated,
    user,
    logout,
    notifications,
    addNotification,
    dismissNotification,
    clearNotifications,
  } = useGlobalContext();

  const handleLogout = useCallback(() => {
    logout();
    if (!router) return;
    void router.push("/");
  }, [logout, router]);

  useEffect(() => {
    if (isHydrated && !isAuthenticated && router) {
      void router.replace("/");
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-indigo-600" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">Redirecting to login...</p>
      </div>
    );
  }

  const AppShell = user.role === "customer" ? CustomerDashboardShell : AdminDashboardShell;

  const sharedState = {
    notifications,
    addNotification,
    dismissNotification,
    clearNotifications,
  };

  const unreadCount = notifications.length;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600"
            >
              <span className="text-sm font-bold text-white">MF</span>
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-gray-900">Dashboard</h1>
              <p className="text-xs text-gray-500">
                {user.role === "customer" ? "Customer Portal" : "Admin Console"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Badge variant={unreadCount > 0 ? "red" : "gray"}>
                {unreadCount} {unreadCount === 1 ? "notification" : "notifications"}
              </Badge>
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.id}</p>
            </div>
            <div className="h-6 w-px bg-gray-200" />
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <AppShell sharedState={sharedState} />
      </main>
    </div>
  );
}
