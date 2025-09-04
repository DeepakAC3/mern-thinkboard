import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import { setupAxiosInterceptors } from "./lib/axios";

const App = () => {
  const { getToken } = useAuth();

  // Setup axios interceptors with Clerk's getToken
  useEffect(() => {
    setupAxiosInterceptors(getToken);
  }, [getToken]);

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full flex items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,_#000_60%,_#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
