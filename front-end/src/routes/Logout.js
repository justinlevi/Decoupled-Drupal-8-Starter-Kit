import React from 'react';
import { Redirect } from 'react-router-dom';

import { logout } from '../utils/logout';

const LogoutComponent = () => () => {
  logout();
  return (<Redirect to="/" />);
};

export default LogoutComponent;
