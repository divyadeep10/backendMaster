const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errormiddleware");
const progressUpdate = require("./routes/progressUpdate");
const checker = require("./routes/checkerQuestion");
const getprogress = require("./routes/getProgress");

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
app.use("/api/progress", progressUpdate);
app.use("/api/progress/ch", checker);
app.use("/api/progress/getprogress",getprogress);

// CORS Middleware - Allowing requests only from your frontend URL
app.use(cors({
  origin: "*",  // Replace "*" with your frontend URL if you want to restrict origins
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
}));

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
