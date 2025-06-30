const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/add', async (req, res) => {
  const { email, pointsToAdd } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.points = (user.points || 0) + pointsToAdd;
    await user.save();
    res.json({ message: 'Points added successfully', totalPoints: user.points });
  } catch (err) {
    res.status(500).json({ message: 'Error adding points', error: err.message });
  }
});

router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ points: user.points || 0 });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching points', error: err.message });
  }
});

export default router;

