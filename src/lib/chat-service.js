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
    return this.chat.post('/newChat', { email, idUser})
    .then(({ data }) =>{ 
      return data;
    })
    .catch(error => {
      return error;
    })
  }

  getList() {
    return this.chat.post('/chatList');
  }

  getTotaNewMessages(idUser, idChat) {
    return this.chat.post(`/${idUser}/${idChat}/totalNewMessages`);
  }
  
  getMessages(email) {
    return this.chat.post('/' + email);
  }

  newMessage(email, message, isAudio) {
    let path = '/' + email + '/send';
    return this.chat.post(path, {message, isAudio})
  }
  deleteUser (idUser) {
    return this.chat.post(`/deleteUser/${idUser}`);
  }
  deleteChats (idUser) {
    return this.chat.post(`/deleteChats/${idUser}`);
  }
  deleteMessages (idUser) {
    return this.chat.post(`/deleteMessages/${idUser}`);
  }
  typing (mail) {
    return this.chat.post(`/typing/${mail}`);
  }
  stoppedTyping (mail) {
    return this.chat.post(`/stoppedTyping/${mail}`);
  }
  sendAudio(data, fileName) {
    return axios({
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: env.REACT_APP_apiURL + '/chat/sendAudio',
      params: {
        audioFile: data,
        fileName,
      }
    })
  }
}

const chat = new Chat();

export default chat