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

export const EDIT_PAGE = 'EDIT_PAGE';
export const EDIT_PAGE_SUCCESS = 'EDIT_PAGE_SUCCESS';
export const EDIT_PAGE_FAILURE = 'EDIT_PAGE_FAILURE';

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
  EDIT_PAGE,
  EDIT_PAGE_SUCCESS,
  EDIT_PAGE_FAILURE,
  SELECT_PAGE,
};

// ---------------
// Action Creators
// ---------------

export const fetchPages = () => ({
  type: ACTIONS.FETCH_PAGES,
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

export const addPageSuccess = payload => ({
  type: ACTIONS.ADD_PAGE_SUCCESS,
  payload,
});

export const addPageFailure = error => ({
  type: ACTIONS.ADD_PAGE_FAILURE,
  error,
});

export const deletePage = payload => ({
  type: ACTIONS.DELETE_PAGE,
  payload,
});

export const deletePageSuccess = payload => ({
  type: ACTIONS.DELETE_PAGE_SUCCESS,
  payload,
});

export const deletePageFailure = error => ({
  type: ACTIONS.DELETE_PAGE_FAILURE,
  error,
});

export const editPage = payload => ({
  type: ACTIONS.EDIT_PAGE,
  payload,
});

export const editPageSuccess = payload => ({
  type: ACTIONS.EDIT_PAGE_SUCCESS,
  payload,
});

export const editPageFailure = error => ({
  type: ACTIONS.EDIT_PAGE_FAILURE,
  error,
});

export const selectPage = payload => ({
  type: ACTIONS.SELECT_PAGE,
  payload,
});
