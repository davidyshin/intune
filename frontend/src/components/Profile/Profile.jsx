import React, { Component } from 'react';
import { AuthConsumer } from '../Auth/AuthContext';
import { Link, Redirect } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';
import Post from './Post.jsx';
import aos from 'aos'
const spotifyApi = new SpotifyWebApi();

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      activeUser: '',
      user: '',
      followers: [],
      followees: '',
      posts: []
    };
  }

  handleFollowButton = e => {
    e.preventDefault();
  };

  componentWillMount() {
    this.setState({ activeUser: this.props.activeUser });
    const activeUser = this.props.activeUser;
    const token = activeUser.accesstoken;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    spotifyApi.getUser(`${this.props.id}`).then(response => {
      if (response) {
        this.setState({ user: response });
      }
    });
    this.getUserPosts();
    this.getUserFollowers();
    this.getUserFollowees();
  }

  getUserPosts = () => {
    axios.get(`/users/getUserPosts/${this.props.id}`).then(res => {
      this.setState({ posts: res.data.posts });
    });
  };

  getUserFollowers = () => {
    axios.get(`/users/getUserFollowers/${this.props.id}`).then(res => {
      const fetchedFollowers = [];
      res.data.followers.forEach(follower => {
        fetchedFollowers.push(follower.follower_id);
      });
      this.setState({ followers: fetchedFollowers });
    });
  };

  getUserFollowees = () => {
    axios.get(`/users/getUserFollowees/${this.props.id}`).then(res => {
      this.setState({ followees: res.data.followees });
    });
  };

  followUser = () => {
    axios.post('/users/addFollower', { id: this.props.id }).then(res => {
      this.getUserFollowers();
    });
  };

  unfollowUser = () => {
    axios.post('/users/deleteFollower', { id: this.props.id }).then(res => {
      this.getUserFollowers();
    });
  };

  render() {
    const { nowPlaying, posts, user, followers, followees } = this.state;
    const { activeUser } = this.props;
    if (user.id === activeUser.spotifyid) {
      return <Redirect to="/profile" />;
    } else {
    }
    return user ? (
      <div className="user-profile-container">
        <div data-aos="fade-up" className="user-profile">
          {' '}
          <div className="user-profile-info">
            <a href={user.external_urls.spotify}>
              <p> {user.display_name ? user.display_name : user.id}</p>
            </a>
            <img
              src={
                user.profile_pic
                  ? user.profile_pic
                  : 'https://www.drupal.org/files/profile_default.png'
              }
            />
          </div>
          <div className="user-profile-counts">
            <p> Following: {followees.length} </p>
            <p> Followers: {followers.length} </p>
            <p> Posts: {posts.length} </p>
          </div>
          {!followers.includes(activeUser.spotifyid) ? (
            <div className="user-follow-button">
              <button onClick={this.followUser} type="button">
                {' '}
                Follow{' '}
              </button>
            </div>
          ) : (
            <div className="user-follow-button">
              <button onClick={this.unfollowUser} type="button">
                {' '}
                Unfollow{' '}
              </button>
            </div>
          )}
        </div>
        {posts.length > 0 ? 
        (<div className="user-posts">
          {posts.map(post => {
            return <Post post={post} />;
          })}
        </div>) : (<div className="user-no-posts"><h1> Nothing yet :(</h1></div>)}
      </div>
    ) : (
      <div>Loading.</div>
    );
  }
}

export default Profile;
