import React from 'react';
import PropTypes from 'prop-types';

import Nav from '../components/Navbar';
import Footer from '../components/Footer';

const PageTemplate = props => (
  <div className="pageTemplate">
    <Nav {...props} />
    <div className="container">
      { props.children }
    </div>
    <Footer {...props} />
  </div>
);

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTemplate;
