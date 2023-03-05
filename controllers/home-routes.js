const router = require('express').Router();
const { Goal, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/',withAuth, (req, res) => {
  res.redirect('/dashboard');
});

// home view for the user and advisor - see wireframe
router.get('/dashboard', withAuth, async (req, res) => {
  // req.session.userId = 2;
  try {

    let goalData;
    let uData;

    if (req.session.advisor){ //SQL for all goals for advisory review
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
          advice: req.session.userId
        }
      });

      uData = await User.findOne({
        where: {
          id: req.session.userId
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
          userId: req.session.userId
        }
      });

      uData = await User.findOne({
        where: {
          id: req.session.userId
        }
      });
    }

    const goals = goalData.map((goal) => {
      var newGoal = goal.get({ plain: true });
      delete newGoal.user.password;
      return newGoal;
    });

    const loggedIn = req.session.loggedIn;
    res.render('userDashboard', { goals, loggedIn, uData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// goal view for the user and advisor - see wireframe
router.get('/goal/:id', withAuth, async (req, res) => {

  try {
    const goalData = await Goal.findByPk(req.params.id, {
      include: [
        {
          model: Comment
        }
      ],
      where: {
        userId: req.session.userId
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
    const loggedIn = req.session.loggedIn;
    res.render('goal', { goal, loggedIn, advisors });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single comment by ID
router.get('/comment/:id', withAuth, async (req, res) => {
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

module.exports = router;