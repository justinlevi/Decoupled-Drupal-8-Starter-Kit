import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import initalizeCsrfToken from './utils/csrf';
import registerServiceWorker from './registerServiceWorker';
import './styles/css/index.css';

initalizeCsrfToken();

ReactDOM.render(<AppContainer />, document.getElementById('root'));
registerServiceWorker();
