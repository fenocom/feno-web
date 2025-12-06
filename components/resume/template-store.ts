"use client";

export type StoredTemplate = {
  name: string;
  data: any;
  updatedAt: number;
};

const DB_NAME = "feno-templates";
const STORE_NAME = "templates";
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "name" });
      }
    };

    req.onsuccess = () => {
      resolve(req.result);
    };

    req.onerror = () => {
      reject(req.error);
    };
  });
}

async function withStore<T>(mode: IDBTransactionMode, cb: (store: IDBObjectStore) => Promise<T>) {
  const db = await openDB();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, mode);
    const store = tx.objectStore(STORE_NAME);
    cb(store)
      .then((res) => {
        tx.oncomplete = () => resolve(res);
        tx.onerror = () => reject(tx.error);
      })
      .catch((err) => reject(err));
  });
}

export async function saveTemplate(name: string, data: any): Promise<void> {
  const entry: StoredTemplate = {
    name,
    data,
    updatedAt: Date.now(),
  };

  await withStore<void>("readwrite", (store) => {
    return new Promise((resolve, reject) => {
      const req = store.put(entry);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
}

export async function getTemplate(name: string): Promise<StoredTemplate | null> {
  return await withStore<StoredTemplate | null>("readonly", (store) => {
    return new Promise((resolve, reject) => {
      const req = store.get(name);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => reject(req.error);
    });
  });
}

export async function deleteTemplate(name: string): Promise<void> {
  await withStore<void>("readwrite", (store) => {
    return new Promise((resolve, reject) => {
      const req = store.delete(name);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
}

export async function clearAllTemplates(): Promise<void> {
  await withStore<void>("readwrite", (store) => {
    return new Promise((resolve, reject) => {
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
}

export async function listTemplates(): Promise<StoredTemplate[]> {
  return await withStore<StoredTemplate[]>("readonly", (store) => {
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result ?? []);
      req.onerror = () => reject(req.error);
    });
  });
}