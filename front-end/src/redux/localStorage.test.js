
import * as localStorage from './localStorage';

describe('', () => {
  it('should do the thing', () => {
    expect(localStorage.loadState()).toEqual({ Hey: 'Ho' });
    expect(localStorage.loadState()).toEqual(undefined);
  });
});
