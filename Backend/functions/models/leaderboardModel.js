const mongoose = require('mongoose');
const leaderboardSchema = require('../schema/leaderboardSchema'); // Correct path to the recipe schema

// Ensure that recipeSchema is a Mongoose schema instance
if (!(leaderboardSchema instanceof mongoose.Schema)) {
    throw new Error('leaderboardSchema is not a valid Mongoose schema');
}

const leaderboardModel = mongoose.model('Leaderboard', leaderboardSchema); // Create the Mongoose model

module.exports = leaderboardModel;