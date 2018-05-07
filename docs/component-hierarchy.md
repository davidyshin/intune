# Component Hierarchy

**SplashContainer** 
    - First Page user sees when they land on the page

**Dashboard (AKA HomeContainer** (Global NavBar/Logged In)
- Home (First page user sees when they login)
    - Dashboard (Analytics)
        - Feed (Full list of followee music shares)
- Profile
    - Wall (Every profile has a wall where other users can post to)
        - Posts (Every post allows other users to comment)
            - Comments
- UserAccount
    - UserSummary (Post count, Music Preferences(Genre))
    - EditAccount (Edit profile picture, preferences, info, password)
    - User Settings (Privacy Settings, who can follow, etc etc)

## Routes

|Path                | Component                       |
|--------------------|---------------------------------|
| "/login"           | "Login"                         |
| "/"                | "SplashContainer || Dashboard"  |
| "/                 | "JobsSummary" / "JobsContainer" |
| "/u/:id"           | "Profile"                       |
| "/u/:id/wall/"     | "Wall"                          |
| "/home/user/"      | "UserAccount"                   |
| "/home/user/edit   | "EditUser"                      |