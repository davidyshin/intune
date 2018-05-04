const db = require('../db/queries');
const express = require('express');
const router = express.Router();
const { loginRequired } = require('../auth/helpers');
const passport = require('../auth/local');
const dotenv = require('dotenv');
dotenv.load();


router.get('/getUser', loginRequired, db.getUser);

router.get('/logout', loginRequired, db.logoutUser);

router.post('/newuser', db.registerUser);

router.post('/login', passport.authenticate('local'), (req, res) => {
  delete req.user.password_digest
  res.json(req.user);
});

module.exports = router;