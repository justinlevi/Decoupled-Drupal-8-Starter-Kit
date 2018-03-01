import { ApolloLink, concat } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from 'api/fragmentTypes.json';

import {
  currentUserUidQuery,
  articlesByUserQuery,
  addArticleMutation,
  deleteArticleMutation,
  updateArticleMutation,
  getSignedUrls,
  addS3Files,
} from './apolloProxy';

import { fetchCsrfToken } from '../redux/auth/csrf/utilities';
import { fetchToken, generateCredentials } from '../redux/auth/oauth/utilities';

const POSTFIX = process.env.REACT_APP_XDEBUG_POSTFIX;
const URL = process.env.REACT_APP_HOST_DOMAIN ? process.env.REACT_APP_HOST_DOMAIN : '';

describe('ApolloProxy', async () => {
  const csrfToken = await fetchCsrfToken();
  const credentials = generateCredentials('password', 'admin', 'admin', '');
  const tokens = await fetchToken(credentials);

  const authMiddleware = new ApolloLink((operation, forward) => {
    const csrf = csrfToken;
    const token = tokens.accessToken;

    // add the access_token to the headers
    operation.setContext(() => ({
      headers: {
        authorization: `Bearer ${token}` || null,
        'X-CSRF-Token': csrf || null,
      },
    }));
    return forward(operation);
  });

  const link = new HttpLink({
    uri: URL.concat(`/graphql${POSTFIX}`),
  });

  const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });

  const apolloClient = new ApolloClient({
    link: concat(authMiddleware, link),
    cache: new InMemoryCache({ fragmentMatcher }),
  });

  describe('Snapshots', () => {
    it('should render correctly', async () => {
      const userUidQuery = await apolloClient.query({ query: currentUserUidQuery });
      expect(userUidQuery).toMatchSnapshot();


      const articlesByUser = await apolloClient.query({ query: articlesByUserQuery });
      expect(articlesByUser).toMatchSnapshot();
    });
  });
});
