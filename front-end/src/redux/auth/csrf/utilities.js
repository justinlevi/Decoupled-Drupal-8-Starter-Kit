import axios from 'axios';

const URL = process.env.REACT_APP_HOST_DOMAIN;

export const fetchCsrfToken = (url = URL) => axios.get(`${url}/session/token`)
  .then(response => (response.data))
  .catch(error => error);

export default {};
