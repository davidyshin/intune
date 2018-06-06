import React, { Component } from 'react';
import { AuthConsumer } from '../Auth/AuthContext';
import Profile from './Profile.jsx';

class ProfileContainer extends Component {
  constructor() {
    super();
    this.state= {
      selectedUser: ''
    }
  }
  componentWillReceiveProps() {
    this.setState({selectedUser: this.props.match.params.id})
  }

  render() {
    return (
      <AuthConsumer>
        {({ activeUser }) => (
          <Profile  activeUser={activeUser} id={this.props.match.params.id} />
        )}
      </AuthConsumer>
    );
  }
}

export default ProfileContainer;
