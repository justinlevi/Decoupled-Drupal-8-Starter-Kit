import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'containers/AppContainer';
import registerServiceWorker from 'registerServiceWorker';
import 'styles/index.css';
import configureStore from 'redux/configureStore';
import { Provider } from 'react-redux';
import { InitCsrfToken } from 'redux/rootActions';

const store = configureStore();

store.dispatch(InitCsrfToken());

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>
  ,document.getElementById('root'));
registerServiceWorker();
