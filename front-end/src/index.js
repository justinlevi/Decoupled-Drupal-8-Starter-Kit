import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { ApolloProvider, withApollo } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import axios from 'axios';

import registerServiceWorker from 'registerServiceWorker';

import Login from './containers/LoginPage';
import configureStore from './redux/store';

import './styles/index.css';

const history = createHistory();
const store = configureStore(history);

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
    defaults: {
      isConnected: true,
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected } });
          return null;
        },
      },
    },
  },
});

const LoginWithApollo = withApollo(Login);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ConnectedRouter history={history}>
        <LoginWithApollo />
      </ConnectedRouter>
    </ApolloProvider>
  </Provider>
  , document.getElementById('root'),
);
registerServiceWorker();
