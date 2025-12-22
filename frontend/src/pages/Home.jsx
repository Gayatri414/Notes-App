import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import NoteCard from "../components/NoteCard";
import axios from "axios";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  //  Fetch notes when component loads
  useEffect(() => {
    fetchNotes();
  }, []);

  //  Fetch all notes for logged-in user
  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn(" No token found — please login first");
        return;
      }

      const { data } = await axios.get("http://localhost:5000/api/note", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched notes:", data);

      if (Array.isArray(data.notes)) {
        setNotes(data.notes);
      } else {
        console.error(" data.notes is not an array:", data.notes);
        setNotes([]);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Close modal and reset current note
  const closeModal = () => {
    setCurrentNote(null);
    setModalOpen(false);
  };

  //  Open modal for editing
  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  //  Add a new note
  const addNote = async (title, description) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert(" Please log in before adding a note");
        return;
      }

      const { data } = await axios.post(
        "http://localhost:5000/api/note/add",
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(" Add note response:", data);

      if (data.success) {
        await fetchNotes();
        closeModal();
      } else {
        alert(" Failed to add note: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error adding note:", error.response?.data || error);
      alert("Error adding note. Check console for details.");
    }
  };

  // Edit an existing note
  const editNote = async (id, title, description) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert(" Please log in before editing a note");
        return;
      }

      console.log(" Updating note:", { id, title, description });

      const { data } = await axios.put(
        `http://localhost:5000/api/note/${id}`,
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(" Update note response:", data);

      if (data.success) {
        await fetchNotes();
        closeModal();
      } else {
        alert(" Failed to update note: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error(" Error updating note:", error.response?.data || error);
      alert("Error updating note. Check console for details.");
    }
  };

  //  Delete a note
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert(" Please log in before deleting a note");
        return;
      }

      if (!window.confirm(" Are you sure you want to delete this note?")) {
        return;
      }

      console.log(" Deleting note:", id);

      const { data } = await axios.delete(
        `http://localhost:5000/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(" Delete response:", data);

      if (data.success) {
        await fetchNotes();
      } else {
        alert(" Failed to delete note: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error(" Error deleting note:", error.response?.data || error);
      alert("Error deleting note. Check console for details.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/*  Notes grid */}
      <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={onEdit}
              deleteNote={deleteNote} //  Pass deleteNote here!
            />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No notes found.
          </p>
        )}
      </div>

      {/*  Add note button */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed right-4 bottom-4 bg-teal-500 hover:bg-teal-600 text-white text-2xl font-bold p-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
      >
        + Add Note
      </button>

      {/* Modal (for add/edit) */}
      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
