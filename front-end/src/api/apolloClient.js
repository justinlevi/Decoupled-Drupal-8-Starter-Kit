import ApolloClient from 'apollo-boost';
import axios from 'axios';

import { defaults, resolvers } from './resolvers';


const POSTFIX = process.env.REACT_APP_XDEBUG_POSTFIX;
const URL = process.env.REACT_APP_HOST_DOMAIN ? process.env.REACT_APP_HOST_DOMAIN : '';

const csrf = sessionStorage.getItem('csrfToken') || null;

const client = new ApolloClient({
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
