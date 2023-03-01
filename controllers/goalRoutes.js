const router = require('express').Router();
const { Goal } = require('../models');

// GET all goals
router.get('/', async (req, res) => {
  try {
    const goalData = await Goal.findAll();
    res.status(200).json(goalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single goal by ID
router.get('/:id', async (req, res) => {
  try {
    const goalData = await Goal.findByPk(req.params.id);
    if (!goalData) {
      res.status(404).json({ message: 'No goal found with this id!' });
      return;
    }
    res.status(200).json(goalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create(POST) a new goal
router.post('/', async (req, res) => {
  try {
    const goalData = await Goal.create(req.body);
    res.status(200).json(goalData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update(PUT) a goal
router.put('/:id', async (req, res) => {
  try {
    const goalData = await Goal.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!goalData[0]) {
      res.status(404).json({ message: 'No goal found with this id!' });
      return;
    }
    res.status(200).json(goalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a goal
router.delete('/:id', async (req, res) => {
  try {
    const goalData = await Goal.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!goalData) {
      res.status(404).json({ message: 'No goal found with this id!' });
      return;
    }
    res.status(200).json(goalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
