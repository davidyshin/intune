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
        {({ isAuth, logout }) => (
          <div>
            <h3>
              <Link to="/">HOME</Link>
            </h3>

            {isAuth ? (
              <ul>
                <Link to="/dashboard">Dashboard</Link>
                <button onClick={logout}>logout</button>
              </ul>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default Header;
