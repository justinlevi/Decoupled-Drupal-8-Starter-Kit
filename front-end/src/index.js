import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './api/apolloClient';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

import './styles/index.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'),
);
registerServiceWorker();
