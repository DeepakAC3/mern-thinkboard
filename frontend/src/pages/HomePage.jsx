import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import api from "../lib/axios"; // Importing the axios instance
import toast from "react-hot-toast";
import { useUser, useAuth, SignInButton } from "@clerk/clerk-react";
import { useLocation } from "react-router";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
  const location = useLocation();

  // Handle optimistic updates from CreatePage
  useEffect(() => {
    if (location.state?.newNote) {
      setNotes((prev) => [location.state.newNote, ...prev]);
      // Clear history state so it doesn't re-add on reload
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    let cancelled = false;
    const fetchNotes = async () => {
      // If not signed in, don't attempt to fetch (clear UI)
      if (!isSignedIn) {
        if (!cancelled) {
          setNotes([]);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      try {
        // Token is automatically added by axios interceptor
        const res = await api.get("/notes");
        if (!cancelled) {
          // fetched notes
          setNotes(res.data || []);
          setIsRateLimited(false);
        }
      } catch (error) {
        console.error("Error fetching notes", error);
        if (!cancelled) {
          if (error.response?.status === 429) {
            setIsRateLimited(true);
          } else {
            toast.error("Failed to load notes");
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // Run the fetch when auth state is ready/changes
    fetchNotes();

    // Cleanup guard
    return () => {
      cancelled = true;
    };
    // DEPENDENCIES: re-run whenever the sign-in status or getToken reference changes
  }, [isSignedIn, getToken]);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {!loading && !isSignedIn && (
          <div className="text-center py-10">
            <p className="mb-4">You must sign in to view your notes.</p>
            <SignInButton mode="modal">
              <button className="btn btn-primary">Sign in</button>
            </SignInButton>
          </div>
        )}

        {!loading && isSignedIn && notes.length === 0 && !isRateLimited && (
          <NotesNotFound />
        )}

        {!loading && isSignedIn && notes.length > 0 && !isRateLimited && (
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
