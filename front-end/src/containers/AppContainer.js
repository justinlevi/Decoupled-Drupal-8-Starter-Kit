import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { InitOAuth, SetAuthCheck, SetUsername, CheckRefreshToken } from 'redux/rootActions';
import App from 'components/App';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'api/apolloClient';

export class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(CheckRefreshToken());
  }

  state = {
    username: '',
    password: '',
    uid: 0,
    activeNode: undefined,
    isLoading: false,
    isLoginFailed: false,
    statusCode: '',
    handleLogin: this.handleLogin,
    handleLogout: this.onLogoutClick,
    handleInputChange: this.handleInputChange,
    projectCardListHandler: this.projectCardListHandler,
  }


  // is used by both login and password reset
  onFailure = (error) => {
    console.log('onFailure');
    console.log(error);
    this.setState({
      isAuthenticated: false,
      isLoginFailed: true,
      statusCode: error,
    });
  };

  onLogoutClick = (event) => {
    event.preventDefault();
    this.props.dispatch(SetAuthCheck(false));
    this.handleLogout();
  }

  handleLogout = (reload = false) => {
    this.setState({ username: '', password: '' });

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('csrfToken');
    sessionStorage.removeItem('expirationTime');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('lastRefreshedToken');

    if (reload) {
      window.location.reload(true);
    }
  }

  handleLogin = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    if (!username || !password) {
      this.onFailure('Username and Password are required');
      this.handleLogout();
      return;
    }

    const payload = {
      grantType: 'password',
      username,
      password,
    };
    this.props.dispatch(SetUsername(username));
    this.props.dispatch(InitOAuth(payload));
  };

  handleInputChange = ({
    target, name, type,
  }) => {
    const nValue = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: nValue,
    });
  }

  projectCardListHandler = (node) => {
    this.setState({ activeNode: node });
  }

  render() {
    return (
      <ApolloProvider client={ApolloClient}>
        <App
          {...this.state}
          {...this.props}
          handleInputChange={this.handleInputChange}
          handleLogin={this.handleLogin}
        />
      </ApolloProvider>
    );
  }
}

AppContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.oauth.authenticated,
});

export default connect(mapStateToProps)(AppContainer);
