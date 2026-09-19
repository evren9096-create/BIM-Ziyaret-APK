import { toPng } from "html-to-image";
import { fileSafeName } from "./utils";
import { formatVisitStamp } from "./dates";

export async function captureNodePng(node: HTMLElement): Promise<Blob> {
  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    backgroundColor: "#ffffff",
    cacheBust: true,
    skipFonts: true,
    style: {
      transform: "none",
    },
  });
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  if (!blob.size) throw new Error("empty-capture");
  return blob;
}

export function visitShareName(storeName: string, createdAt: number): string {
  const stamp = formatVisitStamp(createdAt).replaceAll(" ", "_").replaceAll(":", "");
  return `${fileSafeName(storeName)}_${stamp}`;
}

export async function shareOrDownload(opts: {
  blob: Blob;
  filename: string;
  title: string;
  text: string;
}): Promise<"shared" | "downloaded"> {
  const file = new File([opts.blob], opts.filename, {
    type: opts.blob.type || "image/png",
  });

  try {
    if (typeof navigator.share === "function") {
      const data = { title: opts.title, text: opts.text, files: [file] };
      const can = navigator.canShare ? navigator.canShare(data) : true;
      if (can) {
        await navigator.share(data);
        return "shared";
      }
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return "shared";
    }
  }

  const url = URL.createObjectURL(opts.blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = opts.filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  return "downloaded";
}
