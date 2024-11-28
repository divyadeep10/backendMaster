const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hasDashboardAccess: { type: Boolean, default: false },
  progress: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Progress',  // This will link to the Progress model
    required: false // Optional, can be set to false if progress is not required initially
  }
});

module.exports = mongoose.model("User", userSchema);
