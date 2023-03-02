const router = require('express').Router();
const { Comment, User, Goal } = require('../models');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/passport');

// Get all comments
//ensureAuthenticated to ensure user is logged in before retreiving all comment
router.get('/user', ensureAuthenticated, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        { 
          model: User 
        }
      ],
    });

    const comments = commentData.map((comment) =>
      comment.get({ plain: true })
    );

    res.render('comments', {
      comments,
      user: req.user,
      loggedIn: req.isAuthenticated(),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
      
// GET a single comment by ID
//ensureAuthenticated to ensure user is logged in before retreiving a comment
router.get('/comment/:id', ensureAuthenticated, async (req, res) => {
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
    const editComment = (req.user_id == commentData.user_id); // check if the comment belongs to auth user
    res.render('comment', { comment, user: req.user, loggedIn: req.isAuthenticated() });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE(POST) a new comment
//ensureAuthenticated to ensure user is logged in before creating a comment
router.post('/comment', ensureAuthenticated, async (req, res) => {
  try {
    req.body.goal_id = req.params.id;
    req.body.user_id = req.user_id;
    const commentData = await Comment.create(req.body);
    const comment = commentData.get({ plain: true });
    res.render('comment', { comment, user: req.user, loggedIn: req.isAuthenticated() });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// UPDATE(PUT) a comment by ID
//ensureAuthenticated to ensure user is logged in before updating a comment
router.put('/comment/:id', ensureAuthenticated, async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!commentData[0]) {
      res.status(404).json({ message: 'No comment found with this ID' });
      return;
    }
    const comment = await Comment.findByPk(req.params.id, {
      include: [
        { 
          model: User 
        }
      ],
    });
    res.render('comment', { comment: comment.get({ plain: true }), user: req.user, loggedIn: req.isAuthenticated() });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE a comment by ID
//ensureAuthenticated to ensure user is logged in before deleting a comment
router.delete('/comment/:id', ensureAuthenticated, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this ID' });
      return;
    }
    //Finds all goals based on User - Use comment model to verify if deleted comment appears in any goals
    const goalData = await Goal.findAll({
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
    res.render('userdashboard', {
      goals,
      loggedIn: req.session.loggedIn,
    });
  
     res.status(200).json({ message: 'Comment successfully deleted!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
