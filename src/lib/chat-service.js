import axios from 'axios';

class Chat {
  constructor() {
    this.chat = axios.create({
      baseURL: 'http://localhost:3010/chat',
      withCredentials: true
    })
  }

  newChat(email) {
    // console.log('chat-service. mail: ', email);
    return this.chat.post('/newChat', { email })
  }

  getList() {
    return this.chat.post('/chatList');
  }
  
  getMessages(email) {
    console.log('getmessages: ', email);
    return this.chat.post('/' + email);
  }

  newMessage(email, message) {
    let path = '/' + email + '/send';
    console.log('chat-service: ',path);
    return this.chat.post(path, {message});
  }
  // signup(user) {
  //   const { email, password } = user;
  //   return this.auth.post('/signup', {email, password})
  //     .then(({ data }) => data);
  // }

  // login(user) {
  //   console.log('login!');
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