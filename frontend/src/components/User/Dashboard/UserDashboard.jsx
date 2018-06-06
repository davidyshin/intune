import React, { Component } from 'react';
import axios from 'axios';
import { AuthConsumer } from '../../Auth/AuthContext';
import UserNewPost from './UserNewPost';
import SideProfile from './SideProfile';
import UserProfile from './UserProfile.jsx';
import FeedContainer from '../Feed/FeedContainer.jsx';
import ProfileContainer from '../../Profile/ProfileContainer.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import aos from 'aos'

class UserDashboard extends Component {
  constructor() {
    super();

    this.state = {
      activeUser: '',
      feed: []
    };
  }
  componentWillMount = () => {
    this.setState({ activeUser: this.props.activeUser });
  };

  UserHome = () => {
    return (
      <div data-aos="fade-up" className="user-dashboard">
        <div className="dashboard-side-profile-container">
          <SideProfile activeUser={this.props.activeUser} />
        </div>
        <div className="dashboard-post-feed-container">
          <UserNewPost activeUser={this.props.activeUser} />
          <FeedContainer />
        </div>
      </div>
    );
  };

  UserProfile = () => {
    return <UserProfile activeUser={this.props.activeUser} />;
  };

  render() {
    return (
      <AuthConsumer>
        {({ activeUser }) =>
          activeUser ? (
            <Switch>
              <Route exact path="/" component={this.UserHome} />
              <Route exact path="/user/:id" component={ProfileContainer} />
              <Route exact path="/profile" component={this.UserProfile} />
            </Switch>
          ) : (
            <h1>Loading</h1>
          )
        }
      </AuthConsumer>
    );
  }
}

export default UserDashboard;
