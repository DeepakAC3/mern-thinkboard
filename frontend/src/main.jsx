import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/clerk-react";
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
