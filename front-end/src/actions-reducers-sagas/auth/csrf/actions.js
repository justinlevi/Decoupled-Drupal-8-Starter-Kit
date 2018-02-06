// ---------------
// Actions
// ---------------

//GETTERS
export const INIT_CSRF_TOKEN = 'INIT_CSRF_TOKEN';

//SETTERS
export const SET_CSRF_TOKEN = 'SET_CSRF_TOKEN';

// ---------------
// Action Creators
// ---------------

//GETTERS
export const initCsrfToken = () => ({
  type: INIT_CSRF_TOKEN
});

//SETTERS
export const setCsrfToken = (payload) => ({
  type: SET_CSRF_TOKEN,
  payload: payload
})
