import React, { Component } from 'react'
import './Profile.css';
import auth from "../../lib/auth-service";

export default class Profile extends Component {
  state = {
    pressedButton: {
      name: false,
      email: false,
      password: false,
      quote: false,
    },
    values: {
      name: 'Mariona Roca',
      email: 'mariona.roca@gmail.com',
      password: '1234',
      quote: 'surgiendo de la bla bla bla',
    }
  }
  componentDidMount = () => {
    auth.getProfileData()
    .then( userData  => {
      console.log('didmount: ', userData);
      this.setState({ values: {
        name: userData.name !== '' ? userData.name : '',
        email: userData.email !== '' ? userData.email : '',
        password: userData.password !== '' ? userData.password : '',
        quote: userData.quote !== '' ? userData.quote : '',
      }});
    });
  }
  changeValue = (e) => {
    let field = e.target.getAttribute('data-field');
    let values = this.state.values;
    let selector = 'input.'+field;
    values[field] = document.querySelector(selector).value;
    this.setState({ values });
  }
  buttonPressed = (e) => {
    let field = e.target.getAttribute('data-field');
    let pressedButton = {
      name: false,
      email: false,
      password: false,
      quote: false,
    }
    switch (field)
    {
      case "name":
        console.log('name');
        pressedButton.name = true;
      break;
      case "email":
        console.log('email');
        pressedButton.email = true;
      break;
      case "password":
        console.log('password');
        pressedButton.password = true;
      break;
      case "quote":
        console.log('quote');
        pressedButton.quote = true;
      break;
      default:
      break;
    }
    this.setState({ pressedButton });
  }
  printField = (field) => {
    let pressedButton = this.state.pressedButton;
    switch (field)
    {
      case "name":
        if (pressedButton.name === true) return (<input type="text" placeholder="Username" value={this.state.values[field]} onBlur={this.buttonPressed} onChange={this.changeValue} data-field="name" className="name"/>);
        else  return(<p className="description">{this.state.values[field]} <button className="name" type="button" onClick={this.buttonPressed} data-field="name"><i data-field="name" className="fas fa-pen"></i></button></p>);
      // break;
      case "email":
        if (pressedButton.email === true) return (<input type="email" placeholder="email" value={this.state.values[field]} onBlur={this.buttonPressed} onChange={this.changeValue} data-field="email" className="email"/>);
        else  return(<p className="description">{this.state.values[field]}<button className="email" type="button" onClick={this.buttonPressed} data-field="email"><i data-field="email" className="fas fa-pen"></i></button></p>);
      // break;
      case "password":
        if (pressedButton.password === true) return (<input type="password" placeholder="password" value={this.state.values[field]} onBlur={this.buttonPressed} onChange={this.changeValue} data-field="password" className="password"/>);
        else  return(<p className="description">{this.state.values[field]}<button className="name" password="button" onClick={this.buttonPressed} data-field="password"><i data-field="password" className="fas fa-pen"></i></button></p>);
      // break;
      case "quote":
        if (pressedButton.quote === true) return (<input type="textarea" placeholder="quote" value={this.state.values[field]} onBlur={this.buttonPressed} onChange={this.changeValue} data-field="quote" className="quote"/>);
        else  return(<p className="description">{this.state.values[field]}<button className="quote" type="button" onClick={this.buttonPressed} data-field="quote"><i data-field="quote" className="fas fa-pen"></i></button></p>);
      // break;
      default:
      break;
    }
  }
  render() {
    return (
      <div className="profile container">
        <div className="container-inner">
          <h1>Profile</h1>
          <p className="title">Username</p>
          {this.printField('name')}
          <p className="title">Mail</p>
          {this.printField('email')}
          <p className="title">Password</p>
          {this.printField('password')}
          <p className="title">Quote</p>
          {this.printField('quote')}

          <div className="log">
            {/* incorrect data */}
          </div>

          <form>
            <button>Delete account</button>
          </form>
        </div>
      </div>
    )
  }
}