import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
// import { graphql } from 'react-apollo';


import PrivateRoute from './PrivateRoute';
import { LoginPage, HomePage, ListPage } from '../containers';
import { logout } from '../redux/auth/oauth/actions';

// import { pagesByUserQuery } from '../api/apolloProxy';

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
        <Route path="/" exact component={connect(mapStateToProps)(HomePage)} />
        <PrivateRoute path="/list" exact component={ListPage} />
        <Route path="/login" exact component={connect(mapStateToProps)(LoginPage)} />
        <Route path="/logout" exact component={Logout} />
      </ConnectedSwitch>
    </ConnectedRouter>
  );
Routes.propTypes = {
  history: PropTypes.shape({}).isRequired,
};


export default connect(mapStateToProps)(Routes);

