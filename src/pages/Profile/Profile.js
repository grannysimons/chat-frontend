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
      name: '',
      email: '',
      password: '',
      uncryptedPassword : '',
      quote: '',
    }
  };
  componentDidMount = () => {
    auth.getProfileData()
    .then( userData  => {
      this.setState({ values: {
        name: userData.name !== '' ? userData.name : '',
        email: userData.email !== '' ? userData.email : '',
        password: userData.password !== '' ? userData.password : '',
        uncryptedPassword: userData.password !== '' ? userData.password : '',
        quote: userData.quote !== '' ? userData.quote : '',
      }});
    });
  }
  changeValue = (e) => {
    let field = e.target.getAttribute('data-field');
    let values = this.state.values;
    let selector = 'input.'+field;
    values[field] = document.querySelector(selector).value;
    if(field==='password')
    {
      values['uncryptedPassword'] = document.querySelector(selector).value;
    }
    this.setState({ values });
  }
  handlerInputPressed = (e) => {
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
        pressedButton.name = true;
      break;
      case "email":
        pressedButton.email = true;
      break;
      case "password":
        pressedButton.password = true;
      break;
      case "quote":
        pressedButton.quote = true;
      break;
      default:
      break;
    }
    this.setState({ pressedButton });
  }
  setChanges = (e) => {
    let field = e.target.getAttribute('data-field');
    let selector = 'input.'+field;
    let value = document.querySelector(selector).value;
    if(field==='password')
    {
      let values = this.state.values;
      values['uncryptedPassword'] = document.querySelector(selector).value;
      let passwordShown = '';
      for(let i=0; i<values['uncryptedPassword'].length; i++)
      {
        passwordShown += '* ';
      }
      values[field] = passwordShown;
      document.querySelector(selector).value = values['uncryptedPassword'];
    }
    auth.setProfileData({ field: this.state.pressedButton, value })
    .then(data => {
      this.props.setUser(data);
    })
  }
  printField = (field) => {
    let pressedButton = this.state.pressedButton;
    switch (field)
    {
      case "name":
        if (pressedButton.name === true) return (<input type="text" placeholder="Username" value={this.state.values[field]} onBlur={this.setChanges} onChange={this.changeValue} data-field="name" className="name"/>);
        else  return(<p className="description"><span className="value">{this.state.values[field]}</span><button className="name" type="button" onClick={this.handlerInputPressed} data-field="name"><i data-field="name" className="fas fa-pen"></i></button></p>);
      case "email":
        if (pressedButton.email === true) return (<input type="email" placeholder="email" value={this.state.values[field]} onBlur={this.setChanges} onChange={this.changeValue} data-field="email" className="email"/>);
        else  return(<p className="description"><span className="value">{this.state.values[field]}</span><button className="email" type="button" onClick={this.handlerInputPressed} data-field="email"><i data-field="email" className="fas fa-pen"></i></button></p>);
      case "password":
        if (pressedButton.password === true) return (<input type="password" placeholder="password" value={this.state.values['uncryptedPassword']} onBlur={this.setChanges} onChange={this.changeValue} data-field="password" className="password"/>);
        else  return(<p className="description"><span className="value">{this.state.values[field]}</span><button className="name" password="button" onClick={this.handlerInputPressed} data-field="password"><i data-field="password" className="fas fa-pen"></i></button></p>);
      case "quote":
        if (pressedButton.quote === true) return (<input type="textarea" placeholder="quote" value={this.state.values[field]} onBlur={this.setChanges} onChange={this.changeValue} data-field="quote" className="quote"/>);
        else  return(<p className="description"><span className="value">{this.state.values[field]}</span><button className="quote" type="button" onClick={this.handlerInputPressed} data-field="quote"><i data-field="quote" className="fas fa-pen"></i></button></p>);
      default:
      break;
    }
  }
  handleSubmit = () => {
    this.props.history.push('/sureDelete');
  }
  render() {
    return (
      <div className="profile container-fluid">
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

          <form className="delete-form" onSubmit={this.handleSubmit}>
            <button type="submit">Delete account</button>
          </form>
          <Link to='/chats' className="back-button">
            <i className="fas fa-chevron-left" />
          </Link>
        </div>
      </div>
    )
  }
}
