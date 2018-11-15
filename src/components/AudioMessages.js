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
    this.onEnd = false;
  }
  startRecordingButton = () => {
  }
  stopRecordingButton = () => {
  }
  startTranscription = () => {
    this.speechToText.start();
    this.startRecordingButton();
    if (/Mobi/.test(navigator.userAgent)) {
      setTimeout(() => {
        this.speechToText.stop();
      }, 5000);
    }
    this.speechToText.onresult = (event) => {
      let text = event.results[0][0].transcript;
      this.message = text;
    };
    this.speechToText.onnomatch = (event) => {
    }
    this.speechToText.onend = (event) => {
      if(this.onEnd === false)
      {
        this.onEnd = true;
        return;
      }
      this.onEnd = false;
        this.props.sendMessage(this.blob, this.message);
        this.message = '';
    }
  }
  stopTranscription = () => {
    this.stopRecordingButton();
    if (/Mobi/.test(navigator.userAgent))
    {
      return;
    }
    this.speechToText.stop();
  }
  onRecordingComplete = (blob) => {
    if (/Mobi/.test(navigator.userAgent))
    {
      return;
    }
    
    this.blob = blob;
    if(this.onEnd === false)
    {
      this.onEnd = true;
      return;
    }
    this.onEnd = false;
      if(!this.blob)
      {
        alert('blob invalid');
      }
      this.props.sendMessage(this.blob, this.message);
      this.blob = '';
  }
  onRecordingError = (err) => {
  }
  render() {
    return (
      <div className="recorder" style={style}>
        <Recorder onMouseDown={this.startTranscription} onMouseUp={this.stopTranscription} onTouchStart={this.startTranscription} onTouchEnd={this.stopTranscription} style={style} onRecordingComplete={this.onRecordingComplete} onRecordingError={this.props.onRecordingError}/>
      </div>
    )
  }
}
