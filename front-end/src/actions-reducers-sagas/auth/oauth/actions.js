// ---------------
// Actions
// ---------------

export const INIT_OAUTH = 'INIT_OAUTH';
export const OAUTH_SUCCESS = 'OAUTH_SUCCESS';
export const SET_OAUTH= 'SET_OAUTH';

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
