// backend/routes/quest.js
const express = require('express');
const router = express.Router();

const quests = {
  happy: "Spread happiness! Compliment 2 people today.",
  sad: "Take a walk and write one thing you're grateful for.",
  angry: "Take deep breaths. Write down 3 positive affirmations.",
  anxious: "Pause. Drink water and do a 2-minute meditation."
};

router.get('/:mood', (req, res) => {
  const mood = req.params.mood;
  const quest = quests[mood];
  if (!quest) return res.status(404).json({ message: "No quest found." });
  res.json({ quest });
});

// module.exports = router;
export default router;

