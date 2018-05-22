import React, { Component } from 'react';
import axios from 'axios';
import Login from '../Auth/Login.jsx';
import UserDashboard from '../User/Dashboard/UserDashboard.jsx';
import { AuthConsumer } from '../Auth/AuthContext';
import { Link } from 'react-router-dom';

class SplashPage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <AuthConsumer>
        {({ activeUser }) =>
          activeUser ? (
            <UserDashboard activeUser={activeUser} />
          ) : (
            <div className="splash-container">
              {' '}
              <h1 className="splash-title">
                {' '}
                Welcome to <span className="splash-intune"> InTune </span>
              </h1>
              <p> Share your music with the world. </p>
            </div>
          )
        }
      </AuthConsumer>
    );
  }
}

export default SplashPage;
