import { call, take, put, takeLatest, takeEvery } from 'redux-saga/effects';

import { ACTIONS as OAUTH_ACTIONS, tokensExpiredCheck } from '../auth/oauth/actions';

import { pagesByUserQuery } from '../../api/apolloProxy';

import {
  ACTIONS,
  // addPage,
  // deletePage,
  // editPage,
  fetchPagesSuccess,
} from './actions';


function* fetchPageSaga(action) {
  console.log(action.type);
  yield put(tokensExpiredCheck());
  yield take(OAUTH_ACTIONS.TOKENS_EXPIRED_CHECK_VALID);
  console.log('CHECK VALID - FETCH PAGES');
  const result = yield call(pagesByUserQuery);
  console.log('FETCH SUCCESS');
  yield put(fetchPagesSuccess(result));
}

function* addPageSaga(action) {
  console.log(action.type);
}

function* deletePageSaga(action) {
  console.log(action.type);
}

function* editPageSaga(action) {
  console.log(action.type);
}

export function* watchPageActions() {
  yield takeEvery(ACTIONS.FETCH_PAGES, fetchPageSaga);

  yield takeLatest(ACTIONS.ADD_PAGE, addPageSaga);
  yield takeEvery(ACTIONS.DELETE_PAGE, deletePageSaga);
  yield takeLatest(ACTIONS.EDIT_PAGE, editPageSaga);
}

export default watchPageActions;
