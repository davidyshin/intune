import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';

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
      feedPost: []
    };
  }
  componentDidMount() {
      console.log(this.props.feedPost)
    this.setState({
      feedPost: this.props.feedPost
    });
  }
  render() {
    const { feedPost } = this.state;
    return feedPost !== undefined ? (
      <div className="feed-post-container">
        <SpotifyPlayer size={size} uri={feedPost.spotify_uri} />
        <div className="feed-post-caption">
            <h3> {feedPost.user_id} </h3>
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
