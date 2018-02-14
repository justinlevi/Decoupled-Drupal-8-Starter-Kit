import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App
    isLoading={false}
    isAuthenticated={false}
    handleInputChange={jest.fn()}
    handleLogin={jest.fn()}
    isLoginFailed={false}
  />, div);
});
