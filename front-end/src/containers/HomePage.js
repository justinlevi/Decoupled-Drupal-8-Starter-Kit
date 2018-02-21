import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const HomePage = ({ isAuthenticated }) => (isAuthenticated ? (<Redirect to="/list" />) : (<Redirect to="/login" />));

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.oauth.isAuthenticated,
});

export default connect(mapStateToProps)(HomePage);
