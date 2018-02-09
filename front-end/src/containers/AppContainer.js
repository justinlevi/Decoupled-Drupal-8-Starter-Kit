import React, {Component} from 'react';
import { connect } from 'react-redux';

import { InitOAuth, SetAuthCheck, RefreshOAuth, SetUsername, InitCsrfToken } from 'redux/rootActions';
import App from 'components/App';

const isTokenValid = (accessToken, expiresStamp) => {
  const currentTime = new Date().getTime();
  const expireTime = parseInt(sessionStorage.getItem('expirationTime'), 10) * 1000;

  const currentTimeInt = parseInt(currentTime, 10);
  const expiresStampInt = parseInt(expiresStamp, 10);

  if(accessToken && (currentTimeInt - expiresStampInt > expireTime)){
    return true;
  }else{
    return false;
  }
}

export class AppContainer extends Component {

  constructor(props) {
    super(props);
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

  componentDidMount(){

    let accessToken = sessionStorage.getItem('accessToken');
    let expireStamp = localStorage.getItem('lastRefreshedToken');
    let csrfToken = sessionStorage.getItem('csrfToken');

    if(!csrfToken){
      this.props.dispatch(InitCsrfToken());
    }

    if(accessToken && expireStamp){

      if(isTokenValid(accessToken,expireStamp)){
        console.log("REFRESH PLEASE")
        let refreshToken = localStorage.getItem('refreshToken');
        this.props.dispatch(RefreshOAuth(refreshToken));
        this.props.dispatch(SetAuthCheck(true));
      }else{
        this.props.dispatch(SetAuthCheck(true));
      }

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

const mapStateToProps = (state, ownProps) => ({
  csrfToken: state.csrf.csrfToken,
  expirationTime: state.oauth.timestamp
})

export default connect(mapStateToProps)(AppContainer);
