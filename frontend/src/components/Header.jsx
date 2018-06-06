import React, { Component } from 'react';
import { AuthConsumer } from './Auth/AuthContext';
import { Link, Redirect } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import axios from 'axios';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userSearchRender: [],
      userSearchInput: '',
    };
  }

  getSuggestions = e => {
    this.setState({ userSearchInput: e.target.value });

    if (e.target.value.length > 2) {
      axios.get(`/users/findUser/${e.target.value.toLowerCase()}`).then(res => {
        this.setState({ userSearchRender: res.data.users });
        console.log(res.data.users)
      });
    }
    if (e.target.value.length < 3) {
      this.setState({ userSearchRender: [] });
    }
  };

  render() {
    return (
      <AuthConsumer>
        {({ activeUser, logout }) => (
          <div className="header-container">
            <div className="home-link">
              <Link to="/">
                <i class="fas fa-home" />
              </Link>
            </div>
            {!activeUser ? (
              <div className="github-link">
                <a href="https://github.com/davidyshin/intune" target="_blank">
                  <i class="fab fa-github" />
                </a>
              </div>
            ) : (
              <div className="user-search-container">
                <Autocomplete
                  getItemValue={item => item.spotifyid}
                  items={this.state.userSearchRender}
                  inputProps={{
                    placeholder: 'Search for a user'
                  }}
                  renderItem={(item, isHighlighted) => (
                    <Link to={`/user/${item.spotifyid}`}>
                      <div
                        className="user-search-suggestions"
                        style={{
                          background: isHighlighted
                            ? '#84bd00'
                            : 'rgba(0,0,0,.75)',
                          width: '99%',
                          height: '100%',
                          zIndex: '999'
                        }}
                      >
                        <div className="user-profile-pic">
                          <img
                            src={
                              item.profile_pic
                                ? item.profile_pic
                                : 'https://www.drupal.org/files/profile_default.png'
                            }
                          />
                        </div>
                        <div className="user-name" key="user-name">
                          <p> {item.name ? item.name : item.spotifyid} </p>
                        </div>
                      </div>
                    </Link>
                  )}
                  value={this.state.userSearchInput}
                  onChange={this.getSuggestions}
                  onSelect={(value, item) => {
                    <Redirect to ={`/user/${value}`}/>
                  }}
                />
              </div>
            )}

            {!activeUser ? (
              <div className="login-link">
                <Link to="/login">
                  <i class="fas fa-sign-in-alt" />
                </Link>
              </div>
            ) : (
              <div className="users-link">
                <Link to="/profile">
                  <i class="fas fa-users" />
                </Link>
              </div>
            )}
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default Header;
