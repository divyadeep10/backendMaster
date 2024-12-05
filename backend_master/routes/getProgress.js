const express = require('express');
const mongoose = require('mongoose');
const router = express();
const Progress = require("../models/progress");

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log("Received userId:", userId);
  
    try {
      // Validate userId format
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.error("Invalid userId format:", userId);
        return res.status(400).json({ message: "Invalid userId format" });
      }
  
      // Create a new ObjectId instance
      const objectId = new mongoose.Types.ObjectId(userId);
  
      // Query the database for progress by userID
      const userProgress = await Progress.findOne({ userID: objectId });
      console.log("Query result:", userProgress);
  
      if (!userProgress) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({
        questionsSolved: userProgress.questionsSolved,
        streak: userProgress.streak,
        lastSolvedDate: userProgress.lastSolvedDate,
      });
    } catch (error) {
      console.error("Error during query:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  module.exports = router;