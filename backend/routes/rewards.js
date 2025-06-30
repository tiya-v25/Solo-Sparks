const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

const rewards = [
  { _id: "1", name: "Free Wallpaper", points: 20 },
  { _id: "2", name: "Ebook Download", points: 50 },
  { _id: "3", name: "Exclusive Badge", points: 100 }
];

// Get rewards
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ points: user.points || 0, rewards });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Redeem
router.post('/redeem', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const reward = rewards.find(r => r._id === req.body.rewardId);

    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    if (user.points < reward.points) return res.status(400).json({ message: 'Not enough points' });

    user.points -= reward.points;
    await user.save();

    res.json({ message: 'Reward redeemed!' });
  } catch (err) {
    res.status(500).json({ message: 'Error redeeming reward' });
  }
});

module.exports = router;
