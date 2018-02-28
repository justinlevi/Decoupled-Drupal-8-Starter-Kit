// ---------------
// Actions
// ---------------

export const FETCH_PAGES = 'FETCH_PAGES';
export const FETCH_PAGES_SUCCESS = 'FETCH_PAGES_SUCCESS';
export const FETCH_PAGES_FAILURE = 'FETCH_PAGES_FAILURE';

export const ADD_PAGE = 'ADD_PAGE';
export const ADD_PAGE_SUCCESS = 'ADD_PAGE_SUCCESS';
export const ADD_PAGE_FAILURE = 'ADD_PAGE_FAILURE';

export const DELETE_PAGE = 'DELETE_PAGE';
export const DELETE_PAGE_SUCCESS = 'DELETE_PAGE_SUCCESS';
export const DELETE_PAGE_FAILURE = 'DELETE_PAGE_FAILURE';

export const SAVE_PAGE_UPDATES = 'SAVE_PAGE_UPDATES';
export const SAVE_PAGE_UPDATES_SUCCESS = 'SAVE_PAGE_UPDATES_SUCCESS';
export const SAVE_PAGE_UPDATES_FAILURE = 'SAVE_PAGE_UPDATES_FAILURE';

export const SELECT_PAGE = 'SELECT_PAGE';

export const ACTIONS = {
  FETCH_PAGES,
  FETCH_PAGES_SUCCESS,
  FETCH_PAGES_FAILURE,
  ADD_PAGE,
  ADD_PAGE_SUCCESS,
  ADD_PAGE_FAILURE,
  DELETE_PAGE,
  DELETE_PAGE_SUCCESS,
  DELETE_PAGE_FAILURE,
  SAVE_PAGE_UPDATES,
  SAVE_PAGE_UPDATES_SUCCESS,
  SAVE_PAGE_UPDATES_FAILURE,
  SELECT_PAGE,
};

// ---------------
// Action Creators
// ---------------

export const fetchArticles = () => ({
  type: ACTIONS.FETCH_PAGES,
});

export const fetchArticlesSuccess = payload => ({
  type: ACTIONS.FETCH_PAGES_SUCCESS,
  payload,
});

export const fetchArticlesFailure = payload => ({
  type: ACTIONS.FETCH_PAGES_FAILURE,
  payload,
});

export const addArticle = payload => ({
  type: ACTIONS.ADD_PAGE,
  payload,
});

export const addArticleSuccess = payload => ({
  type: ACTIONS.ADD_PAGE_SUCCESS,
  payload,
});

export const addArticleFailure = error => ({
  type: ACTIONS.ADD_PAGE_FAILURE,
  error,
});

export const deleteArticle = payload => ({
  type: ACTIONS.DELETE_PAGE,
  payload,
});

export const deleteArticleSuccess = payload => ({
  type: ACTIONS.DELETE_PAGE_SUCCESS,
  payload,
});

export const deleteArticleFailure = error => ({
  type: ACTIONS.DELETE_PAGE_FAILURE,
  error,
});

export const saveArticleUpdates = payload => ({
  type: ACTIONS.SAVE_PAGE_UPDATES,
  payload,
});

export const saveArticleUpdatesSuccess = payload => ({
  type: ACTIONS.SAVE_PAGE_UPDATES_SUCCESS,
  payload,
});

export const saveArticleUpdatesFailure = error => ({
  type: ACTIONS.SAVE_PAGE_UPDATES_FAILURE,
  error,
});

export const selectArticle = payload => ({
  type: ACTIONS.SELECT_PAGE,
  payload,
});
