import React, { Component } from "react";
import './Chat.css';
import { Link } from 'react-router-dom';
import chat from '../../lib/chat-service';
import helper from '../../helpers';
import io from 'socket.io-client';

const socketURL = 'http://localhost:3010';
export default class Chat extends Component {
  state = {
    message: '',
    messageList: [],
    interlocutor: '',
    socket: null,
  }
  // accessMic = () => {
  //   navigator.getUserMedia = ( navigator.getUserMedia ||
  //     navigator.webkitGetUserMedia ||
  //     navigator.mozGetUserMedia ||
  //     navigator.msGetUserMedia);
  //     navigator.getUserMedia (
  //     // constraints
  //     {
  //         video: true,
  //         audio: false
  //     },
  //     // successCallback
  //     function(localMediaStream) {
  //       const mediaSource = new MediaSource();
    
  //         var video = document.querySelector('video');
  //         // video.src = window.URL.createObjectURL(localMediaStream);
  //         try {
  //           video.srcObject = mediaSource;
  //         } catch (error) {
  //           video.src = URL.createObjectURL(localMediaStream);
  //         }
  //     },
  //     // errorCallback
  //     function(err) {
  //       console.log("Ocurrió el siguiente error: " + err);
  //     }
  //   );
  // }
  componentDidMount = () => {
    document.addEventListener('load', this.accessMic);

    chat.getMessages(this.props.match.params.email)
    .then(( receivedMessages ) => {
      let messages = receivedMessages.data.messages;
      let messageList = [];
      for(let i=0; i<messages.length; i++)
      {
        messageList.push(messages[i]);
      }
      document.querySelector("#name").value="";
      this.setState({ messageList, message: '' , interlocutor: receivedMessages.data.interlocutor ? receivedMessages.data.interlocutor : this.props.match.params.email});
    })
    document.getElementById('intoView').scrollIntoView();

    this.initSocket();
  }
  initSocket = () => {
    const socket = io(socketURL);
    socket.on('connect', ()=>{
      console.log('chat connected');
      socket.on('MESSAGE_SENT', (user, chatId)=>{
        console.log("s'ha rebut un missatge del ", user.userName);
      });
    });
    this.setState({ socket });
  }
  componentDidUpdate = () => {
    document.getElementById('intoView').scrollIntoView();
  }
  handleNewMessage = (e) => {
    e.preventDefault();
    let email = this.props.match.params.email;
    let message = this.state.message;
    if(message !== '')
    {
      chat.newMessage( email, message)
      .then((newMessage) => {
        var messageList = this.state.messageList;
        messageList.push(newMessage.data);
        document.querySelector("#name").value="";
        this.setState({ messageList, message: '' });
      })
    }
  }
  handleOnChange = (e) => {
    this.setState({message: e.target.value});
  }
  render() {
    
    return (
      <div>
            {/* <video></video> */}

        <div className="chat">
          <div className="name">
            <strong>{this.state.interlocutor.userName ? this.state.interlocutor.userName : this.state.interlocutor.email}</strong>
            <div className="quote"><small>{this.state.interlocutor.quote}</small></div>
          </div>
          <div className="messages">
            {
              this.state.messageList.map((message, index) => {
                let side = message.user === this.props.user._id ? 'right' : 'left';
                side += ' message';
                return (
                 
                  <div className={side} key={index}>
                    {message.text}
                    <div><small>{helper.dateChatFormat(message.time)}</small></div>
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
