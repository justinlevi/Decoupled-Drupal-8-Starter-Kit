import { ACTIONS } from './actions';

const initialState = {
  credentials: {
    accessToken: null,
    refreshToken: null,
    expiration: null,
    timestamp: null,
    username: null,
  },
  isAuthenticated: false,
  isLoggingIn: false,
  error: null,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.LOGIN_REQUEST || ACTIONS.REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        credentials: { ...payload },
        isLoggingIn: true,
      };
    case ACTIONS.LOGIN_SUCCESS || ACTIONS.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        credentials: { ...payload },
        isAuthenticated: true,
      };
    case ACTIONS.LOGIN_FAILURE || ACTIONS.REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: payload,
      };
    case ACTIONS.LOGOUT:
      return initialState;

    case ACTIONS.REFRESH_TOKEN_EXPIRED_CHECK:
      return {
        ...state,
      };

    case ACTIONS.REFRESH_TOKEN_VALID:
      return {
        ...state,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};

export default reducer;
