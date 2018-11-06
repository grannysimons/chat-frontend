import React, { Component, Fragment } from 'react';
import Recorder from 'react-mp3-recorder';
// import chat from "../lib/chat-service";
// import Microphone from "../Microphone";
import SpeechRecognizer from 'simple-speech-recognition';

const style={
  // position: 'fixed',
  // top: '300px',
}

export default class AudioMessages extends Component {
  componentDidMount = () => {
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
    console.log('resultCallback: ', transcript);
    console.log('finished: ', finished);
    this.message = transcript;
    this.props.sendMessage(this.blob, this.message);
  };

  clickRecorder = () => {
    console.log('inici');
    this.speechRecognizer.start();
  }
  onRecordingComplete = (blob) => {
    console.log('onRecordingComplete');
    this.blob = blob;
    this.props.sendMessage(this.blob, this.message);
  }
  checkProcessFinished = () => {
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
      <Fragment>
        <Recorder onClick={this.clickRecorder} style={style} onRecordingComplete={this.onRecordingComplete} onRecordingError={this.props.onRecordingError}/>
      </Fragment>
    )
  }
}
