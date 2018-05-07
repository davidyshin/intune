import React, { Component } from 'react';
import { AuthConsumer } from '../Auth/AuthContext';
import { Link } from 'react-router-dom';

class Profile extends Component {
    constructor(){
        super()
        this.state ={}
    }

    render() {
        return(
            <h1>Profile</h1>
        )
    }
}

export default Profile