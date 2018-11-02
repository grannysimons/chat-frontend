import React, { Component } from "react";
import "./Chat.css";
import { Link } from "react-router-dom";
import chat from "../../lib/chat-service";
import helper from "../../helpers";
import socketManagerClient from "../../socketManagerClient";
import { MESSAGE_RECEIVED } from "../../Events";
import Microphone from "../../Microphone";

// import io from 'socket.io-client';
// import ReactDOM from 'react-dom';

// const socketURL = 'http://localhost:3010';
// const socket = io(socketURL);

export default class Chat extends Component {
  state = {
    message: "",
    messageList: [],
    interlocutor: ""
    // socket: null,
  };
  getMessages = () => {
    chat.getMessages(this.props.match.params.email).then(receivedMessages => {
      let messages = receivedMessages.data.messages;
      let messageList = [];
      for (let i = 0; i < messages.length; i++) {
        messageList.push(messages[i]);
      }
      document.querySelector("#name").value = "";
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
    // document.addEventListener('load', this.accessMic);
    this.getMessages();
    // this.initSocket();
    socketManagerClient.initSocketUser(this.props.user._id);
    let socket = socketManagerClient.getSocket();
    socket.on(MESSAGE_RECEIVED, fromUserId => {
      this.getMessages();
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
      chat.newMessage(email, message).then(newMessage => {
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
  handleOnBlur = () => {};

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
    // if(results > 0 )
    // {
    results[currentResultIndex % totalResults].classList.add("currentResult");
    window.scrollTo({
      top: document.querySelector(".currentResult").offsetTop - 170,
      behavior: "smooth"
    });
    // }
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
    // if(results > 0 )
    // {
    results[currentResultIndex % totalResults].classList.add("currentResult");
    window.scrollTo({
      top: document.querySelector(".currentResult").offsetTop - 170,
      behavior: "smooth"
    });
    // }
  };
  handleCloseButton = () => {
    this.deleteResultClasses();
    document.querySelector(".search-form .results").style.display = "none";
    document.querySelector(".search-form input").value = "";
    document.getElementById("intoView").scrollIntoView({ behavior: "smooth" });
  };
  handleRecording = () => {
    if (
      document.querySelector(".chat .send-form .recording").style.display !==
      "block"
    ) {
      document.querySelector(".chat .send-form .recording").style.display =
        "block";
      Microphone.getAudio();
    }
    console.log("handleRecording");
  };
  handleStopRecording = () => {
    document.querySelector(".chat .send-form .recording").style.display =
      "none";
    Microphone.stop();
    console.log("handleStopRecording");
  };
  render() {
    return (
      <div>
        {/* <video></video> */}

        <div className="chat">
          <div className="name">
            <strong>
              {this.state.interlocutor.userName
                ? this.state.interlocutor.userName
                : this.state.interlocutor.email}
            </strong>
            <div className="quote">
              <small>{this.state.interlocutor.quote}</small>
            </div>
            <form className="search-form" onSubmit={this.handleSearchForm}>
              <input type="text" />
              <button type="submit">
                <i className="fas fa-search" />
              </button>
              <div className="results">
                <button
                  type="button"
                  className="close-button"
                  onClick={this.handleCloseButton}
                >
                  <i className="far fa-window-close" />
                </button>
                <span className="numCoincidence" />
                <span className="textCoincidence"> of </span>
                <span className="numberOfCoincidences" />
                <span className="controller">
                  <button type="button" onClick={this.handleSearchUp}>
                    <i className="fas fa-sort-up" />
                  </button>
                  <button type="button" onClick={this.handleSearchDown}>
                    <i className="fas fa-sort-down" />
                  </button>
                </span>
              </div>
            </form>
          </div>
          <div className="messages">
            {this.state.messageList.map((message, index) => {
              let side =
                message.user === this.props.user._id ? "right" : "left";
              let searchResult =
                message.searchResult === true ? " searchResult" : "";
              side += " message" + searchResult;
              return (
                <div className={side} key={index}>
                  {message.text}
                  <div>
                    <small>{helper.dateChatFormat(message.time)}</small>
                  </div>
                </div>
              );
            })}
          </div>
          <div id="intoView" />
          <div className="send-form">
            <div className="audio">
              <audio id="recordedAudio" />
            </div>
            <div className="controllers">
              <Link to="/chats" className="back-button">
                <i className="fas fa-chevron-left" />
              </Link>
              <form onSubmit={this.handleNewMessage} action="">
                <input
                  type="text"
                  name="message"
                  onChange={this.handleOnChange}
                  onBlur={this.onBlur}
                  id="name"
                />
                <button
                  className="record"
                  onMouseDown={this.handleRecording}
                  onMouseUp={this.handleStopRecording}
                >
                  <i className="fas fa-microphone-alt" />
                </button>
                <div className="recording">
                  <div className="bar-moving" />
                </div>
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
