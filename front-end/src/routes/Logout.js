import React from 'react';
import { Redirect } from 'react-router-dom';

import { updateAuthenticatedMutation } from '../api/apolloProxy';

const Logout = () => () => {
  localStorage.removeItem('authToken');
  updateAuthenticatedMutation({ isAuthenticated: false });
  return (<Redirect to="/" />);
};

export default Logout;
