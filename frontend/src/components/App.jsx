import React, { Component } from 'react';
import { render } from 'react-dom';
import { AuthProvider } from './Auth/AuthContext';
import Header from './Header.jsx'
import AuthContainer from './Auth/AuthContainer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="App">
          <Header />
        </div>
        <Switch>
          <Route path="/login" component={AuthContainer} />
          <Route path="/signup" component={AuthContainer} />          
        </Switch>
      </AuthProvider>
    );
  }
}

export default App;
