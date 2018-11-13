import React, { Component } from 'react';
import Recorder from 'react-mp3-recorder';

const style={
  marginLeft: '10px',
}

export default class AudioMessages extends Component {
  componentDidMount = () => {
    this.speechToText = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    this.speechToText.lang = 'es';
    this.speechToText.interimResults = false;
    this.speechToText.maxAlternatives = 5;
    this.blob='';
    this.message='';
    this.destEmail = this.props.email;
  }
  clickRecorder = () => {
  }
  startTranscription = () => {
    this.speechToText.start();
    this.speechToText.onresult = (event) => {
      let text = event.results[0][0].transcript;
      this.message = text;
      this.props.sendMessage(this.blob, this.message);
      this.message = '';
    };
  }
  stopTranscription = () => {
    this.speechToText.stop();
  }
  onRecordingComplete = (blob) => {
    this.blob = blob;
  }
  checkProcessFinished = () => {
    if(!this.blob || !this.message) return;
    this.props.sendMessage(this.blob, this.message);
    this.blob = '';
    this.message = '';
  }
  onRecordingError = (err) => {
  }
  render() {
    return (
      <div className="recorder" style={style}>
        <Recorder onClick={this.clickRecorder} onMouseDown={this.startTranscription} onMouseUp={this.stopTranscription} style={style} onRecordingComplete={this.onRecordingComplete} onRecordingError={this.props.onRecordingError}/>
      </div>
    )
  }
}
