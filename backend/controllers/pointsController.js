const User = require('../models/User');

const updatePoints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.points += req.body.points;
    await user.save();
    res.status(200).json({ points: user.points });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getPoints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ points: user.points });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { updatePoints, getPoints };
