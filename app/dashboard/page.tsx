"use client"
import AddNoteModal from "@/components/addNoteModel";
import NoteCard from "@/components/noteCard";

const notes = [
    { id: 1, title: "Note 1", description: "This is the first note." },
    { id: 2, title: "Note 2", description: "This is the second note." },
  ];

export default function Dashboard(){
    const handleEdit = (id: number) => {
        console.log("Edit note with id:", id);
      };
    
      const handleDelete = (id: number) => {
        console.log("Delete note with id:", id);
      };
    return(
        <div>
            <div>
                <AddNoteModal/>
            </div>
            <div>
            {notes.map((note) => (
        <NoteCard
          key={note.id}
          title={note.title}
          description={note.description}
          onEdit={() => handleEdit(note.id)}
          onDelete={() => handleDelete(note.id)}
        />
      ))}
            </div>
        </div>
    );
}