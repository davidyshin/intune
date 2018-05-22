import React, { Component } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  constructor() {
    super();
    this.state = { activeUser: false };
  }
  componentDidMount() {
    axios
      .get('/users/getUser')
      .then(res => {
        console.log(res.data);
        this.setState({
          activeUser: res.data
        });
      })
      .catch(err => {
        console.log(`errrr`, err);
      });
  }

  logout = () => {
    axios.get('/users/logout').then(() => {
      this.setState({ activeUser: false });
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          activeUser: this.state.activeUser,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
