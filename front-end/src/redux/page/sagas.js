import { call, take, put, takeLatest, takeEvery, select } from 'redux-saga/effects';

import { ACTIONS as OAUTH_ACTIONS, tokensExpiredCheck } from '../auth/oauth/actions';
import { pagesByUserQuery, addPageMutation, deletePageMutation } from '../../api/apolloProxy';
import { formatFetchPageResult, removePageFromPages } from './utilities';

import {
  ACTIONS,
  // addPage,
  // deletePage,
  // editPage,
  fetchPagesSuccess,
  addPageSuccess,
  addPageFailure,
  deletePageSuccess,
} from './actions';

function* fetchPageSaga() {
  yield put(tokensExpiredCheck());
  yield take(OAUTH_ACTIONS.TOKENS_EXPIRED_CHECK_VALID);

  const result = yield call(pagesByUserQuery);
  yield put(fetchPagesSuccess({ pages: formatFetchPageResult(result) }));
}

function* addPageSaga(action) {
  const { payload } = action;
  yield put(tokensExpiredCheck());
  yield take(OAUTH_ACTIONS.TOKENS_EXPIRED_CHECK_VALID);

  try {
    const result = yield call(addPageMutation, { title: payload.title });
    const { entity } = result.data.addPage;
    yield put(addPageSuccess({ page: [entity] }));
  } catch (error) {
    yield put(addPageFailure(error));
  }
}

function* deletePageSaga(action) {
  const { payload } = action;
  yield put(tokensExpiredCheck());
  yield take(OAUTH_ACTIONS.TOKENS_EXPIRED_CHECK_VALID);

  const result = yield call(deletePageMutation, { id: payload.id });
  const { page } = result.data.deletePage;
  const pages = yield select(state => state.pageReducer.pages);
  yield put(deletePageSuccess({ pages: removePageFromPages(pages, page.nid) }));
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
