const initState = {
    accessToken: null,
    refreshToken: null,
    expiration: null,
    authenticated: false,
    timestamp: null,
    username: null
  };

export const reducer = (state = initState, {type, payload}) => {
  switch (type) {

    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: payload
      }

    case 'SET_OAUTH':

      sessionStorage.setItem('accessToken',payload.accessToken);
      sessionStorage.setItem('expirationTime',payload.expiration);
      localStorage.setItem('refreshToken',payload.refreshToken);
      localStorage.setItem('lastRefreshedToken',payload.timestamp);

      return {
        ...state,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        expiration: payload.expiration,
        authenticated: payload.authenticated,
        timestamp: payload.timestamp
      };

    case 'SET_USERNAME':
      return {
        ...state,
        username: payload
      }

    case 'SET_AUTH_CHECK':
      return{
        ...state,
        authenticated: payload
      };

    default:
      return state;
  }
};

export default reducer;
