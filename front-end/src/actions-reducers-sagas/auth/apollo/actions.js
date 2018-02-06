// ---------------
// Actions
// ---------------

//GETTERS
export const INIT_APOLLO_CLIENT = 'INIT_APOLLO_CLIENT';

//SETTERS
export const SET_APOLLO_CLIENT = 'SET_APOLLO_CLIENT';

// ---------------
// Action Creators
// ---------------

//GETTERS
export const initApolloClient = () => ({
  type: INIT_APOLLO_CLIENT
});

//SETTERS
export const setApolloClient = (payload) => ({
  type: SET_APOLLO_CLIENT,
  payload: payload
})
