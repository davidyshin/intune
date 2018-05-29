import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';
import axios from 'axios';
const size = {
  width: '300',
  height: '300'
};
const view = 'coverart'; // or 'coverart'
const theme = 'black'; //

class FeedPost extends Component {
  constructor() {
    super();
    this.state = {
      feedPost: '',
      author: ''
    };
  }
  componentDidMount() {
    this.setState({
      feedPost: this.props.feedPost
    });
    axios.get(`/users/getProfile/${this.props.feedPost.user_id}`).then(res => {
      this.setState({ author: res.data.user });
    });
  }
  render() {
    const { feedPost, author } = this.state;
    return feedPost && author ? (
      <div className="feed-post-container">
        <SpotifyPlayer size={size} uri={feedPost.spotify_uri} />
        <div className="feed-post-caption">
          <a className="feed-post-author-link">
            {' '}
            href={author.spotify_url}>{' '}
            <h3> {author.name ? author.name : author.spotifyid} </h3>
          </a>
          <img src={author.profile_pic} />
          <p> {feedPost.dates}</p>
          <p> {feedPost.caption}</p>
        </div>
      </div>
    ) : (
      <h1> Loading </h1>
    );
  }
}

{
}
export default FeedPost;
