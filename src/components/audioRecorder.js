import React, { Component } from 'react';

export default class audioRecorder extends Component {
  state = {
    audioUrl: '',
  }
  componentDidMount = () => {
    console.log('1');
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      console.log('2 ', stream);
      this.mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      this.mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
        console.log('3');
      });
      this.mediaRecorder.addEventListener("stop", () => {
        console.log('4');
        const audioBlob = new Blob(audioChunks, { 'type' : 'audio/wav; codecs=MS_PCM' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        console.log('src: ',audio.src);
        console.log('audioURL: ', audioUrl);
        this.setState({ audioUrl });
      });
    });
  }
  startRecording = () => {
    this.mediaRecorder.start();

    setTimeout(this.stopRecording, 3000);
  }
  stopRecording = () => {
    this.mediaRecorder.stop();
  }
  printControls = () => {
    if(this.state.audioUrl !== '')
    {
      return (
      <audio controls>
        <source src={ this.state.audioUrl } type="audio/ogg" />
          Your browser does not support the audio element.
      </audio>
      );
    }
  }
  render = () => {
    return (
      <div className="audioRecorder">
        <button type="button" onClick={this.startRecording}>record</button>
        {this.printControls()}
      </div>
    )
  }
}
