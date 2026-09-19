import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Copy, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppStore } from "@/lib/app-store";
import { formatVisitStamp } from "@/lib/dates";
import type { Visit } from "@/lib/types";

export const Route = createFileRoute("/magaza/$storeId")({
  component: StorePage,
});

function StorePage() {
  const { storeId } = Route.useParams();
  const navigate = useNavigate();
  const store = useAppStore((s) => s.stores.find((x) => x.id === storeId));
  const visits = useAppStore((s) => s.visits);
  const createVisit = useAppStore((s) => s.createVisit);
  const deleteVisit = useAppStore((s) => s.deleteVisit);
  const [toDelete, setToDelete] = useState<Visit | null>(null);

  const storeVisits = visits
    .filter((v) => v.storeId === storeId)
    .sort((a, b) => b.createdAt - a.createdAt);
  const last = storeVisits[0];

  if (!store) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-muted">Mağaza bulunamadı.</p>
        <Link to="/" className="mt-4 inline-block text-sm font-medium underline">
          Mağazalara dön
        </Link>
      </main>
    );
  }

  function openNew(copyLast: boolean) {
    const visit = createVisit(storeId, copyLast ? last : null);
    if (!visit) return;
    toast.success(
      copyLast ? "Son ziyaret kopyalandı" : `${visit.number}. ziyaret açıldı`,
    );
    void navigate({ to: "/ziyaret/$visitId", params: { visitId: visit.id } });
  }

  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-4 pb-16 pt-4">
      <Link
        to="/"
        className="inline-flex h-11 items-center gap-1 text-sm font-medium text-muted hover:text-fg"
      >
        <ChevronLeft className="size-4" />
        Mağazalar
      </Link>

      <header className="mt-2 mb-5">
        <h1 className="text-2xl font-semibold tracking-tight">{store.name}</h1>
        <p className="mt-1 text-sm text-muted">
          İlk ziyarette şablon açılır; sonraki ziyaretlerde yeni tarih ve saat
          ile devam edilir. Kopyala, son raporun notlarını yeni ziyarete taşır.
        </p>
      </header>

      <div className="mb-5 flex flex-wrap gap-2">
        <Button variant="ink" onClick={() => openNew(false)}>
          <Plus className="size-4" />
          Yeni Ziyaret
        </Button>
        <Button
          variant="outline"
          disabled={!last}
          onClick={() => openNew(true)}
        >
          <Copy className="size-4" />
          Sonuncuyu kopyala
        </Button>
      </div>

      {storeVisits.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface px-5 py-10 text-center">
          <p className="font-medium">Henüz ziyaret yok</p>
          <p className="mt-1 text-sm text-muted">
            Şablon maddeleriyle ilk raporu oluşturun.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {storeVisits.map((v) => (
            <li key={v.id}>
              <div className="flex items-stretch overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-card)]">
                <button
                  type="button"
                  className="flex min-w-0 flex-1 flex-col px-4 py-3.5 text-left"
                  onClick={() =>
                    navigate({
                      to: "/ziyaret/$visitId",
                      params: { visitId: v.id },
                    })
                  }
                >
                  <span className="text-sm font-semibold">
                    {v.number}. Ziyaret
                  </span>
                  <span className="mt-0.5 text-xs text-muted tabular-nums">
                    {formatVisitStamp(v.createdAt)}
                  </span>
                </button>
                <button
                  type="button"
                  className="inline-flex w-12 items-center justify-center text-muted hover:bg-surface-2 hover:text-primary"
                  aria-label="Ziyareti sil"
                  onClick={() => setToDelete(v)}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AlertDialog
        open={Boolean(toDelete)}
        onOpenChange={(o) => !o && setToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rapor silinsin mi?</AlertDialogTitle>
            <AlertDialogDescription>
              {toDelete?.number}. ziyaret ve içindeki notlar / fotoğraflar
              silinir.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Vazgeç</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (toDelete) {
                  deleteVisit(toDelete.id);
                  toast.success("Ziyaret silindi");
                }
                setToDelete(null);
              }}
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
