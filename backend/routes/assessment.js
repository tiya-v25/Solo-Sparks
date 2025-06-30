const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Assessment = require('../models/Assessment');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;

    const newAssessment = new Assessment({
      userId: req.user.id,
      answers,
    });

    await newAssessment.save();
    res.status(200).json({ message: 'Assessment saved successfully' });
  } catch (error) {
    console.error('Assessment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/', authMiddleware, async (req, res) => {
  try {
    const assessments = await Assessment.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(assessments);
  } catch (error) {
    console.error('Fetch assessment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;