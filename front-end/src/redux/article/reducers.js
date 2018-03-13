import { types } from './actions';

export const initialState = {
  articles: [],
  activeArticleNid: 0,
};

export const reducer = (state = initialState, { type, payload, error }) => {
  if (error) { console.log(error); }
  switch (type) {
    /**
     * FETCH FETCH_ARTICLES
     */
    case types.FETCH_ARTICLES: return { ...state };
    case types.FETCH_ARTICLES_SUCCESS: {
      const { articles } = payload;
      return { ...state, articles, activeArticleNid: 0 };
    }
    case types.FETCH_ARTICLES_FAILURE: return { ...state };

    /**
     * ADD ARTICLE
     */
    case types.CREATE_ARTICLE: return { ...state };
    case types.CREATE_ARTICLE_SUCCESS: {
      const { articles, activeArticleNid } = payload;
      return { ...state, articles, activeArticleNid };
    }
    case types.CREATE_ARTICLE_FAILURE: return { ...state };

    /**
     * DELETE ARTICLE
     */
    case types.DELETE_ARTICLE: return { ...state };
    case types.DELETE_ARTICLE_SUCCESS: {
      const { articles } = payload;
      return { ...state, articles };
    }
    case types.DELETE_ARTICLE_FAILURE: return { ...state };

    /**
     * SAVE ARTICLE
     */
    case types.SAVE_ARTICLE_UPDATES: return { ...state };
    case types.SAVE_ARTICLE_UPDATES_SUCCESS: {
      const { articles } = payload;
      return { ...state, articles };
    }
    case types.SAVE_ARTICLE_UPDATES_FAILURE: return { ...state };

    /**
     * SELECT ARTICLE (SET ACTIVE)
     */
    case types.SELECT_ARTICLE: {
      const { activeArticleNid } = payload;
      return { ...state, activeArticleNid };
    }

    default:
      return state;
  }
};

export default reducer;
