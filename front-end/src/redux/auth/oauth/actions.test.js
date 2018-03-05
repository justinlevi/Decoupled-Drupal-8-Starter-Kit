import { types, loginRequest } from './actions';

describe('Actions', () => {
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
});
