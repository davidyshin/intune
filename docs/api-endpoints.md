# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /users/newuser` - creates users

### Session

- `POST /users/login` - logs in user / creates session
- `GET /users/logout` - logs out user

### Share

- `GET /users/share/retrieve` - Retrieve user shares
- `POST /users/share` - create music share
- `DELETE /users/share/delete/:shareId` - deletes share by id
- `PATCH /users/share/edit/:shareId` - edit/update share

- `GET /users/share/feed` - Retrieve all shares in user feed
- `POST /users/share/comment/:shareId` - Comment on a share in user feed

### Posts

- `POST /users/post/` - create wall post
- `POST /users/post/comment/:postId` - comment on a wall post
- `PATCH /users/post/edit/:postId` - edit/update share
- `DELETE /users/post/delete/:postId` - deletes share by id

### Followers/Followees

- `POST /users/follow/:userId` - Follow a user (Create a follow row)
- `DELETE /users/unfollow/:userId` - UnFollow a user (Delete a follow row)
