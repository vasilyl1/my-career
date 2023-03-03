//Authentication Middleware
const passport = require('passport');
//Authenticate Users by Username and Password
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

//exports function which will be called in the server.js file (**ACTION ITEM**)
module.exports = function(passport) {};

// Define passport middleware
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try { // reading all user table into memory because e-mails and passwords are both encrypted
      const user = await User.findAll();
      let match = false;
      for (let i = 0; (i < user.length) && (!match); i++) {
        match = await bcrypt.compare(email, user[i].email);

        if (match) { // email matched
          const isMatch = await user[i].checkPassword(password);
          if (!isMatch) { // password did not match
            match = false;
            return done(null, false, { message: 'Incorrect email or password.' });
          } else { // email and password matched - bingo
            return done(null, user[i]);
          }
        }

      }
    } catch (err) {
      return done(err);
    }
  }
));

// Serialize the user for the session
//To store both the user ID and the advisor ID in the session
//Check if user is an advisor and if so, store their own User ID as the Advisor ID
passport.serializeUser((user, done) => {
  done(null, { userId: user.id, advisorId: user.advisor });
});

// Deserialize the user for the session
//To retrieve both IDs from the session when deserializing the user
//Retreiving the user from the database based on their ID
passport.deserializeUser(async (sessionData, done) => {
  try {
    const user = await User.findByPk(sessionData.userId);
    if (!user) {
      return done(null, false);
    }
    // Add the advisorId property to the user object
    user.advisorId = sessionData.advisorId;
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Define ensureAuthentication middleware
const ensureAuthentication = (req, res, next) => {
  // added !
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Export ensureAuthentication function
module.exports = { ensureAuthentication };
