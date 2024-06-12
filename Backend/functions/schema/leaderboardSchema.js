// functions/schema/leaderboardSchema.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const leaderboardSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    rank: {
        type: Number,
        required: true,
    },
});

// Middleware to handle any additional logic before saving if needed
// Example: Ensure rank is always a positive integer
leaderboardSchema.pre('save', function (next) {
    if (this.rank < 0) {
        this.rank = 0;
    }
    next();
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
