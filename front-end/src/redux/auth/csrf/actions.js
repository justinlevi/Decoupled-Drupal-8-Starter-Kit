// ---------------
// Actions
// ---------------

export const INIT_CSRF_TOKEN = 'INIT_CSRF_TOKEN';
export const CSRF_TOKEN_SUCCESS = 'CSRF_TOKEN_SUCCESS';

export const SET_CSRF_TOKEN = 'SET_CSRF_TOKEN';

export const ACTIONS = {
  INIT_CSRF_TOKEN,
  CSRF_TOKEN_SUCCESS,
  SET_CSRF_TOKEN,
};

// ---------------
// Action Creators
// ---------------

export const initCsrfToken = () => ({
  type: INIT_CSRF_TOKEN,
});

export const csrfTokenSuccess = () => ({
  type: CSRF_TOKEN_SUCCESS,
});

export const setCsrfToken = payload => ({
  type: SET_CSRF_TOKEN,
  payload,
});
