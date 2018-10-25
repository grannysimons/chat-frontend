import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Chats from './pages/Chats/Chats';
import Chat from './pages/Chat/Chat';
import Profile from './pages/Profile/Profile';
import Signup from './pages/Signup/Signup';
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
          {/* <Route path="/" component={Login} /> */}
          <PrivateRoute path="/chats/:email" component={Chat} />
          <PrivateRoute path="/chats/:email/send" component={Chat} />
          <PrivateRoute path="/chats" component={Chats} />
          <PrivateRoute path="/profile" component={Profile} />
          {/* <Route exact path="/" component={Login} /> */}
          {/* <PrivateRoute path="/logout" component={Login} /> */}
        </Switch>
      </AuthProvider>
    )
  }
}

export default App;


// window.location.pathname