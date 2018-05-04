// Container for Login, SignUp and Splash components

import React, { Component } from 'react';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';


class AuthContainer extends Component {
  constructor() {
    super();
    this.state = {
      activeForm: 'login'
    };
  }

  activeComponent = props => {
    switch (props.activeForm) {
      case 'login':
        return <Login />;
        break;
      case 'signup':
        return <SignUp />;
        break;
    }
  };

  toggleActive = e => {
    this.setState({
      activeForm: e.target.id
    });
  };

  render() {
    let { activeForm } = this.state;
    return (

          <div className="auth-container">
            <div className="top-navigation-right">
              <h3 onClick={this.toggleActive} id="login">
                LOGIN
              </h3>
              <h3 onClick={this.toggleActive} id="signup">
                SIGN UP
              </h3>
            </div>
            <this.activeComponent activeForm={activeForm} />
          </div>

    );
  }
}

export default AuthContainer;
