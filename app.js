
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');

const index = require('./routes/index');
const users = require('./routes/users');
const cors = require('cors');
const app = express();
dotenv.load();
console.log(process.env.NODE_ENV);
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: `\x02\xf3\xf7r\t\x9f\xee\xbbu\xb1\xe1\x90\xfe'\xab\xa6L6\xdd\x8d[\xccO\xfe`,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'frontend/build'))).use(cors());

// The request will be redirected to spotify for authentication, so this
// function will not be called.

app.use('/', index);

app.use('/users', users);

app.get(
  'http://ds-intune.herokuapp.com/auth/callback',
  passport.authenticate('spotify', {
    failureRedirect: 'http://ds-intune.herokuapp.com/login'
  }),
  (req, res) => {
    res.redirect('http://ds-intune.herokuapp.com/');
  }
);

app.get(
  '/auth',
  passport.authenticate('spotify', {
    scope: [
      'user-read-email',
      'user-read-private',
      'user-read-currently-playing',
      'user-read-playback-state',
      'user-follow-modify',
      'user-follow-read'
    ]
  }),
  (req, res) => {}
);

app.get('*', (req, res) => {
  res.sendfile(__dirname + '/frontend/build/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;