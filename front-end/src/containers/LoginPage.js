import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import { jwt_decode } from 'jwt-decode';

import Login from '../components/Login';
// import { loginRequest } from '../redux/auth/oauth/actions';
import { fetchJwtToken, updateAuthenticated } from '../api/apolloProxy';


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

  catchError = (error) => {
    console.log(`Error ${error}`);
  }

  handleLogin = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    if (username.length < 4 || password < 4) {
      this.setState({ error: 'Please enter a username and password.' });
      return;
    }

    const { client } = this.props;

    fetchJwtToken(client, username, password)
      .then((response) => {
        const { error, key } = response.data.login;
        if (error !== 'null') {
          console.log(error);
          return;
        }
        localStorage.setItem('authToken', key);
        updateAuthenticated(client, { isAuthenticated: true });
      }).catch(this.catchError);
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
  // dispatch: PropTypes.func.isRequired,
  // isLoggingIn: PropTypes.bool.isRequired,
  // isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

LoginPage.defaultProps = {
  error: '',
};

export default LoginPage;
