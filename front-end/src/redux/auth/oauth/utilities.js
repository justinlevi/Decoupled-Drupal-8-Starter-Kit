
const CLIENT_INFO = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
};

export const getCredentials = (type, username, password = '', refreshToken = '') => {
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

export const persistUsername = (state) => {
  sessionStorage.setItem('username', state.payload);
};

export const persistCredentials = ({
  accessToken, expiration, refreshToken, timestamp,
}) => {
  sessionStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('expirationTime', expiration);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('lastRefreshedToken', timestamp);
};

export const isTokenValid = (accessToken, expiresStamp) => {
  const currentTime = new Date().getTime();
  const expireTime = parseInt(sessionStorage.getItem('expirationTime'), 10) * 1000;


  const currentTimeInt = parseInt(currentTime, 10);
  const expiresStampInt = parseInt(expiresStamp, 10);

  if (accessToken && (expiresStampInt - currentTimeInt > expireTime)) {
    return true;
  }
  return false;
};
