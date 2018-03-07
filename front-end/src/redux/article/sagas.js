import { call, take, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { types as oauthActionTypes, tokensExpiredCheck } from '../auth/oauth/actions';
import { articlesByUser, addArticle, deleteArticle, updateArticle } from '../../api/apolloProxy';
import { formatFetchArticlesResult, removeArticleFromArticles, updateArticlesWithArticle, getArticleFromNid } from './utilities';

import {
  types as articleActionTypes,
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

function* fetchArticlesSaga() {
  yield put(tokensExpiredCheck());
  yield take(oauthActionTypes.TOKENS_EXPIRED_CHECK_VALID);

  const result = yield call(articlesByUser);
  yield put(fetchArticlesSuccess({ articles: formatFetchArticlesResult(result) }));
}

function* addArticleSaga(action) {
  const { payload } = action;
  yield put(tokensExpiredCheck());
  yield take(oauthActionTypes.TOKENS_EXPIRED_CHECK_VALID);

  try {
    const result = yield call(addArticle, { ...payload });
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
  yield take(oauthActionTypes.TOKENS_EXPIRED_CHECK_VALID);

  try {
    const result = yield call(deleteArticle, { ...payload });
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
  yield take(oauthActionTypes.TOKENS_EXPIRED_CHECK_VALID);

  try {
    const result = yield call(updateArticle, { ...payload });
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
  yield takeEvery(articleActionTypes.FETCH_ARTICLES, fetchArticlesSaga);

  yield takeLatest(articleActionTypes.ADD_ARTICLE, addArticleSaga);
  yield takeEvery(articleActionTypes.DELETE_ARTICLE, deleteArticleSaga);
  yield takeLatest(articleActionTypes.SAVE_ARTICLE_UPDATES, saveArticleUpdatesSaga);

  yield takeEvery(articleActionTypes.SELECT_ARTICLE, selectArticleSaga);
}

export default watchArticleActions;
