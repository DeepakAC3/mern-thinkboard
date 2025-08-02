import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // built in

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
// const express = require("express");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); // this is the current directory where the server.js file is located

// connectDB(); // if we leave it like this, then it will connect only after the server starts. instead we will wrap app.listen in a specific way

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}
app.use(express.json()); // read from the req.body before doing anything else
app.use(rateLimiter); // apply rate limiting middleware
// parse the json body: req.body

// app.use((req,res,next) =>{
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

// what this does is it logs the method in the console, before the server handles the request

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); // serve static files from the frontend build directory
  // this is the directory where the frontend build files are located
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    // this will send the index.html file for any route that is not handled by the API
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT); // now the DB is connected before the server starts
  });
});
