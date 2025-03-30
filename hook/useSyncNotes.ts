import { useState } from "react";
import { addNoteToDB, clearNotesDB } from "@/utils/indexeddb";

const useSyncNotes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncNotes = async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/notes/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch notes from server");

      const { notes } = await response.json();

      await clearNotesDB();

      for (const note of notes) {
        await addNoteToDB(note);
      }

      console.log("Notes synced successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { syncNotes, loading, error };
};

export default useSyncNotes;
