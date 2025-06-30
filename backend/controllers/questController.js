const Quest = require('../models/Quest');

// GET all quests
exports.getAllQuests = async (req, res) => {
  try {
    const quests = await Quest.find();
    res.json(quests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new quest
exports.createQuest = async (req, res) => {
  const { title, description, category, type, points } = req.body;
  try {
    const newQuest = new Quest({ title, description, category, type, points });
    await newQuest.save();
    res.status(201).json(newQuest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
