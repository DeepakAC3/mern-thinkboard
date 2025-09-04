import express from "express";
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
} from "../controllers/notesController.js";
import clerkAuth from "../middleware/clerkAuth.js";

const router = express.Router();

// All note routes require Clerk authentication
router.get("/", clerkAuth, getAllNotes);
router.get("/:id", clerkAuth, getNoteById);
router.post("/", clerkAuth, createNote);
router.put("/:id", clerkAuth, updateNote);
router.delete("/:id", clerkAuth, deleteNote);

export default router;
