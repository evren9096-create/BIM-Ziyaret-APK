import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Store } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  store: Store;
  visitCount: number;
  onNew: () => void;
  onLast: () => void;
  onOpen: () => void;
  onRename: () => void;
  onDelete: () => void;
};

export function StoreCard({
  store,
  visitCount,
  onNew,
  onLast,
  onOpen,
  onRename,
  onDelete,
}: Props) {
  return (
    <article className="flex flex-col rounded-2xl bg-surface p-4 shadow-[var(--shadow-card)]">
      <div className="mb-3 flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={onOpen}
          className="min-w-0 text-left"
        >
          <h2 className="truncate text-[15px] font-semibold tracking-wide text-fg">
            {store.name}
          </h2>
          <p className="mt-0.5 text-[12px] text-muted tabular-nums">
            {visitCount} ziyaret kaydı
          </p>
        </button>
        <details className="relative">
          <summary className="flex size-9 list-none items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-fg [&::-webkit-details-marker]:hidden">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Mağaza menüsü</span>
          </summary>
          <div className="absolute right-0 z-20 mt-1 w-36 overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-lg">
            <button
              type="button"
              className="block w-full px-3 py-2 text-left text-sm hover:bg-surface-2"
              onClick={onRename}
            >
              Yeniden adlandır
            </button>
            <button
              type="button"
              className="block w-full px-3 py-2 text-left text-sm hover:bg-surface-2"
              onClick={onOpen}
            >
              Geçmiş
            </button>
            <button
              type="button"
              className="block w-full px-3 py-2 text-left text-sm text-primary hover:bg-surface-2"
              onClick={onDelete}
            >
              Sil
            </button>
          </div>
        </details>
      </div>
      <Button variant="ink" className="w-full rounded-xl" onClick={onNew}>
        Yeni Ziyaret
      </Button>
      <button
        type="button"
        disabled={visitCount === 0}
        onClick={onLast}
        className={cn(
          "mt-2 inline-flex h-10 w-fit items-center rounded-xl bg-surface-2 px-4 text-[13px] font-medium text-fg",
          visitCount === 0 && "cursor-not-allowed opacity-55",
        )}
      >
        Son Ziyaret
      </button>
    </article>
  );
}
