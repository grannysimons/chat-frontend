import io from 'socket.io-client';
// import { NEW_USER, NEW_CHAT } from './Events';

const socketURL = 'http://localhost:3010';
class SocketManagerClient {
  constructor(){
    this.socket='';
  }
  initSocketBroadcast = () => {
    this.socket = io(socketURL);
    this.socket.on('connect', ()=>{
      console.log('broadcast connect');
    })
  }
  getSocket = () => {
    return this.socket;
  }
  initSocketUser = (userId) => {
    this.socket = io(socketURL + '/' + userId);
    this.socket.on('connect', () => {
      console.log(userId, ' on connect');
      this.socket.on('disconnect', (msg)=>{
        console.log('on disconnect', msg);
      });
      this.initSocketEventsReception(userId);
    });
  }
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