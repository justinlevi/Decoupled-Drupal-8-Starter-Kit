import {call, put, takeLatest } from 'redux-saga/effects';
import {SetCsrfToken} from '../../../rootActions';
import axios from 'axios';

const URL = process.env.REACT_APP_HOST_DOMAIN;

function* initCsrfToken(){

  const csrfToken = yield call(function(){
    return new Promise(function(resolve,reject){
      axios.get(URL + '/session/token')
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          console.log('error ' + error);
        });
    });
  })
  
  yield put(SetCsrfToken(csrfToken));
};

export function* watchCsrfToken(){
  yield takeLatest('INIT_CSRF_TOKEN', initCsrfToken);
}
