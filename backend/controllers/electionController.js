const Election = require('../models/Election');

// 👑 Admin adds a new election
const createElection = async (req, res) => {
  const { title, candidates } = req.body;

  try {
    const election = new Election({
      title,
      candidates: candidates.map(name => ({ name }))  // turn names into objects
    });

    await election.save();
    res.status(201).json(election);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// 🌍 Everyone can see the elections
const getElections = async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { createElection, getElections };
