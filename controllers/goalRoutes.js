  const router = require('express').Router();
  const { Goal, User, Comment } = require('../models');
  const passport = require('passport');
  const { ensureAuthenticated } = require('../config/passport');
  
  // GET all goals for the logged in user
  //ensureAuthenticated to ensure user is logged in before retreiving all goals
  router.get('/user', ensureAuthenticated, async (req, res) => {
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
          user_id: req.user_id
        }
      });
      const goals = goalData.map((goal) =>
        goal.get({ plain: true }));
        // console.log(goals);  **commented out**
      res.render('userDashboard', { // render handlebar view to display all goals by selected user
        goal, user: req.user, loggedIn: req.isAuthenticated()
        // loggedIn: req.session.loggedIn  **commented out**
      });
      //res.status(200).json(commentsData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // GET all goals for the selected user - advisor
  //ensureAuthenticated to ensure advisor is logged in before retreiving all goals for user
  router.get('/advisor', ensureAuthenticated, async (req, res) => {
    try {
      const goalData = await Goal.findAll({
        include: [
          {
            model: Comment
          }
        ],
        where: {
          advice: req.user_id // get the goals assigned for this advisor only
        }
      });
      const goals = goalData.map((goal) =>
        goal.get({ plain: true }));
      res.render('advisorDashboard', { // render handlebar view to display all goals by selected user - advisor
        goal, user: req.user, loggedIn: req.isAuthenticated()
        // loggedIn: req.session.loggedIn  **commented out**
      });
      //res.status(200).json(commentsData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // GET a single goal by user ID
  router.get('/goal/:id', ensureAuthenticated, async (req, res) => {
    try {
      const goalData = await Goal.findByPk(req.params.id, {
        include: [
          {
            model: Comment
          }
        ],
        where: {
          user_id: req.user_id
        }
      }
      );
      if (!goalData) {
        res.status(404).json({ message: 'No goal found with this id!' });
        return;
      }
      const goal = goalData.get({plain: true});
      res.render('goal', { goal, user: req.user, loggedIn: req.isAuthenticated() });
      // res.status(200).json(goalData);  **commented out**
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Create a new goal - user
  router.post('/goal', ensureAuthenticated, async (req, res) => {
    try {
      req.body.user_id = req.user_id;
      const goalData = await Goal.create(req.body);
      const goal = goalData.get({ plain: true });
      res.render('goal', { goal, user: req.user, loggedIn: req.isAuthenticated() });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // Update(PUT) a goal
  router.put('/goal/:id', ensureAuthenticated, async (req, res) => {
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
      res.render('goal', { goal, user: req.user, loggedIn: req.isAuthenticated() });
      
    } catch (err) {
      res.status(500).json(err);
    }
  });


  // DELETE a goal
  router.delete('/goal/:id', ensureAuthenticated, async (req, res) => {
    try {
      const goalData = await Goal.destroy({
        where: {
          id: req.params.id,
          user_id: req.user.id // Only delete the goal if it belongs to the logged in use
        },
      });

      if (!goalData) {
        res.status(404).json({ message: 'No goal found with this id!' });
        return;
      }
      res.status(200).json({ message: 'Goal deleted successfully!' });
      //Method used to find all remaining goals for the user and comments associated with each goal
      goalData = await Goal.findAll({
        include: [
          {
            model: Comment,
          }
        ],
        where: {
          user_id: req.user_id,
        },
      });
      const goals = goalData.map((goal) =>
        goal.get({ plain: true })
      );
      res.render('userDashboard', {
        goals,
        loggedIn: req.loggedIn,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
