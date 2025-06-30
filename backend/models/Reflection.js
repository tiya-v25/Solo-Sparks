// backend/models/Reflection.js

import mongoose from 'mongoose';

const reflectionSchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'anxious'], // or customize your moods
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true, // adds createdAt and updatedAt
});

const Reflection = mongoose.model('Reflection', reflectionSchema);

export default Reflection;
