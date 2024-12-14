/** @format */

const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  edit: String,
});

module.exports = mongoose.model('Detail', detailSchema);
