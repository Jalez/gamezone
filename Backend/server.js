/** @format */
require('dotenv').config(); // Ensure this is at the top

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/article');
const detailRoutes = require('./routes/detail');
const gameRoutes = require('./routes/game');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Update with your frontend's URL
  credentials: true, // Allow cookies to be sent with requests
}));

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    sameSite: 'lax',
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport config
require('./passportConfig')(passport);

// Routes
app.use('/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/details', detailRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
