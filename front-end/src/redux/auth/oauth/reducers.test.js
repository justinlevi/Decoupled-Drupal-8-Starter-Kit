import { types } from './actions';
import { reducer, initialState } from './reducers';

describe('Reducer', () => {
  it('Should return the initial state when no action passed', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});

describe('Login', () => {
  const credentials = {
    username: 'test',
    password: 'test',
  };
  it('Should return the correct state', () => {
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
});
