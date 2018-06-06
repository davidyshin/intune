import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';
import aos from 'aos'
const size = {
  width: '300',
  height: '300'
};
const view = 'coverart'; // or 'coverart'
const theme = 'black'; //

class Post extends Component {
  constructor() {
    super();
    this.state = {
      post: []
    };
  }
  componentDidMount() {
    this.setState({
      post: this.props.post
    });
  }
  render() {
    const { post } = this.state;
    return post !== undefined ? (
      <div className="post-container">
        <SpotifyPlayer size={size} uri={post.spotify_uri} />
        <div className="post-caption">
          <p> {post.dates}</p>
          <p> {post.caption}</p>
        </div>
      </div>
    ) : (
      <h1> Loading </h1>
    );
  }
}

{
}
export default Post;
