import * as oauthTokens from './oAuthToken.json';

const URL = process.env.REACT_APP_HOST_DOMAIN ? process.env.REACT_APP_HOST_DOMAIN : '';
const OAUTH_ENDPOINT = `${URL}/oauth/token`;

module.exports = {
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
