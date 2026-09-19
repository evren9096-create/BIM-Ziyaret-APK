import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { idbStorage } from "./idb";
import { makeDefaultStores, makeDefaultTemplate } from "./defaults";
import { uid, slugifyTr } from "./utils";
import type { CheckItem, Photo, Store, TemplateItem, Visit } from "./types";

type AppState = {
  stores: Store[];
  visits: Visit[];
  template: TemplateItem[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  addStore: (name: string) => Store;
  renameStore: (id: string, name: string) => void;
  deleteStore: (id: string) => void;
  reorderStore: (id: string, dir: -1 | 1) => void;
  setTemplate: (items: TemplateItem[]) => void;
  addTemplateItem: (label: string) => void;
  updateTemplateItem: (id: string, label: string) => void;
  removeTemplateItem: (id: string) => void;
  moveTemplateItem: (id: string, dir: -1 | 1) => void;
  createVisit: (storeId: string, source?: Visit | null) => Visit | null;
  updateVisit: (id: string, patch: Partial<Visit>) => void;
  updateItem: (visitId: string, itemId: string, patch: Partial<CheckItem>) => void;
  addItem: (visitId: string, label: string) => string | null;
  removeItem: (visitId: string, itemId: string) => void;
  addPhoto: (visitId: string, itemId: string, dataUrl: string) => void;
  removePhoto: (visitId: string, itemId: string, photoId: string) => void;
  deleteVisit: (id: string) => void;
};

function blankItems(template: TemplateItem[]): CheckItem[] {
  return template.map((t) => ({
    id: uid(),
    label: t.label,
    noteHtml: "",
    photos: [],
  }));
}

function cloneItems(items: CheckItem[]): CheckItem[] {
  return items.map((item) => ({
    ...item,
    id: uid(),
    photos: item.photos.map((p) => ({ ...p, id: uid() })),
  }));
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      stores: makeDefaultStores(),
      visits: [],
      template: makeDefaultTemplate(),
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),

      addStore: (raw) => {
        const name = raw.trim().toLocaleUpperCase("tr-TR");
        const existing = new Set(get().stores.map((s) => s.id));
        const base = slugifyTr(name) || "magaza";
        let id = `store_${base}`;
        let n = 2;
        while (existing.has(id)) {
          id = `store_${base}_${n}`;
          n += 1;
        }
        const order = get().stores.reduce((m, s) => Math.max(m, s.order), -1) + 1;
        const store: Store = { id, name, createdAt: Date.now(), order };
        set({ stores: [...get().stores, store] });
        return store;
      },

      renameStore: (id, raw) => {
        const name = raw.trim().toLocaleUpperCase("tr-TR");
        if (!name) return;
        set({
          stores: get().stores.map((s) => (s.id === id ? { ...s, name } : s)),
        });
      },

      deleteStore: (id) => {
        set({
          stores: get().stores.filter((s) => s.id !== id),
          visits: get().visits.filter((v) => v.storeId !== id),
        });
      },

      reorderStore: (id, dir) => {
        const list = [...get().stores].sort((a, b) => a.order - b.order);
        const i = list.findIndex((s) => s.id === id);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= list.length) return;
        const tmp = list[i]!;
        list[i] = list[j]!;
        list[j] = tmp;
        set({ stores: list.map((s, order) => ({ ...s, order })) });
      },

      setTemplate: (items) => set({ template: items }),

      addTemplateItem: (label) => {
        const text = label.trim();
        if (!text) return;
        set({ template: [...get().template, { id: uid(), label: text }] });
      },

      updateTemplateItem: (id, label) => {
        set({
          template: get().template.map((t) =>
            t.id === id ? { ...t, label } : t,
          ),
        });
      },

      removeTemplateItem: (id) => {
        set({ template: get().template.filter((t) => t.id !== id) });
      },

      moveTemplateItem: (id, dir) => {
        const list = [...get().template];
        const i = list.findIndex((t) => t.id === id);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= list.length) return;
        const tmp = list[i]!;
        list[i] = list[j]!;
        list[j] = tmp;
        set({ template: list });
      },

      createVisit: (storeId, source) => {
        const store = get().stores.find((s) => s.id === storeId);
        if (!store) return null;
        const existing = get()
          .visits.filter((v) => v.storeId === storeId)
          .sort((a, b) => b.number - a.number);
        const number = (existing[0]?.number ?? 0) + 1;
        const now = Date.now();
        const visit: Visit = {
          id: uid(),
          storeId,
          number,
          createdAt: now,
          updatedAt: now,
          items: source ? cloneItems(source.items) : blankItems(get().template),
          kontrolNoktasiHtml: source?.kontrolNoktasiHtml ?? "",
          genelHtml: source?.genelHtml ?? "",
          noteFont: source?.noteFont ?? "Arial",
          noteColor: source?.noteColor ?? "#111111",
          noteSize: source?.noteSize ?? "3",
        };
        set({ visits: [...get().visits, visit] });
        return visit;
      },

      updateVisit: (id, patch) => {
        set({
          visits: get().visits.map((v) =>
            v.id === id ? { ...v, ...patch, updatedAt: Date.now() } : v,
          ),
        });
      },

      updateItem: (visitId, itemId, patch) => {
        set({
          visits: get().visits.map((v) => {
            if (v.id !== visitId) return v;
            return {
              ...v,
              updatedAt: Date.now(),
              items: v.items.map((it) =>
                it.id === itemId ? { ...it, ...patch } : it,
              ),
            };
          }),
        });
      },

      addItem: (visitId, label) => {
        const text = label.trim();
        if (!text) return null;
        const id = uid();
        set({
          visits: get().visits.map((v) => {
            if (v.id !== visitId) return v;
            return {
              ...v,
              updatedAt: Date.now(),
              items: [...v.items, { id, label: text, noteHtml: "", photos: [] }],
            };
          }),
        });
        return id;
      },

      removeItem: (visitId, itemId) => {
        set({
          visits: get().visits.map((v) => {
            if (v.id !== visitId) return v;
            return {
              ...v,
              updatedAt: Date.now(),
              items: v.items.filter((it) => it.id !== itemId),
            };
          }),
        });
      },

      addPhoto: (visitId, itemId, dataUrl) => {
        const photo: Photo = { id: uid(), dataUrl };
        set({
          visits: get().visits.map((v) => {
            if (v.id !== visitId) return v;
            return {
              ...v,
              updatedAt: Date.now(),
              items: v.items.map((it) =>
                it.id === itemId ? { ...it, photos: [...it.photos, photo] } : it,
              ),
            };
          }),
        });
      },

      removePhoto: (visitId, itemId, photoId) => {
        set({
          visits: get().visits.map((v) => {
            if (v.id !== visitId) return v;
            return {
              ...v,
              updatedAt: Date.now(),
              items: v.items.map((it) =>
                it.id === itemId
                  ? { ...it, photos: it.photos.filter((p) => p.id !== photoId) }
                  : it,
              ),
            };
          }),
        });
      },

      deleteVisit: (id) => {
        set({ visits: get().visits.filter((v) => v.id !== id) });
      },
    }),
    {
      name: "bim-ziyaret-v1",
      storage: createJSONStorage(() => idbStorage),
      partialize: (s) => ({
        stores: s.stores,
        visits: s.visits,
        template: s.template,
      }),
      skipHydration: true,
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          console.error(error);
        }
        useAppStore.getState().setHydrated(true);
      },
    },
  ),
);

export function rehydrateAppStore(): void {
  void useAppStore.persist.rehydrate();
}
