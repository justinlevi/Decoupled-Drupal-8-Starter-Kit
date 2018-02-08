// ---------------
// Actions
// ---------------

export const SET_APOLLO_CLIENT = 'SET_APOLLO_CLIENT';
export const CSRF_ACCESS_TOKENS_SET = 'CSRF_ACCESS_TOKENS_SET';

// ---------------
// Action Creators
// ---------------

export const setApolloClient = (payload) => ({
  type: SET_APOLLO_CLIENT,
  payload: payload
})

export const csrfAccessTokensSet = () => ({
  type: CSRF_ACCESS_TOKENS_SET
})
