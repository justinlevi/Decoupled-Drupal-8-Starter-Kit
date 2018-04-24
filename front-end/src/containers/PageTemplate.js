import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

import Nav from '../components/Navbar';
import Footer from '../components/Footer';

import { SessionConsumer } from '../App';

const PageTemplate = ({ children }) => (
  <div className="pageTemplate">
    <SessionConsumer>
      {
        ({ isConnected }) => (!isConnected ?
          <Alert color="primary">Your Network Connnection Appears to be: OFFLINE</Alert> : null)

      }
    </SessionConsumer>
    <Nav {...this.props} />
    { children }
    <Footer {...this.props} />
  </div>
);

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTemplate;
