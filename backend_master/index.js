const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errormiddleware");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());  
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
