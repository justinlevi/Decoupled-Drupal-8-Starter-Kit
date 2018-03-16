import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from 'registerServiceWorker';

import configureStore from 'redux/configureStore';
import App from 'containers/AppContainer';

import 'styles/index.css';

ReactDOM.render(
  <App store={configureStore()} />
  , document.getElementById('root'),
);
registerServiceWorker();
