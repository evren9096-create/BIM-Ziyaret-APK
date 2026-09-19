import { useEffect, useState } from "react";
import { Check, Smartphone, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  dismissInstall,
  getDeferredInstall,
  isInstallDismissed,
  isIosDevice,
  isStandalone,
  promptInstall,
  subscribeInstall,
} from "@/lib/pwa";

export function InstallCard() {
  const [standalone, setStandalone] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [canPrompt, setCanPrompt] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    setStandalone(isStandalone());
    setDismissed(isInstallDismissed());
    setCanPrompt(Boolean(getDeferredInstall()));
    setIos(isIosDevice());
    return subscribeInstall(() => {
      setCanPrompt(Boolean(getDeferredInstall()));
      setDismissed(isInstallDismissed());
      setStandalone(isStandalone());
    });
  }, []);

  async function onInstall() {
    const result = await promptInstall();
    if (result === "accepted") {
      toast.success("Uygulama ana ekrana eklendi");
      dismissInstall();
      return;
    }
    if (result === "dismissed") return;
    if (ios) {
      window.location.assign("/?install=1&platform=ios");
      return;
    }
    setHelpOpen(true);
  }

  const help = (
    <HelpDialog open={helpOpen} onOpenChange={setHelpOpen} ios={ios} />
  );

  if (standalone) {
    return (
      <div className="mb-5 flex items-start gap-3 rounded-2xl bg-surface px-4 py-3 shadow-[var(--shadow-card)]">
        <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-ink text-primary-fg">
          <Check className="size-4" />
        </span>
        <div>
          <p className="text-sm font-semibold">Ana ekrandan açık</p>
          <p className="mt-0.5 text-xs text-muted">
            İnternet olmasa da not ve fotoğraf bu telefonda kalır.
          </p>
        </div>
      </div>
    );
  }

  if (dismissed) {
    return (
      <>
        <button
          type="button"
          onClick={() => setHelpOpen(true)}
          className="mb-5 inline-flex h-11 items-center gap-2 text-sm font-medium text-muted hover:text-fg"
        >
          <Smartphone className="size-4" />
          Ana ekrana ekle · çevrimdışı kullan
        </button>
        {help}
      </>
    );
  }

  return (
    <>
      <aside className="relative mb-5 rounded-2xl bg-ink px-4 py-4 text-primary-fg shadow-[var(--shadow-card)]">
        <button
          type="button"
          className="absolute right-2 top-2 inline-flex size-9 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white"
          aria-label="Gizle"
          onClick={() => {
            dismissInstall();
            setDismissed(true);
          }}
        >
          <X className="size-4" />
        </button>
        <div className="flex items-start gap-3 pr-8">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <Smartphone className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold">Ana ekrana ekle</p>
            <p className="mt-1 text-xs leading-relaxed text-white/65">
              Mağazada sinyal olmasa da rapor yazın. Kısayol, normal uygulama
              gibi tam ekran açılır. Kayıtlar telefonda kalır.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                size="sm"
                className="rounded-lg bg-white text-ink hover:bg-white/90"
                onClick={() => void onInstall()}
              >
                {canPrompt ? "Yükle" : ios ? "Nasıl eklerim" : "Yükleme adımları"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-lg text-white/80 hover:bg-white/10 hover:text-white"
                onClick={() => setHelpOpen(true)}
              >
                Adımlar
              </Button>
            </div>
          </div>
        </div>
      </aside>
      {help}
    </>
  );
}

function HelpDialog({
  open,
  onOpenChange,
  ios,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  ios: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ana ekrana ekle</DialogTitle>
          <DialogDescription>
            Bir kez ekledikten sonra uygulama internet olmadan da açılır.
          </DialogDescription>
        </DialogHeader>
        {ios ? (
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-fg">
            <li>
              <strong>Safari</strong> ile açın (Chrome iPhone’da ana ekrana eklemez).
            </li>
            <li>Alttaki Paylaş düğmesine dokunun.</li>
            <li>
              Listeden <strong>Ana Ekrana Ekle</strong> seçin.
            </li>
            <li>Ekle’ye basın. Kırmızı ikon ana ekranda uygulama gibi durur.</li>
          </ol>
        ) : (
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-fg">
            <li>Aşağıdaki Yükle düğmesini kullanın; çıkmazsa tarayıcı menüsünü açın.</li>
            <li>
              <strong>Uygulamayı yükle</strong> veya <strong>Ana ekrana ekle</strong>{" "}
              deyin.
            </li>
            <li>
              Onaylayın. Sonraki açılışlarda internet olmasa da rapor yazabilirsiniz.
            </li>
          </ol>
        )}
        {ios && (
          <Button
            variant="ink"
            className="mt-2 w-full"
            onClick={() => {
              window.location.assign("/?install=1&platform=ios");
            }}
          >
            Resimli anlatımı aç
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
