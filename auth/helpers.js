const db = require('../db/index');
const bcrypt = require('bcryptjs');

const comparePassword = (userPass, databasePass) => {
  return bcrypt.compareSync(userPass, databasePass);
};

const createHash = password => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const loginRequired = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ status: 'Please log in.' });
    return;
  }
  next();
};

module.exports = {
  comparePassword,
  createHash,
  loginRequired
};