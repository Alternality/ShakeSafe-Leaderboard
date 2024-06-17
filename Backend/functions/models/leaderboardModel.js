const mongoose = require('mongoose');
const leaderboardSchema = require('../schema/leaderboardSchema');


if (!(leaderboardSchema instanceof mongoose.Schema)) {
    throw new Error('leaderboardSchema is not a valid Mongoose schema');
}

const leaderboardModel = mongoose.model('Leaderboard', leaderboardSchema); 

module.exports = leaderboardModel;