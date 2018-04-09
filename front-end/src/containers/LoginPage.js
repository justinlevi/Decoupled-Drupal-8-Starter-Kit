import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';

import Login from '../components/Login';
import { fetchJwtToken, updateAuthenticated, SESSION_QUERY } from '../api/apolloProxy';

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
  }

  handleLogin = async (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    if (username.length < 4 || password < 4) {
      this.setState({ error: 'Please enter a username and password.' });
      return;
    }

    try {
      const response = await fetchJwtToken(username, password);
      const { error, key } = response.data.login;

      if (error !== 'null') {
        this.setState({ error });
        return;
      }
      localStorage.setItem('authToken', key);
      updateAuthenticated({ isAuthenticated: true });
    } catch (error) {
      this.catchError(error);
    }
  }

  render() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    // if (isLoggingIn) {
    //   return <div className="loggingIn">Logging in...</div>;
    // }

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

const LoginPageQueryWrapper = () => (
  <Query
    query={SESSION_QUERY}
    notifyOnNetworkStatusChange
  >
    {
      ({
        loading, error, data, networkStatus,
      }) => {
        if (networkStatus === 4) return 'Refetching!';
        if (loading) return 'Loading!';
        if (error) return `Error!: ${error}`;

        const { isAuthenticated } = data.session;

        return (
          <LoginPage isAuthenticated={isAuthenticated} />
        );
      }
    }
  </Query>
);

export default LoginPageQueryWrapper;
