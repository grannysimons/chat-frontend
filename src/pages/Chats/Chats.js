import React, { Component } from "react";
import { withAuth } from "../../components/AuthProvider";
import ChatListElement from "../../components/ChatListElement/ChatListElement";
import "./Chats.css";
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import chat from '../../lib/chat-service';

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
    this.hideModal();
    chat.getList()
    .then(chats => {
      var chatArray = [];
      chats.data.chats.forEach(chat => {
        console.log('chat.user1', chat.user1);
        console.log('this.props.user', this.props.user);
        let email = chat.user1.email === this.props.user.email ? chat.user2.email : chat.user1.email;
        let name = chat.user1.email === this.props.user.email ? chat.user2.idUser.userName : chat.user1.idUser.userName;
        console.log('name: ', name);
        console.log('email: ', email);
        let chatObject = {
          name,
          lastDate: '',//helpers.dateChatFormat(),
          num: '',
          email,
          idChat: chat._id,
        }
        chatArray.push(chatObject);
      });
      this.setState({ chatList: chatArray });
    })
  }
  goToChat = email => {
    this.props.history.push('/login');
  };
  handleNewChat = (email) => {
    chat.newChat( email )
    .then((newChat) => {
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
