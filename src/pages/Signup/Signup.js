import React, { Component } from "react";
// import { Link } from "react-router-dom";
import auth from "../../lib/auth-service";
import "./Signup.css";
import logo from '../../images/logo.png';

class Signup extends Component {
  state = {
    email: "",
    password: "",
    socket: null,
    errorMessage: "",
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;
    document.querySelector('.signup input#email').style.border = 'solid 2px transparent';
    document.querySelector('.signup input#password').style.border = 'solid 2px transparent';

    if(email === '' || password === '')
    {
      if(email === '')
      {
        document.querySelector('.signup input#email').style.border = 'solid 2px red';
      } 
      if(password === '')
      {
        document.querySelector('.signup input#password').style.border = 'solid 2px red';
      }
      this.setState({ errorMessage: 'Ooops! fields should not be empty...'});  
      return;
    }


    auth
      .signup({ email, password })
      .then(user => {
        if(user.error)
        {
          this.setState({ errorMessage: 'Ooops! ' + user.error });
        }
        else
        {
          this.props.setUser(user);
        }
      })
      .catch((error) => {
        this.setState({ errorMessage: 'Ooops! ' + error.message });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="signup container-fluid">
        <div className="container-inner">
          <div className="logo">
            <img src={logo} alt="txat app" />
          </div>
          <h1>Signup</h1>
          <div className="form">
            <form onSubmit={this.handleFormSubmit}>
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="mail"
                id="email"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="password"
                id="password"
              />
              <p>
                {/* <a href="http://localhost:3000/login">login</a> */}
                <a href={process.env.REACT_APP_PUBLIC_URL + '/login'}>login</a>
              </p>
              <button type="submit">Signup</button>
            </form>
            <div className="log">
              {this.state.errorMessage}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
