// backend/routes/reflections.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinary"); // ⬅️ from utils setup
const upload = multer({ storage });

const Reflection = require("../models/Reflection");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Create a new reflection with optional media upload
router.post("/", authMiddleware, upload.single("media"), async (req, res) => {
  const { mood, message } = req.body;

  try {
    const newReflection = new Reflection({
      mood,
      message,
      mediaUrl: req.file?.path || null, // ⬅️ Cloudinary file URL (optional)
      userId: req.user.id,
    });

    await newReflection.save();

    // 🟢 Give 10 points to the user
    const user = await User.findById(req.user.id);
    if (user) {
      user.points += 10;
      await user.save();
    }

    res.status(201).json({
      message: "Reflection saved & 10 points rewarded!",
      reflection: newReflection,
    });
  } catch (err) {
    console.error("Error saving reflection:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all reflections for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const reflections = await Reflection.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(reflections);
  } catch (err) {
    console.error("Error fetching reflections:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
