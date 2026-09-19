import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Printer, Share2 } from "lucide-react";
import { toast } from "sonner";
import { ReportDocument } from "@/components/report-document";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/app-store";
import { formatVisitStamp } from "@/lib/dates";
import { captureNodePng, shareOrDownload, visitShareName } from "@/lib/share";
import type { Store, Visit } from "@/lib/types";

export const Route = createFileRoute("/rapor/$visitId")({
  component: ReportPage,
});

function ReportPage() {
  const { visitId } = Route.useParams();
  const visit = useAppStore((s) => s.visits.find((v) => v.id === visitId));
  const store = useAppStore((s) =>
    visit ? s.stores.find((st) => st.id === visit.storeId) : undefined,
  );

  if (!visit || !store) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-muted">Rapor bulunamadı.</p>
        <Link to="/" className="mt-4 inline-block text-sm font-medium underline">
          Mağazalara dön
        </Link>
      </main>
    );
  }

  return <ReportBody visit={visit} store={store} />;
}

function ReportBody({ visit, store }: { visit: Visit; store: Store }) {
  const captureRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  async function share() {
    const node = captureRef.current;
    if (!node) return;
    setBusy(true);
    const hide = toast.loading("Sayfa hazırlanıyor…");
    try {
      const blob = await captureNodePng(node);
      const name = visitShareName(store.name, visit.createdAt);
      const result = await shareOrDownload({
        blob,
        filename: `${name}.png`,
        title: `${store.name} ziyaret raporu`,
        text: `${store.name} ziyaret raporu · ${formatVisitStamp(visit.createdAt)}`,
      });
      toast.dismiss(hide);
      if (result === "shared") toast.success("Paylaşım açıldı");
      else toast.success("Sayfa görseli indirildi");
    } catch {
      toast.dismiss(hide);
      toast.error("Sayfa oluşturulamadı");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-dvh bg-bg">
      <header className="no-print sticky top-0 z-30 border-b border-border bg-surface/95 px-3 py-2 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-2">
          <Link
            to="/ziyaret/$visitId"
            params={{ visitId: visit.id }}
            className="inline-flex h-10 items-center gap-1 text-sm font-medium text-muted hover:text-fg"
          >
            <ChevronLeft className="size-4" />
            Düzenle
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{store.name} · sayfa</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="size-3.5" />
            PDF / Yazdır
          </Button>
          <Button
            variant="whatsapp"
            size="sm"
            disabled={busy}
            onClick={() => void share()}
          >
            <Share2 className="size-3.5" />
            WhatsApp
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-2 py-4 sm:px-4">
        <div
          ref={captureRef}
          className="report-print overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]"
        >
          <ReportDocument visit={visit} store={store} />
        </div>
      </div>
    </div>
  );
}
