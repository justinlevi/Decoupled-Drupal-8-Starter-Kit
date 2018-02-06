import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import initalizeCsrfToken from './utils/csrf';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import {InitCsrfToken} from './rootActions';

const store = configureStore();

store.dispatch(InitCsrfToken());

initalizeCsrfToken();

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>
  ,document.getElementById('root'));
registerServiceWorker();
