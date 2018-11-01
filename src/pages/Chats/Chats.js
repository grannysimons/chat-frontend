import React, { Component } from "react";
import { withAuth } from "../../components/AuthProvider";
import ChatListElement from "../../components/ChatListElement/ChatListElement";
import "./Chats.css";
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import chat from '../../lib/chat-service';
import helpers from '../../helpers';
import socketManagerClient from "../../socketManagerClient";
import { NEW_USER, NEW_CHAT, MESSAGE_RECEIVED } from '../../Events';

class Chats extends Component {
  state = {
    chatList: [],
  };
  hideModal = () => {
    if(document.querySelector('.modal-backdrop')) 
    {
      document.querySelector('.modal-backdrop').classList.remove('show');
    }
  }
  componentDidUpdate = () => {
    this.hideModal();
  }
  componentDidMount = () => {
    // console.log('chats didmount');
    this.hideModal();
    socketManagerClient.initSocketUser(this.props.user._id);
    let socket = socketManagerClient.getSocket();
    socket.on(NEW_USER, (msg)=>{
      console.log('NEW_USER received', msg);
    });
    socket.on(NEW_CHAT, ()=>{
      this.getChatList();
    });
    socket.on(MESSAGE_RECEIVED, () => {
      console.log('MESSAGE_RECEIVED');
      this.getChatList();
    })

    this.getChatList();
  }
  getChatList = () => {
    chat.getList()
    .then(chats => {
      var chatArray = [];
      console.log('chats: ',chats);
      if(chats.data.chats)
      {
        chats.data.chats.forEach(chat => {
          let user = chat.user1.email === this.props.user.email ? chat.user2 : chat.user1;
          let chatObject = {
            name: (user.idUser.userName ? user.idUser.userName : user.email),
            lastDate: helpers.dateChatFormat(chat.dateLastMessage),
            num: '',
            email: user.email,
            idChat: chat._id,
          }
          chatArray.push(chatObject);
        });
      }
      else
      {
        console.log('Chats.js - getChatList - error: ', chats.data.error);
      }
      this.setState({ chatList: chatArray });
    })
  }
  goToChat = email => {
    this.props.history.push('/login');
  };
  handleNewChat = (email) => {
    chat.newChat( email , this.props.user._id)
    .then((newChat) => {
      this.props.history.push('/chats/' + email);
    })
  }
  handlerProfile = () => {
    this.props.history.push('/profile');
  }
  render() {
    return (
      <div className="chats">
        <div className="chats-container">
          {this.state.chatList.map((element, index) => {
            let path = `/chats/${element.email}`;
            return (
              <Link to={path} key={index}>
                <ChatListElement
                  element={element}
                />
              </Link>
            );
          })}
          {this.state.chatList.length === 0 && <p>Sorry! You have no chats...</p>}
        </div>
        <div className="buttons">
          <button className="button profile" onClick={this.handlerProfile}>
            <i className="fas fa-user" />
          </button>
          <Modal buttonClass='fa-plus-circle' title="new Chat" onSubmitHandler={this.handleNewChat}>
          <form>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          </Modal>
          <button onClick={this.props.logout} className="button logout">
            <i className="fas fa-sign-out-alt" />
          </button>
          <div className="greeting">Hi, <strong>{this.props.user.userName ? this.props.user.userName : this.props.user.email}</strong>!</div>
        </div>
      </div> 
    );
  }
}

export default withAuth()(Chats);
