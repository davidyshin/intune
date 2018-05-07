# Schema Information


## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
first_name      | string    | not null
last_name       | string    | not null
photo_url       | string    | not null
password_digest | string    | not null
username        | string    | not null, indexed, unique


## wall
column name        | data type | details
-------------------|-----------|-----------------------
wall_id            | integer   | not null, references(user), unique

## wall_posts
column name        | data type | details
-------------------|-----------|-----------------------
author_id          | integer   | not null, references(user), unique
wall_id            | integer   | not null, references(wall), unique
post_id            | integer   | not null, primary key
song_uri           | string    | not null
post_body          | string    | not null


## wall_posts_comments
column name        | data type | details
-------------------|-----------|-----------------------
post_id            | integer   | not null, references(wall_posts)
comment_id         | integer   | not null, primary key
comment_body       | string    | not null
user_id            | integer   | not null,references(user), unique 
song_uri           | string    | not null


## shares
column name     | data type | details
----------------|-----------|-----------------------
share_id        | integer   | not null, primary key
user_id         | integer   | not null,references(user), unique
song_uri        | string    | not null, indexed, unique
share_body      | string    | 

## shares_comment
column name     | data type | details
----------------|-----------|-----------------------
share_id        | integer   | not null, primary key, references(shares)
commenter_id    | integer   | not null, references(user), unique
comment_id      | integer   | not null
comment_body    | string    | not null

## shares_likes
column name     | data type | details
----------------|-----------|-----------------------
share_id        | integer   | not null, references(shares)
liker_id        | integer   | not null, references(user), unique

## follows 
column name     | data type | details
----------------|-----------|-----------------------
follower_id     | integer   | not null, references(user)
followee_id     | integer   | not null, references(user)

