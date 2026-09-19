export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "bim-pwa-install-dismissed";

let deferred: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) fn();
}

export function getDeferredInstall(): BeforeInstallPromptEvent | null {
  return deferred;
}

export function subscribeInstall(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function captureInstallEvent(event: Event) {
  event.preventDefault();
  deferred = event as BeforeInstallPromptEvent;
  emit();
}

export function clearDeferredInstall() {
  deferred = null;
  emit();
}

export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    nav.standalone === true
  );
}

export function isIosDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const iPadOs = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return /iPhone|iPad|iPod/i.test(ua) || iPadOs;
}

export function isInstallDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function dismissInstall() {
  try {
    localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    /* ignore quota */
  }
  emit();
}

export async function registerServiceWorker(): Promise<void> {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  if (import.meta.env.DEV) return;
  try {
    const reg = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
    await navigator.serviceWorker.ready;
    void reg.update();
    void warmShell();
    void cacheDocumentAssets();
  } catch {
    /* preview iframes / insecure contexts */
  }
}

async function warmShell() {
  const paths = [
    "/",
    "/sablon",
    "/favicon.svg",
    "/icon-192.png",
    "/icon-512.png",
    "/apple-touch-icon.png",
    "/manifest.webmanifest",
  ];
  await Promise.all(
    paths.map((path) => fetch(path, { credentials: "same-origin" }).catch(() => undefined)),
  );
}

function cacheDocumentAssets() {
  if (typeof document === "undefined") return;
  const urls = new Set<string>();
  document
    .querySelectorAll("script[src], link[rel='stylesheet'], link[rel='modulepreload'], link[rel='preload']")
    .forEach((el) => {
      const href =
        (el as HTMLScriptElement).src || (el as HTMLLinkElement).href;
      if (href && href.startsWith(window.location.origin)) urls.add(href);
    });
  void Promise.all(
    [...urls].map((url) => fetch(url, { credentials: "same-origin" }).catch(() => undefined)),
  );
}

export async function promptInstall(): Promise<"accepted" | "dismissed" | "unavailable"> {
  if (!deferred) return "unavailable";
  const event = deferred;
  deferred = null;
  emit();
  await event.prompt();
  const choice = await event.userChoice;
  return choice.outcome;
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    dismissInstall();
  });
  dismissInstall();
  if (import.meta.env.PROD) {
    if (document.readyState === "complete") void registerServiceWorker();
    else window.addEventListener("load", () => void registerServiceWorker(), { once: true });
  }
}
