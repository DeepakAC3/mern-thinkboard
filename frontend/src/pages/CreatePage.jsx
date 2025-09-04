import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { SignInButton, useUser, useAuth } from "@clerk/clerk-react";
const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); // to once submit the form, we will set loading to true, and then false after the post request is done

  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the default form submission behavior,i.e refreshing the page
    if (!isSignedIn) {
      toast.error("You must sign in to create a note");
      return;
    }
    // console.log({ title, content });
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true); // set loading to true when the form is submitted
    try {
      // Token is automatically added by axios interceptor
      const res = await api.post("/notes", { title, content });
      // create note response received
      // Compare saved note owner vs current Clerk user id
      const savedUser = res.data?.user;
      const currentUserId = user?.id;
      if (savedUser && currentUserId && savedUser !== currentUserId) {
        console.error(
          `Note saved under different user id: saved=${savedUser} current=${currentUserId}`,
        );
        toast.error(
          "Warning: note saved under different user id (check server logs)",
        );
      } else {
        toast.success("Note created successfully");
      }
      // Navigate with the created note for optimistic update
      navigate("/", { state: { newNote: res.data } });
    } catch (error) {
      console.error("Error creating note:", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You are creating notes too fast.", {
          duration: 5000,
          icon: "🚨",
        });
      } else if (error.response?.status === 401) {
        toast.error("Please sign in to create notes");
      } else {
        toast.error("Failed to create note! Please try again later.");
      }
    } finally {
      setLoading(false); // set loading to false when the request is complete
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create a New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Note Content"
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  {!isSignedIn ? (
                    <SignInButton mode="modal">
                      <button className="btn btn-primary">
                        Sign in to create
                      </button>
                    </SignInButton>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}>
                      {loading ? "Creating..." : "Create Note"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
