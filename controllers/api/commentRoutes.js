const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const botResponse = require('../../utils/chatBots');

// CREATE(POST) a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    req.body.goalId = req.params.id;
    req.body.userId = req.session.userId;
    const commentData = await Comment.create(req.body);
    const comment = commentData.get({ plain: true });
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// UPDATE(PUT) a comment by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this ID' });
      return;
    }
    const comment = commentData.get({ plain: true });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this ID' });
      return;
    }

    res.status(200).json({ message: 'comment delete success' });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE(POST) a new chatbot comment
router.post('/chatbot', withAuth, async (req, res) => {
  try {
    // chatGPT model input
    const testResponse = await botResponse(`Provide 3 randomly important items on how can I achieve my development goal named as: ${ req.goalName }`);
    req.body.body = testResponse;
    const commentData = await Comment.create(req.body);
    const comment = commentData.get({ plain: true });
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
