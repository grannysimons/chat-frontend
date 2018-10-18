import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import Chats from './pages/Chats';
import Signup from './pages/Signup';
import Login from './pages/Login/Login';
import AuthProvider from './components/AuthProvider';
import './App.css';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        {/* <Navbar /> */}
        <Switch>
          <AnonRoute path="/signup" component={Signup} />
          <AnonRoute path="/login" component={Login} />
          <PrivateRoute path="/chats" component={Chats} />
        </Switch>
      </AuthProvider>
    )
  }
}

export default App;
