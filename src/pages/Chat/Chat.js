import React, { Component } from "react";
import "./Chat.css";
import { Link } from "react-router-dom";
import chat from "../../lib/chat-service";
import helper from "../../helpers";
import socketManagerClient from "../../socketManagerClient";
import { MESSAGE_RECEIVED, TYPING, STOPPED_TYPING } from "../../Events";
import Microphone from "../../Microphone";
import Recorder from 'react-mp3-recorder';
import ChatHeader from "../../components/ChatHeader";

export default class Chat extends Component {
  state = {
    message: "",
    messageList: [],
    interlocutor: "",
    typing: false,
  };
  getMessages = () => {
    chat.getMessages(this.props.match.params.email).then(receivedMessages => {
      let messages = receivedMessages.data.messages;
      let messageList = [];
      for (let i = 0; i < messages.length; i++) {
        messageList.push(messages[i]);
      }
      this.setState({
        messageList,
        message: "",
        interlocutor: receivedMessages.data.interlocutor
          ? receivedMessages.data.interlocutor
          : this.props.match.params.email
      });
    });
    document.getElementById("intoView").scrollIntoView();
  };

  componentDidMount = () => {
    this.getMessages();
    socketManagerClient.initSocketUser(this.props.user._id);
    let socket = socketManagerClient.getSocket();
    socket.on(MESSAGE_RECEIVED, fromUserId => {
      this.getMessages();
    });
    socket.on(TYPING, fromUserId => {
      this.setState({ typing: true });
    });
    socket.on(STOPPED_TYPING, fromUserId => {
      this.setState({ typing: false });
    });
  };

  componentDidUpdate = () => {
    document.getElementById("intoView").scrollIntoView();
    let total = document.querySelectorAll(".searchResult").length;
    document.querySelector(".numberOfCoincidences").innerHTML = total;
  };
  handleNewMessage = e => {
    e.preventDefault();
    let email = this.props.match.params.email; //destinatari
    let message = this.state.message;
    if (message !== "") {
      chat.newMessage(email, message, false)
      .then(newMessage => {
        var messageList = this.state.messageList;
        messageList.push(newMessage.data);
        document.querySelector("#name").value = "";

        this.setState({ messageList, message: "" });
      });
    }
  };
  handleOnChange = e => {
    this.setState({ message: e.target.value });
  };
  handleOnFocus = e => {
    let email = this.props.match.params.email;  //destinatari
    chat.typing(email);
  };
  handleOnBlur = () => {
    let email = this.props.match.params.email;  //destinatari
    chat.stoppedTyping(email);
  };

  deleteResultClasses = () => {
    let results = document.querySelectorAll(".searchResult");
    results.forEach(result => {
      if (result.getAttribute("class").indexOf("searchResult") !== -1) {
        result.classList.remove("searchResult");
      }
      if (result.getAttribute("class").indexOf("currentResult") !== -1) {
        result.classList.remove("currentResult");
      }
    });
  };

  handleSearchForm = e => {
    e.preventDefault();

    this.deleteResultClasses();

    let messageList = this.state.messageList;
    let searchValue = document.querySelector(".search-form input").value;
    if (searchValue === "") return;
    messageList.forEach(message => {
      message["searchResult"] = false;
      if (message.text.includes(searchValue)) {
        message["searchResult"] = true;
        document.querySelector(".numCoincidence").innerHTML = 1;
      }
    });
    document.querySelector(".results").style.display = "block";
    this.setState({ messageList });
  };

  handleSearchDown = e => {
    if (e) e.preventDefault();
    let results = document.querySelectorAll(".searchResult");
    let totalResults = results.length;
    var currentResultIndex = 0;
    results.forEach((result, index) => {
      if (result.getAttribute("class").indexOf("currentResult") !== -1) {
        currentResultIndex = index + 1;
        result.classList.remove("currentResult");
      }
    });
    let currentPosition =
      (parseInt(currentResultIndex) + 1) % totalResults === 0
        ? totalResults
        : (parseInt(currentResultIndex) + 1) % totalResults;
    document.querySelector(".numCoincidence").innerHTML = currentPosition;
    results[currentResultIndex % totalResults].classList.add("currentResult");
    window.scrollTo({
      top: document.querySelector(".currentResult").offsetTop - 170,
      behavior: "smooth"
    });
  };
  handleSearchUp = e => {
    if (e) e.preventDefault();
    let results = document.querySelectorAll(".searchResult");
    let totalResults = results.length;
    var currentResultIndex = 0;
    results.forEach((result, index) => {
      if (result.getAttribute("class").indexOf("currentResult") !== -1) {
        currentResultIndex = index - 1;
        if (currentResultIndex < 0) currentResultIndex += totalResults;
        result.classList.remove("currentResult");
      }
    });
    let currentPosition =
      (parseInt(currentResultIndex) + 1) % totalResults === 0
        ? totalResults
        : (parseInt(currentResultIndex) + 1) % totalResults;
    document.querySelector(".numCoincidence").innerHTML = currentPosition;
    results[currentResultIndex % totalResults].classList.add("currentResult");
    window.scrollTo({
      top: document.querySelector(".currentResult").offsetTop - 170,
      behavior: "smooth"
    });
  };
  handleRecording = () => {
    if (document.querySelector(".chat .send-form .recording").style.display !== "block") 
    {
      document.querySelector(".chat .send-form .recording").style.display = "block";
      Microphone.getAudio();
    }
  };
  handleStopRecording = () => {
    document.querySelector(".chat .send-form .recording").style.display = "none";
    Microphone.stop();
    Microphone.getRecordedAudio();
  };

  _onRecordingComplete = (blob) => {
    let email = this.props.match.params.email; //destinatari
    let message = '';
    chat.newMessage(email, message, true)
    .then(newMessage => {
      var messageList = this.state.messageList;
      messageList.push(newMessage.data);
      document.querySelector("#name").value = "";
      
      Microphone.sendData(blob, newMessage.data._id);
        this.setState({ messageList, message: "" });
      });
  }
 
  _onRecordingError = (err) => {
  }

  render() {
    return (
      <div>
        <div className="chat">
          <ChatHeader handleSearchForm={this.handleSearchForm} handleSearchUp={this.handleSearchUp} handleSearchDown={this.handleSearchDown} interlocutor = {this.state.interlocutor} messageList = {this.state.messageList}/>
          <div className="messages">
            {this.state.messageList.map((message, index) => {
              let side = message.user === this.props.user._id ? "right" : "left";
              let searchResult = message.searchResult === true ? " searchResult" : "";
              side += " message" + searchResult;
              return (
                <div className={side} key={index}>
                  {
                    message.isAudio ? 
                    <audio src={'http://localhost:3010/audios/' + message._id + '.wav'} controls>
                       Your browser does not support the <code>audio</code> element.
                    </audio>
                    : message.text
                  }
                  <div>
                    <small>{helper.dateChatFormat(message.time)}</small>
                  </div>
                </div>
              );
            })}
          </div>
          <div id="intoView" />
          <div className="send-form">
            <div className="typing">
            {
              this.state.typing ? <div className="typingAnimation"><div className="ball ball1"></div><div className="ball ball2"></div><div className="ball ball3"></div></div> : ''
            }
            </div>
            <div className="controllers">
              <Link to="/chats" className="back-button">
                <i className="fas fa-chevron-left" />
              </Link>
              <form onSubmit={this.handleNewMessage} action="" id="sendingMessages" encType="multipart/form-data">
                <input
                  type="text"
                  name="message"
                  onChange={this.handleOnChange}
                  onFocus={this.handleOnFocus}
                  onBlur={this.handleOnBlur}
                  id="name"
                />
                <Recorder
              onRecordingComplete={this._onRecordingComplete}
              onRecordingError={this._onRecordingError}
            />
                <button className="send-button">
                  <i className="fas fa-chevron-circle-right" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
