const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  language: { type: String, required: true }, // Language associated with the question
  questionIndex: { type: Number, required: true }, // Unique index for the question within the language
  solvedDate: { type: Date, default: Date.now }, // Date the question was solved
});

// Add a unique index to prevent duplicate entries for the same user, language, and question
questionSchema.index({ userID: 1, language: 1, questionIndex: 1 }, { unique: true });

module.exports = mongoose.model("Question", questionSchema);
