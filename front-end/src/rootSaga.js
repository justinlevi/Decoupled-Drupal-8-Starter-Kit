import {all} from 'redux-saga/effects';
import {watchCsrfToken} from './actions-reducers-sagas/auth/csrf/sagas';

// single entry point to start all Sagas at once
export default function* rootSaga(state) {
  yield all([
    watchCsrfToken()
  ]);
}
