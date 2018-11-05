import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Chats from './pages/Chats/Chats';
import Chat from './pages/Chat/Chat';
import Profile from './pages/Profile/Profile';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import AuthProvider from './components/AuthProvider';
import SureDelete from "./pages/SureDelete/SureDelete";
import './App.css';

require('dotenv').config();

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Switch>
          <AnonRoute path="/signup" component={Signup} />
          <PrivateRoute path="/chats/:email" component={Chat} />
          <PrivateRoute path="/chats/:email/send" component={Chat} />
          <PrivateRoute path="/chats" component={Chats} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/sureDelete" component={SureDelete} />
          <AnonRoute path="/" component={Login} />
        </Switch>
      </AuthProvider>
    )
  }
}

export default App;