import type { Store, TemplateItem } from "./types";

export const DEFAULT_STORE_NAMES = [
  "NAMIK KEMAL",
  "ŞÜHEDA",
  "ACISU",
  "AKSOY",
  "GÜRSEL",
  "KOCAÇEŞME",
  "ORHANİYE",
  "KÖPRÜBAŞI",
] as const;

export const DEFAULT_CHECKLIST: string[] = [
  "Dış çevre temizliği",
  "Dış cephe cam doğrama temizliği",
  "Ekmek dolabı temizlik düzen",
  "Ekmek dolabı SKT",
  "Meyve sebze nitelik künye kontrol",
  "Meyve sebze stand temizlik",
  "Tavuk dolabı stok",
  "Kırmızı et stok",
  "Sütlük dolap stok düzen",
  "SKT kontrol",
  "Ulusal indirim sepeti",
  "Raf düzen, temizlik, görsel bütünlük",
  "Etiketleme ve etiket düzeni",
  "Kasa yanı ve paketleme sadelik temizlik",
  "Çikolata stant temizlik düzen",
  "Z kart kontrol",
  "Sıfır kritik sipariş kontrol",
  "Spot düzen ve etiketleme",
  "Spot - Grup spot kategorizasyon",
  "Elektronik stand düzen",
  "Depo düzen temizlik sadelik kontrol",
  "Ofis - Mutfak - Wc temizlik",
  "Demirbaş temizlik kontrol",
  "Mantar pano düzen",
  "Mantar pano evrak kontrol",
  "Hareket görmeyen ürün kontrol",
];

export function makeDefaultStores(): Store[] {
  const now = Date.now();
  return DEFAULT_STORE_NAMES.map((name, index) => ({
    id: `store_${index + 1}`,
    name,
    createdAt: now,
    order: index,
  }));
}

export function makeDefaultTemplate(): TemplateItem[] {
  return DEFAULT_CHECKLIST.map((label, index) => ({
    id: `tpl_${index + 1}`,
    label,
  }));
}
