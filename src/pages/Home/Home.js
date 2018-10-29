import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT, TYPING } from '../../Events';

const socketUrl = 'http://localhost:3010';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket:null,
      user: null,
    }
  }

  componentDidMount = () => {
    this.initSocket();
    // io.on('TYPING', ()=>{
    //   console.log("event typing de servidor a client");
    // });
  }
  

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('Connected');
    })
    this.setState({ socket });
  }

  setUser = (user) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  }

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  }

  enviarMissatgeHandler = () => {
    console.log('enviarMissatgeHandler');
    const { socket } = this.state;
    socket.on('TYPING', ()=>{
      console.log("event typing de servidor a client");
    });
    socket.on('BU', ()=>{
      console.log("event BU de servidor a client");
    });
    socket.emit(TYPING, ()=>{
      console.log('typing!');
    });
    socket.emit('HOLA', ()=>{
      console.log("enviat event hola!");
    });
  }

  render() {
    const { title } = this.props;
    return (
      <div>
        <div>{title}</div>
        <button onClick={this.enviarMissatgeHandler}>Enviar missatge</button>
      </div>
    )
  }
}
