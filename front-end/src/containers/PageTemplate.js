import React from 'react';
import PropTypes from 'prop-types';

import Nav from '../components/Navbar';
import Footer from '../components/Footer';

import { SessionConsumer } from '../App';

const PageTemplate = ({ children }) => (
  <div className="pageTemplate">
    <SessionConsumer>
      {
        session =>
          // console.log(`${session.isConnected}: Session Status`);
           (!session.isConnected ? <div>Network Connnection Error: OFFLINE</div> : null)

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
