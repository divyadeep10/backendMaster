const express = require("express");
const router = express.Router();

router.get("/getleaderboard", async (req, res) => {
    try {
      const leaderboard = await Progress.find({})
        .sort({ questionsSolved: -1 }) // Sort by questionsSolved in descending order
        .limit(10) // Top 10 solvers
        .populate("userID", "username email") // Populate user details (username, email)
        .exec();
  
      res.status(200).json({ success: true, data: leaderboard });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
  });
  
  module.exports = router;