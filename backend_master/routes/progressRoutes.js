const express = require("express");
const { getProgress, updateProgress } = require("../controller/progressController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Route to get user progress
router.get("/", verifyToken, getProgress);

// Route to update user progress
router.put("/", verifyToken, updateProgress);

module.exports = router;
