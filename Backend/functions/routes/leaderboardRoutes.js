// functions/routes/leaderboardRoutes.js
const express = require('express');
const LeaderboardModel = require('../models/leaderboardModel');

const router = express.Router();

// Get all entries in the leaderboard
router.get('/', async (req, res) => {
    try {
        const leaderboard = await LeaderboardModel.find();
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single entry in the leaderboard by ID
router.get('/:id', getLeaderboardEntry, (req, res) => {
    res.json(res.leaderboardEntry);
});

// Add a new entry to the leaderboard
router.post('/', async (req, res) => {
    try {
        const { user, score, rank } = req.body;
        if (!user || !score || !rank) {
            return res.status(400).json({ message: 'User, score, and rank are required' });
        }

        const newEntry = new LeaderboardModel({ user, score, rank });
        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Middleware function to get a single leaderboard entry by ID
async function getLeaderboardEntry(req, res, next) {
    let leaderboardEntry;
    try {
        leaderboardEntry = await LeaderboardModel.findById(req.params.id);
        if (leaderboardEntry == null) {
            return res.status(404).json({ message: 'Entry not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.leaderboardEntry = leaderboardEntry;
    next();
}

module.exports = router;
