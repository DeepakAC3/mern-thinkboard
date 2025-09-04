import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import api from "../lib/axios"; // Importing the axios instance
import toast from "react-hot-toast";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // const res = await fetch("http://localhost:5001/api/notes")
        // const data = await res.json();
        // console.log(data)

        const res = await api.get("/notes"); // for post axios.post
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false); // fetch is successful
      } catch (error) {
        console.error(error);
        if (error.response?.status === 429) {
          // should be response not res, otherwise the component will not load
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        } // fetch has failed
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
