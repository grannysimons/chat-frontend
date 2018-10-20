import React, { Component } from "react";
import auth from "../../lib/auth-service";
import "./Login.css";
// import { AuthConsumer } from '../components/AuthProvider';

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
        console.log('LOGIN user: ', user);
        this.props.setUser(user);
      })
      .catch(error => {
        this.setState({ errorMessage: 'Authentication error'});
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      // <form onSubmit={this.handleFormSubmit}>
      //   <label>Email:</label>
      //   <input type="text" name="email" value={email} onChange={this.handleChange}/>
      //   <label>Password:</label>
      //   <input type="password" name="password" value={password} onChange={this.handleChange} />
      //   <input type="submit" value="Login" />
      // </form>

      <div className="login">
        <div className="container-inner">
          <h1>Login</h1>
          <div className="logo">
            <i className="fas fa-cat" />
          </div>
          <div className="form">
            <form onSubmit={this.handleFormSubmit}>
              <input
                type="text"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="mail"
                // value="mariona.roca@gmail.com"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="password"
                // value="1234"
              />

              <p>
                <a href="http://localhost:3000/signup">sign up</a>
              </p>
              <button type="submit">Login</button>
            </form>
            <div className="log">
            {/* incorrect data */}
              {this.state.errorMessage}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
