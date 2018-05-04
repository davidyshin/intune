const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const init = require('./passport');
const authHelpers = require('./helpers');

const db = require('../db/index');

const options = {};

init();
passport.use(
  new localStrategy(options, (username, password, done) => {
    db
      .any('SELECT * FROM Users WHERE username = $1', [username])
      .then(rows => {
        const user = rows[0];

        if (!user) {
          return done(null, false);
        }
        if (!authHelpers.comparePassword(password, user.password_digest)) {
          // console.log("password doesn't work");
          return done(null, false);
        } else {
          // console.log('password correct', user);
          return done(null, user);
        }
      })
      .catch(err => {
        console.log(`login err     `, err);
        return done(err);
      });
  })
);

module.exports = passport;
