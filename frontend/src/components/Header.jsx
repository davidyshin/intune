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
              <p>
                <Link to="/">HOME</Link>
              </p>
            </div>

            {activeUser ? (
              <div className="logout-link">
                  <p onClick={logout}>LOGOUT</p>
              </div>
            ) : (
              <div className="login-link">
                <Link to="/login">LOGIN</Link>
              </div>
            )}
            <div className="github-link">
            <a href="https://github.com/davidyshin/intune" target="_blank"><i class="fab fa-github"></i></a>
              </div>
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default Header;
