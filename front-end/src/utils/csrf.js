import axios from 'axios';

const URL = process.env.REACT_APP_HOST_DOMAIN;

function initializeCsrfToken(){
  axios.get(URL + '/session/token')
    .then(response => {
      sessionStorage.setItem('csrfToken', response.data);
    })
    .catch((error) => {
      console.log('error ' + error);
    });
};

const initalizeCsrfToken = () => {
  if(!sessionStorage.getItem('csrfToken') ){
    initializeCsrfToken();
  }
}

export default initalizeCsrfToken;