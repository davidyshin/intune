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
          <div>
            <h3>
              <Link to="/">HOME</Link>
            </h3>

            {activeUser ? (
              <ul>
                <button onClick={logout}>logout</button>
              </ul>
            ) : (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up </Link>
              </div>
            )}
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default Header;
