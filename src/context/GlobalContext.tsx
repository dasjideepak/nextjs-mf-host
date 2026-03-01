import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import type { ReactNode } from "react";

export type UserRole = "customer" | "admin";
export type Theme = "light" | "dark";
export type NotificationType = "info" | "success" | "warning" | "error";

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
}

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  timestamp: number;
}

export interface GlobalState {
  isHydrated: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  theme: Theme;
  toggleTheme: () => void;
  notifications: Notification[];
  addNotification: (message: string, type: NotificationType) => void;
  dismissNotification: (id: string) => void;
  clearNotifications: () => void;
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);
const PERSISTENCE_KEY = "mf-host-global-state";

interface PersistedGlobalState {
  user: AuthUser | null;
  theme: Theme;
  notifications: Notification[];
}

let notifCounter = 0;

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const loginAs = useCallback((role: UserRole) => {
    setUser({
      id: role === "admin" ? "u-admin-01" : "u-customer-01",
      name: role === "admin" ? "Admin User" : "Customer User",
      role,
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const addNotification = useCallback((message: string, type: NotificationType) => {
    notifCounter += 1;
    const newNotif: Notification = {
      id: `notif-${Date.now()}-${notifCounter}`,
      message,
      type,
      timestamp: Date.now(),
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(PERSISTENCE_KEY);
      if (!raw) {
        setIsHydrated(true);
        return;
      }

      const parsed = JSON.parse(raw) as PersistedGlobalState;
      setUser(parsed.user ?? null);
      setTheme(parsed.theme ?? "light");
      setNotifications(Array.isArray(parsed.notifications) ? parsed.notifications : []);
    } catch {
      window.localStorage.removeItem(PERSISTENCE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;

    const persisted: PersistedGlobalState = { user, theme, notifications };
    window.localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(persisted));
  }, [isHydrated, user, theme, notifications]);

  const value = useMemo<GlobalState>(
    () => ({
      isHydrated,
      isAuthenticated: Boolean(user),
      user,
      loginAs,
      logout,
      theme,
      toggleTheme,
      notifications,
      addNotification,
      dismissNotification,
      clearNotifications,
    }),
    [
      isHydrated,
      user,
      loginAs,
      logout,
      theme,
      toggleTheme,
      notifications,
      addNotification,
      dismissNotification,
      clearNotifications,
    ],
  );

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export function useGlobalContext(): GlobalState {
  const ctx = useContext(GlobalContext);
  if (ctx === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return ctx;
}

export default GlobalContext;
