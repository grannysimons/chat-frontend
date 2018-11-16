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
    console.log('handleFormSubmit');
    event.preventDefault();
    const { email, password } = this.state;
    document.querySelector('.login input#email').style.border = 'solid 2px transparent';
    document.querySelector('.login input#password').style.border = 'solid 2px transparent';

    if(email === '' || password === '')
    {
      if(email === '')
      {
        document.querySelector('.login input#email').style.border = 'solid 2px red';
      } 
      if(password === '')
      {
        document.querySelector('.login input#password').style.border = 'solid 2px red';
      }
      this.setState({ errorMessage: 'Ooops! fields should not be empty...'});  
      return;
    }

    auth
      .login({ email, password })
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
      .catch(error => {
        this.setState({ errorMessage: 'Ooops! ' + error.message });
      });
  };

  handleChange = event => {
    console.log('handleChange');
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login">
        <div className="container-inner">
          <div className="logo">
            <img src={logo} alt="txat app" />
          </div>
          <h1>Login</h1>
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
