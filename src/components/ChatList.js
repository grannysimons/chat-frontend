import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ChatListElement from "../components/ChatListElement/ChatListElement";
import chat from '../lib/chat-service';
import helpers from '../helpers';
import { withAuth } from './AuthProvider';
import socketManagerClient from "../socketManagerClient";
import { NEW_CHAT, MESSAGE_RECEIVED, NEW_MESSAGES } from '../Events';

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
    newChats: [],
  }
  getChatList = () => {
    chat.getList()
    .then(chats => {
      var chatArray = [];
      if(chats.data.chats)
      {
        console.log('chats: ',chats);
        chats.data.chats.forEach((chatElement) => {
          console.log('chatElem: ', chatElement);
          console.log('chatElement.user1.email: ', chatElement.user1.email);
          console.log('this.props.user.email: ', this.props.user.email);
          let user = chatElement.user1.email === this.props.user.email ? chatElement.user2 : chatElement.user1;
          console.log('user: ', user);
          let chatObject = {
            name: (user.idUser.userName ? user.idUser.userName : user.email),
            lastDate: helpers.dateChatFormat(chatElement.dateLastMessage),
            num: '',
            email: user.email,
            idChat: chatElement._id,
            // notSeen: chatElement.dateLastMessage > user.lastSeen ? true : false,
          }
          console.log('chatObject ', chatObject);
          console.log('dateLastMessage ', chatElement.dateLastMessage);
          console.log('lastSeen ', user.lastSeen);
          chatArray.push(chatObject);
        });
      }
      else
      {
        console.log('Chats.js - getChatList - error: ', chats.data.error);
      }
      this.setState({ chatList: chatArray});
    })
  }
  printList = () => {
    if(this.state.chatList.length > 0)
    {
      var listArray = [];
      this.state.chatList.map((element, index) => {
        console.log('element: ', element);
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
    socket.on(MESSAGE_RECEIVED, () => {
      this.getChatList();
    })
    socket.on(NEW_MESSAGES, (idChat)=>{
      console.log('new messages in chat: ', idChat);
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