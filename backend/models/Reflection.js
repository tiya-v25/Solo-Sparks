const mongoose = require('mongoose');

const reflectionSchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'anxious'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  mediaUrl: {
    type: String,      
    default: null,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true,
});

const Reflection = mongoose.model('Reflection', reflectionSchema);

module.exports = Reflection;
