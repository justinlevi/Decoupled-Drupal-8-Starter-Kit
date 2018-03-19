import { types } from './actions';
import { reducer, initialState } from './reducers';
import * as data from '../../api/__mocks__/data';

const { articles } = data.ARTICLES_BY_USER_DATA.data.user.nodes;

describe('Reducer', () => {
  it('Should return the initial state when no action passed', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('Should console log the error when error is passed', () => {
    expect(reducer(undefined, {error: "ERROR"})).toEqual(initialState);
  });

  it('FETCH_ARTICLES, FETCH_ARTICLES_FAILURE action should return the correct state', () => {
    const expectedState = {
      ...initialState,
    };
    expect(reducer(undefined, { type: types.FETCH_ARTICLES })).toEqual(expectedState);
    expect(reducer(undefined, { type: types.FETCH_ARTICLES_FAILURE })).toEqual(expectedState);
  });

  it('FETCH_ARTICLES_SUCCESS action should return the correct state', () => {
    const action = {
      type: types.FETCH_ARTICLES_SUCCESS,
      payload: {
        articles,
      },
    };
    const expectedState = {
      ...initialState,
      articles,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });


  it('CREATE_ARTICLE, CREATE_ARTICLE_FAILURE action should return the correct state', () => {
    const expectedState = {
      ...initialState,
    };
    expect(reducer(undefined, { type: types.CREATE_ARTICLE })).toEqual(expectedState);
    expect(reducer(undefined, { type: types.CREATE_ARTICLE_FAILURE })).toEqual(expectedState);
  });

  it('CREATE_ARTICLE_SUCCESS action should return the correct state', () => {
    const action = {
      type: types.CREATE_ARTICLE_SUCCESS,
      payload: {
        articles,
        activeArticleNid: 1,
      },
    };
    const expectedState = {
      ...initialState,
      articles,
      activeArticleNid: 1,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });


  it('DELETE_ARTICLE, DELETE_ARTICLE_FAILURE action should return the correct state', () => {
    const expectedState = {
      ...initialState,
    };
    expect(reducer(undefined, { type: types.DELETE_ARTICLE })).toEqual(expectedState);
    expect(reducer(undefined, { type: types.DELETE_ARTICLE_FAILURE })).toEqual(expectedState);
  });

  it('DELETE_ARTICLE_SUCCESS action should return the correct state', () => {
    const action = {
      type: types.DELETE_ARTICLE_SUCCESS,
      payload: {
        articles,
      },
    };
    const expectedState = {
      ...initialState,
      articles,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('SAVE_ARTICLE_UPDATES, SAVE_ARTICLE_UPDATES_FAILURE action should return the correct state', () => {
    const expectedState = {
      ...initialState,
    };
    expect(reducer(undefined, { type: types.SAVE_ARTICLE_UPDATES })).toEqual(expectedState);
    expect(reducer(undefined, { type: types.SAVE_ARTICLE_UPDATES_FAILURE })).toEqual(expectedState);
  });

  it('SAVE_ARTICLE_UPDATES_SUCCESS action should return the correct state', () => {
    const action = {
      type: types.SAVE_ARTICLE_UPDATES_SUCCESS,
      payload: {
        articles,
      },
    };
    const expectedState = {
      ...initialState,
      articles,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('SELECT_ARTICLE action should return the correct state', () => {
    const action = { type: types.SELECT_ARTICLE, payload: { ...initialState, activeArticleNid: 1 } };
    const expectedState = {
      ...initialState,
      activeArticleNid: 1,
    };
    expect(reducer(undefined, action)).toEqual(expectedState);
  });
});
