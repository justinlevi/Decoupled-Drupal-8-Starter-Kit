import React from 'react';
import PropTypes from 'prop-types';

import Nav from '../components/Navbar';

const PageTemplate = ({ children }) => (
  <div>
    <Nav />
    { children }
  </div>
);

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTemplate;
