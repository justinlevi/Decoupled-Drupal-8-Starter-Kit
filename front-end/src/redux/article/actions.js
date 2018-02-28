// ---------------
// Actions
// ---------------

export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';
export const FETCH_ARTICLE_FAILURE = 'FETCH_ARTICLE_FAILURE';

export const ADD_ARTICLE = 'ADD_ARTICLE';
export const ADD_ARTICLE_SUCCESS = 'ADD_ARTICLE_SUCCESS';
export const ADD_ARTICLE_FAILURE = 'ADD_ARTICLE_FAILURE';

export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';
export const DELETE_ARTICLE_FAILURE = 'DELETE_ARTICLE_FAILURE';

export const SAVE_ARTICLE_UPDATES = 'SAVE_ARTICLE_UPDATES';
export const SAVE_ARTICLE_UPDATES_SUCCESS = 'SAVE_ARTICLE_UPDATES_SUCCESS';
export const SAVE_ARTICLE_UPDATES_FAILURE = 'SAVE_ARTICLE_UPDATES_FAILURE';

export const SELECT_ARTICLE = 'SELECT_ARTICLE';

export const ACTIONS = {
  FETCH_ARTICLES,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAILURE,
  ADD_ARTICLE,
  ADD_ARTICLE_SUCCESS,
  ADD_ARTICLE_FAILURE,
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

export const fetchArticles = () => ({
  type: ACTIONS.FETCH_ARTICLES,
});

export const fetchArticlesSuccess = payload => ({
  type: ACTIONS.FETCH_ARTICLE_SUCCESS,
  payload,
});

export const fetchArticlesFailure = payload => ({
  type: ACTIONS.FETCH_ARTICLE_FAILURE,
  payload,
});

export const addArticle = payload => ({
  type: ACTIONS.ADD_ARTICLE,
  payload,
});

export const addArticleSuccess = payload => ({
  type: ACTIONS.ADD_ARTICLE_SUCCESS,
  payload,
});

export const addArticleFailure = error => ({
  type: ACTIONS.ADD_ARTICLE_FAILURE,
  error,
});

export const deleteArticle = payload => ({
  type: ACTIONS.DELETE_ARTICLE,
  payload,
});

export const deleteArticleSuccess = payload => ({
  type: ACTIONS.DELETE_ARTICLE_SUCCESS,
  payload,
});

export const deleteArticleFailure = error => ({
  type: ACTIONS.DELETE_ARTICLE_FAILURE,
  error,
});

export const saveArticleUpdates = payload => ({
  type: ACTIONS.SAVE_ARTICLE_UPDATES,
  payload,
});

export const saveArticleUpdatesSuccess = payload => ({
  type: ACTIONS.SAVE_ARTICLE_UPDATES_SUCCESS,
  payload,
});

export const saveArticleUpdatesFailure = error => ({
  type: ACTIONS.SAVE_ARTICLE_UPDATES_FAILURE,
  error,
});

export const selectArticle = payload => ({
  type: ACTIONS.SELECT_ARTICLE,
  payload,
});
