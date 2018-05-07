# InTune


## Minimum Viable Product

InTune is a full stack web application for sharing music. By the end of Week 4, this app will, at a minimum, satisfy the following criteria with smooth, bug-free navigation, adequate seed data and sufficient CSS styling:

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] Implemented music sharing via a userfeed
- [ ] Post's on another user's wall, follower/followee system
- [ ] Comments on a user's music share
- [ ] Production README
- [ ] Account personalization (Profile pictures using AmazonS3) 
- Post MVP 
   -  [ ] Implemented Music Player in-app
   - [ ] Instant Messaging system


## Design Docs
- [View Wireframes](/docs/wireframes)
- [React Components](component-hierarchy.md)
- [API endpoints](api-endpoints.md)
- [DB schema](schema.md)
- [Sample State](sample-state.md)

## Implementation Timeline

- ### Phase 1: Backend setup and Front End User Authentication
    **Objective:** Functioning project with front-end Authentication

- ### Phase 2: User Feed and Follower/Followee System
    **Objective:** User's can share music and view other user's shared music on their feeds.

- ### Phase 3: User Wall/Comments

    **Objective:** Users can post on other user's walls. Each post can have their own comments and likes. 

- ### Phase 4: Notification System

    **Objective:** Every share and post will implement Spotify's API. This will link the song and album cover as well as the URI that spotify uses.