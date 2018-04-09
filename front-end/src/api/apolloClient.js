import ApolloClient from 'apollo-boost';
import { ApolloLink } from 'apollo-link';
import axios from 'axios';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import { defaults, resolvers } from './resolvers';
import introspectionQueryResultData from './fragmentTypes.json';

const POSTFIX = process.env.REACT_APP_XDEBUG_POSTFIX;
const URL = process.env.REACT_APP_HOST_DOMAIN ? process.env.REACT_APP_HOST_DOMAIN : '';

const csrf = sessionStorage.getItem('csrfToken') || null;
const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });

const uploadLink = createUploadLink({
  uri: URL.concat(`/graphql${POSTFIX}`),
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    uploadLink,
  ]),
  cache: new InMemoryCache({ fragmentMatcher }),
  uri: URL.concat(`/graphql${POSTFIX}`),
  fetchOptions: {
    credentials: 'include',
  },
  request: async (operation) => {
    const xcsrf = csrf || await axios.get(`${URL}/session/token`);
    const headers = { 'X-CSRF-Token': xcsrf.data };

    const authToken = localStorage.getItem('authToken') || null;
    if (authToken !== null) {
      headers.authorization = `Bearer ${authToken}`;
    }
    operation.setContext({ headers });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors);
      // sendToLoggingService(graphQLErrors);
    }
    if (networkError) {
      // logoutUser();
      console.log(networkError);
    }
  },
  clientState: {
    defaults,
    resolvers,
  },
});

export default client;
