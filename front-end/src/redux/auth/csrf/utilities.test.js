import * as utilities from './utilities';

describe('csrf utilities tests', () => {
  it('Should return an error if the fetch csrf can not reach the endpoint', async () => {
    expect.assertions(1);
    utilities.fetchCsrfToken('http://asdf.loc')
      .then((result) => {
        expect(result).toEqual(new Error('url not reachable'));
      });
  });
});
