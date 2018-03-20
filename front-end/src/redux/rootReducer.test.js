
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';

// actions
import * as ARTICLE_ACTIONS from './article/actions';
import * as CSRF_ACTIONS from './auth/csrf/actions';
import * as OAUTH_ACTIONS from './auth/oauth/actions';

// actions
import ARTICLE_REDUCER from './article/reducers';
import CSRF_REDUCER from './auth/csrf/reducers';
import OAUTH_REDUCER from './auth/oauth/reducers';

describe('Root Reducer Smoke Test', () => {
  it('sets up the reducers correctly and initial state is as expected', () => {
    const store = createStore(rootReducer);

    // check that initial state of the root reducer matches
    // what child reducers return given an empty action
    expect(store.getState().articleReducer).toEqual(ARTICLE_REDUCER(undefined, {}));
    expect(store.getState().csrfReducer).toEqual(CSRF_REDUCER(undefined, {}));
    expect(store.getState().authReducer).toEqual(OAUTH_REDUCER(undefined, {}));

    // alternatively you can test values explicitly although this
    // couples this test to child reducer impl details:

    expect(store.getState().authReducer.isAuthenticated).toEqual(false);
    expect(store.getState().articleReducer.articles).toEqual([]);

    // now you can do a similar “smoke test” to check
    // that child reducers handle an action

    let action = { type: ARTICLE_ACTIONS.FETCH_ARTICLES };
    store.dispatch(action);
    expect(store.getState().articleReducer).toEqual(ARTICLE_REDUCER(undefined, action));

    action = { type: CSRF_ACTIONS.INIT_CSRF_TOKEN };
    store.dispatch(action);
    expect(store.getState().csrfReducer).toEqual(CSRF_REDUCER(undefined, action));
  });

  it('Sets handles conditional rootReducer setup', () => {
    const store = createStore(rootReducer);
    let action = { type: 'LOGOUT' };
    store.dispatch(action);
    const expected = {
      articleReducer: { activeArticleNid: 0, articles: [], allArticles: [] },
      authReducer: {
        credentials: {
          accessToken: null, expiration: null, refreshToken: null, timestamp: null, username: null,
        },
        error: undefined,
        isAuthenticated: false,
        isLoading: false,
        isLoggingIn: false,
      },
      csrfReducer: { csrfToken: null },
      routerReducer: { location: null },
    };
    expect(store.getState()).toEqual(expected);
    action = { type: '@@INIT' };
    store.dispatch(action);
    expect(store.getState()).toEqual(expected);
  });
});
