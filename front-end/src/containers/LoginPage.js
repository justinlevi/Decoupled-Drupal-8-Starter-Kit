import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Login from '../components/Login';
// import { loginRequest } from '../redux/auth/oauth/actions';
import { fetchJwtToken } from '../api/apolloProxy';

export class LoginPage extends Component {
  state = {
    username: '',
    password: '',
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

    const { username, password } = this.state;

    if (username.length < 4 || password < 4) {
      this.setState({ error: 'Please enter a username and password.' });
      return;
    }

    fetchJwtToken(username, password)
      .then((response) => {
        console.log(response);
      }).catch(this.catchError);
    // const { dispatch } = this.props;
    // dispatch(loginRequest({
    //   username: this.state.username,
    //   password: this.state.password,
    // }));
  }

  render() {
    const { isLoggingIn, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (isLoggingIn) {
      return <div className="loggingIn">Logging in...</div>;
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
