const router = require('express').Router();
const { User } = require('../../models');

// Login route
router.post('/login', async (req, res) => {
  try {

    const user = await User.findAll();
    let match = false;
    for (let i = 0; (i < user.length); i++) {
      match = await bcrypt.compare(req.body.email, user[i].email);

      if (match) { // email matched
        const isMatch = await user[i].checkPassword(req.body.password);
        if (!isMatch) { // password did not match
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        } else { // email and password matched - bingo
          req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res.json({ user: user[i], message: 'You are now logged in!' });
          });
          return;
        }
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;