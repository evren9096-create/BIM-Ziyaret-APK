import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  html: string;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  typingFont?: string;
  typingSize?: string;
  typingColor?: string;
  onChange: (html: string) => void;
  onFocus?: () => void;
  ariaLabel?: string;
};

function applyTyping(font?: string, size?: string, color?: string) {
  if (!font && !size && !color) return;
  document.execCommand("styleWithCSS", false, "true");
  if (font) document.execCommand("fontName", false, font);
  if (size) document.execCommand("fontSize", false, size);
  if (color) document.execCommand("foreColor", false, color);
}

export function RichNote({
  html,
  placeholder = "Not yaz…",
  className,
  style,
  typingFont,
  typingSize,
  typingColor,
  onChange,
  onFocus,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.activeElement === el) return;
    if (el.innerHTML !== html) el.innerHTML = html || "";
  }, [html]);

  useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  function emit(el: HTMLDivElement, immediate = false) {
    const next = el.innerHTML;
    window.clearTimeout(timer.current);
    if (immediate) {
      onChange(next);
      return;
    }
    timer.current = window.setTimeout(() => onChange(next), 280);
  }

  return (
    <div
      ref={ref}
      className={cn("rich-note leading-snug", className)}
      style={style}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-multiline="true"
      aria-label={ariaLabel}
      data-placeholder={placeholder}
      onFocus={() => {
        onFocus?.();
        applyTyping(typingFont, typingSize, typingColor);
      }}
      onInput={(e) => emit(e.currentTarget as HTMLDivElement)}
      onBlur={(e) => emit(e.currentTarget as HTMLDivElement, true)}
    />
  );
}
