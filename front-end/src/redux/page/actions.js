// ---------------
// Actions
// ---------------

export const FETCH_PAGES = 'FETCH_PAGES';
export const FETCH_PAGES_SUCCESS = 'FETCH_PAGES_SUCCESS';
export const FETCH_PAGES_FAILURE = 'FETCH_PAGES_FAILURE';

export const ADD_PAGE = 'ADD_PAGE';
export const DELETE_PAGE = 'DELETE_PAGE';
export const EDIT_PAGE = 'EDIT_PAGE';

export const ACTIONS = {
  FETCH_PAGES,
  FETCH_PAGES_SUCCESS,
  FETCH_PAGES_FAILURE,
  ADD_PAGE,
  DELETE_PAGE,
  EDIT_PAGE,
};

// ---------------
// Action Creators
// ---------------

export const fetchPages = payload => ({
  type: ACTIONS.FETCH_PAGES,
  payload,
});

export const fetchPagesSuccess = payload => ({
  type: ACTIONS.FETCH_PAGES_SUCCESS,
  payload,
});

export const fetchPagesFailure = payload => ({
  type: ACTIONS.FETCH_PAGES_FAILURE,
  payload,
});

export const addPage = payload => ({
  type: ACTIONS.ADD_PAGE,
  payload,
});

export const deletePage = payload => ({
  type: ACTIONS.DELETE_PAGE,
  payload,
});

export const editPage = payload => ({
  type: ACTIONS.EDIT_PAGE,
  payload,
});
