import { requireAuth } from "@clerk/express";

// Custom middleware to ensure req.auth.userId is available
const clerkAuth = (req, res, next) => {
  requireAuth()(req, res, (err) => {
    if (err) {
      console.error("Clerk auth error:", err);
      return res.status(401).json({ message: "Unauthorized" });
    }

    const auth = typeof req.auth === "function" ? req.auth() : req.auth;
    if (!auth?.userId) {
      console.error("No userId in req.auth:", auth);
      return res.status(401).json({ message: "No user ID found" });
    }

    next();
  });
};

export default clerkAuth;
