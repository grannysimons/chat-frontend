import React, { Component } from "react";
// import { Link } from "react-router-dom";
import auth from "../../lib/auth-service";
import "./Signup.css";

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
      // <div>
      //   <form onSubmit={this.handleFormSubmit}>
      //     <label>Email:</label>
      //     <input type="text" name="email" value={email} onChange={this.handleChange}/>
      //     <label>Password:</label>
      //     <input type="password" name="password" value={password} onChange={this.handleChange} />
      //     <input type="submit" value="Signup" />
      //   </form>

      //   <p>Already have account?
      //     <Link to={"/login"}> Login</Link>
      //   </p>

      // </div>

      <div className="signup container">
        <div className="container-inner">
          <h1>Signup</h1>
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
