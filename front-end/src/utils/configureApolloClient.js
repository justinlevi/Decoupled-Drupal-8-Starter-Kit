import { ApolloLink, concat } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';
import { getToken } from './oauth';

const POSTFIX = process.env.REACT_APP_XDEBUG_POSTFIX;
const URL = process.env.REACT_APP_HOST_DOMAIN;

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the access_token to the headers
  let csrfToken = `${sessionStorage.getItem('csrfToken')}`;

  operation.setContext( context => ({
    headers: {
      authorization: getToken() || null,
      'X-CSRF-Token': csrfToken || null,
    }
  }));
  return forward(operation);
})

const link = new HttpLink(
  {
    uri: URL.concat('/graphql' + POSTFIX),
  }
);

const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData});

const client = new ApolloClient({
  // link: createUploadLink({ uri: process.env.API_URI })
  link: concat(authMiddleware, link),
  cache: new InMemoryCache({fragmentMatcher}),
});

export default client;