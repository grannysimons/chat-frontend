import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';

class Navbar extends Component {
  render() {
    const { isLogged, user, logout } = this.props;
    const { email } = user;
    if (isLogged) {
      return <div>
        <p>email: { email }</p>
        <p onClick={logout}>Logout</p>
      </div>
    } else {
      return <div>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </div>
    }
  
  }
}

export default withAuth()(Navbar);