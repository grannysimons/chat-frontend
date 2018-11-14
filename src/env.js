let isLocal = true;

let local = {
  REACT_APP_apiURL: 'http://localhost:3010',
  REACT_APP_PUBLIC_URL: 'http://localhost:3000',
}
let production = {
  REACT_APP_apiURL: 'https://txatapp.herokuapp.com',
  REACT_APP_PUBLIC_URL: 'https://txatapp.firebaseapp.com',
}

export default isLocal === true ? local : production;