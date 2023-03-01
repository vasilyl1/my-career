const express = require("express");
const sequelize = require("./config/connection");
const goalsRoute = require("./controllers/api/goalRoutes");
const commentsRoute = require("./controllers/api/commentRoutes");
const passport = require('passport');
const session = require('express-session');
//Session data stored in sequelize database
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Define session options
const sessionOptions = {
  secret: 'anysecurestring',  //Used to prevent session tampering 
  resave: false,  //Session saved to Store(SequelizeStore) if true, always saved, false only saved if something has changed - false improves performance
  saveUninitialized: true,  // Determines if a session should be created automatically when a User visits the site without a session cookie
  store: new SequelizeStore({   //Used to store session data  
    db: sequelize,
  }),
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionOptions)); // Add session middleware
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Add passport session middleware

app.use("/api/goal", goalsRoute);
app.use("/api/comment", commentsRoute);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
