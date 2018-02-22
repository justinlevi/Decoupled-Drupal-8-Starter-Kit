import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from 'registerServiceWorker';
import createHistory from 'history/createBrowserHistory';

import configureStore from 'redux/configureStore';
import App from 'containers/AppContainer';

import 'styles/index.css';

const history = createHistory();

ReactDOM.render(
  <App store={configureStore(history)} history={history} />
  , document.getElementById('root'),
);
registerServiceWorker();
