import mongoose from "mongoose";

// 1- create a schema
// 2- create model based off of that schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: String, // Clerk userId
      required: true,
    },
  },
  { timestamps: true }, // createdAt, updatedAt
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
