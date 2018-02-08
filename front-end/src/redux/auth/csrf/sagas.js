import {call, put, takeLatest } from 'redux-saga/effects';
import {SetCsrfToken,CsrfTokenSuccess} from 'redux/rootActions';
import axios from 'axios';

const URL = process.env.REACT_APP_HOST_DOMAIN;

function* initCsrfToken(dispatch){

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
  yield put(CsrfTokenSuccess());
};

export function* watchCsrfToken(){
  yield takeLatest('INIT_CSRF_TOKEN', initCsrfToken);
}
