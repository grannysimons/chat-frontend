import React, { Component } from 'react';
import Recorder from 'react-mp3-recorder';
// import AudioRecorder from './audioRecorder';

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
    console.log('start recording button');
    document.querySelector('.styles_button__3Vugn').classList.add('active');
  }
  stopRecordingButton = () => {
    console.log('stop recording button');
    document.querySelector('.styles_button__3Vugn').classList.remove('active');
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
      console.log('speechToText.onresult!! ', text);
      this.message = text;
      // if (this.blob && this.message)
      // {
      //   console.log('sendMessage a startTranscription');
      //   this.props.sendMessage(this.blob, this.message);
      //   this.message = '';
      // }
    };
    this.speechToText.onnomatch = (event) => {
      console.log('no match!!!!');
    }
    this.speechToText.onend = (event) => {
      console.log("¡on end!!!!");
      
      // if (this.blob && this.message)
      // {
      if(this.onEnd === false)
      {
        console.log('speechToText - onEnd = false?');
        this.onEnd = true;
        return;
      }
      this.onEnd = false;
        console.log('sendMessage a startTranscription');
        this.props.sendMessage(this.blob, this.message);
        this.message = '';
      // }
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
    
    console.log('blob: ', blob);
    this.blob = blob;
    if(this.onEnd === false)
    {
      console.log('onRecordingComplete - onEnd = false?');
      this.onEnd = true;
      return;
    }
    this.onEnd = false;
    // if (this.blob && this.message){
      console.log('sendMessage a onRecordingComplete');

      if(!this.blob)
      {
        alert('blob invalid');
      }
      this.props.sendMessage(this.blob, this.message);
      this.blob = '';
    // }
  }
  onRecordingError = (err) => {
  }
  render() {
    return (
      <div className="recorder" style={style}>
        <Recorder onMouseDown={this.startTranscription} onMouseUp={this.stopTranscription} onTouchStart={this.startTranscription} onTouchEnd={this.stopTranscription} style={style} onRecordingComplete={this.onRecordingComplete} onRecordingError={this.props.onRecordingError}/>
        {/* <AudioRecorder /> */}
      </div>
    )
  }
}
