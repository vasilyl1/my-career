const router = require('express').Router();
const { Goal, User, Comment } = require('../models');
const { ensureAuthentication } = require('../config/passport');

// home view for the user and advisor - see wireframe
router.get('/dashboard', ensureAuthentication, async (req, res) => {

    try {
        if (req.session.loggedIn) {
            res.redirect('/login');
            return;
        }

        if (req.session.advisor) { //SQL for all goals for advisory review
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
                    advisor: req.session.user_id
                }
            });
        } else { //SQL for all goals for the user
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
                    user_id: req.session.user_id
                }
            });
        }

        const goals = goalData.map((goal) => goal.get({ plain: true }));
        res.render('userdashboard', { goals, loggedIn: req.session.loggedIn });
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
                user_id: req.session.user_id
            }
        }
        );
        if (!goalData) {
            res.status(404).json({ message: 'No goal found with this ID' });
            return;
        }
        const goal = goalData.get({ plain: true });

        res.render('goal', { goal, loggedIn: req.session.loggedIn });

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
            },
          ],
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

// authenticate the user
router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    await res.render('login');
});

// logout the user
router.get('/logout', (req, res) => {
    req.logout();
    // req.session.destroy();
    res.redirect('/login');
});
module.exports = router;