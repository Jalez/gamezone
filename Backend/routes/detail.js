/** @format */

const express = require('express');
const router = express.Router();
const Detail = require('../models/Detail');

// Create Detail
router.post('/', async (req, res) => {
  try {
    const detail = new Detail(req.body);
    await detail.save();
    res.status(201).send(detail);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get Detail by ID
router.get('/:id', async (req, res) => {
  try {
    const detail = await Detail.findById(req.params.id);
    if (!detail) return res.status(404).send('Detail not found');
    res.send(detail);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update Detail
router.put('/:id', async (req, res) => {
  try {
    const detail = await Detail.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!detail) return res.status(404).send('Detail not found');
    res.send(detail);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete Detail
router.delete('/:id', async (req, res) => {
  try {
    const detail = await Detail.findByIdAndDelete(req.params.id);
    if (!detail) return res.status(404).send('Detail not found');
    res.send(detail);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
