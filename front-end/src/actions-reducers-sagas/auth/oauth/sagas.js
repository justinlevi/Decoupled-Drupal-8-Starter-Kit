import {call, put, takeLatest,select } from 'redux-saga/effects';
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
  }else if(type === 'refresh'){
    credentials = {
      ...credentials,
      refresh_token: refreshToken
    }
  }

  return credentials;
}

const getRefreshToken = (state) => state.oauth.refreshToken;

function* initOAuth(state){

  let grantType = state.payload.grantType;
  let username = state.payload.username;
  let password = state.payload.password;

  let refreshToken = '';
  if(yield select(getRefreshToken)){
    refreshToken = yield select(getRefreshToken);
  }

  let credentials = getCredentials(grantType,username,password,refreshToken);

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

  console.log("OAUTH SUCCESS ACTION PUT");
  yield put(OAuthSuccess());

  yield put(CsrfAccessTokensSet());

};

export function* watchOAuth(){
  yield takeLatest('INIT_OAUTH', initOAuth);
}
