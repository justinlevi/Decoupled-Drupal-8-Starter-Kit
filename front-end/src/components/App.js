import React from 'react';
import PropTypes from 'prop-types';
import Routes from 'routes';

import Nav from './Navbar';

const renderLoading = () => (
  <div className="container">
    Loading...
  </div>
);

const renderRoutes = props => (
  <div>
    <div className="container">
      <Nav />
      <Routes {...props} />
    </div>
  </div>
);

const renderError = () => (
  <div>
    Sadly, there seems to have been an error.
    Contact someone super important to help facilitate forward progress.
  </div>
);

const App = (props) => {
  const { isLoading = false, error, isLoggingIn } = props;
  if (error) {
    return renderError();
  }

  if (isLoading || isLoggingIn) {
    return renderLoading();
  }

  return renderRoutes(props);
};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

App.defaultProps = {
  isLoading: false,
};

export default App;
