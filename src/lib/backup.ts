import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import type { Store, TemplateItem, Visit } from "./types";

export type AppBackup = {
  app: "bim-ziyaret";
  version: 1;
  exportedAt: number;
  data: {
    stores: Store[];
    visits: Visit[];
    template: TemplateItem[];
  };
};

function safeStamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function toBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  const chunk = 0x8000;

  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }

  return btoa(binary);
}

export function makeBackup(
  stores: Store[],
  visits: Visit[],
  template: TemplateItem[],
): AppBackup {
  return {
    app: "bim-ziyaret",
    version: 1,
    exportedAt: Date.now(),
    data: {
      stores,
      visits,
      template,
    },
  };
}

export function validateBackup(value: unknown): AppBackup {
  if (!value || typeof value !== "object") {
    throw new Error("Geçersiz yedek dosyası.");
  }

  const backup = value as Partial<AppBackup>;

  if (
    backup.app !== "bim-ziyaret" ||
    backup.version !== 1 ||
    !backup.data ||
    !Array.isArray(backup.data.stores) ||
    !Array.isArray(backup.data.visits) ||
    !Array.isArray(backup.data.template)
  ) {
    throw new Error("Bu dosya BİM Ziyaret yedeği değil veya bozuk.");
  }

  return backup as AppBackup;
}

export async function exportBackup(backup: AppBackup): Promise<void> {
  const json = JSON.stringify(backup, null, 2);
  const filename = `BIM-Ziyaret-Yedek-${safeStamp()}.json`;

  if (Capacitor.isNativePlatform()) {
    const base64 = toBase64(json);

    await Filesystem.writeFile({
      path: filename,
      data: base64,
      directory: Directory.Cache,
    });

    const uri = await Filesystem.getUri({
      path: filename,
      directory: Directory.Cache,
    });

    await Share.share({
      title: "BİM Ziyaret yedeği",
      text: "BİM Ziyaret uygulama yedeği",
      files: [uri.uri],
      dialogTitle: "Yedeği kaydet veya paylaş",
    });

    return;
  }

  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function readBackupFile(file: File): Promise<AppBackup> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        resolve(validateBackup(parsed));
      } catch (error) {
        reject(
          error instanceof Error
            ? error
            : new Error("Yedek dosyası okunamadı."),
        );
      }
    };

    reader.onerror = () => reject(new Error("Yedek dosyası okunamadı."));
    reader.readAsText(file, "utf-8");
  });
}
