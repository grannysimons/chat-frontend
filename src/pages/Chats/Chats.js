import React, { Component } from "react";
import { withAuth } from "../../components/AuthProvider";
import ChatListElement from "../../components/ChatListElement/ChatListElement";
import "./Chats.css";
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import chat from '../../lib/chat-service';
import helpers from '../../helpers';

class Chats extends Component {
  state = {
    chatList: [
      // {
      //   name: "Pepe",
      //   lastDate: "9/10/18 14:03",
      //   num: "2",
      //   email: "Pepe@Pepe.com"
      // },
      // {
      //   name: "Maria",
      //   lastDate: "9/10/18 11:24",
      //   num: "5",
      //   email: "Maria@Maria.com"
      // },
      // {
      //   name: "Joan",
      //   lastDate: "8/10/18 22:41",
      //   num: "1",
      //   email: "Joan@Joan.com"
      // }
    ]
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
    console.log('componentDidMount!');
    this.hideModal();
    chat.getList()
    .then(chats => {
      var chatArray = [];
      chats.data.chats.forEach(chat => {
        // console.log('chat: ', chat);
        let email = chat.user1.email === this.props.user.email ? chat.user2.email : chat.user1.email;
        let name = chat.user1.email === this.props.user.email ? chat.user2.idUser.name : chat.user1.idUser.name;
        // let lastSeen =
        let chatObject = {
          name,
          lastDate: '',//helpers.dateChatFormat(),
          num: '',
          email,
          idChat: chat._id,
        }
        chatArray.push(chatObject);
      });
      console.log('chatList: ', chatArray);
      this.setState({ chatList: chatArray });
    })
  }
  goToChat = email => {
    console.log("goToChat: ", email);
    this.props.history.push('/login');
  };
  handleNewChat = (email) => {
    console.log('newChat');
    chat.newChat( email )
    .then((newChat) => {
      console.log('newChat: ', newChat);
      this.props.history.push('/chats/email');
    })
  }
  render() {
    return (
      <div className="chats">
        <form className="search-form">
          <input type="text" />
          <button>
            <i className="fas fa-search" />
          </button>
        </form>
        <div className="chats-container">
          {this.state.chatList.map((element, index) => {
            console.log('!!! element: ',element);
            let path = `/chats/${element.idChat}`;
            console.log('path: ',path);
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
          <button className="button profile">
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
        </div>
      </div>
    );
  }
}

export default withAuth()(Chats);
