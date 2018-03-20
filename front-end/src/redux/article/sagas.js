import { call, take, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { types as oauthActionTypes, tokensExpiredCheck } from '../auth/oauth/actions';
import { articlesByUser, createArticle, deleteArticle, updateArticle, fetchAllArticlesQuery } from '../../api/apolloProxy';
import { formatFetchArticlesResult, removeArticleFromArticles, updateArticlesWithArticle, getArticleFromNid } from './utilities';

import {
  types as articleActionTypes,
  // createArticle,
  // deleteArticle,
  // saveArticleUpdates,
  fetchArticlesSuccess,
  fetchArticlesFailure,
  createArticleSuccess,
  createArticleFailure,
  deleteArticleSuccess,
  deleteArticleFailure,
  saveArticleUpdatesSuccess,
  saveArticleUpdatesFailure,
} from './actions';

export const selectArticles = (state) => state.articleReducer.articles;

export function* fetchAllArticlesSaga(){
  yield put(tokensExpiredCheck());
  yield take(oauthActionTypes.TOKENS_EXPIRED_CHECK_VALID);

  try{
    const result = yield call(fetchAllArticlesQuery);
    const articles = result.data.nodeQuery.entities.map(val => {

      let image = '';
      let item = {
        label: val.entityLabel
      }

      if(val.fieldMediaImage.length){
        image = val.fieldMediaImage[0].entity.image.derivative.url
        item.image = image;
      }

      return item;
    });
    console.log(articles);
  }catch(error){

  }
}

export function* fetchArticlesSaga() {
  yield put(tokensExpiredCheck());
  yield take(oauthActionTypes.TOKENS_EXPIRED_CHECK_VALID);

  try{
    const result = yield call(articlesByUser);
    yield put(fetchArticlesSuccess({ articles: formatFetchArticlesResult(result) }));
  }catch(error){
    yield put(fetchArticlesFailure(`${error}`))
  }
}

export function* createArticleSaga(action) {
  const { payload } = action;
  yield put(tokensExpiredCheck());
  yield take(oauthActionTypes.TOKENS_EXPIRED_CHECK_VALID);

  try {
    const result = yield call(createArticle, { ...payload });
    const { page } = result.data.createArticle;
    const existingArticles = yield select(selectArticles);
    const articles = existingArticles.concat([page]);
    yield put(createArticleSuccess({ articles, activeArticleNid: page.nid }));
  } catch (error) {
    yield put(createArticleFailure(`${error}`));
  }
}

export function* deleteArticleSaga(action) {
  const { payload } = action;
  yield put(tokensExpiredCheck());
  yield take(oauthActionTypes.TOKENS_EXPIRED_CHECK_VALID);

  try {
    const result = yield call(deleteArticle, { ...payload });
    const { page } = result.data.deleteArticle;
    const articles = yield select(selectArticles);
    yield put(deleteArticleSuccess({ articles: removeArticleFromArticles(articles, page.nid) }));
  } catch (error) {
    yield put(deleteArticleFailure(`${error}`));
  }
}

export function* saveArticleUpdatesSaga(action) {
  const { payload } = action;
  yield put(tokensExpiredCheck());
  yield take(oauthActionTypes.TOKENS_EXPIRED_CHECK_VALID);

  try {
    const result = yield call(updateArticle, { ...payload });
    const { page } = result.data.updateArticle;
    const existingArticles = yield select(selectArticles);
    const articles = updateArticlesWithArticle(existingArticles, page);
    yield put(saveArticleUpdatesSuccess({ articles }));
  } catch (error) {
    yield put(saveArticleUpdatesFailure(`${error}`));
  }
}

export function* selectArticleSaga(action) {
  const { payload } = action;
  const { activeArticleNid } = payload;
  const articles = yield select(selectArticles);
  const page = getArticleFromNid(articles, activeArticleNid);
  yield put(push(`/edit/${activeArticleNid}/${page.title.replace(/ /g, '-').toLowerCase()}`));
}

export function* watchArticleActions() {

  yield takeEvery(articleActionTypes.FETCH_ARTICLES, fetchArticlesSaga);
  yield takeEvery(articleActionTypes.FETCH_ALL_ARTICLES,fetchAllArticlesSaga);

  yield takeLatest(articleActionTypes.CREATE_ARTICLE, createArticleSaga);
  yield takeEvery(articleActionTypes.DELETE_ARTICLE, deleteArticleSaga);
  yield takeLatest(articleActionTypes.SAVE_ARTICLE_UPDATES, saveArticleUpdatesSaga);

  yield takeEvery(articleActionTypes.SELECT_ARTICLE, selectArticleSaga);
}

export default watchArticleActions;
