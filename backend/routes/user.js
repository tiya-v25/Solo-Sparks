const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const User = require('../models/User');

// Full profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Basic info
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name email points');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;