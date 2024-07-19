/** @format */

const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Detail = require('../models/Detail');
const Game = require('../models/Game');

// Route to get all articles that don't have a parent with populated fields
router.get('/root-articles', async (req, res) => {
  try {
    const rootArticles = await Article.find({ parent: null })
      .populate('creators', 'username email') // Populate creators with specific fields
      .populate('children')
      .populate('siblings')
      .populate('details')
      .populate('games');
    res.json(rootArticles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get complete article details by id
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('details')
      .populate('games')
      .populate({
        path: 'parent',
        populate: { path: 'details games' },
      })
      .populate({
        path: 'children',
        populate: { path: 'details games' },
      })
      .populate({
        path: 'siblings',
        populate: { path: 'details games' },
      });

    if (!article) return res.status(404).send('Article not found');
    res.send(article);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create, Update, Delete Article, Detail, and Game
// Implement similar routes for /details and /games

module.exports = router;
