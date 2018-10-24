import axios from 'axios';

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: 'http://localhost:3010/auth',
      withCredentials: true
    })
  }

  signup(user) {
    const { email, password } = user;
    return this.auth.post('/signup', {email, password})
      .then(({ data }) => data);
  }

  login(user) {
    // console.log('login!');
    const { email, password } = user;
    return this.auth.post('/login', {email, password})
      .then(({ data }) => {
        // console.log('data: ', data);
        return data;
      })
  }

  logout() {
    return this.auth.post('/logout', {})
      .then(response => response.data)
  }

  me() {
    return this.auth.get('/me')
    .then(response => response.data)
  }
  
  getProfileData() {
    console.log('getProfileData');
    return this.auth.post('/profile')
    .then(response => response.data)
  }
}

const auth = new Auth();

export default auth