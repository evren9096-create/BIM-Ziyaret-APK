import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { StoreCard } from "@/components/store-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/lib/app-store";
import type { Store } from "@/lib/types";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const navigate = useNavigate();
  const stores = useAppStore((s) => s.stores);
  const visits = useAppStore((s) => s.visits);
  const addStore = useAppStore((s) => s.addStore);
  const renameStore = useAppStore((s) => s.renameStore);
  const deleteStore = useAppStore((s) => s.deleteStore);
  const createVisit = useAppStore((s) => s.createVisit);

  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [renameTarget, setRenameTarget] = useState<Store | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Store | null>(null);

  const ordered = [...stores].sort((a, b) => a.order - b.order);

  function startVisit(store: Store) {
    const visit = createVisit(store.id);
    if (!visit) return;
    toast.success(`${store.name} · ${visit.number}. ziyaret açıldı`);
    void navigate({ to: "/ziyaret/$visitId", params: { visitId: visit.id } });
  }

  function openLast(store: Store) {
    const last = visits
      .filter((v) => v.storeId === store.id)
      .sort((a, b) => b.createdAt - a.createdAt)[0];
    if (!last) {
      toast.message("Henüz ziyaret yok");
      return;
    }
    void navigate({ to: "/ziyaret/$visitId", params: { visitId: last.id } });
  }

  function submitAdd() {
    const name = newName.trim();
    if (!name) return;
    const store = addStore(name);
    setAddOpen(false);
    setNewName("");
    toast.success(`${store.name} eklendi`);
  }

  function submitRename() {
    if (!renameTarget) return;
    renameStore(renameTarget.id, renameValue);
    setRenameTarget(null);
    toast.success("Mağaza adı güncellendi");
  }

  return (
    <main className="mx-auto min-h-dvh max-w-3xl px-4 pb-16 pt-6 sm:px-6" style={{ paddingTop: "max(1.5rem, env(safe-area-inset-top))" }}>
      <header className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          Bölge sorumlusu
        </p>
        <div className="mt-1 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-[1.65rem] font-semibold leading-tight tracking-tight text-fg">
              Mağaza Ziyaret / Kontrol
            </h1>
            <p className="mt-1 max-w-md text-sm text-muted">
              Ziyaret kayıtları bu telefonda saklanır.
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            aria-label="Şablon"
            onClick={() => navigate({ to: "/sablon" })}
          >
            <Settings2 className="size-4" />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
        {ordered.map((store) => {
          const count = visits.filter((v) => v.storeId === store.id).length;
          return (
            <StoreCard
              key={store.id}
              store={store}
              visitCount={count}
              onNew={() => startVisit(store)}
              onLast={() => openLast(store)}
              onOpen={() =>
                navigate({ to: "/magaza/$storeId", params: { storeId: store.id } })
              }
              onRename={() => {
                setRenameTarget(store);
                setRenameValue(store.name);
              }}
              onDelete={() => setDeleteTarget(store)}
            />
          );
        })}

        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="flex min-h-[168px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-surface/50 text-muted transition-colors hover:border-ink/30 hover:bg-surface hover:text-fg"
        >
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-surface-2">
            <Plus className="size-5" />
          </span>
          <span className="text-sm font-medium">Mağaza ekle</span>
        </button>
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni mağaza</DialogTitle>
            <DialogDescription>
              Listeye yeni bir mağaza sekmesi ekler. Şablon tüm mağazalarda ortaktır.
            </DialogDescription>
          </DialogHeader>
          <Label htmlFor="store-name">Mağaza adı</Label>
          <Input
            id="store-name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Örn. YENİ MAHALLE"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") submitAdd();
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Vazgeç
            </Button>
            <Button variant="ink" onClick={submitAdd}>
              Ekle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(renameTarget)}
        onOpenChange={(o) => !o && setRenameTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mağazayı yeniden adlandır</DialogTitle>
          </DialogHeader>
          <Input
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") submitRename();
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameTarget(null)}>
              Vazgeç
            </Button>
            <Button variant="ink" onClick={submitRename}>
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mağaza silinsin mi?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget?.name} ve bu mağazaya ait tüm ziyaret raporları
              kalıcı olarak silinir.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Vazgeç</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) {
                  deleteStore(deleteTarget.id);
                  toast.success("Mağaza silindi");
                }
                setDeleteTarget(null);
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
