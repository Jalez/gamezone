/** @format */

const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Create Game
router.post('/', async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).send(game);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get Game by ID
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).send('Game not found');
    res.send(game);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update Game
router.put('/:id', async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!game) return res.status(404).send('Game not found');
    res.send(game);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete Game
router.delete('/:id', async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).send('Game not found');
    res.send(game);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
