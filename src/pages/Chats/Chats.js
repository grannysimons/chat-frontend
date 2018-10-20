import React, { Component } from "react";
import { withAuth } from "../../components/AuthProvider";
import ChatListElement from "../../components/ChatListElement/ChatListElement";
import "./Chats.css";
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import chat from '../../lib/chat-service';
import auth from '../../lib/auth-service';
// import ModalButton from '../../components/ModalButton';

class Chats extends Component {
  state = {
    chatList: [
      {
        name: "Pepe",
        lastDate: "9/10/18 14:03",
        num: "2",
        email: "Pepe@Pepe.com"
      },
      {
        name: "Maria",
        lastDate: "9/10/18 11:24",
        num: "5",
        email: "Maria@Maria.com"
      },
      {
        name: "Joan",
        lastDate: "8/10/18 22:41",
        num: "1",
        email: "Joan@Joan.com"
      }
    ]
  };
  componentDidMount = () => {
    console.log('componentDidMount!');
    auth.me()
    .then(user => {
      if(user)
      {
        chat.getList()
        .then(chats => {
          var chatArray = [];
          chats.data.chats.forEach(chat => {
            console.log('chat: ', chat);
            let name = chat.user1 === user.email ? chat.user2 : chat.user1;
            let chatObject = {
              name: name,
              lastDate: '',
              num: '',
              email: name
            }
            chatArray.push(chatObject);
          });
          console.log('chatList: ', chatArray);
          this.setState({ chatList: chatArray });
        })
      }
      else
      {
        console.log('not logged!!');
      }
    })
    //2. base de dades per recuperar les converses en les que he participat (chats/getChats(email))
    //3. 
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
      // $('#myModal').modal('hide')
    })
    // this.props.history.push();
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
              <Link to={path} key={index}><ChatListElement
                element={element}
                key={index}
                // goToChat={() => {
                //   this.goToChat(element.email);
                // }}
              />
              </Link>
            );
          })}
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

// export default withAuth()(Chats);
export default withAuth()(Chats);
