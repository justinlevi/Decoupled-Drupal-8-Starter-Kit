import { isTokenValid, fetchToken, generateCredentials } from './utilities';

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('oauth utilities tests', () => {
  it('Should evaluate that the token is invalid', () => {
    const past = new Date().getTime() - 1000000;
    expect(isTokenValid('111', past, '1000')).toEqual(false);
  });

  it('Should evaluate that the token is valid', () => {
    const now = new Date().getTime();
    expect(isTokenValid('111', now, '1000')).toEqual(true);
  });

  it('fetchToken Should return a token object', async () => {
    const credentials = generateCredentials('password', 'test', 'test', null);
    await fetchToken(credentials)
      .then((response) => {
        const actual = response;
        const expected = {
          expiration: 300,
          accessToken: 'asdf',
          refreshToken: 'asdfasdf',
          timestamp: 1520282915731,
        };
        expect(actual.expiration).toEqual(expected.expiration);
        expect(actual.accessToken).toEqual(expected.accessToken);
        expect(actual.refreshToken).toEqual(expected.refreshToken);
      });
  });
});
