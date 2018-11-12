import axios from 'axios';
import env from '../env';

class Auth {
  constructor() {
    console.log('auth: ', env.REACT_APP_apiURL + '/auth');
    this.auth = axios.create({
      baseURL: env.REACT_APP_apiURL + '/auth',
      withCredentials: true
    })
  }

  signup(user) {
    console.log('signup');
    const { email, password } = user;
    return this.auth.post('/signup', {email, password})
      .then(({ data }) =>{  
        console.log('signup ok');        
        return data;
      })
      .catch(error => {
        console.log('signup err');        
        return error;
      })
  }

  login(user) {
    console.log('login');
    const { email, password } = user;
    return this.auth.post('/login', {email, password})
      .then(({ data }) => {
        console.log('login ok');
        return data;
      })
      .catch((error) => {
        console.log('login err');
        return {errorMessage: 'there was an error accessing to the database. Please try again or check the provider: '+error};
      })
  }

  logout() {
    console.log('logout');
    return this.auth.post('/logout', {})
      .then(response => response.data)
  }

  me() {
    return this.auth.get('/me')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    })
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