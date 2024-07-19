/** @format */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/article');
const detailRoutes = require('./routes/detail');
const gameRoutes = require('./routes/game');
const userRoutes = require('./routes/user');
//use cors
const cors = require('cors');

const app = express();
app.use(cors()); //use cors to allow cross origin resource sharing so that the frontend can access the backend even if they are in different domains
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database Connection
mongoose.connect('mongodb://localhost:27017/psychology');

// Routes
app.use('/api/articles', articleRoutes);
app.use('/api/details', detailRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
