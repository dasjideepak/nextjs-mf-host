import { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { ReactNode } from "react";

interface GlobalState {
  count: number;
  increment: () => void;
  decrement: () => void;
  setCount: (value: number) => void;
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);
  const setCountValue = useCallback((value: number) => setCount(value), []);

  const value = useMemo<GlobalState>(
    () => ({ count, increment, decrement, setCount: setCountValue }),
    [count, increment, decrement, setCountValue],
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
