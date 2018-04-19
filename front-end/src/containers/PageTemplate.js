import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Nav from '../components/Navbar';
import Footer from '../components/Footer';

class PageTemplate extends Component {
  static getDerivedStateFromProps(nextProps) {
    console.log(nextProps);

    return true;
  }

  render() {
    return (
      <div className="pageTemplate">
        <Nav {...this.props} />

        { this.props.children }

        <Footer {...this.props} />
      </div>
    );
  }
}

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTemplate;
