import React, { Component } from 'react';
import axios from 'axios';
import { AuthConsumer } from './AuthContext';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      message: null
    };
  }

  render() {
    return (
      <AuthConsumer>
        {({
          activeUser,
          login,
          logout,
          handleInput,
          handleSubmit,
          username,
          password
        }) =>
          activeUser ? (
            <Redirect to="/" />
          ) : (
            <div className="login-form auth-form-container" data-aos="fade-up">
              <form onSubmit={handleSubmit}>
                <h3>Welcome back</h3>
                <input
                  placeholder="Email"
                  type="email"
                  value={username}
                  name="username"
                  onChange={handleInput}
                  required
                />
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={handleInput}
                  required
                />
                <input type="submit" value="Log in" />
              </form>
              <h1>
                {' '}
                Not a member? <Link to="/signup">Sign up </Link>
              </h1>
            </div>
          )
        }
      </AuthConsumer>
    );
  }
}

export default LoginForm;
