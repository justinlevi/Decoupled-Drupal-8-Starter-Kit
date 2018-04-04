import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { withApollo, graphql } from 'react-apollo';

import { updateAuthenticated } from '../api/apolloProxy';

import PrivateRoute from './PrivateRoute';

import PageTemplate from '../containers/PageTemplate';
import Login from '../containers/LoginPage';
import Home from '../containers/HomePage';
import List from '../containers/ListPage';
import Edit from '../containers/EditPage';

const Logout = () => withApollo((props) => {
  localStorage.removeItem('authToken');
  updateAuthenticated(props.client, { isAuthenticated: false });
  return (<Redirect to="/" />);
});

const Routes = () =>
  (
    <Router>
      <Switch>
        <PageTemplate >
          <Route path="/" exact component={withApollo(Home)} />
          <PrivateRoute path="/list" exact component={withApollo(List)} />
          <PrivateRoute path="/edit" component={withApollo(Edit)} />
          <Route path="/login" exact component={withApollo(Login)} />
          <Route path="/logout" exact component={withApollo(Logout)} />
        </PageTemplate>
      </Switch>
    </Router>
  );

export default Routes;
