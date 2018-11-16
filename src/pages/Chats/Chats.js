import React, { Component } from "react";
import { withAuth } from "../../components/AuthProvider";
import "./Chats.css";
import socketManagerClient from "../../socketManagerClient";
import { NEW_USER } from '../../Events';
import LogoHeader from "../../components/LogoHeader";
import ChatList from "../../components/ChatList";
import ButtonWrapper from "../../components/ButtonWrapper";

class Chats extends Component {
  hideModal = () => {
    if(document.querySelector('.modal-backdrop')) document.querySelector('.modal-backdrop').classList.remove('show');
  }
  componentDidUpdate = () => {
    this.hideModal();
  }
  componentDidMount = () => {
    this.hideModal();
    // socketManagerClient.initSocketUser(this.props.user._id);
    // let socket = socketManagerClient.getSocket();
    // socket.on(NEW_USER, (msg)=>{});
  }

  render() {
    return (
      <div className="chats">
        <LogoHeader />
        <ChatList/>
        <ButtonWrapper history = {this.props.history}/>
      </div> 
    );
  }
}

export default withAuth()(Chats);
