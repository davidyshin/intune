import React, { Component } from 'react';
import { render } from 'react-dom';
import { AuthProvider } from './Auth/AuthContext';
import Header from './Header.jsx'
import SplashContainer from './Splash/SplashContainer.jsx'
import Login from './Auth/Login.jsx'
import SignUp from './Auth/SignUp.jsx'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="App">
          <Header />
        </div>
        <Switch>
          <Route exact path="/" component={SplashContainer} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />  
        </Switch>
      </AuthProvider>
    );
  }
}

export default App;
