import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { toPng } from "html-to-image";
import { fileSafeName } from "./utils";
import { formatVisitStamp } from "./dates";

export async function captureNodePng(node: HTMLElement): Promise<Blob> {
  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    backgroundColor: "#ffffff",
    cacheBust: true,
    skipFonts: true,
    style: { transform: "none" },
  });

  const res = await fetch(dataUrl);
  const blob = await res.blob();

  if (!blob.size) {
    throw new Error("empty-capture");
  }

  return blob;
}

export function visitShareName(
  storeName: string,
  createdAt: number,
): string {
  const stamp = formatVisitStamp(createdAt)
    .replaceAll(" ", "_")
    .replaceAll(":", "");

  return fileSafeName(storeName) + "_" + stamp + ".png";
}

async function blobToBase64(blob: Blob): Promise<string> {
  const buffer = await blob.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunk = 0x8000;

  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(
      ...bytes.subarray(i, i + chunk),
    );
  }

  return btoa(binary);
}

export async function shareOrDownload(opts: {
  blob: Blob;
  filename: string;
  title: string;
  text: string;
}): Promise<"shared" | "downloaded"> {

if (Capacitor.isNativePlatform()) {
    try {
      const base64 = await blobToBase64(opts.blob);

      await Filesystem.writeFile({
        path: opts.filename,
        data: base64,
        directory: Directory.Cache,
      });

      const uriResult = await Filesystem.getUri({
        path: opts.filename,
        directory: Directory.Cache,
      });

      await Share.share({
        title: opts.title,
        text: opts.text,
        files: [uriResult.uri],
        dialogTitle: "WhatsApp veya başka bir uygulamayla paylaş",
      });

      return "shared";
    } catch (err) {
      console.error("Native file share failed", err);

      const message =
        err instanceof Error ? err.message : String(err);

      window.alert(
        "WhatsApp paylaşım hatası:\n\n" +
        message
      );
    }
  }

  const file = new File([opts.blob], opts.filename, {
    type: opts.blob.type || "image/png",
  });

  try {
    if (typeof navigator.share === "function") {
      const data = {
        title: opts.title,
        text: opts.text,
        files: [file],
      };

      const can = navigator.canShare
        ? navigator.canShare(data)
        : true;

      if (can) {
        await navigator.share(data);
        return "shared";
      }
    }
  } catch (err) {
    if (
      err instanceof DOMException &&
      err.name === "AbortError"
    ) {
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
