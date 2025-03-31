import { useState } from "react";
import { addNoteToDB } from "@/utils/indexeddb";

type Note = {
  _id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
};

const useAddNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes]=useState<Note[]>([]);

  const addNote = async (userId: string, title: string, description: string) => {
    setLoading(true);
    setError(null);

    try {
      const newNote = {
        _id:crypto.randomUUID(),
         userId, 
         title, 
         description, 
         createdAt: new Date().toISOString() 
        };

      await addNoteToDB(newNote);

      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });
      setNotes((prevNotes)=> [...prevNotes,newNote]);

      if (!response.ok) throw new Error("Failed to add note");

      return await response.json();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { addNote, loading, error ,notes};
};

export default useAddNote;
