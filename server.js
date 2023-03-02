const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store); //Session data stored in sequelize database

const controllerRoute = require('./controllers/');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const passport = require('passport');


const app = express();
const PORT = process.env.PORT || 3001;

// Define session options
const sessionOptions = {
  secret: 'anysecurestring', //Used to prevent session tampering
  cookie: {},
  resave: false, //Session saved to Store(SequelizeStore) if true, always saved, false only saved if something has changed - false improves performance
  saveUninitialized: true, // Determines if a session should be created automatically when a User visits the site without a session cookie
  store: new SequelizeStore({ //Used to store session data
    db: sequelize
  })
};


app.use(session(sessionOptions)); // Add session middleware

const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  viewsDir: __dirname + '/views/',
  partialsDir: __dirname + '/views/partials/',
  helpers
}); // initialize handlebars with helpers functions
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Add passport session middleware

app.use(controllerRoute);

app.listen(PORT, () => {
  console.log(`App listening on port ${ PORT }!`);
  sequelize.sync({ force: false });
});
