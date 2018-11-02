class Microphone {
  constructor(){
    this.audioChunks = [];
    
  }
  getRec = () => {
    return this.rec;
  }
  successCallback = (localMediaStream) => {
    console.log('successCallback');
    let audio = document.querySelector('.audio audio');
    // audio.src = window.URL.createObjectURL(localMediaStream); //deprecated
    audio.src = audio.createObjectURL(localMediaStream); //deprecated
  }
  errorCallback = (error) => {
    console.log('an error happened accessing to device microphone: ', error);
  }

  sendData = (data) => {

  }
  handlerRecording = (stream) => {
    this.rec = new MediaRecorder(stream);
    this.rec.ondataavailable = e => {
      this.audioChunks.push(e.data);
      if (this.rec.state === "inactive"){
        let blob = new Blob(this.audioChunks,{type:'audio/mpeg-3'});
        this.recordedAudio = document.querySelector('.audio #recordedAudio');
        this.recordedAudio.src = URL.createObjectURL(blob);
        this.recordedAudio.controls=true;
        this.recordedAudio.autoplay=true;
        this.sendData(blob);
      }
    }
  }

  getAudio = () => {
    console.log('getAudio');
    // navigator.getUserMedia(
    //   { video: false, audio: true},
    //   this.successCallback,
    //   this.errorCallback
    // );


    navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {
        this.handlerRecording(stream);
        this.start();
      });
    }
  start = () => {
    this.rec.start();
  }
  stop = () => {
    this.rec.stop();
  }
}

export default new Microphone();