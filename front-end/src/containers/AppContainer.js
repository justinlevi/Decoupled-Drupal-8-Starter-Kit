import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';

import { ApolloProvider } from 'react-apollo';

import ApolloClient from 'api/apolloClient';
import App from 'components/App';

import { tokensExpiredCheck } from '../redux/auth/oauth/actions';

export class AppContainer extends Component {
  constructor(props) {
    super(props);

    props.history.listen((location) => {
      if (props.isAuthenticated) {
        this.props.dispatch(tokensExpiredCheck());
      }
    });
  }

  componentWillMount() {
    // this.props.dispatch(loginRequest());
    // this.props.dispatch(refreshTokenExpiredCheck());
    const { dispatch, isAuthenticated } = this.props;
    // if (!isAuthenticated) {
    // this shouldn't be necessary, but clearing out any local storage in case
    // dispatch(logout());
    if (sessionStorage.getItem('accessToken')) {
      dispatch(tokensExpiredCheck());
    }
    // }
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
          <App
            {...this.state}
            {...this.props}
          />
        </ApolloProvider>
      </Provider>
    );
  }
}

AppContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  store: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoggingIn: state.authReducer.isLoggingIn,
});

export default connect(mapStateToProps)(AppContainer);
