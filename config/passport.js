//Authentication Middleware
const passport = require('passport');
//AUthenticate Users by Username and Password
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

//exports function which will be called in the server.js file (**ACTION ITEM**)
module.exports = function(passport) {
  // Use a local strategy
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },  //Email field to be used as Username filed for authentication
      async (email, password, done) => {  //authentication function to be called when User Logs In
        try {  //try block to handle any errors
          // Find the user associated with the email
          const user = await User.findOne({ where: { email: email } });

          if (!user) {
            return done(null, false, { message: 'Incorrect email or password.' });
          }

          // Compare the supplied password with the hashed password
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password.' });
          }

          // If the password matches, return the user object
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

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
};
