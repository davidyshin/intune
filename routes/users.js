const db = require('../db/queries');
const express = require('express');
const router = express.Router();
const { loginRequired } = require('../auth/helpers');
const passport = require('../auth/local');
const dotenv = require('dotenv');
dotenv.load();

router.get('/getUser', loginRequired, db.getUser);

router.get('/logout', loginRequired, db.logoutUser);

router.get('/getPosts', loginRequired, db.getPosts);
router.get('/getProfile/:id', loginRequired, db.getProfile);

router.get('/getUserFollowers/:id', loginRequired, db.getUserFollowers);
router.get('/getUserFollowees/:id', loginRequired, db.getUserFollowees);
router.get('/getFeed', loginRequired, db.getFeed)
router.get('/getUserPosts/:id', loginRequired, db.getUserPosts);
router.get('/findUser/:input', loginRequired, db.findUser)

router.post('/addFollower', loginRequired, db.addFollower);
router.post('/deleteFollower', loginRequired, db.deleteFollower);
router.post('/createSongShare', loginRequired, db.createSongShare);
module.exports = router;
