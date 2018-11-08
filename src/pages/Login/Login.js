import React, { Component } from "react";
import auth from "../../lib/auth-service";
import "./Login.css";
import logo from '../../images/logo.png';
import env from '../../env';

class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    auth
      .login({ email, password })
      .then(user => {
        this.props.setUser(user);
      })
      .catch(error => {
        this.setState({ errorMessage: 'Ooops! An error happened: ' + error });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login">
        <div className="container-inner">
          <div className="logo">
            {/* <i className="fas fa-cat" /> */}
            <img src={logo} alt="txat app" />
          </div>
          <h1>Login</h1>
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
                {/* <a href="http://localhost:3000/signup">sign up</a> */}
                {/* <a href={process.env.REACT_APP_PUBLIC_URL + '/signup'}>sign up</a> */}
                <a href={env.REACT_APP_PUBLIC_URL + '/signup'}>sign up</a>
              </p>
              <button type="submit">Login</button>
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

export default Login;
