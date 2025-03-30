"use client";
import { useState } from "react";
import { Button, Modal, TextField, Box } from "@mui/material";
import { useAuth } from "@/context/authContext";
import useAddNote from "@/hook/useAddNotes";
import useFetchNotes from "@/hook/fetchNotesHook";
export default function AddNoteModal() {
  const { user } = useAuth();
  const { addNote, loading, error } = useAddNote();
  //const { refetch } = useFetchNotes(user?._id);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!title || !description) return;
    await addNote(user?._id, title, description);
    setTitle("");
    setDescription("");
    setOpen(false);
    //refetch();
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)} variant="contained">
        Add Note
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ padding: 3, background: "white", borderRadius: 2, width: 400, margin: "auto", mt: 10 }}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? "Adding..." : "Add Note"}
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Box>
      </Modal>
    </div>
  );
}
