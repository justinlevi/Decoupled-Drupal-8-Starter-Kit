import { types } from './actions';
import { reducer, initialState } from './reducers';

describe('Reducer', () => {
  it('Should return the initial state when no action passed', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});

describe('CSRF_TOKEN', () => {
  it('SET_CSRF_TOKEN action should return the correct state', () => {
    const action = {
      type: types.SET_CSRF_TOKEN,
      payload: 'asdf',
    };
    const expectedState = {
      ...initialState,
      csrfToken: 'asdf',
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });
});
