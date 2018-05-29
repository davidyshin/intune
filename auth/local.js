const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const init = require('./passport');
const authHelpers = require('./helpers');
const SpotifyStrategy = require('passport-spotify').Strategy;
const db = require('../db/index');
const dotenv = require('dotenv');
const options = {};
dotenv.load();
init();

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://localhost:3100/auth/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      // User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      const user = profile._json;
      const profilePicture = user.images.length > 0 ? user.images[0].url : '';
      db
        .none(
          'UPDATE Users SET accessToken = ${accessToken} WHERE spotifyId = ${id}',
          { id: user.id, accessToken: accessToken }
        )
        .then(() => {
          db
            .one('SELECT * FROM Users WHERE spotifyId = ${id}', { id: user.id })
            .then(user => {
              return done(null, user);
            })
            .catch(err => {
              console.log('Creating User');
              return db
                .none(
                  'INSERT INTO Users (spotifyId, name, email, spotify_url, profile_pic, accessToken) VALUES (${spotifyId}, ${name}, ${email}, ${spotify_url}, ${profile_pic}, ${accessToken})',
                  {
                    spotifyId: user.id,
                    name: user.display_name,
                    email: user.email,
                    spotify_url: user.external_urls.spotify,
                    profile_pic: profilePicture,
                    accessToken: accessToken
                  }
                )
                .then(() => {
                  db
                    .one('SELECT * FROM Users WHERE spotifyId = $1', [user.id])
                    .then(user => {
                      return done(null, user);
                    });
                });
            });
        });
    }
  )
);

module.exports = passport;
