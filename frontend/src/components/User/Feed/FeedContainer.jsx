import React, { Component } from 'react';
import FeedPost from './FeedPost.jsx';
import axios from 'axios'

class FeedContainer extends Component {
  constructor() {
    super();
    this.state = { feed: [] };
  }

  componentDidMount() {
    axios.get('/users/getFeed').then(res => {
      this.setState({ feed: res.data.feed });
    });
  }
  render() {
    const { feed } = this.state;
    return (
      <div className="feed-container">
        {feed.map(feedPost => {
          return <FeedPost feedPost={feedPost} />;
        })}
      </div>
    );
  }
}

export default FeedContainer;
