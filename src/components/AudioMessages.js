import React, { Component } from 'react';
import Recorder from 'react-mp3-recorder';
// import chat from "../lib/chat-service";
// import Microphone from "../Microphone";
import SpeechRecognizer from 'simple-speech-recognition';

const style={
  marginLeft: '10px',
}

export default class AudioMessages extends Component {
  componentDidMount = () => {
    this.isChrome = !!window.chrome && !!window.chrome.webstore;
    if(!this.isChrome) return;
    const options = {
      SpeechRecognition: window.SpeechRecognition || window.webkitSpeechRecognition,
      timeout: 1000, // The timeout until a speech recognition is completed (after the user has spoken their last word)
      resetCallback: this.resetCallback, // Callback used whenever an error happens
      resultCallback: this.resultCallback, // Callback used for results
      lang: 'ca', // Language set on the Speech Recognition object
      interimResults: false // Whether you want to receive interim results or not
    }
    this.speechRecognizer = new SpeechRecognizer(options);
    this.blob='';
    this.message='';
    this.destEmail = this.props.email;
  }

  resetCallback = () => {
    console.log('resetCallback');
  }
  resultCallback = ({ transcript, finished }) => {
    console.log('text transcrit: ', transcript);
    this.message = transcript;
    this.props.sendMessage(this.blob, this.message);
  };

  clickRecorder = () => {
    if(!this.isChrome) return;
    this.speechRecognizer.start();
  }
  onRecordingComplete = (blob) => {
    this.blob = blob;
    this.props.sendMessage(this.blob, this.message);
  }
  checkProcessFinished = () => {
    console.log('checkProcessFinished');
    if(!this.blob || !this.message) return;
    this.props.sendMessage(this.blob, this.message);
    this.blob = '';
    this.message = '';
  }
  onRecordingError = (err) => {
    console.log('onRecordingError');
  }
  render() {
    return (
      <div className="recorder" style={style}>
        <Recorder onClick={this.clickRecorder} style={style} onRecordingComplete={this.onRecordingComplete} onRecordingError={this.props.onRecordingError}/>
      </div>
    )
  }
}
