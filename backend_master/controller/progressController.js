const User = require("../models/user");

// Fetch user progress
const getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("solvedQuestions dailyStreak accuracy learningRate");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user progress
const updateProgress = async (req, res) => {
  const { solvedQuestions, dailyStreak, accuracy, learningRate } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (solvedQuestions) user.solvedQuestions = solvedQuestions;
    if (dailyStreak) user.dailyStreak = dailyStreak;
    if (accuracy) user.accuracy = accuracy;
    if (learningRate) user.learningRate = learningRate;

    await user.save();

    res.status(200).json({ message: "Progress updated successfully", user });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getProgress, updateProgress };
