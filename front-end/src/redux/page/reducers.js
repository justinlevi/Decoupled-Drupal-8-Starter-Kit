import { ACTIONS } from './actions';

const initialState = {
  articles: [],
  activeArticleNid: 0,
};

export const reducer = (state = initialState, { type, payload, error }) => {
  switch (type) {
    /**
     * FETCH PAGES
     */
    case ACTIONS.FETCH_PAGES: return { ...state };
    case ACTIONS.FETCH_PAGES_SUCCESS: {
      const { articles } = payload;
      return { ...state, articles, activeArticleNid: 0 };
    }
    case ACTIONS.FETCH_PAGES_FAILURE: return { ...state };

    /**
     * ADD PAGE
     */
    case ACTIONS.ADD_PAGE: return { ...state };
    case ACTIONS.ADD_PAGE_SUCCESS: {
      const { articles, activeArticleNid } = payload;
      return { ...state, articles, activeArticleNid };
    }
    case ACTIONS.ADD_PAGE_FAILURE: return { ...state };

    /**
     * DELETE PAGE
     */
    case ACTIONS.DELETE_PAGE: return { ...state };
    case ACTIONS.DELETE_PAGE_SUCCESS: {
      const { articles } = payload;
      return { ...state, articles };
    }
    case ACTIONS.DELETE_PAGE_FAILURE: return { ...state };

    /**
     * SAVE PAGE
     */
    case ACTIONS.SAVE_PAGE_UPDATES: return { ...state };
    case ACTIONS.SAVE_PAGE_UPDATES_SUCCESS: {
      const { articles } = payload;
      return { ...state, articles };
    }
    case ACTIONS.SAVE_PAGE_UPDATES_FAILURE: return { ...state };

    /**
     * SELECT PAGE (SET ACTIVE)
     */
    case ACTIONS.SELECT_PAGE: {
      const { activeArticleNid } = payload;
      return { ...state, activeArticleNid };
    }

    default:
      return { ...state };
  }
};

export default reducer;
