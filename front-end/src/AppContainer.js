import React, {Component} from 'react';

import authenticate, { getToken } from './utils/oauth';
import { clearSessionStorage } from './utils/sessionStorage';
import client from './utils/configureApolloClient';
import App from './App';

export class AppContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      pid: 'placeholder-project-id',
      isAuthenticated: false,
      isLoading: false,
      isLoginFailed: false,
      statusCode: '',
      client: client,
      handleLogin: this.handleLogin,
      handleLogout: this.onLogoutClick,
      handleInputChange: this.handleInputChange
    }
  }

  componentDidMount(){
    if (getToken()){
      this.setState({ isLoading: true });
      authenticate('', '', (success) => {
        if(success) {
          this.setState({
            isAuthenticated: true,
            isLoading: false
          })
        }
      })
    }
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
    clearSessionStorage();

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

    authenticate(username, password, (success, error) => {
      let isAuthenticated = false;
      if (!success){
        clearSessionStorage();
      }else {
        isAuthenticated = true;
      }

      this.setState({
        isAuthenticated: isAuthenticated,
        isLoading: false
      });
    })
  };

  onLogoutClick = (event) => {
    event.preventDefault();
    this.setState({
      isAuthenticated: false
    });
    this.handleLogout();
  }

  render() {
    return <App {...this.state} />
  }
}

export default AppContainer
