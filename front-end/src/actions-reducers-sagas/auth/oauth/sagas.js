import {call, put, takeLatest} from 'redux-saga/effects';
import {OAuthSuccess,SetOAuth,CsrfAccessTokensSet} from '../../../rootActions';
import Querystring from 'query-string';
import axios from 'axios';

const POSTFIX = process.env.REACT_APP_XDEBUG_POSTFIX;
const URL = process.env.REACT_APP_HOST_DOMAIN;
const CLIENT_INFO = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET
};

const getCredentials = (type, username, password = '', refreshToken = '') => {
  let credentials = {
    ...CLIENT_INFO,
    grant_type: type,
    username: username,
  }

  if(type === 'password'){
    credentials = {
      ...credentials,
      password: password
    }
  }else if(type === 'refresh_token'){
    credentials = {
      ...credentials,
      refresh_token: refreshToken
    }
  }

  return credentials;
}


function* initOAuth(state){

  let credentials;

  if(state.type === 'REFRESH_OAUTH'){

    let grantType = 'refresh_token';
    let username = sessionStorage.getItem('username');

    credentials = getCredentials(grantType,username,'',state.payload);

  }else{

    let grantType = state.payload.grantType;
    let username = state.payload.username;
    let password = state.payload.password;

    credentials = getCredentials(grantType,username,password);
  }

  const oAuthTokens = yield call(function(){
    return new Promise(function(resolve,reject){
      axios.post(URL + '/oauth/token' + POSTFIX, Querystring.stringify(credentials))
        .then(response => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  })

  const {expires_in, access_token, refresh_token} = oAuthTokens;
  const curTime = new Date();

  const payload = {
    expiration: expires_in,
    accessToken: access_token,
    refreshToken: refresh_token,
    authenticated: true,
    timestamp: curTime.getTime()
  }

  yield put(SetOAuth(payload));
  yield put(OAuthSuccess());
  yield put(CsrfAccessTokensSet());

};

function setusername(state){
  sessionStorage.setItem('username',state.payload);
}

function* accessTokenSet(state){
  yield put(CsrfAccessTokensSet());
}

export function* watchOAuth(){
  yield takeLatest('INIT_OAUTH', initOAuth);
  yield takeLatest('REFRESH_OAUTH', initOAuth);
  yield takeLatest('SET_USERNAME', setusername);
  yield takeLatest('SET_ACCESS_TOKEN',accessTokenSet);
}
