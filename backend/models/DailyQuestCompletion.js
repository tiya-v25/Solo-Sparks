
const mongoose = require("mongoose");

const dailyQuestCompletionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true }, 
  completed: { type: Boolean, default: true },
  mediaUrl: { type: String, default: null }  
});

module.exports = mongoose.model("DailyQuestCompletion", dailyQuestCompletionSchema);