import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    } else {
      next(); // proceed to the next middleware or route handler
    }
  } catch (error) {
    next(error); // pass the error to the next middleware
  }
};

export default rateLimiter;
