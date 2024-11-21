const express = require("express");
const { registerUser, loginUser } = require("../controller/authcontroller");
const verifyToken = require("../middleware/verifyToken");
const User = require("../models/user"); // Ensure the model is imported
const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Get user profile route
router.get("/profile", verifyToken, async (req, res) => {
    console.log("Decoded user from token:", req.user);

    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            console.error("User not found with ID:", req.user.id);
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update user profile route
router.put("/profile", verifyToken, async (req, res) => {
    const { username, email } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { username, email },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            console.error("User not found with ID:", req.user.id);
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(400).json({ message: "Profile update failed", error });
    }
});

module.exports = router;
