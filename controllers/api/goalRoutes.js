const router = require('express').Router();
const { Goal } = require('../../models');
const withAuth = require('../../utils/auth');


// Create(POST) a new goal  router.post('/')
router.post('/', withAuth, async (req, res) => {
  try {
    req.body.userId = await req.session.userId;
    const goalData = await Goal.create(req.body);
    res.status(200).json(goalData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


// Update(PUT) a goal by ID
router.put('/:id', withAuth, async (req, res) => {

  try {
    const goalData = await Goal.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!goalData) {
      res.status(404).json({ message: 'No goal found with this id!' });
      return;
    }
    res.status(200).json({message: 'update success'});
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE goal by ID  router.delete('/:id')
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const goalData = await Goal.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!goalData) {
      res.status(404).json({ message: 'No goal found with this id!' });
      return;
    }
    res.status(200).json({message: 'delete success'});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;