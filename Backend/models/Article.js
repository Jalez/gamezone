/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  creators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  parent: { type: Schema.Types.ObjectId, ref: 'Article', default: null },
  children: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  siblings: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  details: { type: Schema.Types.ObjectId, ref: 'Detail' },
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
});

// Export the Article model
module.exports = mongoose.model('Article', ArticleSchema);
