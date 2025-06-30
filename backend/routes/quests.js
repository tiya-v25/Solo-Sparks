const express = require("express");
const router = express.Router();
const DailyQuestCompletion = require("../models/DailyQuestCompletion");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// File upload setup
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { uploadToCloudinary } = require("../utils/cloudinary");

// 🌤️ Daily rotating quests
const dailyQuests = {
  Monday: "Compliment 3 people today 😊",
  Tuesday: "Take a 10-minute walk 🚶‍♀️",
  Wednesday: "Write 3 things you're proud of today 💬",
  Thursday: "Describe your dream life in 3 lines 🧠",
  Friday: "Write a letter to your past self 💞",
  Saturday: "Call someone you haven’t spoken to in 2+ weeks 📞",
  Sunday: "Journal your week in 3 lines 📝",
};

// ✅ GET Daily Quest
router.get("/daily", authMiddleware, async (req, res) => {
  const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const quest = dailyQuests[day] || "Stay mindful today 🌱";

  const today = new Date().toISOString().split("T")[0];
  const existing = await DailyQuestCompletion.findOne({
    userId: req.user.id,
    date: today,
  });

  res.json({
    day,
    quest,
    completed: !!existing,
  });
});

// ✅ POST /daily/complete — Mark daily quest complete (with optional media)
router.post(
  "/daily/complete",
  authMiddleware,
  upload.single("media"),
  async (req, res) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const existing = await DailyQuestCompletion.findOne({
        userId: req.user.id,
        date: today,
      });

      if (existing)
        return res.status(400).json({ message: "Already completed" });

      let mediaUrl = null;
      if (req.file) {
        const result = await uploadToCloudinary(req.file);
        mediaUrl = result.secure_url;
      }

      await DailyQuestCompletion.create({
        userId: req.user.id,
        date: today,
        completed: true,
        mediaUrl,
      });

      const user = await User.findById(req.user.id);
      user.points += 5;
      await user.save();

      res.json({
        message: "Daily quest completed! You earned 5 Spark Points!",
        mediaUrl,
      });
    } catch (err) {
      console.error("❌ Quest completion error:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// ✅ GET mood-based quest: /api/quest/happy
router.get("/:mood", (req, res) => {
  const moodQuests = {
    happy: "Spread happiness! Compliment 2 people today.",
    sad: "Take a walk and write one thing you're grateful for.",
    angry: "Take deep breaths. Write down 3 positive affirmations.",
    anxious: "Pause. Drink water and do a 2-minute meditation.",
  };

  const mood = req.params.mood;
  const quest = moodQuests[mood];
  if (!quest) return res.status(404).json({ message: "No quest found." });
  res.json({ quest });
});

module.exports = router;
