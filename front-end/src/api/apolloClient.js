// import axios from 'axios';

import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';

import { defaults, resolvers } from './resolvers';
import introspectionQueryResultData from './fragmentTypes.json';

const POSTFIX = process.env.REACT_APP_XDEBUG_POSTFIX;
const URL = process.env.REACT_APP_HOST_DOMAIN ? process.env.REACT_APP_HOST_DOMAIN : '';

// const csrf = sessionStorage.getItem('csrfToken') || null;
const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });
const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
  request: async (operation) => {
    const authToken = await localStorage.getItem('authToken') || null;
    // const xcsrf = csrf || await axios.get(`${URL}/session/token`);

    if (authToken !== null) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
    }
  },
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    withClientState({
      defaults,
      resolvers,
      cache,
    }),
    createUploadLink({
      uri: `${URL  }/graphql${  POSTFIX}`,
      credentials: 'include',
    }),
  ]),
  cache,
});

export default client;
