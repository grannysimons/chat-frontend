// import React, { Component } from 'react'
import SpeechRecognizer from 'simple-speech-recognition';

// https://www.npmjs.com/package/simple-speech-recognition

// const style = {
//   position: 'absolute',
//   bottom: '300px',
// }

export default class AudioTranscriptor {
  // componentDidMount = () => {
  //   this.setAudioTranscriptor();
  // }
  setAudioTranscriptor = () => {
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
  setResultCallback = (cb) => {
    this.resultCallbackExtern = cb;
  }
  resetCallback = () => {}
  resultCallback = this.resultCallbackExtern;
  start = () => {
    this.speechRecognizer.start()
  }
  // render() {
  //   return (
  //     <div className="transcriptorButtons" style={style}>
  //       <button type="button" onClick={this.start}>Start</button>
  //     </div>
  //   )
  // }
}
