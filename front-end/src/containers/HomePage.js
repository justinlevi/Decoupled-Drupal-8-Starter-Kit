import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';

export const HomePage = ({ isAuthenticated }) => (
  isAuthenticated ?
    (<Redirect to="/list" />) :
    (<Redirect to="/login" />)
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default HomePage;
