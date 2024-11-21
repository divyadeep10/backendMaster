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

app.get('/', (req, res) => {
    res.send('Welcome to the backend API');
  });

// now connect

// Routes
app.use("/api/auth", authRoutes);

// CORS Middleware - Allowing requests only from your frontend URL
app.use(cors({
  origin: "*",  // Allow only this frontend URL
  methods: "GET, POST, PUT, DELETE",  // Allow the necessary HTTP methods
  allowedHeaders: "Content-Type, Authorization", // Allow these headers in the request
}));

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
