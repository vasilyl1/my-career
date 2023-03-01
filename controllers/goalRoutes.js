const router = require('express').Router();
const { Goal } = require('../models');

// GET all goals for the selected user
router.get('/userdashboard', async (req, res) => {
  try {
    const goalData = await Goal.findAll({
      include: [
        {
          model: Comment
        }
      ],
      where: {
        user_id: req.session.user_id,
      }
    });
    const goals = goalData.map((goal) =>
      goal.get({ plain: true }));
    res.render('userDashboard', { // render handlebar view to display all goals by selected user
      goals,
      loggedIn: req.session.loggedIn
    });
    //res.status(200).json(commentsData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET all goals for the selected user - advisor
router.get('/advisordashboard', async (req, res) => {
  try {
    const goalData = await Goal.findAll({
      include: [
        {
          model: Comment
        }
      ],
      where: {
        user_id: req.session.user_id,
        advice: true
      }
    });
    const goals = goalData.map((goal) =>
      goal.get({ plain: true }));
    res.render('advisorDashboard', { // render handlebar view to display all goals by selected user - advisor
      goals,
      loggedIn: req.session.loggedIn
    });
    //res.status(200).json(commentsData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single goal by user ID
router.get('/goal:id', async (req, res) => {
  try {
    const goalData = await Goal.findByPk(req.params.id, {
      include: [
        {
          model: Comment
        }
      ],
      where: {
        user_id: req.session.user_id
      }
    }
    );
    if (!goalData) {
      res.status(404).json({ message: 'No goal found with this id!' });
      return;
    }
    const goal = goalData.get({plain: true});
    res.render('goal', { goal, loggedIn: req.session.loggedIn });

    res.status(200).json(goalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create(POST) a new goal
router.post('/goal', async (req, res) => {
  try {
    req.body.user_id = req.session.user_id;
    const goalData = await Goal.create(req.body);
    const goal = goalData.get({ plain: true });
    res.render('goal', { goal, loggedIn: req.session.loggedIn });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update(PUT) a goal
router.put('/goal:id', async (req, res) => {
  try {
    let goalData = await Goal.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!goalData[0]) {
      res.status(404).json({ message: 'No goal found with this id!' });
      return;
    }
    goalData = await Goal.findAll({
      include: [
        {
          model: Comment,
        }
      ],
      where: {
        user_id: req.session.user_id,
      },
    });
    const goals = goalData.map((goal) =>
      goal.get({ plain: true })
    );
    res.render('userdashboard', {
      goals,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a goal
router.delete('/goal:id', async (req, res) => {
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
    goalData = await Goal.findAll({
      include: [
        {
          model: Comment,
        }
      ],
      where: {
        user_id: req.session.user_id,
      },
    });
    const goals = goalData.map((goal) =>
      goal.get({ plain: true })
    );
    res.render('userDashboard', {
      goals,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
