import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import { LoginPage, Logout, HomePage, ListPage } from 'containers';

import { pagesByUserQuery } from '../api/queries';

const ConnectedSwitch = connect(state => ({ location: state.router.location }))(Switch);

const renderAnonymous = () => (
  <ConnectedSwitch>
    <Route path="/" component={LoginPage} />
  </ConnectedSwitch>
);

const Routes = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return renderAnonymous();
  }

  return (
    <ConnectedSwitch>
      <Route path="/" exact component={HomePage} />
      <Route path="/list" exact component={graphql(pagesByUserQuery)(ListPage)} />
      <Route path="/login" component={LoginPage} />
      <Route path="/logout" component={Logout} />
    </ConnectedSwitch>
  );
};

Routes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggingIn: state.oauth.isLoggingIn,
  isAuthenticated: state.oauth.isAuthenticated,
  error: state.oauth.error,
});

export default connect(mapStateToProps)(Routes);

