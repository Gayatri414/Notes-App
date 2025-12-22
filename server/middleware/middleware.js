import jwt from "jsonwebtoken";
import User from "../models/User.js";

const middleware = async (req, res, next) => {
  try {
    // Check token presence
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, "secretkeyofnoteapp123@#"); //  must match auth.js

    // Find user by decoded.id (not decoded._id)
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    // Attach user to request
    req.user = user;

    // Move to next route
    next();
  } catch (error) {
    console.error(" Middleware error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default middleware;
