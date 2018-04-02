import { RSAA } from 'redux-api-middleware';

// ---------------
// Actions
// ---------------

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_RECEIVED = 'TOKEN_RECEIVED';
export const TOKEN_FAILURE = 'TOKEN_FAILURE';

export const REFRESH_TOKENS_REQUEST = 'REFRESH_TOKENS_REQUEST';
export const REFRESH_TOKENS_REQUEST_SUCCESS = 'REFRESH_TOKENS_REQUEST_SUCCESS';
export const REFRESH_TOKENS_REQUEST_FAILURE = 'REFRESH_TOKENS_REQUEST_FAILURE';

export const types = {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  TOKEN_REQUEST,
  TOKEN_RECEIVED,
  TOKEN_FAILURE,
};

// ---------------
// Action Creators
// ---------------

export const login = (username, password) => ({
  [RSAA]: {
    endpoint: '/api/auth/token/obtain/',
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    types: [
      LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    ],
  },
});
export const refreshAccessToken = token => ({
  [RSAA]: {
    endpoint: '/api/auth/token/refresh/',
    method: 'POST',
    body: JSON.stringify({ refresh: token }),
    headers: { 'Content-Type': 'application/json' },
    types: [
      TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE,
    ],
  },
});
