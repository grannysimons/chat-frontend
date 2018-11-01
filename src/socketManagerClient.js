import io from 'socket.io-client';
import { NEW_USER, NEW_CHAT } from 'events';

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
  initSocketUser = (userId) => {
    this.socket = io(socketURL + '/' + userId);
    this.socket.on('connect', () => {
      console.log(userId, ' on connect');
      this.initSocketEventsReception(userId);
      // this.socket.on(NEW_USER, ()=>{
      //   console.log('NEW_USER received');
      // });
      // this.socket.on(NEW_CHAT, (chat)=>{
      //   console.log('NEW_CHAT received: ',chat);
      // });
    });
  }
  initSocketEventsReception = (userId) => {
    this.socket = io(socketURL + '/' + userId);
    this.socket.on(NEW_USER, (msg)=>{
      console.log('NEW_USER received', msg);
    });
    this.socket.on(NEW_CHAT, (chat)=>{
      console.log('NEW_CHAT received: ',chat);
    });
  }
}

let socketManagerClient = new SocketManagerClient();
export default socketManagerClient;