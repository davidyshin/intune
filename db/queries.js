const db = require('./index');
const authHelpers = require('../auth/helpers.js');
const passport = require('../auth/local.js');
const dotenv = require('dotenv');
dotenv.load();

const moment = require('moment');

const getUser = (req, res, next) => {
  if (req.user) {
    res.send(req.user);
  } else {
    console.log('login')
    res.send(false)
  }
};

const logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).send('log out success');
};


module.exports = {
  getUser,
  logoutUser
};
