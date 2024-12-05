const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Progress = require("../models/progress");
const Question = require("../models/question"); // Importing Question model

router.post("/update", async (req, res) => {
  console.log(req.body);

  const { userID, questionIndex, language } = req.body; // Include `language` in the request body

  // Convert the userID to ObjectId
  const objectId = new mongoose.Types.ObjectId(userID); // Ensure `new` is used

  // Validate the userID format after converting it
  if (!mongoose.Types.ObjectId.isValid(objectId)) {
    console.error("Invalid userId format");
    return res.status(400).json({ message: "Invalid userId format" });
  }

  console.log("inside");

  try {
    const currentDate = new Date();

    // Step 1: Update or Create Question Record
    let question = await Question.findOne({ userID: objectId, questionIndex, language });
    if (!question) {
      // Create a new question entry if it doesn't exist
      question = new Question({
        userID: objectId,
        questionIndex,
        language, // Add language
        solvedDate: currentDate,
      });
      await question.save();
    } else {
      // If the question already exists, update the solvedDate
      question.solvedDate = currentDate;
      await question.save();
    }

    // Step 2: Update Progress Record
    let progress = await Progress.findOne({ userID: objectId });

    if (!progress) {
      // If no progress record exists, create one
      progress = new Progress({
        userID: objectId,
        questionsSolved: 1,
        streak: 1,
        lastSolvedDate: currentDate,
      });
      await progress.save();
      return res.status(200).json({
        message: "Progress initialized and updated.",
        progress,
        question,
      });
    }

    // Check if the streak should continue
    const lastSolvedDate = progress.lastSolvedDate;
    const isSameDay =
      lastSolvedDate && lastSolvedDate.toDateString() === currentDate.toDateString();

    if (!isSameDay) {
      const diffInDays = Math.floor(
        (currentDate - lastSolvedDate) / (1000 * 60 * 60 * 24)
      );
      if (diffInDays === 1) {
        // Increment streak if the user solved on the next day
        progress.streak += 1;
      } else {
        // Reset streak if the gap is more than one day
        progress.streak = 1;
      }
    }

    // Increment questions solved
    progress.questionsSolved += 1;
    progress.lastSolvedDate = currentDate;

    // Save the updated progress
    await progress.save();

    res.status(200).json({
      message: "Progress and question updated successfully.",
      progress,
      question,
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
