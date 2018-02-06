const initState = {
    accessToken: null,
    refreshToken: null,
    expiration: null,
    authenticated: false,
    timestamp: null
  };

export const reducer = (state = initState, {type, payload}) => {
  switch (type) {

    case 'SET_OAUTH':
      sessionStorage.setItem('accessToken',payload.accessToken);
      localStorage.setItem('refreshToken',payload.refreshToken);
      
      return {
        ...state,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        expiration: payload.expiration,
        authenticated: payload.authenticated,
        timestamp: payload.timestamp
      };

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
