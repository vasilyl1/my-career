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
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serialize the user for the session
//Stores the User ID in the session - Used to retrieve subsequent requests to authenticate User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user for the session
//Purpose is to retrieve the User ID saved from the session and then used to authentication
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Define ensureAuthentication middleware
const ensureAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Export ensureAuthentication function
module.exports = { ensureAuthentication };
