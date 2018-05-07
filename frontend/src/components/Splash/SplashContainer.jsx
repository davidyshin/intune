import React, { Component } from 'react';
import axios from 'axios';
import Login from '../Auth/Login.jsx';
import UserDashboard from '../User/Dashboard/UserDashboard.jsx'
import { AuthConsumer } from '../Auth/AuthContext';
import { Link } from 'react-router-dom';


class SplashPage extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <AuthConsumer>
        {({ activeUser }) => (activeUser ? <UserDashboard /> : <h1>Welcome to InTune</h1>)}
      </AuthConsumer>
    );
  }
}

export default SplashPage;
