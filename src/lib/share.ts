import { toPng } from "html-to-image";
import { Share } from "@capacitor/share";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";
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

async function blobToBase64(blob: Blob): Promise<string> {
  const buffer = await blob.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function nativeShare(opts: {
  blob: Blob;
  filename: string;
  title: string;
  text: string;
}): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;

  const base64 = await blobToBase64(opts.blob);
  const saved = await Filesystem.writeFile({
    path: `share/${opts.filename}`,
    data: base64,
    directory: Directory.Cache,
    recursive: true,
  });

  await Share.share({
    title: opts.title,
    text: opts.text,
    files: [saved.uri],
    dialogTitle: "WhatsApp ile paylaş",
  });

  return true;
}

export async function shareOrDownload(opts: {
  blob: Blob;
  filename: string;
  title: string;
  text: string;
}): Promise<"shared" | "downloaded"> {
  try {
    if (await nativeShare(opts)) return "shared";
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return "shared";
  }

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
    if (err instanceof DOMException && err.name === "AbortError") return "shared";
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
