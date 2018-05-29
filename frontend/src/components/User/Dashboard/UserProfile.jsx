import React, { Component } from 'react';
import { AuthConsumer } from '../../Auth/AuthContext';
import { Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';
import Post from '../../Profile/Post.jsx';
const spotifyApi = new SpotifyWebApi();

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      activeUser: '',
      nowPlaying: {},
      followers: [],
      followees: [],
      posts: []
    };
  }

  getUserFollowers = () => {
    axios
      .get(`/users/getUserFollowers/${this.props.activeUser.spotifyid}`)
      .then(res => {
        const fetchedFollowers = [];
        res.data.followers.forEach(follower => {
          fetchedFollowers.push(follower.follower_id);
        });
        this.setState({ followers: fetchedFollowers });
      });
  };

  getUserFollowees = () => {
    axios
      .get(`/users/getUserFollowees/${this.props.activeUser.spotifyid}`)
      .then(res => {
        this.setState({ followees: res.data.followees });
      });
  };

  componentWillMount() {
    this.setState({ activeUser: this.props.activeUser });
    const activeUser = this.props.activeUser;
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
    axios
      .get('/users/getPosts', {
        user_id: this.props.activeUser.spotifyid
      })
      .then(res => {
        this.setState({ posts: res.data.posts });
      });
    this.getUserFollowees();
    this.getUserFollowers();
  }

  render() {
    const { nowPlaying, posts } = this.state;

    return (
      <AuthConsumer>
        {({ activeUser }) =>
          activeUser ? (
            <div className="user-profile-container">
              <div className="user-profile">
                {' '}
                <div className="user-profile-info">
                  <a href={activeUser.spotify_url}>
                    {' '}
                    <p>
                      {' '}
                      {activeUser.name ? activeUser.name : activeUser.spotifyid}
                    </p>{' '}
                  </a>
                  <img
                    src={
                      activeUser.profile_pic
                        ? activeUser.profile_pic
                        : 'https://www.drupal.org/files/profile_default.png'
                    }
                  />
                </div>
                <div className="user-profile-counts">
                  <p> Following: {this.state.followees.length} </p>
                  <p> Followers: {this.state.followers.length} </p>
                  <p> Posts: {this.state.posts.length} </p>
                </div>
                {nowPlaying.name ? (
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
                ) : (
                  <p>You're not listening to anything at the moment</p>
                )}
              </div>
              <div className="user-posts">
                {posts.map(post => {
                  return <Post post={post} />;
                })}
              </div>
            </div>
          ) : (
            <div>Loading.</div>
          )
        }
      </AuthConsumer>
    );
  }
}

export default UserProfile;
