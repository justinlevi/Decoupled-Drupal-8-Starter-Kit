import { types } from './actions';
import { persistCredentials, unsetLocalStorageCredentials, persistUsername } from './utilities';

export const initialState = {
  credentials: {
    accessToken: null,
    refreshToken: null,
    expiration: null,
    timestamp: null,
    username: null,
  },
  isAuthenticated: false,
  isLoading: false,
  isLoggingIn: false,
  error: undefined,
};

const loginSuccessHandler = (payload) => {
  persistCredentials(payload);
  if (payload.username) {
    persistUsername(payload.username);
  }
};


export const reducer = (state = initialState, { type, payload, error }) => {
  switch (type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        credentials: { ...payload },
        isLoggingIn: true,
      };

    case types.LOGIN_SUCCESS:
      loginSuccessHandler(payload);

      return {
        ...state,
        credentials: {
          accessToken: payload.accessToken || initialState.credentials.accessToken,
          refreshToken: payload.refreshToken || initialState.credentials.refreshToken,
          expiration: payload.expiration || initialState.credentials.expiration,
          timestamp: payload.timestamp || initialState.credentials.timestamp,
          username: payload.username,
        },
        isAuthenticated: true,
        isLoggingIn: false,
      };
    case types.LOGIN_FAILURE:
      unsetLocalStorageCredentials();
      return { ...initialState, isLoggingIn: false, error };
    case types.LOGOUT:
      unsetLocalStorageCredentials();
      return {
        ...state,
        isAuthenticated: false,
        isLoggingIn: false,
      };

    case types.REFRESH_TOKEN_EXPIRED_CHECK:
      return {
        ...state,
      };
    case types.TOKENS_EXPIRED_CHECK_VALID:
      return {
        ...state,
        isAuthenticated: true,
        isLoggingIn: false,
      };
    case types.TOKENS_EXPIRED_CHECK_NOT_VALID:
      return {
        ...state,
        isAuthenticated: false,
        isLoggingIn: false,
      };

    case types.REFRESH_TOKENS_REQUEST:
      return {
        ...state,
        credentials: { ...payload },
        isLoggingIn: true,
      };
    case types.REFRESH_TOKENS_REQUEST_SUCCESS:
      loginSuccessHandler(payload);
      return {
        ...state,
        credentials: { ...payload },
        isAuthenticated: true,
        isLoggingIn: false,
      };
    case types.REFRESH_TOKENS_REQUEST_FAILURE:
      unsetLocalStorageCredentials();
      return {
        ...initialState,
        isLoggingIn: false,
        error: payload,
      };


    default:
      return state;
  }
};

export default reducer;
