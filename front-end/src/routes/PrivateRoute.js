import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

// class PrivateRouteContainer extends Component {
//   render() {
//     const {
//       isAuthenticated,
//       isLoggingIn,
//       component: Component,
//       ...props
//     } = this.props;

//     return (
//       <Route
//         {...props}
//         render={props =>
//           (isAuthenticated || isLoggingIn
//             ? <Component {...props} />
//             : (
//               <Redirect to={{
//               pathname: '/login',
//               state: { from: props.location },
//             }}
//               />
//           ))
//         }
//       />
//     );
//   }
// }


const PrivateRouteContainer = (props) => {
  const {
    isAuthenticated,
    isLoggingIn,
  } = props;

  return (
    <Route
      {...props}
      render={() =>
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
};

PrivateRouteContainer.propTypes = {
  location: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
};

const PrivateRoute = connect(state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoggingIn: state.authReducer.isLoggingIn,
}))(PrivateRouteContainer);

export default PrivateRoute;
