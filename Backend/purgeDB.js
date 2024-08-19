/** @format */

const mongoose = require('mongoose');
const Article = require('./models/Article');
const Detail = require('./models/Detail');
const Game = require('./models/Game');
const User = require('./models/User');

mongoose
  .connect('mongodb://localhost:27017/psychology', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const deleteTestData = async () => {
  try {
    await User.deleteMany({});
    await Article.deleteMany({});
    await Detail.deleteMany({});
    await Game.deleteMany({});
    console.log('Test data deleted from database');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

deleteTestData();
