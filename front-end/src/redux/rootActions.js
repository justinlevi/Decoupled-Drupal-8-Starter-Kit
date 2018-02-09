import {initCsrfToken,setCsrfToken,csrfTokenSuccess} from 'redux/auth/csrf/actions';
import {initOAuth,setOAuth,oauthSuccess,setAuthCheck,refreshOAuth,setUsername} from 'redux/auth/oauth/actions';

export const InitCsrfToken = initCsrfToken;
export const SetCsrfToken = setCsrfToken;
export const CsrfTokenSuccess = csrfTokenSuccess;

export const InitOAuth = initOAuth;
export const SetOAuth = setOAuth;
export const OAuthSuccess = oauthSuccess;
export const SetAuthCheck = setAuthCheck;
export const RefreshOAuth = refreshOAuth;
export const SetUsername = setUsername;
