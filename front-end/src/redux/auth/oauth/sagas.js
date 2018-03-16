import { call, put, take, takeLatest } from 'redux-saga/effects';

import {
  types as oauthActionTypes,
  loginSuccess,
  loginFailure,
  tokensExpiredCheckValid,
  // tokensExpiredCheckNotValid,
  refreshTokensRequestSuccess,
  refreshTokensRequestFailure,
  refreshTokensRequest,
} from './actions';

import {
  types as csrfActionTypes,
  initCsrfToken,
} from '../csrf/actions';

import { generateCredentials, fetchToken, isTokenValid, getLocalCredentials } from './utilities';

function* loginRequestSaga(action) {
  const { username, password } = action.payload;
  const credentials = generateCredentials('password', username, password, '');

  try {
    const result = yield call(fetchToken, credentials);
    result.username = username;
    if (result.accessToken) {
      yield put(loginSuccess(result));
    } else {
      yield put(loginFailure('Login failed: Please check your username and password.'));
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* refreshTokensRequestSaga(action) {
  const { refreshToken, username } = action.payload;
  const credentials = generateCredentials('refresh_token', username, '', refreshToken);

  try {
    const result = yield call(fetchToken, credentials);
    result.username = username;
    if (result.accessToken) {
      yield put(refreshTokensRequestSuccess(result));
    } else {
      yield put(refreshTokensRequestFailure(result));
    }
  } catch (error) {
    yield put(refreshTokensRequestFailure(error));
  }
}


function* tokenExpiredCheckSaga() {
  const {
    csrfToken, accessToken, expireStamp, refreshToken, expirationTime, username,
  } = getLocalCredentials();

  // TODO: This definitely needs to be tested.
  if (!csrfToken) {
    yield put(initCsrfToken());
    yield take(csrfActionTypes.CSRF_TOKEN_SUCCESS, tokenExpiredCheckSaga);
  }

  if (accessToken && expireStamp) {
    if (!isTokenValid(accessToken, expireStamp, expirationTime)) {
      yield put(refreshTokensRequest({ refreshToken, username }));
    } else {
      yield put(tokensExpiredCheckValid());
    }
  }
}

export function* watchOAuth() {
  yield takeLatest(oauthActionTypes.LOGIN_REQUEST, loginRequestSaga);
  yield takeLatest(oauthActionTypes.REFRESH_TOKENS_REQUEST, refreshTokensRequestSaga);
  yield takeLatest(oauthActionTypes.TOKENS_EXPIRED_CHECK, tokenExpiredCheckSaga);
}

export default watchOAuth;
