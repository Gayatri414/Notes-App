import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();

    res
      .status(200)
      .json({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.error("❌ Error in /register:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default router; // ✅ correct for ES Modules
