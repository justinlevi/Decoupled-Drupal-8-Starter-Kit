import { ACTIONS } from './actions';

const initialState = {
  articles: [],
  activeArticleNid: 0,
};

export const reducer = (state = initialState, { type, payload, error }) => {
  switch (type) {
    /**
     * FETCH FETCH_ARTICLES
     */
    case ACTIONS.FETCH_ARTICLES: return { ...state };
    case ACTIONS.FETCH_ARTICLE_SUCCESS: {
      const { articles } = payload;
      return { ...state, articles, activeArticleNid: 0 };
    }
    case ACTIONS.FETCH_ARTICLE_FAILURE: return { ...state };

    /**
     * ADD ARTICLE
     */
    case ACTIONS.ADD_ARTICLE: return { ...state };
    case ACTIONS.ADD_ARTICLE_SUCCESS: {
      const { articles, activeArticleNid } = payload;
      return { ...state, articles, activeArticleNid };
    }
    case ACTIONS.ADD_ARTICLE_FAILURE: return { ...state };

    /**
     * DELETE ARTICLE
     */
    case ACTIONS.DELETE_ARTICLE: return { ...state };
    case ACTIONS.DELETE_ARTICLE_SUCCESS: {
      const { articles } = payload;
      return { ...state, articles };
    }
    case ACTIONS.DELETE_ARTICLE_FAILURE: return { ...state };

    /**
     * SAVE ARTICLE
     */
    case ACTIONS.SAVE_ARTICLE_UPDATES: return { ...state };
    case ACTIONS.SAVE_ARTICLE_UPDATES_SUCCESS: {
      const { articles } = payload;
      return { ...state, articles };
    }
    case ACTIONS.SAVE_ARTICLE_UPDATES_FAILURE: return { ...state };

    /**
     * SELECT ARTICLE (SET ACTIVE)
     */
    case ACTIONS.SELECT_ARTICLE: {
      const { activeArticleNid } = payload;
      return { ...state, activeArticleNid };
    }

    default:
      return { ...state };
  }
};

export default reducer;
