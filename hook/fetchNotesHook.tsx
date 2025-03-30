import { useEffect, useState } from "react";
import { getNotesFromDB, addNoteToDB } from "@/utils/indexeddb";

interface Note {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

const useFetchNotes = (userId: string) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchNotes = async () => {
      setLoading(true);

      try {
        // Try loading notes from IndexedDB first (for offline support)
        const cachedNotes = await getNotesFromDB();
        if (cachedNotes.length > 0) setNotes(cachedNotes);

        // Fetch latest notes from API
        const res = await fetch(`/api/notes/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch notes");

        const data = await res.json();
        setNotes(data.notes);

        // Store the latest notes in IndexedDB
        data.notes.forEach(async (note: Note) => {
          await addNoteToDB(note);
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [userId]);

  return { notes, loading, error };
};

export default useFetchNotes;
