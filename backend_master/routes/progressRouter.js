const express = require('express');
const { getProgress, updateProgress } = require('../controller/progressController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Route to get progress
router.get('/getp', verifyToken, getProgress);

// Route to update progress
router.put('/updatep', verifyToken, updateProgress);

module.exports = router;
