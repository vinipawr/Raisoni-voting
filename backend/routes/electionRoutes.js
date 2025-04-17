const express = require('express');
const router = express.Router();
const { createElection, getElections } = require('../controllers/electionController');
const auth = require('../middleware/auth'); // only logged-in users can add

// Admin adds new election (must be logged in)
router.post('/', auth, createElection);

// Everyone can see all elections
router.get('/', getElections);

module.exports = router;
