import React, { Component } from 'react'
import SpeechRecognizer from 'simple-speech-recognition';

// https://www.npmjs.com/package/simple-speech-recognition

const style = {
  position: 'absolute',
  bottom: '300px',
}

export default class AudioTranscriptor extends Component {
  componentDidMount = () => {
    const options = {
        SpeechRecognition: window.SpeechRecognition || window.webkitSpeechRecognition,
        timeout: 1000, // The timeout until a speech recognition is completed (after the user has spoken their last word)
        resetCallback: this.resetCallback, // Callback used whenever an error happens
        resultCallback: this.resultCallback, // Callback used for results
        lang: 'ca', // Language set on the Speech Recognition object
        interimResults: false // Whether you want to receive interim results or not
    }
    this.speechRecognizer = new SpeechRecognizer(options)
  }
  resetCallback = () => {
    this.props.resetCallback();
  }
  resultCallback = ({ transcript, finished }) => {
    console.log(transcript)
    this.props.resultCallback({ transcript, finished });
  };
  start = () => {
    // console.log('start');
    this.speechRecognizer.start()
  }
  render() {
    return (
      <div className="transcriptorButtons" style={style}>
        <button type="button" onClick={this.start}>Start</button>
        {/* <button type="button" onClick={this.stop}>Stop</button> */}
        {/* <button type="button" onClick={this.abort}>Abort</button>
        <button type="button" onClick={this.reset}>Reset</button> */}
      </div>
    )
  }
}
