export const openDB = async () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("NotesDB", 1);
  
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("notes")) {
          db.createObjectStore("notes", { keyPath: "id" });
        }
      };
  
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Failed to open IndexedDB");
    });
  };
  
  export const addNoteToDB = async (note: any) => {
    const db = await openDB();
    const tx = db.transaction("notes", "readwrite");
    const store = tx.objectStore("notes");
    store.put(note);
    return tx.oncomplete;
  };
  
  export const getNotesFromDB = async () => {
    const db = await openDB();
    return new Promise<any[]>((resolve) => {
      const tx = db.transaction("notes", "readonly");
      const store = tx.objectStore("notes");
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
    });
  };
  
  export const clearNotesDB = async () => {
    const db = await openDB();
    const tx = db.transaction("notes", "readwrite");
    const store = tx.objectStore("notes");
    store.clear();
    return tx.oncomplete;
  };
  