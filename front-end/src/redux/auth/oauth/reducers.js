import { ACTIONS } from './actions';
import { persistCredentials, unsetLocalStorageCredentials, getLocalCredentials, persistUsername } from './utilities';

const initialState = {
  credentials: {
    accessToken: null,
    refreshToken: null,
    expiration: null,
    timestamp: null,
    username: null,
  },
  isAuthenticated: false,
  isLoading: false,
  isLoggingIn: !!getLocalCredentials().accessToken,
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
    case ACTIONS.LOGIN_REQUEST:
      return {
        ...state,
        credentials: { ...payload },
        isLoggingIn: true,
      };

    case ACTIONS.LOGIN_SUCCESS:
      loginSuccessHandler(payload);
      return {
        ...state,
        credentials: { ...payload },
        isAuthenticated: true,
        isLoggingIn: false,
      };
    case ACTIONS.LOGIN_FAILURE:
      unsetLocalStorageCredentials();
      return { ...initialState, isLoggingIn: false, error };
    case ACTIONS.LOGOUT:
      unsetLocalStorageCredentials();
      return {
        ...state,
        isAuthenticated: false,
        isLoggingIn: false,
      };

    case ACTIONS.REFRESH_TOKEN_EXPIRED_CHECK:
      return {
        ...state,
      };
    case ACTIONS.TOKENS_EXPIRED_CHECK_VALID:
      return {
        ...state,
        isAuthenticated: true,
        isLoggingIn: false,
      };
    case ACTIONS.TOKENS_EXPIRED_CHECK_NOT_VALID:
      return {
        ...state,
        isAuthenticated: false,
        isLoggingIn: false,
      };

    case ACTIONS.REFRESH_TOKENS_REQUEST:
      return {
        ...state,
        credentials: { ...payload },
        isLoggingIn: true,
      };
    case ACTIONS.REFRESH_TOKENS_REQUEST_SUCCESS:
      loginSuccessHandler(payload);
      return {
        ...state,
        credentials: { ...payload },
        isAuthenticated: true,
        isLoggingIn: false,
      };
    case ACTIONS.REFRESH_TOKENS_REQUEST_FAILURE:
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
