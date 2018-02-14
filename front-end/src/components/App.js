import React from 'react';
import PropTypes from 'prop-types';

import SignIn from './SignIn';
import Navbar from './Navbar';

import CardListPage from '../containers/CardListPage';
import NodeEditPage from '../containers/NodeEditPage';

const renderLoading = () => (
  <div>Loading...</div>
);

const renderAuthenticated = ({ handleLogout, activeNode, projectCardListHandler }) => (
  <div>
    <div className="container authenticated">
      <Navbar handleLogout={handleLogout} />
      {
        !activeNode ?
          <CardListPage projectCardListHandler={projectCardListHandler} />
        :
          <NodeEditPage activeNode={activeNode} />
      }
    </div>
  </div>
);
renderAuthenticated.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  projectCardListHandler: PropTypes.func.isRequired,
};

const renderAnonymous = ({ handleInputChange, handleLogin, isLoginFailed }) => (
  <SignIn
    handleInputChange={handleInputChange}
    handleLogin={handleLogin}
    isLoginFailed={isLoginFailed}
  />
);

renderAnonymous.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  isLoginFailed: PropTypes.func.isRequired,
};

const renderError = () => (
  <div>
    Sadly, there seems to have been an error.
    Contact someone super important to help facilitate forward progress.
  </div>
);

const App = (props) => {
  const { isLoading, isAuthenticated } = props;
  if (isLoading) {
    return renderLoading();
  } else if (isAuthenticated) {
    return renderAuthenticated(props);
  } else if (!isAuthenticated && !isLoading) {
    return renderAnonymous(props);
  }
  return renderError();
};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default App;
