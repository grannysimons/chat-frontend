import axios from 'axios';

class Chat {
  constructor() {
    this.chat = axios.create({
      baseURL: 'http://localhost:3010/chat',
      withCredentials: true
    })
  }

  newChat(email, idUser) {
    return this.chat.post('/newChat', { email, idUser})
  }

  getList() {
    return this.chat.post('/chatList');
    // retorna un array d'objectes:
    //   name: "Joan",
    //   lastDate: "8/10/18 22:41",
    //   num: "1",
    //   email: "Joan@Joan.com"
  }

  getTotaNewMessages(idUser, idChat) {
    return this.chat.post(`/${idUser}/${idChat}/totalNewMessages`);
  }
  
  getMessages(email) {
    return this.chat.post('/' + email);
  }

  newMessage(email, message, isAudio) {
    let path = '/' + email + '/send';
    return this.chat.post(path, {message, isAudio});
  }
  deleteUser (idUser) {
    return this.chat.post(`/delete/${idUser}`);
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
      url: 'http://localhost:3010/chat/sendAudio',
      params: {
        audioFile: data,
      }
    })
  }
}

const chat = new Chat();

export default chat