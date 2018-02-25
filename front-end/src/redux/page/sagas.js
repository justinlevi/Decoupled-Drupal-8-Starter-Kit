import { call, take, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { ACTIONS as OAUTH_ACTIONS, tokensExpiredCheck } from '../auth/oauth/actions';
import { pagesByUserQuery, addPageMutation, deletePageMutation, updatePageMutation } from '../../api/apolloProxy';
import { formatFetchPageResult, removePageFromPages, updatePagesWithPage, getPageFromNid } from './utilities';

import {
  ACTIONS,
  // addPage,
  // deletePage,
  // savePageUpdates,
  fetchPagesSuccess,
  addPageSuccess,
  addPageFailure,
  deletePageSuccess,
  deletePageFailure,
  savePageUpdatesSuccess,
  savePageUpdatesFailure,
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
    const result = yield call(addPageMutation, { ...payload });
    const { page } = result.data.addPage;
    const existingPages = yield select(state => state.pageReducer.pages);
    const pages = existingPages.concat([page]);
    yield put(addPageSuccess({ pages, activePageNid: page.nid }));
  } catch (error) {
    yield put(addPageFailure(error));
  }
}

function* deletePageSaga(action) {
  const { payload } = action;
  yield put(tokensExpiredCheck());
  yield take(OAUTH_ACTIONS.TOKENS_EXPIRED_CHECK_VALID);

  try {
    const result = yield call(deletePageMutation, { ...payload });
    const { page } = result.data.deletePage;
    const pages = yield select(state => state.pageReducer.pages);
    yield put(deletePageSuccess({ pages: removePageFromPages(pages, page.nid) }));
  } catch (error) {
    yield put(deletePageFailure(error));
  }
}

function* savePageUpdatesSaga(action) {
  const { payload } = action;
  yield put(tokensExpiredCheck());
  yield take(OAUTH_ACTIONS.TOKENS_EXPIRED_CHECK_VALID);

  try {
    const result = yield call(updatePageMutation, { ...payload });
    const { page } = result.data.updatePage;
    const existingPages = yield select(state => state.pageReducer.pages);
    const pages = updatePagesWithPage(existingPages, page);
    yield put(savePageUpdatesSuccess({ pages }));
  } catch (error) {
    yield put(savePageUpdatesFailure(error));
  }
}

function* selectPageSaga(action) {
  const { payload } = action;
  const { activePageNid } = payload;
  const pages = yield select(state => state.pageReducer.pages);
  const page = getPageFromNid(pages, activePageNid);

  yield put(push(`/edit/${activePageNid}/${page.title.replace(/ /g, '-').toLowerCase()}`));
}

export function* watchPageActions() {
  yield takeEvery(ACTIONS.FETCH_PAGES, fetchPageSaga);

  yield takeLatest(ACTIONS.ADD_PAGE, addPageSaga);
  yield takeEvery(ACTIONS.DELETE_PAGE, deletePageSaga);
  yield takeLatest(ACTIONS.SAVE_PAGE_UPDATES, savePageUpdatesSaga);

  yield takeEvery(ACTIONS.SELECT_PAGE, selectPageSaga);
}

export default watchPageActions;
