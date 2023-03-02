const router = require('express').Router();
const botResponse = require('../utils/chatBots');
const { Goal, User, Comment } = require('../models');
const { ensureAuthentication } = require('../config/passport');

// GET all goals for the logged in user
router.get('/goals', ensureAuthentication, async (req, res) => {
  try {
    const goalData = await Goal.findAll({
      include: [
        {
          model: Comment
        },
        {
          model: User
        }
      ],
      where: {
        user_id: 1
      }
    });
    const goals = goalData.map((goal) => goal.get({ plain: true }));
    res.render('userdashboard', { goals, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET all goals for the selected user - advisor
router.get('/advisor', ensureAuthentication, async (req, res) => {
  try {
    const goalData = await Goal.findAll({
      include: [
        {
          model: Comment,
        },
      ],
      where: {
        advice: req.session.user_id, // get the goals assigned for this advisor only
      },
    });
    const goals = goalData.map((goal) => goal.get({ plain: true }));
    res.render('advisorDashboard', {
      goals,
      loggedIn: req.session.loggedIn,
    });
    //res.status(200).json(goalsData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single goal by user ID
router.get('/goal/:id', ensureAuthentication, async (req, res) => {
  try {
    console.log(`parameter ${req.params.id}`);
    const goalData = await Goal.findByPk(req.params.id, {
      include: [
        {
          model: Comment
        }
      ],
      where: {
        //user_id: req.session.user_id
        //pre-defined user before the authorization is implemented
        user_id:1
      }
    }
    );
    if (!goalData) {
      res.status(404).json({ message: 'No goal found with this ID' });
      return;
    }
    const goal = goalData.get({plain: true});

    // this is the test for AI here
    const testResponse = await botResponse(`Provide 3 most important items on how can I achieve my development goal named as: ${goal.name}`);
    console.log(goal.name);
    console.log(testResponse);
    res.render('goal', { goal, loggedIn: req.session.loggedIn });
    //res.status(200).json(goalData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create(POST) a new goal - user
router.post('/goal', ensureAuthentication, async (req, res) => {
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
    const goal = goalData.get({ plain: true });
    res.render('goal', { goal, loggedIn: req.session.loggedIn });
    
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE a goal by ID
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
    const goals = goalDataAll.map((goal) => goal.get({ plain: true }));
    res.render('userdashboard', { goals, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
