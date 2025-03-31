export const openDB = async () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("NotesDB", 1);
  
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("notes")) {
          db.createObjectStore("notes", { keyPath: "_id" });
        }
      };
  
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Failed to open IndexedDB");
    });
  };
  
  export const addNoteToDB = async (note: any) => {
    if (!note._id) {
        console.error("Error: Note is missing '_id' field", note);
        return;
    }

    const db = await openDB();
    const tx = db.transaction("notes", "readwrite");
    const store = tx.objectStore("notes");

    const formattedNote = { ...note, _id: note._id.toString() || crypto.randomUUID() };

    console.log("Storing in IndexedDB:", formattedNote); 

    store.put(formattedNote);

    return new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => {
            console.log("Note added successfully:", formattedNote);
            resolve();
        };
        tx.onerror = (event) => {
            console.error("Error adding note", event);
            reject(event);
        };
    });
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
  