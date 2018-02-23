// ---------------
// Actions
// ---------------

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

export const TOKENS_EXPIRED_CHECK = 'TOKENS_EXPIRED_CHECK';
export const TOKENS_EXPIRED_CHECK_VALID = 'TOKENS_EXPIRED_CHECK_VALID';
export const TOKENS_EXPIRED_CHECK_NOT_VALID = 'TOKENS_EXPIRED_CHECK_NOT_VALID';

export const REFRESH_TOKENS_REQUEST = 'REFRESH_TOKENS_REQUEST';
export const REFRESH_TOKENS_REQUEST_SUCCESS = 'REFRESH_TOKENS_REQUEST_SUCCESS';
export const REFRESH_TOKENS_REQUEST_FAILURE = 'REFRESH_TOKENS_REQUEST_FAILURE';

export const ACTIONS = {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  TOKENS_EXPIRED_CHECK,
  TOKENS_EXPIRED_CHECK_VALID,
  TOKENS_EXPIRED_CHECK_NOT_VALID,
  REFRESH_TOKENS_REQUEST,
  REFRESH_TOKENS_REQUEST_SUCCESS,
  REFRESH_TOKENS_REQUEST_FAILURE,
};

// ---------------
// Action Creators
// ---------------

export const loginRequest = payload => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const tokensExpiredCheck = () => ({
  type: TOKENS_EXPIRED_CHECK,
});

export const tokensExpiredCheckValid = () => ({
  type: TOKENS_EXPIRED_CHECK_VALID,
});

export const tokensExpiredCheckNotValid = () => ({
  type: TOKENS_EXPIRED_CHECK_NOT_VALID,
});

export const refreshTokensRequest = payload => ({
  type: REFRESH_TOKENS_REQUEST,
  payload,
});

export const refreshTokensRequestSuccess = payload => ({
  type: REFRESH_TOKENS_REQUEST_SUCCESS,
  payload,
});

export const refreshTokensRequestFailure = error => ({
  type: REFRESH_TOKENS_REQUEST_FAILURE,
  error,
});
