// ---------------
// Actions
// ---------------

export const FETCH_ALL_ARTICLES = 'FETCH_ALL_ARTICLES';
export const FETCH_ALL_ARTICLES_SUCCESS = 'FETCH_ALL_ARTICLES_SUCCESS';
export const FETCH_ALL_ARTICLES_FAILURE = 'FETCH_ALL_ARTICLES_FAILURE';

export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

export const CREATE_ARTICLE = 'CREATE_ARTICLE';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAILURE = 'CREATE_ARTICLE_FAILURE';

export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';
export const DELETE_ARTICLE_FAILURE = 'DELETE_ARTICLE_FAILURE';

export const SAVE_ARTICLE_UPDATES = 'SAVE_ARTICLE_UPDATES';
export const SAVE_ARTICLE_UPDATES_SUCCESS = 'SAVE_ARTICLE_UPDATES_SUCCESS';
export const SAVE_ARTICLE_UPDATES_FAILURE = 'SAVE_ARTICLE_UPDATES_FAILURE';

export const SELECT_ARTICLE = 'SELECT_ARTICLE';

export const types = {
  FETCH_ALL_ARTICLES,
  FETCH_ALL_ARTICLES_SUCCESS,
  FETCH_ALL_ARTICLES_FAILURE,
  FETCH_ARTICLES,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  CREATE_ARTICLE,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  DELETE_ARTICLE,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  SAVE_ARTICLE_UPDATES,
  SAVE_ARTICLE_UPDATES_SUCCESS,
  SAVE_ARTICLE_UPDATES_FAILURE,
  SELECT_ARTICLE,
};

// ---------------
// Action Creators
// ---------------

export const fetchAllArticles = () => ({
  type: types.FETCH_ALL_ARTICLES,
});

export const fetchAllArticlesSuccess = payload => ({
  type: types.FETCH_ALL_ARTICLES_SUCCESS,
  payload,
});

export const fetchAllArticlesFailure = error => ({
  type: types.FETCH_ALL_ARTICLES_FAILURE,
  error,
});

export const fetchArticles = () => ({
  type: types.FETCH_ARTICLES,
});

export const fetchArticlesSuccess = payload => ({
  type: types.FETCH_ARTICLES_SUCCESS,
  payload,
});

export const fetchArticlesFailure = error => ({
  type: types.FETCH_ARTICLES_FAILURE,
  error,
});

export const createArticle = payload => ({
  type: types.CREATE_ARTICLE,
  payload,
});

export const createArticleSuccess = payload => ({
  type: types.CREATE_ARTICLE_SUCCESS,
  payload,
});

export const createArticleFailure = error => ({
  type: types.CREATE_ARTICLE_FAILURE,
  error,
});

export const deleteArticle = payload => ({
  type: types.DELETE_ARTICLE,
  payload,
});

export const deleteArticleSuccess = payload => ({
  type: types.DELETE_ARTICLE_SUCCESS,
  payload,
});

export const deleteArticleFailure = error => ({
  type: types.DELETE_ARTICLE_FAILURE,
  error,
});

export const saveArticleUpdates = payload => ({
  type: types.SAVE_ARTICLE_UPDATES,
  payload,
});

export const saveArticleUpdatesSuccess = payload => ({
  type: types.SAVE_ARTICLE_UPDATES_SUCCESS,
  payload,
});

export const saveArticleUpdatesFailure = error => ({
  type: types.SAVE_ARTICLE_UPDATES_FAILURE,
  error,
});

export const selectArticle = payload => ({
  type: types.SELECT_ARTICLE,
  payload,
});
