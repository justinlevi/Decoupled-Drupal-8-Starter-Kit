import * as utilities from './utilities';

describe('oauth utilities tests', () => {
  it('Should evaluate that the token is invalid', () => {
    const past = new Date().getTime() - 1000000;
    expect(utilities.isTokenValid('111', past, '1000')).toEqual(false);
  });

  it('Should evaluate that the token is valid', () => {
    const now = new Date().getTime();
    expect(utilities.isTokenValid('111', now, '1000')).toEqual(true);
  });

  it('should generate password credentials', () => {
    const expected = {
      ...utilities.CLIENT_INFO,
      grant_type: 'password',
      password: 'test',
      username: 'test',
    };
    const actual = utilities.generateCredentials('password', 'test', 'test');
    expect(actual).toEqual(expected);
  });

  it('fetchToken Should return a token object', async () => {
    const credentials = utilities.generateCredentials('password', 'test', 'test', null);
    const expected = {
      expiration: 300,
      accessToken: 'asdf',
      refreshToken: 'asdfasdf',
      timestamp: 1520282915731,
    };
    await utilities.fetchToken(credentials)
      .then((actual) => {
        expect(actual.expiration).toEqual(expected.expiration);
        expect(actual.accessToken).toEqual(expected.accessToken);
        expect(actual.refreshToken).toEqual(expected.refreshToken);
      });
  });

  it('should persist credentials', () => {
    const credentials = {
      accessToken: 123, expiration: 456, refreshToken: 789, timestamp: 101101,
    };
    utilities.persistCredentials(credentials);

    expect(sessionStorage.setItem.mock.calls[0][1]).toBe(123);
    expect(sessionStorage.setItem.mock.calls[1][1]).toBe(456);
    expect(localStorage.setItem.mock.calls[0][1]).toBe(789);
    expect(localStorage.setItem.mock.calls[1][1]).toBe(101101);
  });
});
