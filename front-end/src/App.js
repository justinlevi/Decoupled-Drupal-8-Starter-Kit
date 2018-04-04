import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import Routes from './routes';
// import { authErrors, isAuthenticated } from '../redux/rootReducer';


const LoadingComponent = () => (
  <div className="container">
    Loading...
  </div>
);

const ErrorComponent = () => (
  <div>
    Sadly, there seems to have been an error.
    Contact someone super important to help facilitate forward progress.
  </div>
);

const App = ({ isLoading, error }, props) => {
  if (error) {
    return ErrorComponent();
  }

  if (isLoading) {
    return LoadingComponent();
  }

  return <Routes {...props} />;
};

App.propTypes = {
  // isLoading: PropTypes.bool.isRequired,
  // isLoggingIn: PropTypes.bool.isRequired,
  // isAuthenticated: PropTypes.bool.isRequired,
};

App.defaultProps = {
  isLoading: false,
};

// const mapStateToProps = state => ({
//   errors: state.authReducer.authErrors(state),
//   isAuthenticated: state.authReducer.isAuthenticated(state),
// });

// export default connect(mapStateToProps)(App);

export default App;
