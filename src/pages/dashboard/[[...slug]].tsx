import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { Button, Badge } from "@dasjideepak/mf-shared-ui";

function RemoteUnavailable({ remoteName }: { remoteName: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-red-200 bg-red-50/50 px-6 py-16 text-center">
      <svg
        className="h-12 w-12 text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
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
  const {
    isHydrated,
    isAuthenticated,
    user,
    logout,
    theme,
    toggleTheme,
    notifications,
    addNotification,
    dismissNotification,
    clearNotifications,
  } = useGlobalContext();

  useEffect(() => {
    if (isHydrated && !isAuthenticated && typeof window !== "undefined") {
      window.location.replace("/");
    }
  }, [isHydrated, isAuthenticated]);

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
    theme,
    toggleTheme,
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
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              )}
            </button>

            <div className="relative">
              <Badge variant={unreadCount > 0 ? "red" : "gray"}>
                {unreadCount} {unreadCount === 1 ? "notification" : "notifications"}
              </Badge>
            </div>

            <Badge variant={user.role === "admin" ? "green" : "blue"}>{user.role}</Badge>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.id}</p>
            </div>
            <div className="h-6 w-px bg-gray-200" />
            <Button variant="ghost" size="sm" onClick={logout}>
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
