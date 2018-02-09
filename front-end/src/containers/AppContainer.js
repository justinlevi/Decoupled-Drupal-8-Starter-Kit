import React, {Component} from 'react';
import { connect } from 'react-redux';

import { InitOAuth, SetAuthCheck, SetUsername, CheckRefreshToken } from 'redux/rootActions';
import App from 'components/App';

export class AppContainer extends Component {

  constructor(props) {
    super(props);

    this.props.dispatch(CheckRefreshToken());

    this.state = {
      username: '',
      password: '',
      uid: 0,
      activeNode: undefined,
      isAuthenticated: false,
      isLoading: false,
      isLoginFailed: false,
      statusCode: '',
      handleLogin: this.handleLogin,
      handleLogout: this.onLogoutClick,
      handleInputChange: this.handleInputChange,
      projectCardListHandler: this.projectCardListHandler
    }
  }

  projectCardListHandler = (node) => {
    this.setState({activeNode: node});
  }

  // is used by both login and password reset
  onFailure = (error) => {
    console.log("onFailure");
    console.log(error);
    this.setState({
      isAuthenticated: false,
      isLoginFailed: true,
      statusCode: error,
    });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleLogout = (reload = false) => {

    this.setState({username: '', password: ''});

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('csrfToken');
    sessionStorage.removeItem('expirationTime');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('lastRefreshedToken');

    if(reload){
      window.location.reload(true);
    }
  }

  handleLogin = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    if(!username || !password){
      this.onFailure('Username and Password are required');
      this.handleLogout();
      return;
    }

    const payload = {
      grantType: 'password',
      username: username,
      password: password
    }
    this.props.dispatch(SetUsername(username));
    this.props.dispatch(InitOAuth(payload));
  };

  onLogoutClick = (event) => {
    event.preventDefault();
    this.props.dispatch(SetAuthCheck(false));
    this.handleLogout();
  }

  render() {
    return (
      <App {...this.state}
        handleInputChange={this.handleInputChange}
        handleLogin={this.handleLogin}
      />
    );
  }
}

export default connect()(AppContainer);
