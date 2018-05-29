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
    console.log('login');
    res.send(false);
  }
};

const getProfile = (req, res, next) => {
  db
    .one(
      'SELECT spotifyid, name, email, spotify_url, profile_pic FROM users WHERE spotifyid = ${user_id}',
      { user_id: req.params.id }
    )
    .then(data => {
      res.status(200).json({
        user: data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({});
    });
};

const logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).send('log out success');
};

const createSongShare = (req, res, next) => {
  db
    .none(
      'INSERT INTO posts ( user_id, spotify_uri, caption, dates) VALUES ( ${user_id}, ${spotify_uri}, ${caption}, ${dates})',
      {
        user_id: req.user.spotifyid,
        spotify_uri: req.body.spotify_uri,
        caption: req.body.caption,
        dates: req.body.dates
      }
    )
    .catch(err => {
      res.status(500).send(`Error creating song share:  ${err}`);
    });
};

const getFeed = (req, res, next) => {
  db
    .any(
      'SELECT spotify_uri, caption, user_id, dates FROM follows JOIN posts ON follows.followee_id=posts.user_id JOIN users ON follows.followee_id=users.spotifyid WHERE follower_id=${user} OR followee_id=${user} ORDER BY posts.id DESC',
      { user: req.user.spotifyid }
    )
    .then(data => {
      res.status(200).json({
        feed: data
      });
    })
    .catch(err => {
      console.log(`error rendering feed`, err);
      feed: 'No data found';
    });
};

const getUserFollowers = (req, res, next) => {
  db
    .any('SELECT follower_id FROM follows WHERE followee_id = ${id}', {
      id: req.params.id
    })
    .then(data => {
      res.status(200).json({
        followers: data
      });
    });
};

const getUserFollowees = (req, res, next) => {
  db
    .any('SELECT followee_id FROM follows WHERE follower_id = ${id}', {
      id: req.params.id
    })
    .then(data => {
      res.status(200).json({
        followees: data
      });
    });
};

const addFollower = (req, res, next) => {
  db
    .none(
      'INSERT INTO follows (follower_id, followee_id) VALUES(${follower_id}, ${followee_id})',
      { follower_id: req.user.spotifyid, followee_id: req.body.id }
    )
    .then(data => {
      res.status(200).json({
        follow: data
      });
    })
    .catch(err => {
      res.status(500).json({
        follow: 'follower not added'
      });
    });
};

const deleteFollower = (req, res, next) => {
  db
    .none(
      'DELETE FROM follows WHERE followee_id= ${followee_id} AND follower_id=${follower_id}',
      { follower_id: req.user.spotifyid, followee_id: req.body.id }
    )
    .then(() => {
      res.status(200).json({
        status: 'Success',
        message: 'Unfollowed user'
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getPosts = (req, res, next) => {
  db
    .any('SELECT * FROM posts WHERE user_id = ${user_id} ORDER BY id DESC', {
      user_id: req.user.spotifyid
    })
    .then(data => {
      res.status(200).json({ posts: data });
    });
};

const getUserPosts = (req, res, next) => {
  db
    .any('SELECT * FROM posts WHERE user_id = ${user_id} ORDER BY id DESC', {
      user_id: req.params.id
    })
    .then(data => {
      res.status(200).json({ posts: data });
    });
};

module.exports = {
  getUser,
  logoutUser,
  createSongShare,
  addFollower,
  deleteFollower,
  getPosts,
  getProfile,
  getFeed,
  getUserPosts,
  getUserFollowers,
  getUserFollowees
};
