import io from 'socket.io-client';
import env from './env';

const socketURL = env.REACT_APP_apiURL;
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
      this.socket.on('disconnect', (msg)=>{
        console.log('on disconnect', msg);
      });

      this.initSocketEventsReception(userId);
    });
  }
  
  initSocketEventsReception = (userId) => {
    this.socket = io(socketURL + '/' + userId);
  }
}

let socketManagerClient = new SocketManagerClient();
export default socketManagerClient;