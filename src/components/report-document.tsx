import { Camera, Trash2, X } from "lucide-react";
import {
  DEFAULT_NOTE_COLOR,
  DEFAULT_NOTE_FONT,
  DEFAULT_NOTE_SIZE,
  FONT_SIZE_CSS,
} from "@/components/format-bar";
import { formatVisitStamp } from "@/lib/dates";
import type { Store, Visit } from "@/lib/types";
import { cn } from "@/lib/utils";
import { RichNote } from "./rich-note";

type Props = {
  visit: Visit;
  store: Store;
  editable?: boolean;
  capture?: boolean;
  focusedItemId?: string | null;
  onFocusItem?: (id: string | null) => void;
  onChangeItem?: (itemId: string, patch: { label?: string; noteHtml?: string }) => void;
  onChangeFree?: (field: "kontrolNoktasiHtml" | "genelHtml", html: string) => void;
  onAddPhoto?: (itemId: string) => void;
  onRemovePhoto?: (itemId: string, photoId: string) => void;
  onRemoveItem?: (itemId: string) => void;
};

export function ReportDocument({
  visit,
  store,
  editable = false,
  capture = false,
  focusedItemId,
  onFocusItem,
  onChangeItem,
  onChangeFree,
  onAddPhoto,
  onRemovePhoto,
  onRemoveItem,
}: Props) {
  const noteStyle = {
    fontFamily: visit.noteFont || DEFAULT_NOTE_FONT,
    color: visit.noteColor || DEFAULT_NOTE_COLOR,
    fontSize: FONT_SIZE_CSS[visit.noteSize || DEFAULT_NOTE_SIZE] ?? "12.5px",
  };

  return (
    <article
      className={cn(
        "report-page mx-auto w-full max-w-[820px] bg-paper px-4 py-5 sm:px-8 sm:py-7",
        capture && "max-w-none px-8 py-8",
      )}
    >
      <div className="report-box mb-2 inline-block text-[12px] font-semibold tracking-wide">
        ZİYARET TARİH / SAAT: {formatVisitStamp(visit.createdAt)}
      </div>
      <h1 className="report-box mb-3 inline-block text-[20px] font-bold tracking-wide">
        {store.name}
      </h1>
      <div className="report-line mb-3" />

      <h2 className="report-box mb-3 inline-block text-[14px] font-bold underline decoration-1 underline-offset-2">
        MAĞAZA KONTROL
      </h2>

      <div className="flex flex-col">
        {visit.items.map((item) => {
          const focused = focusedItemId === item.id;
          return (
            <div
              key={item.id}
              className={cn(
                "report-line grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] gap-2 py-2 sm:gap-4",
                focused && editable && "bg-[#fff8e8]",
              )}
              onClick={() => onFocusItem?.(item.id)}
            >
              <div className="min-w-0">
                <div className="flex items-start gap-1">
                  {editable ? (
                    <RichNote
                      html={escapeToHtml(item.label)}
                      placeholder="Madde adı"
                      ariaLabel="Kontrol maddesi"
                      className="report-box min-h-[1.7rem] flex-1 text-[12.5px] font-medium"
                      onFocus={() => onFocusItem?.(item.id)}
                      onChange={(html) =>
                        onChangeItem?.(item.id, { label: htmlToPlain(html) })
                      }
                    />
                  ) : (
                    <div className="report-box w-full text-[12.5px] font-medium">
                      {item.label}
                    </div>
                  )}
                  {editable && (
                    <button
                      type="button"
                      className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-primary"
                      aria-label="Maddeyi sil"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveItem?.(item.id);
                      }}
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </div>
                {item.photos.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.photos.map((p) => (
                      <div key={p.id} className="relative">
                        <img
                          src={p.dataUrl}
                          alt=""
                          className="h-28 w-auto max-w-full rounded-sm object-cover outline outline-1 -outline-offset-1 outline-black/15"
                        />
                        {editable && (
                          <button
                            type="button"
                            className="absolute right-1 top-1 inline-flex size-7 items-center justify-center rounded-full bg-ink/80 text-primary-fg"
                            aria-label="Fotoğrafı sil"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemovePhoto?.(item.id, p.id);
                            }}
                          >
                            <X className="size-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {editable && (
                  <button
                    type="button"
                    className="mt-1.5 inline-flex h-8 items-center gap-1 rounded-md px-1.5 text-[11px] font-medium text-muted hover:text-fg"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFocusItem?.(item.id);
                      onAddPhoto?.(item.id);
                    }}
                  >
                    <Camera className="size-3.5" />
                    Fotoğraf
                  </button>
                )}
              </div>
              <div className="min-w-0">
                {editable ? (
                  <RichNote
                    html={item.noteHtml}
                    placeholder="Not yaz…"
                    ariaLabel={`${item.label} notu`}
                    className="report-box min-h-[4.2rem]"
                    style={noteStyle}
                    typingFont={visit.noteFont || DEFAULT_NOTE_FONT}
                    typingSize={visit.noteSize || DEFAULT_NOTE_SIZE}
                    typingColor={visit.noteColor || DEFAULT_NOTE_COLOR}
                    onFocus={() => onFocusItem?.(item.id)}
                    onChange={(html) => onChangeItem?.(item.id, { noteHtml: html })}
                  />
                ) : (
                  <div
                    className="report-box min-h-[2.8rem] text-[12.5px] leading-snug"
                    style={noteStyle}
                    dangerouslySetInnerHTML={{
                      __html: item.noteHtml || `<span style="color:#9a938a">Not yaz…</span>`,
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <h2 className="report-box mb-2 inline-block text-[14px] font-bold underline decoration-1 underline-offset-2">
          KONTROL NOKTASI İŞLETİMİ
        </h2>
        {editable ? (
          <RichNote
            html={visit.kontrolNoktasiHtml}
            placeholder="Bu alana serbest not yazın…"
            ariaLabel="Kontrol noktası işletimi"
            className="report-box min-h-32"
            style={noteStyle}
            typingFont={visit.noteFont || DEFAULT_NOTE_FONT}
            typingSize={visit.noteSize || DEFAULT_NOTE_SIZE}
            typingColor={visit.noteColor || DEFAULT_NOTE_COLOR}
            onFocus={() => onFocusItem?.(null)}
            onChange={(html) => onChangeFree?.("kontrolNoktasiHtml", html)}
          />
        ) : (
          <div
            className="report-box min-h-24 text-[13px] leading-relaxed"
            style={noteStyle}
            dangerouslySetInnerHTML={{
              __html: visit.kontrolNoktasiHtml || "",
            }}
          />
        )}
      </div>

      <div className="mt-5">
        <h2 className="report-box mb-2 inline-block text-[14px] font-bold underline decoration-1 underline-offset-2">
          GENEL
        </h2>
        {editable ? (
          <RichNote
            html={visit.genelHtml}
            placeholder="Genel değerlendirme…"
            ariaLabel="Genel"
            className="report-box min-h-32"
            style={noteStyle}
            typingFont={visit.noteFont || DEFAULT_NOTE_FONT}
            typingSize={visit.noteSize || DEFAULT_NOTE_SIZE}
            typingColor={visit.noteColor || DEFAULT_NOTE_COLOR}
            onFocus={() => onFocusItem?.(null)}
            onChange={(html) => onChangeFree?.("genelHtml", html)}
          />
        ) : (
          <div
            className="report-box min-h-24 text-[13px] leading-relaxed"
            style={noteStyle}
            dangerouslySetInnerHTML={{ __html: visit.genelHtml || "" }}
          />
        )}
      </div>

      <p className="mt-8 text-center text-[12px] tracking-wide text-[#b0aaa3]">
        {visit.number}. ziyaret · {store.name}
      </p>
    </article>
  );
}

function htmlToPlain(html: string): string {
  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.textContent || "").replace(/\s+/g, " ").trim();
}

function escapeToHtml(text: string): string {
  return text
    .replaceAll("&", "&")
    .replaceAll("<", "<")
    .replaceAll(">", ">");
}
