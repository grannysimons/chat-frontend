import io from 'socket.io-client';
// import SocketIOFileClient from 'socket.io-file-client';

const socketURL = 'http://localhost:3010';
class SocketManagerClient {
  constructor(){
    this.socket='';
    this.socketFile='';
    this.connectedSocket='';
    this.uploader='';
  }
  getSocket = () => {
    return this.socket;
  }
  initSocketUser = (userId) => {
    this.socket = io(socketURL + '/' + userId);

    this.socket.on('connect', (sk) => {
      this.socket.emit('hola!!!!');
      // this.connectedSocket=sk;
      // console.log(userId, ' on connect');
      this.socket.on('disconnect', (msg)=>{
        console.log('on disconnect', msg);
      });
      // this.connectedSocket.emit(TYPING, ()=>{
      //   console.log('TYPING from ');
      // });
      // this.connectedSocket.broadcast.emit('broadcast', 'hello friends!');

      this.initSocketEventsReception(userId);
    });
  }
//   initSocketFile = () => {
//     this.socketFile = io(socketURL);
//     this.uploader = new SocketIOFileClient(this.socketFile);
//     console.log('initSocketFile ', this.uploader);
//     // var form = document.querySelector('.sendFileForm');

//     this.uploader.on('start', function(fileInfo) {
//       console.log('Start uploading', fileInfo);
//     });
//     this.uploader.on('stream', function(fileInfo) {
//         console.log('Streaming... sent ' + fileInfo.sent + ' bytes.');
//     });
//     this.uploader.on('complete', function(fileInfo) {
//         console.log('Upload Complete', fileInfo);
//     });
//     this.uploader.on('error', function(err) {
//         console.log('Error!', err);
//     });
//     this.uploader.on('abort', function(fileInfo) {
//         console.log('Aborted: ', fileInfo);
//     });
// }
// sendFile = (fileToSend) => {
//   console.log('sendFIle! ',this.uploader);
//   var uploadIds = this.uploader.upload(fileToSend, {
//       data: { /* Arbitrary data... */ }
//   });
// }
  // typing = (idUser) => {
  //   // this.connectedSocket.emit(TYPING, "hola TYPING");
  //   this.socket = io(socketURL + '/' + idUser);
  //   this.socket.on('connect', (sk) => {
  //     console.log('connect??');
  //     sk.emit(TYPING, 'hola typing');
  //     // this.connectedSocket=sk;
  //     console.log(idUser, ' typing!!!');
  //   });
  // }
  initSocketEventsReception = (userId) => {
    this.socket = io(socketURL + '/' + userId);
    // this.socket.on(NEW_USER, (msg)=>{
    //   console.log('NEW_USER received', msg);
    // });
    // this.socket.on(NEW_CHAT, (chat)=>{
    //   console.log('NEW_CHAT received: ',chat);
    // });
  }
}

let socketManagerClient = new SocketManagerClient();
export default socketManagerClient;