import React from 'react';
import { Redirect } from 'react-router-dom';

import { updateAuthenticated } from '../api/apolloProxy';

const Logout = () => () => {
  localStorage.removeItem('authToken');
  updateAuthenticated({ isAuthenticated: false });
  return (<Redirect to="/" />);
};

export default Logout;
