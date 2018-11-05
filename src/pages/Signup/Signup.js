import React, { Component } from "react";
// import { Link } from "react-router-dom";
import auth from "../../lib/auth-service";
import "./Signup.css";
import logo from '../../images/logo-light.png';

class Signup extends Component {
  state = {
    email: "",
    password: "",
    socket: null,
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    auth
      .signup({ email, password })
      .then(user => {
        this.props.setUser(user);
      })
      .catch(error => console.log(error));
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
                type="text"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="mail"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="password"
              />
              <p>
                <a href="http://localhost:3000/login">login</a>
              </p>
              <button type="submit">Signup</button>
            </form>
            <div className="log">
            {/* incorrect data */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
