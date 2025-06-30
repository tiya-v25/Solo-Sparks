
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinary"); 
const upload = multer({ storage });

const Reflection = require("../models/Reflection");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/", authMiddleware, upload.single("media"), async (req, res) => {
  const { mood, message } = req.body;

  try {
    const newReflection = new Reflection({
      mood,
      message,
      mediaUrl: req.file?.path || null, 
      userId: req.user.id,
    });

    await newReflection.save();

    
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
