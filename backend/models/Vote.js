const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  electionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Election',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true  // prevents a student from voting more than once per election
  },
  candidateName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vote', VoteSchema);
