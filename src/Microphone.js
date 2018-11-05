// import chat from "./lib/chat-service";
const apiURL = 'http://localhost:3010/chat';

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
    console.log("sendData!!", data);
  
    var xhr=new XMLHttpRequest();
    var fd=new FormData();
    fd.append("audioFile", data, fileName);
    console.log('get blob: ', fd.get('audioFile'));
    xhr.open("POST", apiURL + '/sendAudio');
    xhr.send(fd);

    xhr.onreadystatechange = function() {
      if (this.readyState === xhr.DONE && this.status === 200) {
          // Request finished. Do processing here.
          console.log('readystatechabge ',xhr.status);
          if (xhr.status === 200) {
            console.log('enviament ok!!!!', xhr.responseText);
          } else {
            console.log('enviament KOOOOOO!!!!', xhr);
          }
      }
  }
}
}

export default new Microphone();