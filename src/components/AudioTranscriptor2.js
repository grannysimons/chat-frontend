import React, { Component } from 'react';
import SpeechToText from 'speech-to-text';

// https://www.npmjs.com/package/speech-to-text
// demo: https://apps.golightlyplus.com/speech-to-text-demo/

const style = {
  position: 'absolute',
  bottom: '300px',
}

export default class AudioTranscriptor extends Component {
  onAnythingSaid = text => console.log(`Interim text: ${text}`);
  onFinalised = text => console.log(`Finalised text: ${text}`);
  componentDidMount = () => {
    this.listener = new SpeechToText(this.onAnythingSaid, this.onFinalised);
  }
  
  start = () => {
    try {
      console.log('start...');
      this.listener.startListening();
      } catch (error) {
        console.log(error);
      }
  }

  stop = () => {
    try {
      console.log('stop...');
      this.listener.stopListening();
      } catch (error) {
        console.log(error);
      }
  }

  render() {
    return (
      <div className="transcriptorButtons" style={style}>
        <button type="button" onClick={this.start}>Start</button>
        <button type="button" onClick={this.stop}>Stop</button>
      </div>
    )
  }
}
