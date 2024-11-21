const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Registration
const registerUser = async (req, res) => {
  const { username, email, password, hasDashboardAccess } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ 
      username, 
      email, 
      password: hashedPassword, 
      hasDashboardAccess: hasDashboardAccess || false // Default to false if not provided
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(400).json({ message: "Registration failed!", error });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, hasDashboardAccess: user.hasDashboardAccess },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        hasDashboardAccess: user.hasDashboardAccess,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to verify JWT token and check dashboard access
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request

    console.log("Decoded Token:", decoded);

    // Check for dashboard access
    if (!decoded.hasDashboardAccess) {
      return res.status(403).json({ message: "Access denied. No dashboard access." });
    }

    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    res.status(400).json({ message: "Invalid token." });
  }
};

// Exporting the functions
module.exports = { registerUser, loginUser, verifyToken };
