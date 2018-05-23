import React, { Component } from 'react';
import { AuthConsumer } from '../../Auth/AuthContext';
import UserNewPost from './UserNewPost';
import UserProfile from './UserProfile';

class UserDashboard extends Component {
  constructor() {
    super();

    this.state = {
      activeUser: '',
      nowPlaying: { name: '', albumArt: '' },
      songSearchRender: [],
      songSearchInput: '',
      selectedSong: ''
    };
  }

  componentDidMount() {}

  shareSong = () => {
    const { selectedSong } = this.state;
    console.log(selectedSong);
  };

  render() {
    return (
      <AuthConsumer>
        {({ activeUser }) =>
          activeUser ? (
            <div className="user-dashboard">
              <UserProfile activeUser={activeUser} />
              <UserNewPost activeUser={activeUser} />
            </div>
          ) : (
            <h1>Loading</h1>
          )
        }
      </AuthConsumer>
    );
  }
}

export default UserDashboard;
