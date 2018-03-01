import axios from 'axios';

const URL = process.env.REACT_APP_HOST_DOMAIN;

export const fetchCsrfToken = () => axios.get(`${URL}/session/token`)
  .then(response => (response.data))
  .catch((error) => {
    console.log(`error ${error}`);
    return error;
  });

export default {};
