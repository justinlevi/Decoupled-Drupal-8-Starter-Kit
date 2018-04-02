import { all } from 'redux-saga/effects';
// import { watchCsrfToken } from './auth/csrf/sagas';
// import { watchOAuth } from './auth/oauth/sagas';
import { watchArticleActions } from './article/sagas';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    // watchCsrfToken(),
    // watchOAuth(),
    watchArticleActions(),
  ]);
}
