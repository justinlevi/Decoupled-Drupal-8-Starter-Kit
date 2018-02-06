import {all} from 'redux-saga/effects';
import {watchCsrfToken} from './actions-reducers-sagas/auth/csrf/sagas';
import {watchApolloClient} from './actions-reducers-sagas/auth/apollo/sagas';
import {watchOAuth} from './actions-reducers-sagas/auth/oauth/sagas';

// single entry point to start all Sagas at once
export default function* rootSaga(state) {
  yield all([
    watchCsrfToken(),
    watchOAuth(),
    watchApolloClient()
  ]);
}
