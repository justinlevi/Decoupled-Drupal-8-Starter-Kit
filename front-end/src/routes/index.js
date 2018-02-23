import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import PrivateRoute from './PrivateRoute';

import Login from '../containers/LoginPage';
import Home from '../containers/HomePage';
import List from '../containers/ListPage';
import Edit from '../containers/EditPage';

import { logout } from '../redux/auth/oauth/actions';

const ConnectedSwitch = connect(state => ({ location: state.routerReducer.location }))(Switch);

const mapStateToProps = state => ({
  isLoggingIn: state.authReducer.isLoggingIn,
  isAuthenticated: state.authReducer.isAuthenticated,
  error: state.authReducer.error,
});

const Logout = connect(mapStateToProps)(({ dispatch }) => {
  dispatch(logout());
  return <Redirect to="/" />;
});

const Routes = props =>
  (
    <ConnectedRouter history={props.history}>
      <ConnectedSwitch>
        <Route path="/" exact component={connect(mapStateToProps)(Home)} />
        <PrivateRoute path="/list" exact component={List} />
        <PrivateRoute path="/edit" component={Edit} />
        <Route path="/login" exact component={connect(mapStateToProps)(Login)} />
        <Route path="/logout" exact component={Logout} />
      </ConnectedSwitch>
    </ConnectedRouter>
  );
Routes.propTypes = {
  history: PropTypes.shape({}).isRequired,
};


export default connect(mapStateToProps)(Routes);

