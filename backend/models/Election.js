const mongoose = require('mongoose');

const ElectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  candidates: [
    {
      name: String,
      votes: {
        type: Number,
        default: 0
      }
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Election', ElectionSchema);
