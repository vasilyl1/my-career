const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// Login route    /api/usr/login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findAll();
    let match = false;
    for (let i = 0; (i < user.length) && (!match); i++) {
      match = await bcrypt.compare(req.body.email, user[i].email);
      if (match) { // email matched
        const isMatch = await user[i].checkPassword(req.body.password);
        if (!isMatch) { // password did not match
          match = false;
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        } else { // email and password matched - bingo
          req.session.save(() => {
            req.session.userId = user[i].id;
            req.session.username = user[i].username;
            req.session.loggedIn = true;
            req.session.advisor = user[i].advisor;
            res.status(200).json({ user: user[i], message: 'You are now logged in!' });
          });
          return;
        }
      }
    }

    if (!match) {
      res
        .status(400)
        .json({ message: 'Incorrect email. Please try again!' });
      return;
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
      req.session.username = userData[i].username;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout route
router.get('/logout', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).redirect('/');
      });
    } else {
      res.status(404).json(err);
    }
  } catch(err) {
    res.status(400).json(err);
  }
});

module.exports = router;