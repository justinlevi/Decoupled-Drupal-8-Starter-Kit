import { call, put, takeLatest } from 'redux-saga/effects';
import { setCsrfToken, csrfTokenSuccess } from '../csrf/actions';
import { fetchCsrfToken } from './utilities';

function* initCsrfToken() {
  const csrfToken = yield call(fetchCsrfToken);
  yield put(setCsrfToken(csrfToken));
  yield put(csrfTokenSuccess());
}

export function* watchCsrfToken() {
  yield takeLatest('INIT_CSRF_TOKEN', initCsrfToken);
}

export default watchCsrfToken;
