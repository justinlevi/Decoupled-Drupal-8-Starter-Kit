import { ApolloLink, concat } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from 'api/fragmentTypes.json';

const POSTFIX = process.env.REACT_APP_XDEBUG_POSTFIX;
const URL = process.env.REACT_APP_HOST_DOMAIN;

const getCsrf = () => sessionStorage.getItem('csrfToken');

const getAccessToken = () => sessionStorage.getItem('accessToken');

const authMiddleware = new ApolloLink((operation, forward) => {
  const csrf = getCsrf();
  const token = getAccessToken();

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

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache({ fragmentMatcher }),
});

export default apolloClient;
