const router = require('express').Router();
const { Comment, User, Goal } = require('../models');

// GET a single comment by ID
router.get('/comment/:id', async (req, res) => {
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
    const editComment = (req.session.user_id == commentData.user_id); // check if the comment belongs to auth user
    res.render('comment', { comment, loggedIn: req.session.loggedIn, editComment: editComment });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE(POST) a new comment
router.post('/comment', async (req, res) => {
  try {
    req.body.goal_id = req.params.id;
    req.body.user_id = req.session.user_id;
    const commentData = await Comment.create(req.body);
    const comment = commentData.get({ plain: true });
    res.render('comment', { comment, loggedIn: req.session.loggedIn, editComment: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// UPDATE(PUT) a comment by ID
router.put('/comment/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this ID' });
      return;
    }
    const comment = commentData.get({ plain: true });
    res.render('comment', { comment, loggedIn: req.session.loggedIn, editComment: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a comment by ID
router.delete('/comment/:id', async (req, res) => {
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
    const goalData = await Goal.findAll({
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
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
