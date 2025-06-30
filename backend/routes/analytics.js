const express = require("express");
const router = express.Router();
const Reflection = require("../models/Reflection");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const reflections = await Reflection.find({ userId: req.user.id }).sort({ createdAt: -1 });

    const totalReflections = reflections.length;

    const moodCount = reflections.reduce((acc, reflection) => {
      acc[reflection.mood] = (acc[reflection.mood] || 0) + 1;
      return acc;
    }, {});

    const lastReflection = reflections[0] || null;

    res.json({
      totalReflections,
      moodCount,
      lastReflection
    });
  } catch (err) {
    console.error("Analytics fetch failed:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
