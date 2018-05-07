import React, { Component } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  constructor() {
    super();
    this.state = { username: '', password: '', activeUser: false };
  }
  componentDidMount() {
    axios
      .get('/users/getUser')
      .then(res => {
        this.setState({
          activeUser: res.data.user
        });
      })
      .catch(err => {
        console.log(`errrr`, err);
      });
  }

  login = (username, password) => {
    axios
      .post('/users/login', {
        username: username,
        password: password
      })
      .then(res => {
        this.setState({ activeUser: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

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
          activeUser: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          activeUser: this.state.activeUser,
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
