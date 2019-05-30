var LocalStrategy = require('passport-local').Strategy;

// Load db 
var db = require('../models');

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });


  //signup
  passport.use("local-signup", new LocalStrategy({
    // by default, local strategy uses username and local_pw, we will override with email
    usernameField: 'email',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },

    function (req, email, password, done) {

      process.nextTick(function () {
        db.parents.findOne({
          where: {
            email: email
          }
        }).then(function (user, err) {
          //if email is already registered
          if (user) {
            // console.log("user &&&&&&&&&&&&&&&&&&&", user)
            return done(null, false, {
              from: "signup",
              message: 'This email is already registered.'
            });
          } else {
            //creating a new account in our database
            // console.log("user ######", user)
            // console.log(req.body);
            db.parents.create({
              userName: req.body.userName,
              email: email,
              city: req.body.city,
              state: req.body.state,
              photoLink: req.body.photoLink,
              password: db.parents.generateHash(password)
            }).then(function (newUser) {
              console.log("new user", newUser)

              // using a transaction and Promise to create a kid row by looping through the allKidsInfo array
              var kidInfo = req.body.allKidsInfo;
              db.sequelize.transaction(function(t) {
                var promises = [];
                for (var i = 0; i < kidInfo.length; i++) {
                  var newPromise = db.kids.create(
                    {name: kidInfo[i].name, gradeLevel: kidInfo[i].grade, parentId: newUser.dataValues.id, schoolId: kidInfo[i].schoolId}
                  );
                  promises.push(newPromise);
                };
                return Promise.all(promises);
              }).then(function (newKid) {
                return done(null, newUser);
              }).catch(err => console.log(err));

            }).catch(err => console.log(err));

          }
        })
      })
    }
  ))




  passport.use("local-signin",
    // instead of using default username field, replace email for the username field verification
    new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true
        // allows us to pass back the entire request to the callback
      }, function (req, email, password, done) {
        // Match user
        db.parents.findOne({
          where: {
            email: email,

          }
        }).then(function (user, err) {

          // if there are any errors, return the error before anything else
          if (err) {
            // console.log("err ^^^^^^^^^^^^", err);
            return done(err);
          }
          // if no user is found, return the message
          if (!user) {
            // console.log("$$$$$$$$$", !user)
            return done(null, false, {
              from: 'login',
              message: 'Incorrect email/ password combination.'
            }); // req.flash is the way to set flashdata using connect-flash
          }
          // if the user is found but the password is wrong
          if (user && !user.compareHash(req.body.password)) {
            // console.log('%%^^^^%$%$%%wrong password', user, err)
            return done(null, false, {
              from: 'login',
              message: 'Incorrect email/ password combination.'
            }); // create the loginMessage and save it to session as flashdata
          }
          // all is well, return successful user
          //   console.log("logging in @@@@@@@@@@@@@@@@", user)
          return done(null, user);

        });
      })
  );




};
