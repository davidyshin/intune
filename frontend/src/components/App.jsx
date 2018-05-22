import React, { Component } from 'react';
import { render } from 'react-dom';
import { AuthProvider } from './Auth/AuthContext';
import Header from './Header.jsx';
import SplashContainer from './Splash/SplashContainer.jsx';
import Login from './Auth/Login.jsx';
import Profile from './Profile/Profile.jsx';
import '../stylesheets/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AOS from 'aos';
import '../../node_modules/aos/dist/aos.css';

class App extends Component {
  constructor() {
    super()

  }
  componentWillMount() {

  }

  render() {
    AOS.init({
      once: true
    });
    return (
      <AuthProvider>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={SplashContainer} />
            <Route path="/dashboard" component={Profile} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
