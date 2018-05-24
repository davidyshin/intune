import React, { Component } from 'react';
import { AuthConsumer } from '../../Auth/AuthContext';
import { Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import Autocomplete from 'react-autocomplete';
const spotifyApi = new SpotifyWebApi();

class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      activeUser: '',
      nowPlaying: { name: '', albumArt: '' }
    };
  }

  componentDidMount() {
    const activeUser = this.props.activeUser;
    const profilePic = activeUser.profile_pic
      ? activeUser.profile_pic
      : 'https://www.drupal.org/files/profile_default.png';
    this.setState({ activeUser: activeUser, profilePic: profilePic });
    const token = activeUser.accesstoken;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      if (response) {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url,
            link: response.item.external_urls.spotify
          }
        });
      }
    });
  }

  render() {
    const {profilePic, nowPlaying } = this.state;
    return (
      <AuthConsumer>
        {({ activeUser, logout }) =>
          activeUser ? (
            <div className="profile-container">
              <div className="profile">
                <div className="profile-info">
                  <p>
                    <a href={activeUser.spotify_url} target="_blank">
                      {' '}
                      {activeUser.name
                        ? activeUser.name
                        : activeUser.spotifyid}{' '}
                    </a>
                  </p>{' '}
                  <img className="profile-pic" src={profilePic} />
                </div>
                <div className="now-playing">
                  <p>
                    Listening to:{' '}
                    <a href={nowPlaying.link} target="_blank">
                      {nowPlaying.name}
                    </a>
                  </p>
                  <img
                    className="now-playing-image"
                    src={nowPlaying.albumArt}
                  />
                </div>
              </div>
              <div className="logout-link">
                <p onClick={logout}>
                  <i class="fas fa-sign-out-alt" />
                </p>
              </div>
            </div>
          ) : (
            <h1>Loading</h1>
          )
        }
      </AuthConsumer>
    );
  }
}

export default UserProfile;
