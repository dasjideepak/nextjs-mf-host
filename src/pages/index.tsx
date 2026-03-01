import { useGlobalContext } from "@/context/GlobalContext";
import type { UserRole } from "@/context/GlobalContext";
import { LoadingState } from "@/components/home/LoadingState";
import { AuthWelcomeCard } from "@/components/home/AuthWelcomeCard";
import { LoginHero } from "@/components/home/LoginHero";
import { LoginOptions } from "@/components/home/LoginOptions";

export default function Home() {
  const { isHydrated, isAuthenticated, user, loginAs, logout } = useGlobalContext();

  const navigateTo = (path: string) => {
    if (typeof window !== "undefined") window.location.assign(path);
  };

  const handleLogin = (role: UserRole) => {
    loginAs(role);
    navigateTo("/dashboard");
  };

  const handleQuickDemo = () => {
    const randomRole: UserRole = Math.random() > 0.5 ? "customer" : "admin";
    handleLogin(randomRole);
  };

  if (!isHydrated) {
    return <LoadingState />;
  }

  if (isAuthenticated && user) {
    return <AuthWelcomeCard user={user} onLogout={logout} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-8">
        <LoginHero />
        <LoginOptions onRoleLogin={handleLogin} onQuickDemo={handleQuickDemo} />

        <p className="text-center text-xs text-gray-400">
          This is a demo login. In production this connects to your auth provider.
        </p>
      </div>
    </div>
  );
}
