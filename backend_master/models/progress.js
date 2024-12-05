const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questionsSolved: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastSolvedDate: { type: Date },
});

module.exports = mongoose.model("Progress", progressSchema);
