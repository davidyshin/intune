import React, { Component } from 'react';
import axios from 'axios'

const AuthContext = React.createContext();

class AuthProvider extends Component {
  constructor() {
    super();
    this.state = { username: '', password: '', isAuth: false };
  }

  login = (username, password) => {
    axios
      .post('/users/login', {
        username: username,
        password: password
      })
      .then(res => {
        this.setState({ isAuth: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.login(username, password);
  };

  logout = () => {
    axios
      .get('/users/logout')
      .then(res => {
        this.setState({
          isAuth: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout,
          handleInput: this.handleInput,
          handleSubmit: this.handleSubmit
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
