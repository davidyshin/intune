import React, { Component } from 'react';
import axios from 'axios';
import { AuthConsumer } from './AuthContext';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      retypePassword: '',
      message: ''
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      username,
      firstName,
      lastName,
      password,
      retypePassword
    } = this.state;

    if (password.length < 6) {
      this.setState({
        message: 'Password too short'
      });
    } else if (password !== retypePassword) {
      this.setState({
        message: 'Passwords do not match'
      });
    } else {
      axios
        .post('/users/newuser', {
          username: username,
          firstName: firstName,
          lastName: lastName,
          password: password
        })
        .then(() => {
          axios
            .post('/users/login', {
              username: username,
              password: password
            })
            .catch(err => {
              console.log(err);
              this.setState({
                message: 'Error logging in'
              });
            });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            username: '',
            password: '',
            message: 'Error registering'
          });
        });
    }
  };

  render() {
    const {
      username,
      firstName,
      lastName,
      password,
      retypePassword,
      message
    } = this.state;
    const errorMessage = message ? <p>{message}</p> : null;

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
            <div className="signup-form auth-form-container" data-aos="fade-up">
              <form onSubmit={this.handleSubmit}>
                {errorMessage}
                <input
                  placeholder="Email"
                  type="email"
                  value={username}
                  name="username"
                  onChange={this.handleInput}
                  required
                />
                <div className="auth-form-input-horizontal">
                  <input
                    placeholder="First name"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleInput}
                    required
                  />
                  <input
                    placeholder="Last name"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleInput}
                    required
                  />
                </div>
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleInput}
                  required
                />
                <input
                  placeholder="Retype password"
                  type="password"
                  name="retypePassword"
                  value={retypePassword}
                  onChange={this.handleInput}
                  required
                />
                <input type="submit" value="Sign Up" />
              </form>
              <h1> Already a member? <Link to='/login'>Log in </Link></h1>
            </div>
          )
        }
      </AuthConsumer>
    );
  }
}

export default SignUpForm;
