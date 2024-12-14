// routes/protected.js
const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/authMiddleware');

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}` });
});

module.exports = router;