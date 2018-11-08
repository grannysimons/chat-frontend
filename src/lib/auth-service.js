import axios from 'axios';
import env from '../env';

class Auth {
  constructor() {
    this.auth = axios.create({
      // baseURL: 'http://localhost:3010/auth',
      // baseURL: process.env.REACT_APP_apiURL + '/auth',
      baseURL: env.REACT_APP_apiURL + '/auth',
      withCredentials: true
    })
  }

  signup(user) {
    console.log('signup');
    const { email, password } = user;
    return this.auth.post('/signup', {email, password})
      .then(({ data }) => data);
  }

  login(user) {
    console.log('login');
    const { email, password } = user;
    return this.auth.post('/login', {email, password})
      .then(({ data }) => {
        return data;
      })
  }

  logout() {
    console.log('logout');
    return this.auth.post('/logout', {})
      .then(response => response.data)
  }

  me() {
    console.log('me');
    return this.auth.get('/me')
    .then(response => response.data)
  }
  
  getProfileData() {
    console.log('getProfileData');
    return this.auth.post('/profile')
    .then(response => response.data)
  }

  setProfileData(fieldData) {
    console.log('setProfileData');
    const { field, value } = fieldData;
    return this.auth.post('/profile/edit', {field, value})
    .then(response => response.data)
  }
}

const auth = new Auth();

export default auth