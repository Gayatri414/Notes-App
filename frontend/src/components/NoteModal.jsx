import React, { useState, useEffect } from "react";

const NoteModal = ({ closeModal, addNote, editNote, currentNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Pre-fill fields when editing
  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title || "");
      setDescription(currentNote.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please enter both title and description");
      return;
    }

    if (currentNote) {
      console.log("✏️ Editing note:", currentNote._id);
      await editNote(currentNote._id, title, description);
    } else {
      console.log("🟢 Adding new note");
      await addNote(title, description); // ✅ this must exist
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {currentNote ? "Edit Note" : "Add New Note"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="border border-gray-300 p-2 w-full mb-4 rounded"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="border border-gray-300 p-2 w-full mb-4 rounded h-24 resize-none"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
            >
              {currentNote ? "Update Note" : "Add Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
