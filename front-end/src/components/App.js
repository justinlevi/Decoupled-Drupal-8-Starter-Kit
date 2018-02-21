import React from 'react';
import PropTypes from 'prop-types';
import Routes from 'routes';

import Navbar from './Navbar';

const renderLoading = () => (
  <div>Loading...</div>
);

const renderRoutes = props => (
  <div>
    <div className="container authenticated">
      <Navbar />
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
  const { isLoading = false, error } = props;
  if (error) {
    return renderError();
  }

  if (isLoading) {
    return renderLoading();
  }

  return renderRoutes(props);
};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

App.defaultProps = {
  isLoading: false,
};

export default App;
