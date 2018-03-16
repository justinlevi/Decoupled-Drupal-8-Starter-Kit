import * as actions from './actions';

describe('Actions', () => {
  const {
    types,
    initCsrfToken,
    setCsrfToken,
    csrfTokenSuccess,
  } = actions;

  const payload = 'asdf';

  it('Should create an action to initCsrfToken', () => {
    const expectedAction = {
      type: types.INIT_CSRF_TOKEN,
    };

    expect(initCsrfToken()).toEqual(expectedAction);
  });

  it('Should create an action to setCsrfToken', () => {
    const expectedAction = {
      type: types.SET_CSRF_TOKEN,
      payload,
    };

    expect(setCsrfToken(payload)).toEqual(expectedAction);
  });

  it('Should create an action to csrfTokenSuccess', () => {
    const expectedAction = {
      type: types.CSRF_TOKEN_SUCCESS,
    };

    expect(csrfTokenSuccess()).toEqual(expectedAction);
  });
});
