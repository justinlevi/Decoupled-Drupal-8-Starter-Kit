import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { defaults, resolvers } from './resolvers';
import introspectionQueryResultData from './fragmentTypes.json';

import customFetch from './customFetch';
import { logout } from '../utils/logout';
import { updateNetworkStatusMutation } from './apolloProxy';

const POSTFIX = process.env.REACT_APP_XDEBUG_POSTFIX;
const URL = process.env.REACT_APP_HOST_DOMAIN ? process.env.REACT_APP_HOST_DOMAIN : '';

// const csrf = sessionStorage.getItem('csrfToken') || null;
const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });
const cache = new InMemoryCache({ fragmentMatcher });

const headers = () => ({
  // spread contents of object if localStorage('authtoken') exists
  ...(localStorage.getItem('authToken')) && {
    headers: {
      authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
      }
      if (networkError) {
        // TODO: You've been logged out... or no access
        if (networkError.statusCode === 403) {
          logout();
        } else {
          console.log(`[Network error]: ${networkError.statusCode} : ${networkError.message}`);
          updateNetworkStatusMutation({ isConnected: false });
        }
        // window.location = '/logout';
      }
    }),
    withClientState({
      defaults,
      resolvers,
      cache,
    }),
    createUploadLink({
      uri: `${URL}/graphql${POSTFIX}`,
      credentials: 'include',
      fetch: typeof window === 'undefined' ? global.fetch : customFetch,
      ...headers(),
    }),
  ]),
  cache,
});

export default client;
