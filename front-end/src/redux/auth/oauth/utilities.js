import Querystring from 'query-string';
import axios from 'axios';

const URL = process.env.REACT_APP_HOST_DOMAIN;
const POSTFIX = process.env.REACT_APP_XDEBUG_POSTFIX;

const CLIENT_INFO = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
};

export const fetchToken = credentials => axios.post(`${URL}/oauth/token${POSTFIX}`, Querystring.stringify(credentials))
  .then((response) => {
    const { expires_in, access_token, refresh_token } = response.data; // eslint-disable-line
    return ({
      expiration: expires_in,
      accessToken: access_token,
      refreshToken: refresh_token,
      timestamp: new Date().getTime(),
    });
  }).catch((error) => {
    console.log(error);
    return error;
  });

export const generateCredentials = (type, username, password = '', refreshToken = '') => {
  let credentials = {
    ...CLIENT_INFO,
    grant_type: type,
    username,
  };

  if (type === 'password') {
    credentials = {
      ...credentials,
      password,
    };
  } else if (type === 'refresh_token') {
    credentials = {
      ...credentials,
      refresh_token: refreshToken,
    };
  }

  return credentials;
};

export const persistUsername = (username) => {
  sessionStorage.setItem('username', username);
};

export const persistCredentials = ({
  accessToken, expiration, refreshToken, timestamp,
}) => {
  sessionStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('expirationTime', expiration);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('lastRefreshedToken', timestamp);
};

export const getLocalCredentials = () => ({
  accessToken: sessionStorage.getItem('accessToken'),
  expireStamp: localStorage.getItem('lastRefreshedToken'),
  csrfToken: sessionStorage.getItem('csrfToken'),
  refreshToken: localStorage.getItem('refreshToken'),
});

export const unsetLocalStorageCredentials = () => {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('csrfToken');
  sessionStorage.removeItem('expirationTime');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('lastRefreshedToken');
  localStorage.removeItem('state');
};

const convertDate = (unixTimestamp) => {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  const date = new Date(unixTimestamp);
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = `0${date.getMinutes()}`;
  // Seconds part from the timestamp
  const seconds = `0${date.getSeconds()}`;

  // Will display time in 10:30:23 format
  const formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  return formattedTime;
};

export const isTokenValid = (accessToken, expiresStamp) => {
  const currentTime = new Date().getTime();
  const expireTime = parseInt(sessionStorage.getItem('expirationTime'), 10) * 1000;


  const currentTimeInt = parseInt(currentTime, 10);
  const expiresStampInt = parseInt(expiresStamp, 10) + expireTime;

  console.log(`CURRENT-TIME: ${convertDate(currentTimeInt)}`);
  console.log(`EXPIRES-TIME: ${convertDate(expiresStampInt)}`);

  if (accessToken && (expiresStampInt > currentTimeInt)) {
    return true;
  }
  return false;
};
