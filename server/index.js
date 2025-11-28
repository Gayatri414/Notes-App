import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectToMongoDB from "./db/db.js";
import authRoutes from "./routes/auth.js"; // ✅ check this path
import noteRoutes from "./routes/note.js"
dotenv.config();

const app = express();
app.get("/", (req, res) => {
  res.send("✅ Backend is live on port 5000");
});
// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);



// Connect DB
connectToMongoDB();

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});
