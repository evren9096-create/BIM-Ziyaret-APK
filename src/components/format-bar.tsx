import { Bold, Underline } from "lucide-react";
import { cn } from "@/lib/utils";

export const FONTS = ["Arial", "Georgia", "Times New Roman", "Courier New", "Verdana"] as const;
export const SIZES: { label: string; value: string }[] = [
  { label: "Küçük", value: "2" },
  { label: "Normal", value: "3" },
  { label: "Büyük", value: "4" },
  { label: "Çok büyük", value: "5" },
];
export const COLORS = [
  { name: "Siyah", value: "#111111" },
  { name: "Kırmızı", value: "#b42318" },
  { name: "Mavi", value: "#1d4f91" },
  { name: "Yeşil", value: "#0f7a4a" },
  { name: "Turuncu", value: "#c05621" },
];

export const DEFAULT_NOTE_FONT = "Arial";
export const DEFAULT_NOTE_COLOR = "#111111";
export const DEFAULT_NOTE_SIZE = "3";

export const FONT_SIZE_CSS: Record<string, string> = {
  "2": "11px",
  "3": "12.5px",
  "4": "15px",
  "5": "18px",
};

function exec(command: string, value?: string) {
  document.execCommand(command, false, value);
}

export function applyTypingStyle(font: string, size: string, color: string) {
  document.execCommand("styleWithCSS", false, "true");
  exec("fontName", font);
  exec("fontSize", size);
  exec("foreColor", color);
}

type Props = {
  className?: string;
  compact?: boolean;
  font: string;
  size: string;
  color: string;
  onFont: (value: string) => void;
  onSize: (value: string) => void;
  onColor: (value: string) => void;
};

export function FormatBar({
  className,
  compact = false,
  font,
  size,
  color,
  onFont,
  onSize,
  onColor,
}: Props) {
  const control = compact
    ? "h-6 rounded border border-white/15 bg-ink-2 px-1 text-[10px] text-primary-fg"
    : "h-9 rounded-md border border-white/15 bg-ink-2 px-2 text-[12px] text-primary-fg";
  const iconBtn = compact
    ? "inline-flex size-6 items-center justify-center rounded border border-white/15 bg-ink-2 text-primary-fg hover:bg-white/10"
    : "inline-flex size-9 items-center justify-center rounded-md border border-white/15 bg-ink-2 text-primary-fg hover:bg-white/10";
  const swatch = compact ? "size-4" : "size-7";

  return (
    <div className={cn("flex flex-wrap items-center gap-0.5", className)}>
      <select
        aria-label="Yazı tipi"
        className={control}
        value={font}
        onChange={(e) => {
          const next = e.target.value;
          onFont(next);
          applyTypingStyle(next, size, color);
        }}
      >
        {FONTS.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
      <select
        aria-label="Yazı boyutu"
        className={control}
        value={size}
        onChange={(e) => {
          const next = e.target.value;
          onSize(next);
          applyTypingStyle(font, next, color);
        }}
      >
        {SIZES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        className={iconBtn}
        onMouseDown={(e) => {
          e.preventDefault();
          exec("bold");
        }}
        aria-label="Kalın"
      >
        <Bold className={compact ? "size-2.5" : "size-4"} />
      </button>
      <button
        type="button"
        className={iconBtn}
        onMouseDown={(e) => {
          e.preventDefault();
          exec("underline");
        }}
        aria-label="Altı çizili"
      >
        <Underline className={compact ? "size-2.5" : "size-4"} />
      </button>
      <div className="flex items-center gap-0.5 pl-0.5">
        {COLORS.map((c) => (
          <button
            key={c.value}
            type="button"
            title={c.name}
            aria-label={`Renk ${c.name}`}
            aria-pressed={color === c.value}
            className={cn(
              swatch,
              "rounded-full border border-white/25",
              color === c.value && "ring-2 ring-white ring-offset-1 ring-offset-ink",
            )}
            style={{ backgroundColor: c.value }}
            onMouseDown={(e) => {
              e.preventDefault();
              onColor(c.value);
              applyTypingStyle(font, size, c.value);
            }}
          />
        ))}
      </div>
    </div>
  );
}
