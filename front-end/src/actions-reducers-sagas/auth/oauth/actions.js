// ---------------
// Actions
// ---------------

export const INIT_OAUTH = 'INIT_OAUTH';
export const OAUTH_SUCCESS = 'OAUTH_SUCCESS';
export const SET_OAUTH= 'SET_OAUTH';
export const SET_AUTH_CHECK = 'SET_AUTH_CHECK';
export const REFRESH_OAUTH = 'REFRESH_OAUTH';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

// ---------------
// Action Creators
// ---------------

export const setAccessToken = (payload) => ({
  type: SET_ACCESS_TOKEN,
  payload: payload
})

export const initOAuth = (payload) => ({
  type: INIT_OAUTH,
  payload: payload
});

export const refreshOAuth = (payload) => ({
  type: REFRESH_OAUTH,
  payload
})

export const setUsername = (payload) => ({
  type: SET_USERNAME,
  payload
})

export const oauthSuccess = () => ({
  type: OAUTH_SUCCESS
});

export const setOAuth = (payload) => ({
  type: SET_OAUTH,
  payload: payload
});

export const setAuthCheck = (payload) => ({
  type: SET_AUTH_CHECK,
  payload: payload
})
