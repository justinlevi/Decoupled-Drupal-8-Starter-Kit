import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';

export const HomeArticle = ({ isAuthenticated }) => (
  isAuthenticated ?
    (<Redirect to="/list" />) :
    (<Redirect to="/login" />)
);

HomeArticle.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default HomeArticle;
