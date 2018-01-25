export function clearSessionStorage(){
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('expires_in');
  localStorage.removeItem('refresh_token')
}

export function getSessionStorage(){
  const accessToken = sessionStorage.getItem('access_token');
  const expiresIn = sessionStorage.getItem('expires_in');
  const username = sessionStorage.getItem('username');

  return {accessToken: accessToken, expiresIn: expiresIn, username: username};
}