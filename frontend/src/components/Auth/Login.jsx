import React, { Component } from 'react';
import axios from 'axios';
import { AuthConsumer } from './AuthContext';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import aos from 'aos';
import '../../../node_modules/aos/dist/aos.css';
class LoginForm extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    aos.init()
  }

  render() {
    return (
      <AuthConsumer>
        {({ activeUser }) =>
          activeUser ? (
            <Redirect to="/" />
          ) : (
            <div className="login-container">
              <div data-aos="fade-up" className="spotify-auth-link">
                {' '}
                <a href="http://ds-intune.herokuapp.com/auth">
                  <i class="fab fa-spotify" />
                </a>
                <h3> Login with Spotify </h3>
              </div>
            </div>
          )
        }
      </AuthConsumer>
    );
  }
}

export default LoginForm;
