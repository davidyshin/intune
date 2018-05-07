import React, { Component } from 'react';
import { AuthConsumer } from '../Auth/AuthContext';
import { Link } from 'react-router-dom';

class UserDashboard extends Component {
    constructor(){
        super()
        this.state ={}
    }

    render() {
        return(
            <h1>Dashboard</h1>
        )
    }
}

export default UserDashboard