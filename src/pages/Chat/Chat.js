import React, { Component } from "react";
import './Chat.css';
import { Link } from 'react-router-dom';
import chat from '../../lib/chat-service';

export default class Chat extends Component {
  state = {
    message: '',
    messageList: [],
  }
  componentDidMount = () => {
    chat.getMessages(this.props.match.params.email)
    .then(( receivedMessages ) => {
      let messages = receivedMessages.data;
      console.log('messages: ', messages);
      let messageList = [];
      for(let i=0; i<messages.length; i++)
      {
        messageList.push(messages[i]);
      }
      document.querySelector("#name").value="";
      this.setState({ messageList, message: '' });
    })
    document.getElementById('intoView').scrollIntoView();
  }
  componentDidUpdate = () => {
    document.getElementById('intoView').scrollIntoView();
  }
  handleNewMessage = (e) => {
    e.preventDefault();
    let email = this.props.match.params.email;
    let message = this.state.message;
    chat.newMessage( email, message)
    .then((newMessage) => {
      var messageList = this.state.messageList;
      messageList.push(newMessage.data);
      document.querySelector("#name").value="";
      this.setState({ messageList, message: '' });
    })
  }
  handleOnChange = (e) => {
    this.setState({message: e.target.value});
  }
  render() {
    
    return (
      <div>
        <div className="chat">
          <div className="name">Pepe</div>
          <div className="messages">
            {
              this.state.messageList.map((message, index) => {
                let side = message.user === this.props.user._id ? 'right' : 'left';
                // let side = this.props.user;
                console.log('this.props.user: ', this.props.user);
                side += ' message';
                return (
                 
                  <div className={side} key={index}>
                    {message.text}
                    {/* <small>{message.}</small> */}
                  </div>
                );
              })
            }
          </div>
          <div id="intoView"></div>
          <div className="send-form">
            <Link to='/chats' className="back-button">
              <i className="fas fa-chevron-left" />
            </Link>
            <form onSubmit={this.handleNewMessage} action="">
              <input type="text" name="message" onChange={this.handleOnChange} id="name"/>
              <button className="send-button">
                <i className="fas fa-chevron-circle-right" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
