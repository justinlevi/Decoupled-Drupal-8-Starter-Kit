import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

import { graphql, compose } from 'react-apollo';
import { SESSION_QUERY } from '../api/apolloProxy';

const RedirectToLogin = () => (<Redirect to={{ pathname: '/login' }} />);

const PrivateRouteContainer = props => (
  <Route
    {...props}
    component={props.isAuthenticated ?
      props.component :
      RedirectToLogin}
  />
);

PrivateRouteContainer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default compose(graphql(SESSION_QUERY, {
  props: ({ data }) => ({ isAuthenticated: data.session.isAuthenticated }),
}))(PrivateRouteContainer);
