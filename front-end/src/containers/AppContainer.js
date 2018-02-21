import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { refreshTokenExpiredCheck } from 'redux/rootActions';
import App from 'components/App';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'api/apolloClient';

import { connect, Provider } from 'react-redux';


const history = createHistory();

export class AppContainer extends Component {
  constructor(props) {
    super(props);

    // this.props.dispatch(loginRequest());
    this.props.dispatch(refreshTokenExpiredCheck());
  }

  // state = {
  //   username: '',
  //   password: '',
  //   uid: 0,
  //   activeNode: undefined,
  //   isLoading: false,
  //   isLoginFailed: false,
  //   statusCode: '',
  //   handleLogin: this.handleLogin,
  //   handleLogout: this.onLogoutClick,
  //   handleInputChange: this.handleInputChange,
  //   projectCardListHandler: this.projectCardListHandler,
  // }


  // // is used by both login and password reset
  // onFailure = (error) => {
  //   console.log('onFailure');
  //   console.log(error);
  //   this.setState({
  //     isAuthenticated: false,
  //     isLoginFailed: true,
  //     statusCode: error,
  //   });
  // };

  // onLogoutClick = (event) => {
  //   event.preventDefault();
  //   this.props.dispatch(logout());
  //   this.handleLogout();
  // }

  // handleLogout = (reload = false) => {
  //   this.setState({ username: '', password: '' });

  //   sessionStorage.removeItem('accessToken');
  //   sessionStorage.removeItem('username');
  //   sessionStorage.removeItem('csrfToken');
  //   sessionStorage.removeItem('expirationTime');
  //   localStorage.removeItem('refreshToken');
  //   localStorage.removeItem('lastRefreshedToken');

  //   if (reload) {
  //     window.location.reload(true);
  //   }
  // }

  // handleLogin = (event) => {
  //   event.preventDefault();

  //   const { username, password } = this.state;

  //   if (!username || !password) {
  //     this.onFailure('Username and Password are required');
  //     this.handleLogout();
  //     return;
  //   }

  //   const payload = {
  //     grantType: 'password',
  //     username,
  //     password,
  //   };
  //   this.props.dispatch(SetUsername(username));
  //   this.props.dispatch(InitOAuth(payload));
  // };

  // handleInputChange = ({
  //   target,
  // }) => {
  //   const { type, name } = target;
  //   const nValue = type === 'checkbox' ? target.checked : target.value;
  //   this.setState({
  //     [name]: nValue,
  //   });
  // }

  // projectCardListHandler = (node) => {
  //   this.setState({ activeNode: node });
  // }

  render() {
    return (
      <Provider store={this.props.store} >
        <ApolloProvider client={ApolloClient}>
          <ConnectedRouter history={history}>
            <App
              {...this.state}
              {...this.props}
            />
          </ConnectedRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}

AppContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.oauth.isAuthenticated,
});

export default connect(mapStateToProps)(AppContainer);
