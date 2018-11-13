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
  startTranscription = () => {
    console.log('startTranscription');
    this.speechToText.start();
    if (/Mobi/.test(navigator.userAgent)) {
      setTimeout(() => {
        console.log('settimeout: stop!');
        this.speechToText.stop();
      }, 5000);
    }
    this.speechToText.onresult = (event) => {
      let text = event.results[0][0].transcript;
      this.message = text;
      console.log('message: ', this.message);
      this.props.sendMessage(this.blob, this.message);
      this.message = '';
    };
  }
  stopTranscription = () => {
    console.log('stopTranscription');
    if (/Mobi/.test(navigator.userAgent))
    {
      console.log('mòbil!');
      return;
    }
    console.log('no mòbil');
    this.speechToText.stop();
  }
  onRecordingComplete = (blob) => {
    this.blob = blob;
  }
  onRecordingError = (err) => {
  }
  render() {
    return (
      <div className="recorder" style={style}>
        <Recorder onMouseDown={this.startTranscription} onMouseUp={this.stopTranscription} style={style} onRecordingComplete={this.onRecordingComplete} onRecordingError={this.props.onRecordingError}/>
      </div>
    )
  }
}
