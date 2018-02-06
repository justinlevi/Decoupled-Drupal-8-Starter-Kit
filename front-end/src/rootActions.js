import {initCsrfToken,setCsrfToken,csrfTokenSuccess} from './actions-reducers-sagas/auth/csrf/actions';
import {setApolloClient,csrfAccessTokensSet} from './actions-reducers-sagas/auth/apollo/actions';
import {initOAuth,setOAuth,oauthSuccess} from './actions-reducers-sagas/auth/oauth/actions';

export const InitCsrfToken = initCsrfToken;
export const SetCsrfToken = setCsrfToken;
export const CsrfTokenSuccess = csrfTokenSuccess;

export const SetApolloClient = setApolloClient;
export const CsrfAccessTokensSet = csrfAccessTokensSet;

export const InitOAuth = initOAuth;
export const SetOAuth = setOAuth;
export const OAuthSuccess = oauthSuccess;
