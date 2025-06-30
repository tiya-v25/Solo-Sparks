const mongoose = require("mongoose");

const questSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  description: String,
  type: { type: String, enum: ["daily", "weekly", "monthly"], default: "daily" },
  mediaType: { type: String, enum: ["text", "photo", "audio"], default: "text" },
  rewardPoints: { type: Number, default: 10 },
  deadline: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quest", questSchema);
