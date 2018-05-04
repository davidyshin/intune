const db = require('./index');
const authHelpers = require('../auth/helpers.js');
const passport = require('../auth/local.js');
const dotenv = require('dotenv');
dotenv.load();

const moment = require('moment');

const getUser = (req, res, next) => {
  db
    .one('SELECT * FROM Users WHERE id=${id}', {
      id: req.user.id
    })
    .then(data => {
      res.status(200).json({
        status: 'success',
        user: data,
        message: 'Retrieved user info'
      });
    })
    .catch(err => {
      res.status(500).send(`error getting user: ${err}`);
      return next(err);
    });
};


const logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).send('log out success');
};

/* ------------------------ POST REQUESTS QUERIES ------------------------ */

const registerUser = (req, res, next) => {
  const hash = authHelpers.createHash(req.body.password);
  db
    .none(
      'INSERT INTO Users (username, first_name, last_name, password_digest) VALUES (${username}, ${firstName}, ${lastName}, ${password})',
      {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hash,
      }
    )
    .then(() => {
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    })
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Successfully registered user'
      });
    })
    .catch(err => {
      console.log(`Registration`, err);
      res.status(500).json({
        message: `Registration Failed: ${err} `,
        err
      });
    });
};

// router.get('/getUser', loginRequired, db.getUser);

// router.get('/logout', loginRequired, db.logoutUser);

// router.post('/newuser', db.registerUser);

// router.post('/login', passport.authenticate('local'), (req, res) => {
//   delete req.user.password_digest
//   res.json(req.user);
// });

module.exports = {
  getUser,
  logoutUser,
  registerUser
};