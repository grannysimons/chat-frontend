import env from './env';

// import chat from "./lib/chat-service";
// const apiURL = 'http://localhost:3010/chat';
// const apiURL = process.env.REACT_APP_apiURL + '/chat';
const apiURL = env.REACT_APP_apiURL + '/chat';

class Microphone {
  constructor(){
    this.audioChunks = [];
    this.file = '';
  }
  sefFile = (audioFile) => {
    this.file = audioFile;
  }
  getRec = () => {
    // return this.rec;
  }
 
  sendData = (data, fileName) => {
    var xhr=new XMLHttpRequest();
    var fd=new FormData();
    fd.append("audioFile", data, fileName);
    xhr.open("POST", apiURL + '/sendAudio');
    xhr.send(fd);

    xhr.onreadystatechange = function() {
      if (this.readyState === xhr.DONE && this.status === 200) {
          // Request finished. Do processing here.
          if (xhr.status === 200) {
          } else {
          }
      }
  }
}
}

export default new Microphone();