import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';

class Signup extends Component {

  state = {
    email: "",
    password: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    console.log(email, ', ',password);
    auth.signup({ email, password })
      .then( (user) => {
        // this.setState({
        //     username: "",
        //     password: "",
        // });
        this.props.setUser(user)
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input type="text" name="email" value={email} onChange={this.handleChange}/>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <input type="submit" value="Signup" />
        </form>

        <p>Already have account? 
          <Link to={"/login"}> Login</Link>
        </p>

      </div>
    )
  }
}

export default Signup;