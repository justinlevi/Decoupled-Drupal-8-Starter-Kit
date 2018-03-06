import * as actions from './actions';

describe('Actions', () => {
  const {
    types,
    loginRequest,
    loginSuccess,
    loginFailure,
    logout,
    tokensExpiredCheck,
    tokensExpiredCheckValid,
    tokensExpiredCheckNotValid,
    refreshTokensRequest,
    refreshTokensRequestSuccess,
    refreshTokensRequestFailure,
  } = actions;

  const payload = { data: 'placeholderData' };
  const error = 'silly error';
  const credentials = {
    username: 'test',
    password: 'test',
  };

  it('Should create an action to login', () => {
    const expectedAction = {
      type: types.LOGIN_REQUEST,
      payload: credentials,
    };

    expect(loginRequest(credentials)).toEqual(expectedAction);
  });

  it('Should create an action for loginSuccess', () => {
    const expectedAction = {
      type: types.LOGIN_SUCCESS,
      payload,
    };

    expect(loginSuccess(payload)).toEqual(expectedAction);
  });

  it('Should create an action for loginFailure', () => {
    const expectedAction = {
      type: types.LOGIN_FAILURE,
      error,
    };

    expect(loginFailure(error)).toEqual(expectedAction);
  });

  it('Should create an action for loginOut', () => {
    const expectedAction = {
      type: types.LOGOUT,
    };

    expect(logout(error)).toEqual(expectedAction);
  });

  it('Should create an action for tokensExpiredCheck', () => {
    const expectedAction = {
      type: types.TOKENS_EXPIRED_CHECK,
    };

    expect(tokensExpiredCheck()).toEqual(expectedAction);
  });


  it('Should create an action for tokensExpiredCheckValid', () => {
    const expectedAction = {
      type: types.TOKENS_EXPIRED_CHECK_VALID,
    };

    expect(tokensExpiredCheckValid()).toEqual(expectedAction);
  });

  it('Should create an action for tokensExpiredCheckNotValid', () => {
    const expectedAction = {
      type: types.TOKENS_EXPIRED_CHECK_NOT_VALID,
    };

    expect(tokensExpiredCheckNotValid()).toEqual(expectedAction);
  });

  it('Should create an action for refreshTokensRequest', () => {
    const expectedAction = {
      type: types.REFRESH_TOKENS_REQUEST,
      payload,
    };

    expect(refreshTokensRequest(payload)).toEqual(expectedAction);
  });

  it('Should create an action for refreshTokensRequestSuccess', () => {
    const expectedAction = {
      type: types.REFRESH_TOKENS_REQUEST_SUCCESS,
      payload,
    };

    expect(refreshTokensRequestSuccess(payload)).toEqual(expectedAction);
  });

  it('Should create an action for refreshTokensRequestFailure', () => {
    const expectedAction = {
      type: types.REFRESH_TOKENS_REQUEST_FAILURE,
      error,
    };

    expect(refreshTokensRequestFailure(error)).toEqual(expectedAction);
  });
});
