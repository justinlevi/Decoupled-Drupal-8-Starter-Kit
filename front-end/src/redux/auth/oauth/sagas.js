import { call, put, take, takeLatest } from 'redux-saga/effects';
import Querystring from 'query-string';
import axios from 'axios';

import {
  ACTIONS as OAUTH_ACTIONS,
  loginSuccess,
  // loginRequest,
  loginFailure,
  refreshTokenRequest,
  // refreshTokenRequestSuccess,
  refreshTokenValid,
  // refreshTokenRequestFailure,
} from './actions';

import {
  ACTIONS as CSRF_ACTIONS,
  // initCsrfToken,
} from '../csrf/actions';

import { getCredentials, isTokenValid, persistCredentials } from './utilities';

const URL = process.env.REACT_APP_HOST_DOMAIN;
const POSTFIX = process.env.REACT_APP_XDEBUG_POSTFIX;

function* authenticationRequestSaga(action) {
  const { type, payload } = action;
  const grantType = (type === OAUTH_ACTIONS.REFRESH_TOKEN_REQUEST) ? 'refresh_token' : 'password';
  const user = (type === OAUTH_ACTIONS.REFRESH_TOKEN_REQUEST) ? sessionStorage.getItem('username') : payload.username;
  const pass = (type === OAUTH_ACTIONS.REFRESH_TOKEN_REQUEST) ? '' : payload.password;
  const refreshToken = (type === OAUTH_ACTIONS.REFRESH_TOKEN_REQUEST) ? payload : '';
  const credentials = getCredentials(grantType, user, pass, refreshToken);

  try {
    const oAuthTokens = yield call(() => new Promise(((resolve) => {
      axios.post(`${URL}/oauth/token${POSTFIX}`, Querystring.stringify(credentials))
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log('Incorrect username or password.');
          console.log(error);
        });
    })));

    const newPayload = {
      expiration: oAuthTokens.expires_in,
      accessToken: oAuthTokens.access_token,
      refreshToken: oAuthTokens.refresh_token,
      timestamp: new Date().getTime(),
    };

    persistCredentials(newPayload);
    yield put(loginSuccess(newPayload));
  } catch (err) {
    yield put(loginFailure(err));
  }
}

function* refreshTokenCheckSaga() {
  const accessToken = sessionStorage.getItem('accessToken');
  const expireStamp = localStorage.getItem('lastRefreshedToken');
  const csrfToken = sessionStorage.getItem('csrfToken');

  if (!csrfToken) {
    yield take(CSRF_ACTIONS.CSRF_TOKEN_SUCCESS);
  }

  if (accessToken && expireStamp) {
    if (!isTokenValid(accessToken, expireStamp)) {
      const refreshToken = localStorage.getItem('refreshToken');
      yield put(refreshTokenRequest(refreshToken));
      // yield put(SetAuthCheck(true));
    } else {
      console.log('REFRESH TOKEN IS VALID');
      yield put(refreshTokenValid());
      // yield put(SetAuthCheck(true));
    }
  }
}


export function* watchOAuth() {
  yield takeLatest(OAUTH_ACTIONS.LOGIN_REQUEST, authenticationRequestSaga);
  yield takeLatest(OAUTH_ACTIONS.REFRESH_TOKEN_REQUEST, authenticationRequestSaga);
  yield takeLatest(OAUTH_ACTIONS.REFRESH_TOKEN_EXPIRED_CHECK, refreshTokenCheckSaga);
}

export default watchOAuth;
