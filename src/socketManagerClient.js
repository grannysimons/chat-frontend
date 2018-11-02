import io from 'socket.io-client';

const socketURL = 'http://localhost:3010';
class SocketManagerClient {
  constructor(){
    this.socket='';
    this.connectedSocket='';
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