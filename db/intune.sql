
DROP DATABASE IF EXISTS intune;
CREATE DATABASE intune;
\c intune;
Drop TABLE Users
CASCADE;
CREATE TABLE Users
(
  spotifyId VARCHAR UNIQUE,
  name VARCHAR,
  email VARCHAR,
  spotify_url VARCHAR,
  profile_pic VARCHAR,
  accessToken VARCHAR,
  PRIMARY KEY (spotifyId)
);
Drop TABLE posts
CASCADE;
CREATE TABLE posts
(
  ID SERIAL PRIMARY KEY,
  spotify_uri VARCHAR,
  caption VARCHAR,
  user_id VARCHAR REFERENCES users(spotifyId),
  dates VARCHAR
);
Drop TABLE likes
CASCADE;
CREATE TABLE likes
(
  ID SERIAL PRIMARY KEY,
  liker_id VARCHAR REFERENCES users(spotifyId),
  post_id INTEGER REFERENCES posts(ID)
);
Drop TABLE follows
CASCADE;
CREATE TABLE follows
(
  ID SERIAL PRIMARY KEY,
  follower_id VARCHAR REFERENCES users(spotifyId),
  followee_id VARCHAR REFERENCES users(spotifyId)
);