const router = require('express').Router();
const { Goal } = require('../../models');
const { ensureAuthentication } = require('../../config/passport');


// Create(POST) a new goal
router.post('/goal', ensureAuthentication, async (req, res) => {
    try {
      req.body.user_id = req.session.user_id;
      const goalData = await Goal.create(req.body);
      const goal = goalData.get({ plain: true });
      res.status(200).json(goal);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  // Update(PUT) a goal by ID
router.put('/goal/:id', ensureAuthentication, async (req, res) => {
    try {
      const goalData = await Goal.update(req.body, {
        where: {
          id: req.params.id,
        },
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
  
  // DELETE goal by ID
router.delete('/goal/:id', ensureAuthentication, async (req, res) => {
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
      res.status(200).json({message: 'delete success'});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  module.exports = router;