const mongoose = require('mongoose');
const { Schema } = mongoose;

const leaderboardSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    survival: {
        score: {
            type: Number,
            required: true,
        },
        time: {
            type: Number, 
            required: true,
        },
        rank: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    timeAttack: {
        score: {
            type: Number,
            required: true,
        },
        time: {
            type: Number, 
            required: true,
        },
        rank: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to handle any additional logic before saving if needed
leaderboardSchema.pre('save', function (next) {
    if (this.survival.rank < 0) {
        this.survival.rank = 0;
    }
    if (this.timeAttack.rank < 0) {
        this.timeAttack.rank = 0;
    }
    next();
});

module.exports = leaderboardSchema;
