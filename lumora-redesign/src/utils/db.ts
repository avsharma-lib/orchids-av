const DB_NAME = 'PoliticianGalleryDB';
const STORE_NAME = 'media';
const DB_VERSION = 2; // Incremented version to add 'order' index if needed, or just handle it in code

export interface MediaItem {
  id?: number;
  blob: Blob;
  type: 'image' | 'video';
  timestamp: number;
  order: number;
}

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
      // Migration for version 2: ensuring all items have an 'order' field might be needed if they don't
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveMedia = async (item: Omit<MediaItem, 'id' | 'order'>): Promise<number> => {
  const db = await initDB();
  const allMedia = await getAllMedia();
  const nextOrder = allMedia.length > 0 ? Math.max(...allMedia.map(m => m.order)) + 1 : 0;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add({ ...item, order: nextOrder });

    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(request.error);
  });
};

export const getAllMedia = async (): Promise<MediaItem[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const results = request.result as MediaItem[];
      // Sort by order
      resolve(results.sort((a, b) => a.order - b.order));
    };
    request.onerror = () => reject(request.error);
  });
};

export const deleteMedia = async (id: number): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const updateMediaOrder = async (items: MediaItem[]): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    let completed = 0;
    items.forEach((item, index) => {
      const request = store.put({ ...item, order: index });
      request.onsuccess = () => {
        completed++;
        if (completed === items.length) resolve();
      };
      request.onerror = () => reject(request.error);
    });
  });
};
