import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ChatListElement from "../components/ChatListElement/ChatListElement";
import chat from '../lib/chat-service';
import helpers from '../helpers';
import { withAuth } from './AuthProvider';
import socketManagerClient from "../socketManagerClient";
import { NEW_CHAT, MESSAGE_RECEIVED } from '../Events';

const style = {
  container: {
    backgroundColor: 'transparent',
    color: '#fcf4cd',
    width: '100%',
    padding: '30px 0',
    paddingBottom: '90px',
  },
  noChats:
  {
    color: '#333333',
    textAlign: 'center',
    marginTop: '150px',
  }
}

class ChatList extends Component {
  state = {
    chatList: [],
  }
  getChatList = () => {
    chat.getList()
    .then(chats => {
      var chatArray = [];
      if(chats.data.chats)
      {
        chats.data.chats.forEach((chatElement) => {
          let user = chatElement.user1.email === this.props.user.email ? chatElement.user2 : chatElement.user1;
          let chatObject = {
            name: (user.idUser.userName ? user.idUser.userName : user.email),
            lastDate: helpers.dateChatFormat(chatElement.dateLastMessage),
            num: '',
            email: user.email,
            idChat: chatElement._id,
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
  printList = () => {
    if(this.state.chatList.length > 0)
    {
      var listArray = [];
      this.state.chatList.map((element, index) => {
        let path = `/chats/${element.email}`;
        listArray.push(<Link to={path} key={index}>
          <ChatListElement
            element={element}
          />
        </Link>);
        return '';
      })
      return listArray;
    }
    else
    {
      return(<p style={style.noChats}>Sorry! You have no chats...</p>);
    }
  }
  componentDidMount = () => {
    socketManagerClient.initSocketUser(this.props.user._id);
    let socket = socketManagerClient.getSocket();
    this.getChatList();
    socket.on(NEW_CHAT, ()=>{
      this.getChatList();
    });
    socket.on(MESSAGE_RECEIVED, (fromUserMail) => {
      this.getChatList(fromUserMail);
    })
  }
  render() {
    return (
      <div className="chats-container" style={style.container}>
        {this.printList()}
      </div>
    )
  }
}

export default withAuth()(ChatList);