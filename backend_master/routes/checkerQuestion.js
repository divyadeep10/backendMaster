const express = require('express');
const mongoose = require('mongoose');
const Question = require('../models/question');  // Import your Question model
const app = express();

// Define the route to check progress for a particular user and question index
app.get("/checker/:userID/:language/:questionIndex", async (req, res) => {
    const { userID, language, questionIndex } = req.params; // Destructure language from params

    try {
        // Check if the user has solved the question for the specified language
        const progress = await Question.findOne({ userID, language, questionIndex });

        // If progress is found, return that the question is completed
        if (progress) {
            return res.status(200).json({ completed: true });
        }

        // If no progress is found, return that the question is not completed
        return res.status(200).json({ completed: false });
    } catch (error) {
        // If an error occurs, return a server error status
        console.error("Error checking progress:", error.message);
        return res.status(500).json({ error: "Failed to check progress" });
    }
});

module.exports = app;
