import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Chats from './pages/Chats/Chats';
import Chat from './pages/Chat/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login/Login';
import AuthProvider from './components/AuthProvider';
import './App.css';

require('dotenv').config();

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Switch>
          <AnonRoute path="/signup" component={Signup} />
          <AnonRoute path="/login" component={Login} />
          <PrivateRoute path="/chats/:idChat" component={Chat} />
          <PrivateRoute path="/chats" component={Chats} />
          {/* <Route exact path="/" component={Login} /> */}
          {/* <PrivateRoute path="/logout" component={Login} /> */}
        </Switch>
      </AuthProvider>
    )
  }
}

export default App;


// window.location.pathname