const express = require('express');
const LeaderboardModel = require('../models/leaderboardModel');
const router = express.Router();

// GET all entries in the leaderboard for a specific mode
router.get('/:mode', async (req, res) => {
    const mode = req.params.mode;

    try {
        let leaderboard;
        if (mode === 'survival' || mode === 'timeAttack') {
            leaderboard = await LeaderboardModel.find().sort({ [`${mode}.score`]: -1 });
        } else {
            return res.status(400).json({ message: 'Invalid mode specified' });
        }

        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a single entry in the leaderboard by ID
router.get('/entry/:id', getLeaderboardEntry, (req, res) => {
    res.json(res.leaderboardEntry);
});

// POST a new entry to the leaderboard
router.post('/', async (req, res) => {
    try {
        const { user, score, time, mode } = req.body;
        if (!user || !score || !time || !mode) {
            return res.status(400).json({ message: 'User, score, time, and mode are required' });
        }

        await addOrUpdateScore(user, score, time, mode);
        res.status(201).json({ message: 'Score updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Middleware function to get a single leaderboard entry by ID
async function getLeaderboardEntry(req, res, next) {
    let leaderboardEntry;
    try {
        leaderboardEntry = await LeaderboardModel.findById(req.params.id);
        if (!leaderboardEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.leaderboardEntry = leaderboardEntry;
    next();
}

// Function to update ranks
async function updateRanks(mode) {
    const modeKey = mode === 'survival' ? 'survival' : 'timeAttack';
    const leaderboard = await LeaderboardModel.find().sort({ [`${modeKey}.score`]: -1 });

    for (let i = 0; i < leaderboard.length; i++) {
        leaderboard[i][modeKey].rank = i + 1;
        await leaderboard[i].save();
    }
}

// Function to add or update a score
async function addOrUpdateScore(user, score, time, mode) {
    const modeKey = mode === 'survival' ? 'survival' : 'timeAttack';
    let leaderboardEntry = await LeaderboardModel.findOne({ user });

    if (leaderboardEntry) {
        // Update existing entry
        leaderboardEntry[modeKey].score = score;
        leaderboardEntry[modeKey].time = time;
    } else {
        // Create new entry
        leaderboardEntry = new LeaderboardModel({
            user,
            [modeKey]: {
                score,
                time,
                rank: 0, // Initial rank, will be updated
            },
            survival: mode === 'survival' ? { score, time, rank: 0 } : { score: 0, time: 0, rank: 0 },
            timeAttack: mode === 'timeAttack' ? { score, time, rank: 0 } : { score: 0, time: 0, rank: 0 }
        });
    }

    await leaderboardEntry.save();
    await updateRanks(mode);
}

module.exports = router;
