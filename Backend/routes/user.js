/** @format */

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


// Register User
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login User
router.post('/login', async (req, res) => {
  console.log("Gets here")
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ _id: user._id }, jwtSecret, {
      expiresIn: '1h',
    });
    //Remove user password from response
    const { password: userPassword, ...userWithoutPassword } = user._doc;
    res.send({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
