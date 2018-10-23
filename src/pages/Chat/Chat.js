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
    console.log("componentdidmount");
    chat.getMessages(this.props.match.params.email)
    .then(( receivedMessages ) => {
      let messages = receivedMessages.data;
      console.log('messages: ', messages);
      let messageList = [];
      for(let i=0; i<messages.length; i++)
      {
        messageList.push(messages[i].text);
      }
      this.setState({ messageList, message: '' });
    })
    document.getElementById('intoView').scrollIntoView();
  }
  componentDidUpdate = () => {
    // this.hideModal()
    document.getElementById('intoView').scrollIntoView();
  }
  handleNewMessage = (e) => {
    e.preventDefault();
    let email = this.props.match.params.email;
    let message = this.state.message;
    chat.newMessage( email, message)
    .then((newMessage) => {
      var messageList = this.state.messageList;
      messageList.push(newMessage.data.text);
      this.setState({ messageList, message: 'www' });

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
                return (
                  <div className="left message" key={index}>
                    {message}
                  </div>
                );
              })
            }
            {/* <div className="left message">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              explicabo atque deserunt tempora dolore, ducimus non numquam et
              ut, eligendi quasi doloremque nostrum. Est accusamus eveniet
              nesciunt pariatur doloremque autem.
            </div>
            <div className="left message">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              explicabo atque deserunt tempora dolore, ducimus non numquam et
              ut.
            </div>
            <div className="right message">
              Ipsam explicabo atque deserunt tempora dolore, ducimus non numquam
              et ut, eligendi quasi doloremque nostrum. Est accusamus eveniet
              nesciunt pariatur doloremque autem.
            </div>
            <div className="left message">Lorem.</div>
            <div className="right message">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              explicabo atque deserunt tempora dolore, ducimus non numquam et
              ut, eligendi quasi doloremque nostrum. Est accusamus eveniet
              nesciunt pariatur doloremque autem.
            </div>
            <div className="right message">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              explicabo atque deserunt tempora dolore, ducimus non numquam
            </div>
            <div className="right message">
              Lorem, ipsum dolor sit amet consectetur
            </div>
            <div className="right message">Lorem, ipsum dolor sit</div> */}
          </div>
          <div id="intoView"></div>
          <div className="send-form">
            <Link to='/chats' className="back-button">
              <i className="fas fa-chevron-left" />
            </Link>
            <form onSubmit={this.handleNewMessage} action="">
              <input type="text" name="message" onChange={this.handleOnChange}/>
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
