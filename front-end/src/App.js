import React, {Component} from 'react';

import axios from 'axios';
import Querystring from 'query-string';
import { ApolloLink, concat } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import introspectionQueryResultData from './fragmentTypes.json';

import UploadComponent from './components/UploadComponent';

const URL = process.env.REACT_APP_HOST_DOMAIN;
const CLIENT_INFO = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET
};

function initializeCsrfToken(){
  axios.get(URL + '/session/token')
    .then(response => {
      sessionStorage.setItem('csrfToken', response.data);
    })
    .catch((error) => {
      console.log('error ' + error);
    });
};

function getSessionStorage(){
  const accessToken = sessionStorage.getItem('access_token');
  const expiresIn = sessionStorage.getItem('expires_in');
  const username = sessionStorage.getItem('username');

  return {accessToken: accessToken, expiresIn: expiresIn, username: username};
}

function getToken() {
  const { accessToken, expiresIn } = getSessionStorage();

  if (isTokenValid(accessToken, expiresIn)) {
    return `Bearer ${accessToken}`;
  }
  return getRefreshToken();
}

function isTokenValid(accessToken, expiresIn) {

  console.log('TOKEN EXPIRES AT: ' + new Date(parseInt(expiresIn, 10)));

  const currentTime = new Date().getTime();
  if(accessToken && (!expiresIn || expiresIn - currentTime > 1)){
    return true;
  }else{
    return false;
  }
}

function getRefreshToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) { 
    return refreshToken;
  }else{
    return false;
  }
}

function initializeOauthToken(credentials, callback = (success, error) => {}){
  axios.post(URL + '/oauth/token?XDEBUG_SESSION_START=PHPSTORM', Querystring.stringify(credentials))
  .then(response => {
    const {expires_in, access_token, refresh_token} = response.data;
    const expiresIn = new Date().getTime() + expires_in * 1000;
    console.log('TOKEN EXPIRES AT: ' + new Date(parseInt(expiresIn, 10)));
    sessionStorage.setItem('access_token', access_token);
    sessionStorage.setItem('expires_in', expiresIn);
    localStorage.setItem('refresh_token', refresh_token);
      callback(true);
    })
    .catch((error) => {
      callback(false, error);
    });
};


function handleLogout(reload = false) {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('expires_in');
  localStorage.removeItem('refresh_token')
  
  if(reload){
    window.location.reload(true);
  }
}

if(!sessionStorage.getItem('csrfToken') ){
  initializeCsrfToken();
}

export class App extends Component {
  
  constructor(props) {
      super(props);

      this.state = {
        client: '',
        username: '',
        password: '',
        pid: 'placeholder-project-id',
        isAuthenticated: false,
        isLoading: false,
        isLoginFailed: false,
        statusCode: '',
      }

      const { accessToken, username, expiresIn } = getSessionStorage();
      const refreshToken = getRefreshToken();

      this.state.username = username ? username : '';

      if(accessToken){
        if(isTokenValid(accessToken, expiresIn) && username){
          this.state.isAuthenticated = true;
        }else if (refreshToken && username){
          let credentials = {
            ...CLIENT_INFO, 
            grant_type: 'refresh_token',
            refresh_token: refreshToken
          }

          this.state.isLoading = true;
          initializeOauthToken(credentials, (success, error) => {
            if (error){
              handleLogout();
              this.setState({isLoading: false});
              return;
            }

            if (success) {
              this.setState({isAuthenticated:true, isLoading: false});
            }
          });
        }
      }
  }

  componentWillMount(){
    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the access_token to the headers
      let csrfToken = `${sessionStorage.getItem('csrfToken')}`;

      operation.setContext( context => ({
          headers: {
            authorization: getToken() || null,
            'X-CSRF-Token': csrfToken || null, 
          }
        }));
      return forward(operation);
    })

    const link = new HttpLink(
      {
        uri: URL.concat('/graphql?XDEBUG_SESSION_START=PHPSTORM'),
      }
    );

    const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData});

    const client = new ApolloClient({
      // link: createUploadLink({ uri: process.env.API_URI })
      link: concat(authMiddleware, link),
      cache: new InMemoryCache({fragmentMatcher}),
    });

    this.setState({client: client});
  }

  // is used by both login and password reset
  onFailure = (error) => {
    console.log("onFailure");
    console.log(error);
    this.setState({
      isAuthenticated: false,
      isLoginFailed: true,
      statusCode: '',
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    if(!this.state.username || !this.state.password){
      this.onFailure('Username and Password are required');
      handleLogout();
      return;
    }

    sessionStorage.setItem('username', this.state.username);

    let credentials = {
      ...CLIENT_INFO, 
      grant_type: 'password',
      username: this.state.username,
      password: this.state.password
    }

    this.setState({isLoading: true});
    initializeOauthToken(credentials, (success, error) => {

      this.setState({isLoading: false});

      if (error){
        this.onFailure(error);
        return;
      }

      if (success) {
        this.setState({
          password: '',
          isLoginFailed: false,
          isAuthenticated: true
        });
      }
    });
  };

  onLogoutClick = (event) => {
    event.preventDefault();
    this.setState({
      isAuthenticated: false
    });
    handleLogout();
  }

  render() {

    if (this.state.isLoading) {
      return (
        <div>Loading...</div>
      );
    }


    if (this.state.isAuthenticated) {
      return (
        <ApolloProvider client={this.state.client}>
          <div>
            <button onClick={this.onLogoutClick}>Logout</button>
            <UploadComponent username={this.state.username} pid={this.state.pid} />
          </div> 
        </ApolloProvider>
      );
    }

    if (!this.state.isAuthenticated && !this.state.isLoading) {
      return (
          <div>
            <h1>Login</h1>
            <form onSubmit={this.onSubmit}>
              <input type='text' value={this.state.username} onChange={(event) => this.setState({username: event.target.value})} placeholder='username' /><br />
              <input type='password' value={this.state.password} onChange={(event) => this.setState({password: event.target.value})} placeholder='password' /><br />
              <input type='submit' value='Login' />
            </form>
            <p style={{color: 'red', display: this.state.isLoginFailed ? 'block' : 'none'}}> Credentials incorrect</p>
          </div>
      );
    }

  }
}

export default App
