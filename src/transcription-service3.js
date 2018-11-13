import React, { Component } from 'react';

class Transcriptor extends Component {
  state = {
    transcript: '',
  }
  componentDidMount = () => {
    this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    this.recognition.lang = 'es';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 5;
  }
  startListening = () => {
    console.log('start listening');
    this.recognition.start();
    this.recognition.onresult = (event) => {
      console.log('You said: ', event.results[0][0].transcript);
      let text = event.results[0][0].transcript;
      this.setState({transcript: text});
  };
  }
  stopListening = () => {
    console.log('stop listening');
    this.recognition.stop();
  }
  resetTranscript = () => {
    console.log('reset listening');
    this.recognition.resetTranscript();
  }
  render() {
    return (
      <div>
        <button onClick={this.startListening}>Start</button>
        <button onClick={this.stopListening}>Stop</button>
        <button onClick={this.resetTranscript}>Reset</button>
        <span>{this.state.transcript}</span>
      </div>
    )
  }
}

export default Transcriptor;