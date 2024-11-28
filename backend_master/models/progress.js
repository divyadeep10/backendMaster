const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questionsSolved: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
