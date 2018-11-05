import React, { Component } from 'react'
import socketManagerClient from "../socketManagerClient";
import { TYPING, STOPPED_TYPING } from "../Events";

export default class Typing extends Component {
  state = {
    typing: false,
  }
  componentDidMount = () => {
    socketManagerClient.initSocketUser(this.props.user._id);
    let socket = socketManagerClient.getSocket();
    socket.on(TYPING, fromUserId => {
      this.setState({ typing: true });
    });
    socket.on(STOPPED_TYPING, fromUserId => {
      this.setState({ typing: false });
    });
  }
  
  render() {
    return (
      <div className="typing">
      {
        this.state.typing ? <div className="typingAnimation"><div className="ball ball1"></div><div className="ball ball2"></div><div className="ball ball3"></div></div> : ''
      }
      </div>
    )
  }
}