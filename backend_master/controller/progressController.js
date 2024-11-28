const Progress = require('../models/progress');

// Get progress for a user
exports.getProgress = async (req, res) => {
    try {
        const progress = await Progress.findOne({ user: req.user.id });
        if (!progress) {
            return res.status(404).json({ success: false, message: "Progress not found" });
        }
        res.status(200).json({ success: true, progress });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

// Update progress for a user
exports.updateProgress = async (req, res) => {
    const { questionsSolved, streak } = req.body;

    try {
        let progress = await Progress.findOne({ user: req.user.id });

        if (!progress) {
            progress = new Progress({ user: req.user.id });
        }

        progress.questionsSolved += questionsSolved;
        progress.streak = streak || progress.streak;
        progress.lastUpdated = new Date();

        await progress.save();

        res.status(200).json({ success: true, progress });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};
