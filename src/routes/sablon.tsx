import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft, ChevronUp, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/app-store";
import { makeDefaultTemplate } from "@/lib/defaults";

export const Route = createFileRoute("/sablon")({ component: TemplatePage });

function TemplatePage() {
  const template = useAppStore((s) => s.template);
  const addTemplateItem = useAppStore((s) => s.addTemplateItem);
  const updateTemplateItem = useAppStore((s) => s.updateTemplateItem);
  const removeTemplateItem = useAppStore((s) => s.removeTemplateItem);
  const moveTemplateItem = useAppStore((s) => s.moveTemplateItem);
  const setTemplate = useAppStore((s) => s.setTemplate);
  const [draft, setDraft] = useState("");

  function add() {
    if (!draft.trim()) return;
    addTemplateItem(draft);
    setDraft("");
    toast.success("Madde eklendi");
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
        <h1 className="text-2xl font-semibold tracking-tight">Kontrol şablonu</h1>
        <p className="mt-1 text-sm text-muted">
          Yeni ziyaretler bu maddelerle açılır. Kontrol noktası işletimi ve
          Genel alanları her raporda boş, serbest not olarak kalır.
        </p>
      </header>

      <div className="mb-4 flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Yeni madde adı"
          onKeyDown={(e) => {
            if (e.key === "Enter") add();
          }}
        />
        <Button variant="ink" onClick={add} className="shrink-0">
          <Plus className="size-4" />
          Ekle
        </Button>
      </div>

      <ol className="flex flex-col gap-1.5">
        {template.map((item, i) => (
          <li
            key={item.id}
            className="flex items-center gap-1 rounded-xl bg-surface px-2 py-1.5 shadow-[var(--shadow-card)]"
          >
            <span className="w-7 text-center text-[11px] tabular-nums text-muted">
              {i + 1}
            </span>
            <Input
              value={item.label}
              onChange={(e) => updateTemplateItem(item.id, e.target.value)}
              className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-fg"
              aria-label="Yukarı"
              onClick={() => moveTemplateItem(item.id, -1)}
            >
              <ChevronUp className="size-4" />
            </button>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-fg"
              aria-label="Aşağı"
              onClick={() => moveTemplateItem(item.id, 1)}
            >
              <ChevronDown className="size-4" />
            </button>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-primary"
              aria-label="Sil"
              onClick={() => removeTemplateItem(item.id)}
            >
              <Trash2 className="size-4" />
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-6">
        <Button
          variant="outline"
          onClick={() => {
            setTemplate(makeDefaultTemplate());
            toast.success("Varsayılan şablon geri yüklendi");
          }}
        >
          Varsayılan listeye dön
        </Button>
      </div>
    </main>
  );
}
