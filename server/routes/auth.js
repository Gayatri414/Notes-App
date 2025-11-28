import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// ----------------------
// REGISTER USER
// ----------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
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

// ----------------------
// LOGIN USER
// ----------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });
    }

    // Check password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      "secretkeyofnoteapp123@#", // 👉 move to .env later
      { expiresIn: "5h" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: { name: user.name, email: user.email },
      message: "Login successful",
    });
  } catch (error) {
    console.error("❌ Error in /login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error in Login Server" });
  }
});

export default router;
