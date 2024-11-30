const express = require('express');
const { getProgress, updateProgress } = require('../controller/progressController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// In progressRouter.js
router.get('/getp/:userId', (req, res, next) => {
    console.log('Received request for:', req.params.userId);
    next();
  });


// Route to get progress
router.get('/getp/:userId', getProgress);

// Route to update progress
router.put('/updatep', verifyToken, updateProgress);

module.exports = router;
