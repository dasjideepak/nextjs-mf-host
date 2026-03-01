declare module "remote1/DashboardApp" {
  import type { ComponentType } from "react";

  interface SharedState {
    count: number;
    increment: () => void;
    decrement: () => void;
    setCount: (value: number) => void;
  }

  const DashboardApp: ComponentType<{ sharedState?: SharedState }>;
  export default DashboardApp;
}

declare module "remote2/DashboardApp" {
  import type { ComponentType } from "react";

  interface SharedState {
    count: number;
    increment: () => void;
    decrement: () => void;
    setCount: (value: number) => void;
  }

  const DashboardApp: ComponentType<{ sharedState?: SharedState }>;
  export default DashboardApp;
}
