const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hasDashboardAccess: { type: Boolean, default: false },
  solvedQuestions: { type: Number, default: 0 },
  dailyStreak: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 }, // Percentage
  learningRate: { type: Number, default: 0 }, // Custom metric
  lastSolvedDate: { type: Date, default: null }, // To track streaks
});

module.exports = mongoose.model("User", userSchema);
