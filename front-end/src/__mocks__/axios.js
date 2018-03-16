import * as oauthTokens from './oAuthToken.json';

const URL = process.env.REACT_APP_HOST_DOMAIN ? process.env.REACT_APP_HOST_DOMAIN : '';
const OAUTH_ENDPOINT = `${URL}/oauth/token`;
const CSRF_ENDPOINT = `${URL}/session/token`;

module.exports = {
  get: jest.fn((url) => {
    switch (url) {
      case CSRF_ENDPOINT: return Promise.resolve({ data: 'asdf' });
      default: {
        const error = new Error('url not reachable');
        return Promise.reject(error);
      }
    }
  }),
  post: jest.fn((url) => {
    switch (url) {
      case OAUTH_ENDPOINT: {
        const result = Promise.resolve(oauthTokens);
        return result;
      }
      default:
        return null;
    }
  }),
};
