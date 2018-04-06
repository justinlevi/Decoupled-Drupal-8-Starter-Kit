import React from 'react';
import PropTypes from 'prop-types';

import Nav from '../components/Navbar';

const PageTemplate = props => (
  <div>
    <Nav {...props} />
    { props.children }
  </div>
);

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTemplate;
