// functions/api.js
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const { redirectToGoogleForm } = require('./googleFormRedirect');

const app = express();
const router = express.Router();

const dbCloudUrl = 'mongodb+srv://markmacalisangulrich:DuYZryZCTAH08uFV@ulrichdb.kroysnh.mongodb.net/shakeSafe_leaderboard';
const dbLocalUrl = 'mongodb://localhost:27017/recipe-db';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(dbCloudUrl || dbLocalUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB', error));

// Mount leaderboard routes
app.use('/.netlify/functions/api', leaderboardRoutes);

// Export the serverless app
module.exports.handler = serverless(app);