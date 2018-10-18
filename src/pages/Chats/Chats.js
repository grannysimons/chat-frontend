import React, { Component } from "react";
import { withAuth } from "../../components/AuthProvider";
import ChatListElement from "../../components/ChatListElement/ChatListElement";
import "./Chats.css";
import { Link } from 'react-router-dom';

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
    //1. Miro qui soc (/auth/me)
    //2. base de dades per recuperar les converses en les que he participat (chats/getChats(email))
    //3. 
  }
  goToChat = email => {
    console.log("goToChat: ", email);
    this.props.history.push('/login');
  };
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
          <button className="button new-chat">
            <i className="fas fa-plus-circle" />
          </button>
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
