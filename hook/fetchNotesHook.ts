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

  const fetchNotes = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const cachedNotes = await getNotesFromDB();
      if (cachedNotes.length > 0) setNotes(cachedNotes);

      const res = await fetch(`/api/notes/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch notes");

      const data = await res.json();
      setNotes(data.notes);

      data.notes.forEach(async (note: Note) => {
        await addNoteToDB(note);
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [userId]);

  return { notes, loading, error, refetch: fetchNotes }; 
};

export default useFetchNotes;
