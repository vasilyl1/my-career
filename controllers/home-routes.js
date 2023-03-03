const router = require('express').Router();
const { Goal, User, Comment } = require('../models');
const { ensureAuthentication } = require('../config/passport');
const passport = require('passport');

router.get('/',ensureAuthentication, (req, res) => {
  res.redirect('/dashboard');
});

// home view for the user and advisor - see wireframe
router.get('/dashboard', ensureAuthentication, async (req, res) => {

  try {
    if (req.session.loggedIn) {
      res.redirect('/login');
      return;
    }

    let goalData;

    if (req.session.advisor) { //SQL for all goals for advisory review
      goalData = await Goal.findAll({
        include: [
          {
            model: Comment
          },
          {
            model: User
          }
        ],
        where: {
          advisor: req.session.user_id
        }
      });
    } else { //SQL for all goals for the user
      goalData = await Goal.findAll({
        include: [
          {
            model: Comment
          },
          {
            model: User
          }
        ],
        where: {
          userId: 1 // req.session.user_id
        }
      });
    }

    const goals = goalData.map((goal) => {
      var newGoal = goal.get({ plain: true });
      delete newGoal.user.password;
      return newGoal;
    });
    res.render('userDashboard', { goals, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// goal view for the user and advisor - see wireframe
router.get('/goal/:id', ensureAuthentication, async (req, res) => {

  try {
    if (req.session.loggedIn) {
      res.redirect('/login');
      return;
    }
    const goalData = await Goal.findByPk(req.params.id, {
      include: [
        {
          model: Comment
        }
      ],
      where: {
        userId: req.session.user_id
      }
    }
    );
    if (!goalData) {
      res.status(404).json({ message: 'No goal found with this ID' });
      return;
    }
    const goal = goalData.get({ plain: true });

    const advisorsData = await User.findAll({
      where: {
        advisor: true
      }
    });

    const advisors = advisorsData.map((goal) => { // list of advisors array
      var newGoal = goal.get({ plain: true });
      return newGoal;
    });

    // please use advisors[i].id and advisors[i].name as the advisor id and name - loop through an array

    res.render('goal', { goal, loggedIn: req.session.loggedIn, advisors: advisors });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single comment by ID
router.get('/comment/:id', ensureAuthentication, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id,
      {
        include: [
          {
            model: User
          }
        ]
      });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this ID' });
      return;
    }
    const comment = commentData.get({ plain: true });
    res.render('comment', { comment, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login Route
router.get('/login', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  await res.render('login');
});

//POST Route for login page using passport to autheticate user
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',//If user successful, redirected to the dashboard
  failureRedirect: '/login' //If user fails authentication, redirected back to the login page
}));

// Logout Route
router.get('/logout', (req, res) => {
  req.logout();//provided by passport.js to remove user property and clear users session
  req.session.destroy();
  res.redirect('/login'); //redirects user back to login page
});

module.exports = router;