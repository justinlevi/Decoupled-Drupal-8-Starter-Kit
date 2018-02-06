// ---------------
// Actions
// ---------------

export const INIT_OAUTH = 'INIT_OAUTH';
export const OAUTH_SUCCESS = 'OAUTH_SUCCESS';
export const SET_OAUTH= 'SET_OAUTH';
export const SET_AUTH_CHECK = 'SET_AUTH_CHECK';

// ---------------
// Action Creators
// ---------------

export const initOAuth = (payload) => ({
  type: INIT_OAUTH,
  payload: payload
});

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
