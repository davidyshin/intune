import React, { Component } from 'react';
import { AuthConsumer } from '../../Auth/AuthContext';
import { Link } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import SpotifyWebApi from 'spotify-web-api-js';
import Modal from 'react-modal';
import SpotifyPlayer from 'react-spotify-player';
import axios from 'axios';
import moment from 'moment';

const spotifyApi = new SpotifyWebApi();

const size = {
  width: '90%',
  height: '500'
};
const view = 'coverart'; // or 'coverart'
const theme = 'black'; // or 'white'

class UserNewPost extends Component {
  constructor() {
    super();
    this.state = {
      activeUser: '',
      songSearchRender: [],
      songSearchInput: '',
      selectedSong: '',
      modalOpen: false,
      caption: ''
    };
  }

  componentDidMount() {
    this.setState({ activeUser: this.props.activeUser });
  }

  getSuggestions = e => {
    this.setState({ songSearchInput: e.target.value });

    if (e.target.value.length > 2) {
      spotifyApi.searchTracks(e.target.value).then(res => {
        this.setState({ songSearchRender: res.tracks.items });
      });
    }
    if (e.target.value.length < 3) {
      this.setState({ songSearchRender: [], selectedSong: '' });
    }
  };

  shareSong = () => {
    const { selectedSong } = this.state;
    if (selectedSong) {
      this.setState({
        modalOpen: true
      });
    }
  };

  closeModal = () => {
    this.setState({
      modalOpen: false
    });
  };
  handleCaption = e => {
    this.setState({ caption: e.target.value });
  };

  createSongShare = () => {
    const { activeUser, selectedSong, caption } = this.state;
    const dateLogged = moment()
      .utcOffset(-240)
      .format('YYYY-MM-DD');
    axios.post('/users/createSongShare', {
      spotifyId: activeUser.spotifyid,
      spotify_uri: selectedSong.uri,
      caption: caption,
      dates: dateLogged
    });
    this.setState({
      songSearchRender: [],
      selectedSong: '',
      songSearchInput: '',
      modalOpen: false
    });
  };
  render() {
    const { selectedSong } = this.state;
    return (
      <div className="song-search-container">
        <div className="song-search-title">
          <h3>Share a song</h3>
        </div>
        <div className="song-search-input">
          <form onSubmit={this.shareSong}>
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
                    <p className="artist-name">
                      Artist: {item.artists[0].name}
                    </p>
                  </div>
                  <div className="song-album-cover">
                    <img src={item.album.images[2].url} />
                  </div>
                </div>
              )}
              value={this.state.songSearchInput}
              onChange={this.getSuggestions}
              onSelect={(value, item) => {
                this.setState({
                  selectedSong: item,
                  songSearchInput: item.name,
                  songSearchRender: []
                });
              }}
            />
          </form>
        </div>
        <div className="share-button">
          <i onClick={this.shareSong} class="fas fa-share" />
        </div>
        <Modal
          className="new-post-modal"
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          target="_blank"
        >
          {selectedSong ? (
            <div className="new-post-modal-form">
              <SpotifyPlayer size={size} uri={selectedSong.uri} />
              <div className="new-post-modal-input">
                <form
                  onSubmit={this.handleFormSubmit}
                  className="new-post-modal-input-form"
                >
                  <textarea
                    onChange={this.handleCaption}
                    placeholder="I love this song!"
                  />
                </form>
              </div>
            </div>
          ) : (
            'Loading'
          )}
          <div className="new-post-modal-share-button">
            <button onClick={this.createSongShare} type="button">
              {' '}
              Share{' '}
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
export default UserNewPost;
