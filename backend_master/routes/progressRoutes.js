const express = require("express");
const { getProgress, updateProgress } = require("../controller/progressController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Route to get user progress
router.get("/getprog", verifyToken, getProgress);

// Route to update user progress
router.put("/upprogress", verifyToken, updateProgress);

module.exports = router;
