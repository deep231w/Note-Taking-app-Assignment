"use client"
import AddNoteModal from "@/components/addNoteModel";
import NoteCard from "@/components/noteCard";
import { useAuth } from "@/context/authContext";
import useFetchNotes from "@/hook/fetchNotesHook";

export default function Dashboard(){
    const {user , loading}= useAuth();
    const {notes, loading:notesLoading, error}=useFetchNotes(user?._id);

    const handleEdit = (id: string) => {
        console.log("Edit note with id:", id);
      };
    
      const handleDelete = (id: string) => {
        console.log("Delete note with id:", id);
      };
      
      if (loading || notesLoading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;
    return(
        <div>
            <div>
                <AddNoteModal/>
            </div>
            <div>
            {notes.map((note) => (
        <NoteCard
          key={note._id}
          title={note.title}
          description={note.description}
          onEdit={() => handleEdit(note._id)}
          onDelete={() => handleDelete(note._id)}
        />
      ))}
            </div>
        </div>
    );
}