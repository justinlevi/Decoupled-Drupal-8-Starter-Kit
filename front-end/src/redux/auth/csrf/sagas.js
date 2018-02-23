import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setCsrfToken, csrfTokenSuccess } from '../csrf/actions';

const URL = process.env.REACT_APP_HOST_DOMAIN;

function* initCsrfToken() {
  const csrfToken = yield call(() => new Promise(((resolve) => {
    axios.get(`${URL}/session/token`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(`error ${error}`);
      });
  })));
  yield put(setCsrfToken(csrfToken));
  yield put(csrfTokenSuccess());
}

export function* watchCsrfToken() {
  yield takeLatest('INIT_CSRF_TOKEN', initCsrfToken);
}

export default watchCsrfToken;
