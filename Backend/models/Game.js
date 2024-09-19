/** @format */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  type: String,
  name: String,
  creators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  content: [
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
