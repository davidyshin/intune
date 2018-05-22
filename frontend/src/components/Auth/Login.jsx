import React, { Component } from 'react';
import axios from 'axios';
import { AuthConsumer } from './AuthContext';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css';
class LoginForm extends Component {
  constructor() {
    super();
  }

  testLogin = () => {
    axios.get('/auth').then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <AuthConsumer>
        {({ activeUser }) =>
          activeUser ? (
            <Redirect to="/" />
          ) : (
            <div className="login-container">
              <div className="spotify-auth-link">
                {' '}
                <i onClick={this.testLogin} class="fab fa-spotify" />
                {/* <a href="http://localhost:3100/auth">
                  <i class="fab fa-spotify" />
                </a> */}
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
