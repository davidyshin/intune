import React, { Component } from 'react';
import { AuthConsumer } from '../../Auth/AuthContext';
import { Link } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class UserNewPost extends Component {
  constructor() {
    super();
    this.state = {
      activeUser: '',
      songSearchRender: [],
      songSearchInput: '',
      selectedSong: ''
    };
  }

  componentDidMount() {}

  getSuggestions = e => {
    this.setState({ songSearchInput: e.target.value });

    if (e.target.value.length > 2) {
      spotifyApi.searchTracks(e.target.value).then(res => {
        this.setState({ songSearchRender: res.tracks.items });
        console.log(res.tracks.items);
      });
    }
    if (e.target.value.length < 2) {
      this.setState({ songSearchRender: [] });
    }
  };

  shareSong = () => {
    const { selectedSong } = this.state;
    console.log(selectedSong);
  };
  render() {
    return (
      <div className="song-search-container">
        <div className="song-search-title">
          <h3>Share a song</h3>
        </div>
        <div className="song-search-input">
          <Autocomplete
            getItemValue={item => item.name}
            items={this.state.songSearchRender}
            inputProps={{
              placeholder: 'Search by name or artist...'
            }}
            renderItem={(item, isHighlighted) => (
              <div
                className="song-suggestions"
                style={{
                  background: isHighlighted ? '#84bd00' : 'rgba(0,0,0,.75)',
                  width: '500px',
                  height: '100%'
                }}
              >
                <div className="song-info" key="song">
                  <p className="song-name">Song: {item.name}</p>
                  <p className="artist-name">Artist: {item.artists[0].name}</p>
                </div>
                <div className="song-album-cover">
                  <img src={item.album.images[2].url} />
                </div>
              </div>
            )}
            value={this.state.songSearchInput}
            onChange={this.getSuggestions}
            onSelect={(value, item) => {
              console.log(item);
              this.setState({
                selectedSong: item,
                songSearchInput: item.name,
                songSearchRender: []
              });
            }}
          />
        </div>
        <div className="share-button">
        <i onClick={this.shareSong} class="fas fa-share" />
        </div>
      </div>
    );
  }
}

export default UserNewPost;
