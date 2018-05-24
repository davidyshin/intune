import React, { Component } from 'react';
import { AuthConsumer } from './Auth/AuthContext';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor() {
    super();
    this.state = {};
  }
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
            <div className="github-link">
              <a href="https://github.com/davidyshin/intune" target="_blank">
                <i class="fab fa-github" />
              </a>
            </div>
            {!activeUser ? (
              <div className="login-link">
                <Link to="/login">
                  <i class="fas fa-sign-in-alt" />
                </Link>
              </div>
            ) : (
              <div className="users-link">
                <Link to="/users">
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
