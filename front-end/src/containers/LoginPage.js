import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { SessionConsumer } from '../App';

import Login from '../components/Login';

import { fetchJwtTokenQuery, updateAuthenticatedMutation } from '../api/apolloProxy';

export class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    error: null,
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
    // updateNetworkStatusMutation({ isConnected: false });
  }

  handleLogin = async (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    if (username.length < 4 || password < 4) {
      this.setState({ error: 'Please enter a username and password.' });
      return;
    }
    this.setState({ error: null });


    try {
      const response = await fetchJwtTokenQuery(username, password);
      const { error, key } = response.data.login;

      if (error !== 'null') {
        this.setState({ error });
        return;
      }
      localStorage.setItem('authToken', key);
      updateAuthenticatedMutation({ isAuthenticated: true });
    } catch (error) {
      this.catchError(error);
    }
  }

  render() {
    return (
      <SessionConsumer>
        {session => (
          session.isAuthenticated ?
            <Redirect to="/" />
          :
            <Login
              {...session}
              {...this.props}
              {...this.state}
              handleInputChange={this.handleInputChange}
              handleLogin={this.handleLogin}
            />
        )}
      </SessionConsumer>
    );
  }
}

export default LoginPage;
