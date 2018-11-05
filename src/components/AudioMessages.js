import React, { Component, Fragment } from 'react';
import Recorder from 'react-mp3-recorder';
import AudioTranscriptor from './AudioTranscriptionClass';
import chat from "../lib/chat-service";
import Microphone from "../Microphone";

const style={
  position: 'fixed',
  top: '300px',
}

export default class AudioMessages extends Component {
  componentDidMount = () => {
    this.AudioTranscriptor = AudioTranscriptor();
    this.AudioTranscriptor.setAudioTranscriptor();
    this.AudioTranscriptor.setResultCallback(this.audioResultCallback);
  }
  audioResultCallback = ({ transcript, finished }) => console.log(transcript);
  onRecordingComplete = (blob) => {
    console.log('onRecordingComplete');
  }

  sendMessage = (blob) => {
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

  clickRecorder = () => {
    console.log('clickRecorder');
  }
  render() {
    return (
      <Fragment>
        <Recorder onClick={this.clickRecorder} style={style} onRecordingComplete={this.props.onRecordingComplete} onRecordingError={this.props.onRecordingError}/>
      </Fragment>
    )
  }
}
