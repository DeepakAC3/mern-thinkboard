import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    // Only return notes created by the logged-in user
    const userId =
      typeof req.auth === "function" ? req.auth().userId : req.auth?.userId;
    const notes = await Note.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    // Only allow access if the note belongs to the logged-in user
    const userId =
      typeof req.auth === "function" ? req.auth().userId : req.auth?.userId;
    if (note.user !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(note);
  } catch (error) {
    console.error("error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    // Associate the note with the logged-in Clerk user
    const userId =
      typeof req.auth === "function" ? req.auth().userId : req.auth?.userId;
    const note = new Note({ title, content, user: userId });
    const savedNote = await note.save();
    res.status(200).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    // Only allow update if the note belongs to the logged-in user
    const userId =
      typeof req.auth === "function" ? req.auth().userId : req.auth?.userId;
    if (note.user !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    note.title = title;
    note.content = content;
    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    // Only allow delete if the note belongs to the logged-in user
    const userId =
      typeof req.auth === "function" ? req.auth().userId : req.auth?.userId;
    if (note.user !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await note.deleteOne();
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
