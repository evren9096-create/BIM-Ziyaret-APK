import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Camera,
  ChevronLeft,
  Copy,
  FileText,
  History,
  Plus,
  Save,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import {
  DEFAULT_NOTE_COLOR,
  DEFAULT_NOTE_FONT,
  DEFAULT_NOTE_SIZE,
  FormatBar,
} from "@/components/format-bar";
import { ReportDocument } from "@/components/report-document";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/app-store";
import { formatVisitStamp } from "@/lib/dates";
import { compressImageFile } from "@/lib/media";
import { captureNodePng, shareOrDownload, visitShareName } from "@/lib/share";
import type { Store, Visit } from "@/lib/types";

export const Route = createFileRoute("/ziyaret/$visitId")({
  component: VisitEditor,
});

function VisitEditor() {
  const { visitId } = Route.useParams();
  const visit = useAppStore((s) => s.visits.find((v) => v.id === visitId));
  const store = useAppStore((s) =>
    visit ? s.stores.find((st) => st.id === visit.storeId) : undefined,
  );

  if (!visit || !store) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-muted">Ziyaret bulunamadı.</p>
        <Link to="/" className="mt-4 inline-block text-sm font-medium underline">
          Mağazalara dön
        </Link>
      </main>
    );
  }

  return <VisitEditorBody visit={visit} store={store} />;
}

function VisitEditorBody({ visit, store }: { visit: Visit; store: Store }) {
  const navigate = useNavigate();
  const updateVisit = useAppStore((s) => s.updateVisit);
  const updateItem = useAppStore((s) => s.updateItem);
  const addItem = useAppStore((s) => s.addItem);
  const removeItem = useAppStore((s) => s.removeItem);
  const addPhoto = useAppStore((s) => s.addPhoto);
  const removePhoto = useAppStore((s) => s.removePhoto);
  const createVisit = useAppStore((s) => s.createVisit);

  const [focusedItemId, setFocusedItemId] = useState<string | null>(
    visit.items[0]?.id ?? null,
  );
  const [itemDialog, setItemDialog] = useState(false);
  const [itemLabel, setItemLabel] = useState("");
  const [sharing, setSharing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const pendingPhotoItem = useRef<string | null>(null);

  const noteFont = visit.noteFont || DEFAULT_NOTE_FONT;
  const noteColor = visit.noteColor || DEFAULT_NOTE_COLOR;
  const noteSize = visit.noteSize || DEFAULT_NOTE_SIZE;

  useEffect(() => {
    if (!focusedItemId && visit.items[0]) {
      setFocusedItemId(visit.items[0].id);
    }
  }, [visit.items, focusedItemId]);

  function pickPhoto(itemId: string | null) {
    pendingPhotoItem.current = itemId ?? focusedItemId;
    if (!pendingPhotoItem.current) {
      toast.message("Önce bir maddeye dokunun");
      return;
    }
    fileRef.current?.click();
  }

  async function onFiles(files: FileList | null) {
    const itemId = pendingPhotoItem.current ?? focusedItemId;
    if (!itemId || !files?.length) return;
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        const dataUrl = await compressImageFile(file);
        addPhoto(visit.id, itemId, dataUrl);
      }
      toast.success("Fotoğraf eklendi");
    } catch {
      toast.error("Fotoğraf eklenemedi");
    }
  }

  function save() {
    updateVisit(visit.id, { updatedAt: Date.now() });
    toast.success("Ziyaret kaydedildi");
  }

  function copyVisit() {
    const next = createVisit(store.id, visit);
    if (!next) return;
    toast.success(`Kopyalandı · ${next.number}. ziyaret`);
    void navigate({ to: "/ziyaret/$visitId", params: { visitId: next.id } });
  }

  async function sharePage() {
    const node = captureRef.current;
    if (!node) return;
    setSharing(true);
    const hide = toast.loading("Sayfa hazırlanıyor…");
    try {
      await new Promise((r) => requestAnimationFrame(() => r(null)));
      const blob = await captureNodePng(node);
      const name = visitShareName(store.name, visit.createdAt);
      const text = `${store.name} ziyaret raporu · ${formatVisitStamp(visit.createdAt)}`;
      const result = await shareOrDownload({
        blob,
        filename: `${name}.png`,
        title: `${store.name} ziyaret raporu`,
        text,
      });
      toast.dismiss(hide);
      if (result === "shared") toast.success("Paylaşım açıldı");
      else toast.success("Sayfa görseli indirildi — WhatsApp’tan gönderin");
    } catch {
      toast.dismiss(hide);
      toast.error("Sayfa oluşturulamadı");
    } finally {
      setSharing(false);
    }
  }

  function submitItem() {
    const id = addItem(visit.id, itemLabel);
    if (id) {
      setFocusedItemId(id);
      setItemLabel("");
      setItemDialog(false);
      toast.success("Madde eklendi");
    }
  }

  return (
    <div className="min-h-dvh bg-bg">
      <header className="no-print sticky top-0 z-30 border-b border-white/10 bg-ink text-primary-fg" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <div className="mx-auto flex max-w-4xl items-center gap-1 px-2 py-0.5">
          <Link
            to="/magaza/$storeId"
            params={{ storeId: store.id }}
            className="inline-flex h-6 items-center gap-0.5 rounded px-1 text-[10px] font-medium text-white/80 hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="size-3" />
            Mağazalar
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold tracking-wide">
              {store.name}
            </p>
            <p className="truncate text-[9px] text-white/55 tabular-nums">
              {visit.number}. ziyaret · {formatVisitStamp(visit.createdAt)}
            </p>
          </div>
        </div>

        <div className="mx-auto flex max-w-4xl flex-wrap gap-0.5 px-2 pb-0.5">
          <Button
            variant="default"
            size="compact"
            onClick={copyVisit}
          >
            <Copy />
            Kopyala
          </Button>
          <Button
            variant="secondary"
            size="compact"
            onClick={save}
            className="bg-white text-ink hover:bg-white/90"
          >
            <Save />
            Kaydet
          </Button>
          <Button
            variant="secondary"
            size="compact"
            className="bg-white/10 text-white hover:bg-white/15"
            onClick={() => setItemDialog(true)}
          >
            <Plus />
            Madde
          </Button>
          <Button
            variant="secondary"
            size="compact"
            className="bg-white/10 text-white hover:bg-white/15"
            onClick={() => pickPhoto(focusedItemId)}
          >
            <Camera />
            Fotoğraf
          </Button>
          <Button
            variant="history"
            size="compact"
            onClick={() =>
              navigate({ to: "/magaza/$storeId", params: { storeId: store.id } })
            }
          >
            <History />
            Geçmiş
          </Button>
          <Button
            variant="secondary"
            size="compact"
            className="bg-white/10 text-white hover:bg-white/15"
            onClick={() =>
              navigate({ to: "/rapor/$visitId", params: { visitId: visit.id } })
            }
          >
            <FileText />
            Sayfa / PDF
          </Button>
          <Button
            variant="whatsapp"
            size="compact"
            disabled={sharing}
            onClick={() => void sharePage()}
          >
            <Share2 />
            WhatsApp
          </Button>
        </div>

        <div className="mx-auto max-w-4xl px-2 pb-1">
          <FormatBar
            compact
            font={noteFont}
            size={noteSize}
            color={noteColor}
            onFont={(value) => updateVisit(visit.id, { noteFont: value })}
            onSize={(value) => updateVisit(visit.id, { noteSize: value })}
            onColor={(value) => updateVisit(visit.id, { noteColor: value })}
          />
        </div>
      </header>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        className="hidden"
        onChange={(e) => {
          void onFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <div className="mx-auto max-w-4xl px-2 py-3 sm:px-4">
        <div className="overflow-hidden rounded-2xl bg-paper shadow-[var(--shadow-card)]">
          <ReportDocument
            visit={visit}
            store={store}
            editable
            focusedItemId={focusedItemId}
            onFocusItem={setFocusedItemId}
            onChangeItem={(itemId, patch) => updateItem(visit.id, itemId, patch)}
            onChangeFree={(field, html) => updateVisit(visit.id, { [field]: html })}
            onAddPhoto={(itemId) => pickPhoto(itemId)}
            onRemovePhoto={(itemId, photoId) =>
              removePhoto(visit.id, itemId, photoId)
            }
            onRemoveItem={(itemId) => removeItem(visit.id, itemId)}
          />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none fixed top-0 z-[-1] w-[794px] bg-white opacity-0"
      >
        <div ref={captureRef}>
          <ReportDocument visit={visit} store={store} capture />
        </div>
      </div>

      <Dialog open={itemDialog} onOpenChange={setItemDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni madde</DialogTitle>
            <DialogDescription>
              Bu ziyaret raporuna ekstra kontrol maddesi ekler. Şablonu değiştirmez.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={itemLabel}
            onChange={(e) => setItemLabel(e.target.value)}
            placeholder="Madde adı"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") submitItem();
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setItemDialog(false)}>
              Vazgeç
            </Button>
            <Button variant="ink" onClick={submitItem}>
              Ekle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
