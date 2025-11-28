import express from "express";
import Note from "../models/Note.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

// ✅ Get all notes for logged-in user
router.get("/", middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Add a new note
router.post("/add", middleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNote = new Note({
      title,
      description,
      userId: req.user._id,
    });
    await newNote.save();
    res.status(201).json({ success: true, note: newNote });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ success: false, message: "Error adding note" });
  }
});

// ✅ Update an existing note
router.put("/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { title, description },
      { new: true }
    );

    if (!updatedNote)
      return res
        .status(404)
        .json({ success: false, message: "Note not found or unauthorized" });

    res.status(200).json({ success: true, note: updatedNote });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ success: false, message: "Can't update note" });
  }
});

/// --- Add this block to your router file (e.g., noteRoutes.js) ---

// ----------------------
// Delete an existing note
// ----------------------
router.delete("/:id", middleware, async (req, res) => {
    try {
        const { id } = req.params;

        // Use findOneAndDelete to remove the document if both ID and userId match
        const result = await Note.findOneAndDelete({ 
            _id: id, 
            userId: req.user._id 
        });

        if (!result) {
            // This happens if the ID is invalid OR the note belongs to another user
            return res
                .status(404)
                .json({ success: false, message: "Note not found or unauthorized" });
        }

        // Success: Note was deleted
        res.status(200).json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res
            .status(500)
            .json({ success: false, message: "Can't delete note. Try again later." });
    }
});

// --- End of new code block ---

export default router;
