// ---------------
// Actions
// ---------------

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOCOUT';

export const REFRESH_TOKEN_EXPIRED_CHECK = 'REFRESH_TOKEN_EXPIRED_CHECK';
export const REFRESH_TOKEN_VALID = 'REFRESH_TOKEN_VALID';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_REQUEST_SUCCESS = 'REFRESH_TOKEN_REQUEST_SUCCESS';
export const REFRESH_TOKEN_REQUEST_FAILURE = 'REFRESH_TOKEN_REQUEST_FAILURE';

export const ACTIONS = {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REFRESH_TOKEN_EXPIRED_CHECK,
  REFRESH_TOKEN_VALID,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_REQUEST_SUCCESS,
  REFRESH_TOKEN_REQUEST_FAILURE,
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

export const refreshTokenExpiredCheck = payload => ({
  type: REFRESH_TOKEN_EXPIRED_CHECK,
  payload,
});

export const refreshTokenValid = () => ({
  type: REFRESH_TOKEN_VALID,
});

export const refreshTokenRequest = payload => ({
  type: REFRESH_TOKEN_REQUEST,
  payload,
});

export const refreshTokenRequestSuccess = payload => ({
  type: REFRESH_TOKEN_REQUEST_SUCCESS,
  payload,
});

export const refreshTokenRequestFailure = error => ({
  type: REFRESH_TOKEN_REQUEST_FAILURE,
  error,
});
