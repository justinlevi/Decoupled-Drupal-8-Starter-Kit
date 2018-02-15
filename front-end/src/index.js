import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from 'registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from 'redux/configureStore';
import { InitCsrfToken } from 'redux/rootActions';
import * as AppContainer from 'containers/AppContainer';
import 'styles/index.css';

const store = configureStore();

store.dispatch(InitCsrfToken());

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>
  , document.getElementById('root'),
);
registerServiceWorker();
