import {ApolloLink, concat} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import introspectionQueryResultData from 'api/fragmentTypes.json';

const POSTFIX = process.env.REACT_APP_XDEBUG_POSTFIX;
const URL = process.env.REACT_APP_HOST_DOMAIN;

const getCsrf = () => {
  return sessionStorage.getItem('csrfToken');
};

const getAccessToken = () => {
  return sessionStorage.getItem('accessToken');
};

const authMiddleware = new ApolloLink((operation, forward) => {

  let csrf = getCsrf();
  let token = getAccessToken();

  // add the access_token to the headers
  operation.setContext(context => ({
    headers: {
      authorization: `Bearer ${token}` || null,
      'X-CSRF-Token': csrf || null
    }
  }));
  return forward(operation);
})

const link = new HttpLink({
  uri: URL.concat('/graphql' + POSTFIX)
});

const fragmentMatcher = new IntrospectionFragmentMatcher({introspectionQueryResultData});

const client = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache({fragmentMatcher})
});

export default client;
