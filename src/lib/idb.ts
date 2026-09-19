import type { StateStorage } from "zustand/middleware";

const DB_NAME = "bim-ziyaret-db";
const STORE_NAME = "kv";
const memory = new Map<string, string>();

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function lsGet(name: string): string | null {
  try {
    return localStorage.getItem(name) ?? memory.get(name) ?? null;
  } catch {
    return memory.get(name) ?? null;
  }
}

function lsSet(name: string, value: string) {
  memory.set(name, value);
  try {
    localStorage.setItem(name, value);
  } catch {
    /* quota */
  }
}

function lsRemove(name: string) {
  memory.delete(name);
  try {
    localStorage.removeItem(name);
  } catch {
    /* ignore */
  }
}

export const idbStorage: StateStorage = {
  async getItem(name) {
    if (typeof indexedDB === "undefined") return lsGet(name);
    try {
      const db = await openDb();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const req = tx.objectStore(STORE_NAME).get(name);
        req.onsuccess = () => {
          const value = req.result;
          resolve(
            typeof value === "string" ? value : value ? JSON.stringify(value) : lsGet(name),
          );
        };
        req.onerror = () => reject(req.error);
      });
    } catch {
      return lsGet(name);
    }
  },
  async setItem(name, value) {
    lsSet(name, value);
    if (typeof indexedDB === "undefined") return;
    try {
      const db = await openDb();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).put(value, name);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch {
      /* localStorage already written */
    }
  },
  async removeItem(name) {
    lsRemove(name);
    if (typeof indexedDB === "undefined") return;
    try {
      const db = await openDb();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).delete(name);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch {
      /* ignore */
    }
  },
};
