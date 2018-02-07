export const initialState = {
  accessToken: null,
  refreshToken: null,
  expiration: null,
  authenticated: false,
  timestamp: null
};

export const reducer = (state = initialState, {type, payload}) => {
  switch (type) {

    case 'SET_OAUTH':
      console.log("OAUTH SET");
      return {
        ...state,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        expiration: payload.expiration,
        authenticated: payload.authenticated,
        timestamp: payload.timestamp
      };

    default:
      return state;
  }
};

export default reducer;
