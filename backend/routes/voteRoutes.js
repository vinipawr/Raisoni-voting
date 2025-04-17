const express = require('express');
const router = express.Router();
const { vote } = require('../controllers/voteController');
const auth = require('../middleware/auth');

// Student must be logged in to vote
router.post('/', auth, vote);

module.exports = router;
