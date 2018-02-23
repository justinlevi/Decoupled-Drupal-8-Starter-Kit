import { ACTIONS } from './actions';

const initialState = {
  pages: [],
  activePage: undefined,
};

export const reducer = (state = initialState, { type, payload }) => {
  console.log(type);
  switch (type) {
    case ACTIONS.FETCH_PAGES: return { ...state };
    case ACTIONS.FETCH_PAGES_SUCCESS:
      return {
        ...state,
        pages: payload.pages,
      };
    case ACTIONS.FETCH_PAGES_FAILURE: return { ...state };
    case ACTIONS.ADD_PAGE: return { ...state };
    case ACTIONS.ADD_PAGE_SUCCESS:
      return {
        ...state,
        pages: state.pages.concat(payload.page),
        activePage: payload.page,
      };
    case ACTIONS.DELETE_PAGE:
      return {
        ...state,
      };
    case ACTIONS.DELETE_PAGE_SUCCESS:
      return {
        ...state,
        pages: payload.pages ? payload.pages : [],
      };
    case ACTIONS.EDIT_PAGE:
      return {
        ...state,
        activePage: payload.activePage,
      };

    default:
      return { ...state };
  }
};

export default reducer;
