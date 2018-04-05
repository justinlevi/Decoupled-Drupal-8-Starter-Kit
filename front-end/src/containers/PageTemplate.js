import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import { SESSION_QUERY } from '../api/apolloProxy';

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

const getSession = graphql(SESSION_QUERY, {
  props: ({ data }) => ({ isAuthenticated: data.session.isAuthenticated }),
});

export default compose(getSession)(PageTemplate);
