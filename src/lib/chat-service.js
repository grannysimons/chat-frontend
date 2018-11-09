import axios from 'axios';
import env from '../env';

class Chat {
  constructor() {
    this.chat = axios.create({
      baseURL: env.REACT_APP_apiURL + '/chat',
      withCredentials: true
    })
  }

  newChat(email, idUser) {
    console.log('newChat');
    return this.chat.post('/newChat', { email, idUser})
    .then(({ data }) =>{ 
      console.log('data: ',data);
      return data;
    })
    .catch(error => {
      console.log('error:',error);
      return error;
    })
  }

  getList() {
    console.log('getList');
    return this.chat.post('/chatList');
  }

  getTotaNewMessages(idUser, idChat) {
    console.log('getTotaNewMessages');
    return this.chat.post(`/${idUser}/${idChat}/totalNewMessages`);
  }
  
  getMessages(email) {
    console.log('getMessages');
    return this.chat.post('/' + email);
  }

  newMessage(email, message, isAudio) {
    console.log('newMessage');
    let path = '/' + email + '/send';
    return this.chat.post(path, {message, isAudio})
  }
  deleteUser (idUser) {
    console.log('deleteUser');
    return this.chat.post(`/deleteUser/${idUser}`);
  }
  deleteChats (idUser) {
    console.log('deleteChats');
    return this.chat.post(`/deleteChats/${idUser}`);
  }
  deleteMessages (idUser) {
    console.log('deleteMessages');
    return this.chat.post(`/deleteMessages/${idUser}`);
  }
  typing (mail) {
    console.log('typing');
    return this.chat.post(`/typing/${mail}`);
  }
  stoppedTyping (mail) {
    console.log('stoppedTyping');
    return this.chat.post(`/stoppedTyping/${mail}`);
  }
  sendAudio(data, fileName) {
    console.log('sendAudio');
    return axios({
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: env.REACT_APP_apiURL + '/chat/sendAudio',
      params: {
        audioFile: data,
      }
    })
  }
}

const chat = new Chat();

export default chat