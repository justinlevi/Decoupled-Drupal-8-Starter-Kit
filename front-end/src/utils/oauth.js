import axios from 'axios';
import Querystring from 'query-string';
import { getSessionStorage, clearSessionStorage } from './sessionStorage';

const POSTFIX = process.env.REACT_APP_XDEBUG_POSTFIX;
const URL = process.env.REACT_APP_HOST_DOMAIN;
const CLIENT_INFO = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET
};

const isTokenValid = (accessToken, expiresIn) => {

  const currentTime = new Date().getTime();
  if(accessToken && (!expiresIn || expiresIn - currentTime > 1)){
    console.log('isTokenValid: (TRUE) TOKEN EXPIRES AT: ' + new Date(parseInt(expiresIn, 10)));
    return true;
  }else{
    console.log('isTokenValid: (FALSE) TOKEN EXPIRED');
    return false;
  }
}

const getRefreshToken = () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
    console.log('REFRESH TOKEN USED');
    return refreshToken;
  }else{
    return false;
  }
}

const getCredentials = (type, username, password = '', refreshToken = '') => {
  let credentials = {
    ...CLIENT_INFO,
    grant_type: type,
    username: username,
  }

  type === 'password' ? 
  credentials = {
    ...credentials,
    password: password
  }
  : 
  credentials = {
    ...credentials,
    refresh_token: refreshToken
  }

  return credentials;
}

const initializeOauthToken = (credentials, callback = (success, error) => {}) => {
  axios.post(URL + '/oauth/token' + POSTFIX, Querystring.stringify(credentials))
    .then(response => {
      const {expires_in, access_token, refresh_token} = response.data;
      const expiresIn = new Date().getTime() + expires_in * 1000;
      console.log('TOKEN EXPIRES AT: ' + new Date(parseInt(expiresIn, 10)));
      sessionStorage.setItem('access_token', access_token);
      sessionStorage.setItem('expires_in', expiresIn);
      localStorage.setItem('refresh_token', refresh_token);
      callback(true);
    })
    .catch((error) => {
      callback(false, error);
    });
};

export const getToken = () => {
  const { accessToken, expiresIn } = getSessionStorage();
  if(!accessToken || !expiresIn){
    return false;
  }

  if (isTokenValid(accessToken, expiresIn)) {
    return `Bearer ${accessToken}`;
  }
  
  return getRefreshToken();
}

export const authenticate = (username, password, callback=(success, error)=>{}) => {

  if(username){
    sessionStorage.setItem('username', username);
  }
  
  const { accessToken, expiresIn } = getSessionStorage();
  const refreshToken = !isTokenValid(accessToken, expiresIn) ? getRefreshToken() : undefined;


  if(accessToken && isTokenValid(accessToken, expiresIn)) {
    callback(true); 
    return;
  } 
  
  let credentials = (!accessToken) ? 
    getCredentials('password', username, password) : 
    getCredentials('refresh_token', username, password, refreshToken)

  initializeOauthToken(credentials, (success, error) => {
    if(!success){
      clearSessionStorage();
    }
    callback(success, error)
  });
}

export default authenticate;