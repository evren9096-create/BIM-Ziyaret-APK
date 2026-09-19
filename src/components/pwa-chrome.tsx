import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { WifiOff } from "lucide-react";
import { registerServiceWorker } from "@/lib/pwa";

export function PwaChrome() {
  const router = useRouter();
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    setOffline(typeof navigator !== "undefined" && !navigator.onLine);
    const onOff = () => setOffline(true);
    const onOn = () => setOffline(false);
    window.addEventListener("offline", onOff);
    window.addEventListener("online", onOn);
    void registerServiceWorker();
    void router.preloadRoute({ to: "/sablon" });
    void router.preloadRoute({ to: "/magaza/$storeId", params: { storeId: "store_1" } });
    void router.preloadRoute({ to: "/ziyaret/$visitId", params: { visitId: "_" } });
    void router.preloadRoute({ to: "/rapor/$visitId", params: { visitId: "_" } });
    return () => {
      window.removeEventListener("offline", onOff);
      window.removeEventListener("online", onOn);
    };
  }, [router]);

  if (!offline) return null;

  return (
    <div
      role="status"
      className="no-print sticky top-0 z-40 bg-ink px-3 py-2 text-center text-xs font-medium text-primary-fg"
      style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top))" }}
    >
      <span className="inline-flex items-center gap-1.5">
        <WifiOff className="size-3.5" />
        Çevrimdışı — ziyaretler bu telefonda kayıtlı
      </span>
    </div>
  );
}
