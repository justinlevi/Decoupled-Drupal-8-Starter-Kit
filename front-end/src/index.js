import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { jwt_decode } from 'jwt-decode';

// import ApolloClient from 'api/apolloClient';
import registerServiceWorker from 'registerServiceWorker';

// import configureStore from 'redux/configureStore';
// import App from './components/App';
import Login from './containers/LoginPage';
import configureStore from './redux/store';

import './styles/index.css';

const history = createHistory();
const store = configureStore(history);

const POSTFIX = process.env.REACT_APP_XDEBUG_POSTFIX;
const URL = process.env.REACT_APP_HOST_DOMAIN ? process.env.REACT_APP_HOST_DOMAIN : '';

let token = localStorage.getItem('token') || null;
let xcsrf = sessionStorage.getItem('csrfToken') || null;
const currentTime = Date.now() / 1000;

token = token ? jwt_decode(token) : null;

const authLink = setContext(async (req, { headers }) => {
  xcsrf = xcsrf || await fetch(`${URL}/session/token`);
  const additionalHeaders = { 'X-CSRF-Token': xcsrf };

  // TO DO : HANDLE REFETCH HERE...
  // token = await
  if (token && token.exp < currentTime) {
    additionalHeaders.authorization = `Bearer ${token}`;
  }

  return {
    headers: {
      ...headers,
      ...additionalHeaders,
    },
  };
});

const link = new HttpLink({
  uri: URL.concat(`/graphql${POSTFIX}`),
});

const client = new ApolloClient({
  link: authLink.concat(authLink, link),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ConnectedRouter history={history}>
        <Login />
      </ConnectedRouter>
    </ApolloProvider>
  </Provider>
  , document.getElementById('root'),
);
registerServiceWorker();
