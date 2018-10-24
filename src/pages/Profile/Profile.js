import React, { Component } from 'react'
import './Profile.css';
import auth from "../../lib/auth-service";
import { Link } from 'react-router-dom';

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
  };
  componentDidMount = () => {
    auth.getProfileData()
    .then( userData  => {
      console.log('userData: ', userData);
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
    let change = true;
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
        change = false;
      break;
    }
    if(change === true)
    {
      let selector = 'input.'+field;
      let value = document.querySelector(selector).value;
      console.log(selector, ', ', value);
    }
    
    // auth.setProfileData({ pressedButton, value })
    // .then(data => {
    //   this.setState({ pressedButton });
    // })
  }
  printField = (field) => {
    let pressedButton = this.state.pressedButton;
    switch (field)
    {
      case "name":
        if (pressedButton.name === true) return (<input type="text" placeholder="Username" value={this.state.values[field]} onBlur={this.buttonPressed} onChange={this.changeValue} data-field="name" className="name"/>);
        else  return(<p className="description"><span className="value">{this.state.values[field]}</span><button className="name" type="button" onClick={this.buttonPressed} data-field="name"><i data-field="name" className="fas fa-pen"></i></button></p>);
      // break;
      case "email":
        if (pressedButton.email === true) return (<input type="email" placeholder="email" value={this.state.values[field]} onBlur={this.buttonPressed} onChange={this.changeValue} data-field="email" className="email"/>);
        else  return(<p className="description"><span className="value">{this.state.values[field]}</span><button className="email" type="button" onClick={this.buttonPressed} data-field="email"><i data-field="email" className="fas fa-pen"></i></button></p>);
      // break;
      case "password":
        if (pressedButton.password === true) return (<input type="password" placeholder="password" value={this.state.values[field]} onBlur={this.buttonPressed} onChange={this.changeValue} data-field="password" className="password"/>);
        else  return(<p className="description"><span className="value">{this.state.values[field]}</span><button className="name" password="button" onClick={this.buttonPressed} data-field="password"><i data-field="password" className="fas fa-pen"></i></button></p>);
      // break;
      case "quote":
        if (pressedButton.quote === true) return (<input type="textarea" placeholder="quote" value={this.state.values[field]} onBlur={this.buttonPressed} onChange={this.changeValue} data-field="quote" className="quote"/>);
        else  return(<p className="description"><span className="value">{this.state.values[field]}</span><button className="quote" type="button" onClick={this.buttonPressed} data-field="quote"><i data-field="quote" className="fas fa-pen"></i></button></p>);
      // break;
      default:
      break;
    }
  }
  render() {
    return (
      <div className="profile container">
        <div className="container-inner">
          <div className="user-data">
            <h1>Profile</h1>
            <p className="title">Username</p>
            {this.printField('name')}
            <p className="title">Mail</p>
            {this.printField('email')}
            <p className="title">Password</p>
            {this.printField('password')}
            <p className="title">Quote</p>
            {this.printField('quote')}
          </div>
          <div className="log">
            {/* incorrect data */}
          </div>

          <form className="delete-form">
            <button>Delete account</button>
          </form>
          <Link to='/chats' className="back-button">
            <i className="fas fa-chevron-left" />
          </Link>
        </div>
      </div>
    )
  }
}
