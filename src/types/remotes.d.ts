declare module "remote1/DashboardShell" {
  import type { ComponentType } from "react";

  type NotificationType = "info" | "success" | "warning" | "error";

  interface Notification {
    id: string;
    message: string;
    type: NotificationType;
    timestamp: number;
  }

  interface SharedDashboardState {
    notifications: Notification[];
    addNotification: (message: string, type: NotificationType) => void;
    dismissNotification: (id: string) => void;
    clearNotifications: () => void;
  }

  const DashboardShell: ComponentType<{ sharedState?: SharedDashboardState }>;
  export default DashboardShell;
}

declare module "remote2/DashboardShell" {
  import type { ComponentType } from "react";

  type NotificationType = "info" | "success" | "warning" | "error";

  interface Notification {
    id: string;
    message: string;
    type: NotificationType;
    timestamp: number;
  }

  interface SharedDashboardState {
    notifications: Notification[];
    addNotification: (message: string, type: NotificationType) => void;
    dismissNotification: (id: string) => void;
    clearNotifications: () => void;
  }

  const DashboardShell: ComponentType<{ sharedState?: SharedDashboardState }>;
  export default DashboardShell;
}
