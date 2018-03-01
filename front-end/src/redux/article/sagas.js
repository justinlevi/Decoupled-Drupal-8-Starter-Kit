import { call, take, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { ACTIONS as OAUTH_ACTIONS, tokensExpiredCheck } from '../auth/oauth/actions';
import { articlesByUserQuery, addArticleMutation, deleteArticleMutation, updateArticleMutation } from '../../api/apolloProxy';
import { formatFetchArticleResult, removeArticleFromArticles, updateArticlesWithArticle, getArticleFromNid } from './utilities';

import {
  ACTIONS,
  // addArticle,
  // deleteArticle,
  // saveArticleUpdates,
  fetchArticlesSuccess,
  addArticleSuccess,
  addArticleFailure,
  deleteArticleSuccess,
  deleteArticleFailure,
  saveArticleUpdatesSuccess,
  saveArticleUpdatesFailure,
} from './actions';

function* fetchArticleSaga() {
  yield put(tokensExpiredCheck());
  yield take(OAUTH_ACTIONS.TOKENS_EXPIRED_CHECK_VALID);

  const result = yield call(articlesByUserQuery);
  yield put(fetchArticlesSuccess({ articles: formatFetchArticleResult(result) }));
}

function* addArticleSaga(action) {
  const { payload } = action;
  yield put(tokensExpiredCheck());
  yield take(OAUTH_ACTIONS.TOKENS_EXPIRED_CHECK_VALID);

  try {
    const result = yield call(addArticleMutation, { ...payload });
    const { page } = result.data.addArticle;
    const existingArticles = yield select(state => state.articleReducer.articles);
    const articles = existingArticles.concat([page]);
    yield put(addArticleSuccess({ articles, activeArticleNid: page.nid }));
  } catch (error) {
    yield put(addArticleFailure(error));
  }
}

function* deleteArticleSaga(action) {
  const { payload } = action;
  yield put(tokensExpiredCheck());
  yield take(OAUTH_ACTIONS.TOKENS_EXPIRED_CHECK_VALID);

  try {
    const result = yield call(deleteArticleMutation, { ...payload });
    const { page } = result.data.deleteArticle;
    const articles = yield select(state => state.articleReducer.articles);
    yield put(deleteArticleSuccess({ articles: removeArticleFromArticles(articles, page.nid) }));
  } catch (error) {
    yield put(deleteArticleFailure(error));
  }
}

function* saveArticleUpdatesSaga(action) {
  const { payload } = action;
  yield put(tokensExpiredCheck());
  yield take(OAUTH_ACTIONS.TOKENS_EXPIRED_CHECK_VALID);

  try {
    const result = yield call(updateArticleMutation, { ...payload });
    const { page } = result.data.updateArticle;
    const existingArticles = yield select(state => state.articleReducer.articles);
    const articles = updateArticlesWithArticle(existingArticles, page);
    yield put(saveArticleUpdatesSuccess({ articles }));
  } catch (error) {
    yield put(saveArticleUpdatesFailure(error));
  }
}

function* selectArticleSaga(action) {
  const { payload } = action;
  const { activeArticleNid } = payload;
  const articles = yield select(state => state.articleReducer.articles);
  const page = getArticleFromNid(articles, activeArticleNid);

  yield put(push(`/edit/${activeArticleNid}/${page.title.replace(/ /g, '-').toLowerCase()}`));
}

export function* watchArticleActions() {
  yield takeEvery(ACTIONS.FETCH_ARTICLES, fetchArticleSaga);

  yield takeLatest(ACTIONS.ADD_ARTICLE, addArticleSaga);
  yield takeEvery(ACTIONS.DELETE_ARTICLE, deleteArticleSaga);
  yield takeLatest(ACTIONS.SAVE_ARTICLE_UPDATES, saveArticleUpdatesSaga);

  yield takeEvery(ACTIONS.SELECT_ARTICLE, selectArticleSaga);
}

export default watchArticleActions;