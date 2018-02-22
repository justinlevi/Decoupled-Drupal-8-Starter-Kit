import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

class PrivateRouteContainer extends Component {
  render() {
    const {
      isAuthenticated,
      isLoggingIn,
      component: Component,
      ...props
    } = this.props;

    return (
      <Route
        {...props}
        render={props =>
          (isAuthenticated || isLoggingIn
            ? <Component {...props} />
            : (
              <Redirect to={{
              pathname: '/login',
              state: { from: props.location },
            }}
              />
          ))
        }
      />
    );
  }
}

const PrivateRoute = connect(state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoggingIn: state.authReducer.isLoggingIn,
}))(PrivateRouteContainer);

export default PrivateRoute;
