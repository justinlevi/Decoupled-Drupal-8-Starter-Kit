import { reducer, initialState } from './reducers';

describe('Reducer', () => {
  it('Should return the initial state when no action passed', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
