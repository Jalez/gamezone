/** @format */

const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  type: String,
  name: String,
  mcqs: [
    {
      question: String,
      options: [String],
      answer: String,
      solvedTimes: Number,
      sessionAttempts: Number,
    },
  ],
});

module.exports = mongoose.model('Game', gameSchema);
