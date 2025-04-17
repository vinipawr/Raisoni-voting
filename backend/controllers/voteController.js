const Vote = require('../models/Vote');
const Election = require('../models/Election');

const vote = async (req, res) => {
  const { electionId, candidateName } = req.body;
  const userId = req.user.id;

  try {
    // Check if user already voted
    const existingVote = await Vote.findOne({ electionId, userId });
    if (existingVote) {
      return res.status(400).json({ msg: 'You already voted in this election' });
    }

    // Save the vote
    const vote = new Vote({ electionId, userId, candidateName });
    await vote.save();

    // Update the candidate's vote count in election
    await Election.findByIdAndUpdate(
      electionId,
      { $inc: { 'candidates.$[elem].votes': 1 } },
      { arrayFilters: [{ 'elem.name': candidateName }] }
    );

    res.status(200).json({ msg: 'Vote cast successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { vote };
