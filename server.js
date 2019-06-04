// ---------------------------------------------------
// Dependencies
// --------------------------------------------------- 

// load the Express node package
var express = require("express");

// require all of our models by requiring the models folder
// Save this to a variable and name it "db".
var db = require("./models");
var passport = require('passport');
var session = require('express-session');
// ---------------------------------------------------
// Configuration of the Express app
// --------------------------------------------------- 

// create an Express app
var app = express();

// set the port of the application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3001;
require('./config/passport')(passport);

// set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up the static folder so the Express app can use
// the css stylesheet, the images, etc...
app.use(express.static("./client/public"));

app.use(session({
  key: 'user_sid',
  secret: 'goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8',
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 1800000,
    httpOnly: false
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// ---------------------------------------------------
// Routes
// --------------------------------------------------- 

// link the "controllers" folder
// var controllers = require("./controllers");
// app.use(controllers);

// link the "routes" folder
var routes = require("./routes");
app.use(routes);


// ---------------------------------------------------
// Start the server
// --------------------------------------------------- 

// sync the sequelize models
db.sequelize.sync().then(function() {
  // so that it can begin listening to client requests.
  app.listen(PORT, function() {
      console.log("App listening on: http://localhost:" + PORT);
  });
});
