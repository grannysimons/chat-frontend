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
  
  getMessages(email) {
    return this.chat.post('/' + email);
  }

  newMessage(email, message) {
    let path = '/' + email + '/send';
    return this.chat.post(path, {message});
  }
  // signup(user) {
  //   const { email, password } = user;
  //   return this.auth.post('/signup', {email, password})
  //     .then(({ data }) => data);
  // }

  // login(user) {
  //   const { email, password } = user;
  //   return this.auth.post('/login', {email, password})
  //     .then(({ data }) => data);
  // }

  // logout() {
  //   return this.auth.post('/logout', {})
  //     .then(response => response.data)
  // }

  // me(user) {
  //   return this.auth.get('/me')
  //   .then(response => response.data)
  // }
}

const chat = new Chat();

export default chat