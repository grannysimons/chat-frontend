let isLocal = true;

let local = {
  REACT_APP_apiURL: 'http://localhost:3010',
  REACT_APP_PUBLIC_URL: 'http://localhost:3000',
  AUDIO_BASEURL: 'https://txatappaudiobucket.s3.amazonaws.com/audios/',
  PUBLICBUCKET_BASEURL: 'https://txatappaudiobucket.s3.eu-west-3.amazonaws.com/'
}
let production = {
  REACT_APP_apiURL: 'https://txatapp.herokuapp.com',
  REACT_APP_PUBLIC_URL: 'https://txatapp.firebaseapp.com',
  AUDIO_BASEURL: 'https://txatappaudiobucket.s3.amazonaws.com/audios/',
  PUBLICBUCKET_BASEURL: 'https://txatappaudiobucket.s3.eu-west-3.amazonaws.com/'
}

export default isLocal === true ? local : production;