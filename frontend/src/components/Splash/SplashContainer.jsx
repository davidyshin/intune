import React, { Component } from 'react';
import axios from 'axios';
import Login from '../Auth/Login.jsx';
import UserDashboard from '../User/Dashboard/UserDashboard.jsx';
import { AuthConsumer } from '../Auth/AuthContext';
import { Link } from 'react-router-dom';
import aos from 'aos'

class SplashPage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    aos.init()
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
              <h1 data-aos="fade-up" className="splash-title">
                {' '}
                Welcome to <span className="splash-intune"> InTune </span>
              </h1>
              <p data-aos="fade-up"> Share your music with the world. </p>
            </div>
          )
        }
      </AuthConsumer>
    );
  }
}

export default SplashPage;
