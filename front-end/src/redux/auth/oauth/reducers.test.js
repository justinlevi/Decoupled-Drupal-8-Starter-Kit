import { types } from './actions';
import { reducer, initialState } from './reducers';

describe('Reducer', () => {
  it('Should return the initial state when no action passed', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});

describe('Login', () => {
  // beforeEach(() => {
  // });

  const credentials = {
    username: 'test',
    password: 'test',
  };

  it('LOGIN_REQUEST action should return the correct state', () => {
    const action = {
      type: types.LOGIN_REQUEST,
      payload: credentials,
    };
    const expectedState = {
      ...initialState,
      credentials,
      isLoggingIn: true,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('LOGIN_SUCCESS action should return the correct state', () => {
    const action = {
      type: types.LOGIN_SUCCESS,
      payload: credentials,
    };
    const expectedState = {
      credentials: {
        accessToken: null,
        refreshToken: null,
        expiration: null,
        timestamp: null,
        username: 'test',
      },
      isAuthenticated: true,
      isLoading: false,
      isLoggingIn: false,
      error: undefined,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('LOGIN_FAILURE action should return the correct state', () => {
    const action = {
      type: types.LOGIN_FAILURE,
      error: 'silly error',
    };
    const expectedState = {
      ...initialState,
      error: 'silly error',
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('LOGOUT action should return the correct state', () => {
    const action = {
      type: types.LOGOUT,
    };
    const expectedState = {
      ...initialState,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  // it('TOKENS_EXPIRED_CHECK action should return the correct state', () => {
  //   const action = {
  //     type: types.TOKENS_EXPIRED_CHECK,
  //   };
  //   const expectedState = {

  //   };
  //   expect(reducer(undefined, action)).toEqual(expectedState);
  // });

  // it('TOKENS_EXPIRED_CHECK_VALID action should return the correct state', () => {
  //   const action = {
  //     type: types.TOKENS_EXPIRED_CHECK_VALID,
  //   };
  //   const expectedState = {

  //   };
  //   expect(reducer(undefined, action)).toEqual(expectedState);
  // });

  // it('TOKENS_EXPIRED_CHECK_NOT_VALID action should return the correct state', () => {
  //   const action = {
  //     type: types.TOKENS_EXPIRED_CHECK_NOT_VALID,
  //   };
  //   const expectedState = {

  //   };
  //   expect(reducer(undefined, action)).toEqual(expectedState);
  // });

  // it('REFRESH_TOKENS_REQUEST action should return the correct state', () => {
  //   const action = {
  //     type: types.REFRESH_TOKENS_REQUEST,
  //     payload: {},
  //   };
  //   const expectedState = {

  //   };
  //   expect(reducer(undefined, action)).toEqual(expectedState);
  // });

  // it('REFRESH_TOKENS_REQUEST_SUCCESS action should return the correct state', () => {
  //   const action = {
  //     type: types.REFRESH_TOKENS_REQUEST_SUCCESS,
  //     payload: {},
  //   };
  //   const expectedState = {

  //   };
  //   expect(reducer(undefined, action)).toEqual(expectedState);
  // });

  // it('REFRESH_TOKENS_REQUEST_FAILURE action should return the correct state', () => {
  //   const action = {
  //     type: types.REFRESH_TOKENS_REQUEST_FAILURE,
  //     error: {},
  //   };
  //   const expectedState = {

  //   };
  //   expect(reducer(undefined, action)).toEqual(expectedState);
  // });
});
