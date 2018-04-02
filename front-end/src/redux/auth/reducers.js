import jwtDecode from 'jwt-decode';
import * as auth from './actions';

const initialState = {
  access: undefined,
  refresh: undefined,
  errors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case auth.LOGIN_SUCCESS:
      return {
        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access),
        },
        refresh: {
          token: action.payload.refresh,
          ...jwtDecode(action.payload.refresh),
        },
        errors: {},
      };
    case auth.TOKEN_RECEIVED:
      return {
        ...state,
        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access),
        },
      };
    case auth.LOGIN_FAILURE:
    case auth.TOKEN_FAILURE:
      return {
        access: undefined,
        refresh: undefined,
        errors: action.payload.response || { non_field_errors: action.payload.statusText },
      };
    default:
      return state;
  }
};

export const accessToken = state => (state.access ? state.access.token : null);

export const refreshToken = state => (state.refresh ? state.refresh.token : null);


export const isAccessTokenExpired = (state) => {
  if (state.access && state.access.exp) {
    return (1000 * state.access.exp) - (new Date()).getTime() < 5000;
  }
  return true;
};

export const isRefreshTokenExpired = (state) => {
  if (state.refresh && state.refresh.exp) {
    return (1000 * state.refresh.exp) - (new Date()).getTime() < 5000;
  }
  return true;
};

export const isAuthenticated = state => !isRefreshTokenExpired(state);

export const errors = state => state.errors;
