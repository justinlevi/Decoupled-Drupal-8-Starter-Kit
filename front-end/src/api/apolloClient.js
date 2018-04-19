import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { defaults, resolvers } from './resolvers';
import introspectionQueryResultData from './fragmentTypes.json';

const POSTFIX = process.env.REACT_APP_XDEBUG_POSTFIX;
const URL = process.env.REACT_APP_HOST_DOMAIN ? process.env.REACT_APP_HOST_DOMAIN : '';

// const csrf = sessionStorage.getItem('csrfToken') || null;
const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });
const cache = new InMemoryCache({ fragmentMatcher });

const request = (operation) => {
  const authToken = localStorage.getItem('authToken') || null;
  if (authToken) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
  }
};

const requestLink = new ApolloLink((operation, forward) =>
  new Observable((observer) => {
    let handle: any;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  }));

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        window.location = '/logout';
      }
    }),
    requestLink,
    withClientState({
      defaults,
      resolvers,
      cache,
    }),
    createUploadLink({
      uri: `${URL}/graphql${POSTFIX}`,
      credentials: 'include',
    }),
  ]),
  cache,
});

export default client;
