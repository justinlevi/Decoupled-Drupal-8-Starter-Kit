import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Login from '../components/Login';
import { loginRequest } from '../redux/auth/oauth/actions';

export class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    isLoginFailed: false,
  };

  handleInputChange = ({ target }) => {
    const { type, name } = target;
    const nValue = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: nValue,
    });
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(loginRequest({
      username: this.state.username,
      password: this.state.password,
    }));
  }

  render() {
    const { isLoggingIn, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (isLoggingIn) {
      return <div>Logging in...</div>;
    }

    return (
      <Login
        {...this.props}
        {...this.state}
        handleInputChange={this.handleInputChange}
        handleLogin={this.handleLogin}
      />
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

LoginPage.defaultProps = {
  error: '',
};

export default LoginPage;
