import { useEffect, type ReactNode } from "react";
import { rehydrateAppStore, useAppStore } from "@/lib/app-store";

export function HydrateGate({ children }: { children: ReactNode }) {
  useEffect(() => {
    rehydrateAppStore();
    const t = window.setTimeout(() => {
      const st = useAppStore.getState();
      if (!st.hydrated) st.setHydrated(true);
    }, 1200);
    return () => window.clearTimeout(t);
  }, []);

  return children;
}
