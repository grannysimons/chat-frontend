import React, { Component } from "react";
import "./Chat.css";
import { Link } from "react-router-dom";
import chat from "../../lib/chat-service";
import socketManagerClient from "../../socketManagerClient";
import { MESSAGE_RECEIVED } from "../../Events";
import ChatHeader from "../../components/ChatHeader";
import ChatContent from "../../components/ChatContent";
import Typing from "../../components/Typing";
import ChatFormSendMessage from "../../components/ChatFormSendMessage";
import env from "../../env";

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
    if(e.target.value !== '')
    {
      let email = this.props.match.params.email;  //destinatari
      chat.typing(email);
    }
    this.setState({ message: e.target.value });
  };
  handleOnFocus = e => {
    // let email = this.props.match.params.email;  //destinatari
    // chat.typing(email);
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
    let searchValue = document.querySelector(".search-form input").value.toLowerCase();
    if (searchValue === "") return;
    messageList.forEach(message => {
      message["searchResult"] = false;
      if (message.text.toLowerCase().includes(searchValue)) {
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
  // handleRecording = () => {
  //   if (document.querySelector(".chat .send-form .recording").style.display !== "block") 
  //   {
  //     document.querySelector(".chat .send-form .recording").style.display = "block";
  //     Microphone.getAudio();
  //   }
  // };
  // handleStopRecording = () => {
  //   document.querySelector(".chat .send-form .recording").style.display = "none";
  //   Microphone.stop();
  //   Microphone.getRecordedAudio();
  // };
  sendData = (data, fileName) => {
    const apiURL = env.REACT_APP_apiURL + '/chat';
    var xhr=new XMLHttpRequest();
    var fd=new FormData();
    fd.append("audioFile", data, fileName);
    xhr.open("POST", apiURL + '/sendAudio');
    xhr.send(fd);

    xhr.onreadystatechange = function() {
      if (this.readyState === xhr.DONE && this.status === 200) {
          // Request finished. Do processing here.
          if (xhr.status === 200) {
            // console.log('fitxer: ',env.REACT_APP_apiURL+'/audios/'+fileName+'.wav');
            // setTimeout(() => {
            //   transcription.transcript(env.REACT_APP_apiURL+'/audios/'+fileName+'.wav');              
            // }, 2000);
          } else {
            console.log('error in microphone');
          }
      }
  }
}

  sendMessage = (blob, message) => {
    let email = this.props.match.params.email; //destinatari
    chat.newMessage(email, message, true)
    .then(newMessage => {
      var messageList = this.state.messageList;
      messageList.push(newMessage.data);
      document.querySelector("#name").value = "";
      
      this.sendData(blob, newMessage.data._id);
      this.setState({ messageList, message: "" });
    });
  }

  render() {
    return (
      <div>
        <div className="chat">
          <ChatHeader handleSearchForm={this.handleSearchForm} handleSearchUp={this.handleSearchUp} handleSearchDown={this.handleSearchDown} interlocutor = {this.state.interlocutor} messageList = {this.state.messageList}/>
          <ChatContent messageList={this.state.messageList} user={this.props.user}/>
          <div id="intoView" />
          <div className="send-form">
            <Typing typing={this.state.typing} user={this.props.user}/>
            <div className="controllers">
              <Link to="/chats" className="back-button">
                <i className="fas fa-chevron-left" />
              </Link>
              <ChatFormSendMessage 
                handleNewMessage={this.handleNewMessage}
                handleOnChange={this.handleOnChange}
                handleOnFocus={this.handleOnFocus}
                handleOnBlur={this.handleOnBlur}
                onRecordingComplete={this.onRecordingComplete}
                onRecordingError={this.onRecordingError}
                onTranscriptionResultCallback={this.resultCallback}
                onTranscriptionResetCallback={this.resetCallback}
                sendMessage={this.sendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
