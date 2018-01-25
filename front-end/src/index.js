import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './AppContainer';
import initalizeCsrfToken from './utils/csrf';
import registerServiceWorker from './registerServiceWorker';

initalizeCsrfToken();

ReactDOM.render(<AppContainer />, document.getElementById('root'));
registerServiceWorker();
