import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

import { updateAuthenticated, SESSION_QUERY } from '../api/apolloProxy';

import PrivateRoute from './PrivateRoute';

import PageTemplate from '../containers/PageTemplate';
import Login from '../containers/LoginPage';
import Home from '../containers/HomePage';
import List from '../containers/ListPage';
import Edit from '../containers/EditPage';

const Logout = () => () => {
  localStorage.removeItem('authToken');
  updateAuthenticated({ isAuthenticated: false });
  return (<Redirect to="/" />);
};

const getSession = graphql(SESSION_QUERY, {
  props: ({ data }) => ({ isAuthenticated: data.session.isAuthenticated }),
});

const Routes = () =>
  (
    <Router>
      <Switch>
        <PageTemplate >
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/list" exact component={List} />
          <PrivateRoute path="/edit" component={Edit} />
          <Route path="/login" exact component={compose(getSession)(Login)} />
          <Route path="/logout" exact component={Logout()} />
        </PageTemplate>
      </Switch>
    </Router>
  );

export default Routes;
