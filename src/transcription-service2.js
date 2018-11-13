export default class Transcriptor {
  constructor(){
    this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    this.recognition.lang = 'es';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 5;
  }
  startListening = (functCallback) => {
    console.log('start listening');
    this.recognition.start();
    this.recognition.onresult = (event) => {
      console.log('You said: ', event.results[0][0].transcript);
      let text = event.results[0][0].transcript;
      functCallback(text);
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
}