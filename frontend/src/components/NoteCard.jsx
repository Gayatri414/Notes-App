import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onEdit, deleteNote }) => {
  if (!note) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {note.title || "Untitled Note"}
      </h2>
      <p className="text-gray-700 mb-4 break-words">
        {note.description || "No description provided."}
      </p>

      <div className="flex justify-end">
        <button
          className="text-blue-500 hover:text-blue-600 mr-3"
          onClick={() => onEdit(note)}
        >
          <FaEdit />
        </button>

        <button
          className="text-red-500 hover:text-red-600"
          onClick={() => deleteNote(note._id)} // ✅ Uses prop passed from Home
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
