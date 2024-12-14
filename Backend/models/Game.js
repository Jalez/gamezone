/** @format */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const gameSchema = new Schema({
//   type: String,
//   name: String,
//   creators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
//   content: [
//     {
//       question: String,
//       options: [String],
//       answer: String,
//       solvedTimes: Number,
//       sessionAttempts: Number,
//     },
//   ],
// });
const gameSchema = new Schema({
  name: String,
  type: String,
  creators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  generateMainArticle: Boolean,
  generateContent: Boolean,
  dataForGeneration: [
    {
      type: Schema.Types.Mixed,
    },
  ],
  mcqs: [
    {
      question: String,
      options: [String],
      answer: String,
    },
  ],
  content: [
    {
      type: Schema.Types.Mixed,
    },
  ],
});
module.exports = mongoose.model('Game', gameSchema);
