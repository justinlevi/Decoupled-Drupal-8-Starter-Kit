import * as actions from './actions';

describe('Actions', () => {
  const {
    types,
    fetchArticles,
    fetchArticlesSuccess,
    fetchArticlesFailure,
    createArticle,
    createArticleSuccess,
    createArticleFailure,
    deleteArticle,
    deleteArticleSuccess,
    deleteArticleFailure,
    saveArticleUpdates,
    saveArticleUpdatesSuccess,
    saveArticleUpdatesFailure,
    selectArticle,
  } = actions;

  const payload = 'asdf';
  const error = 'error';

  it('Should create an action to fetchArticles', () => {
    const expectedAction = { type: types.FETCH_ARTICLES };
    expect(fetchArticles()).toEqual(expectedAction);
  });

  it('Should create an action to fetchArticlesSuccess', () => {
    const expectedAction = { type: types.FETCH_ARTICLES_SUCCESS, payload };
    expect(fetchArticlesSuccess(payload)).toEqual(expectedAction);
  });

  it('Should create an action to fetchArticlesFailure', () => {
    const expectedAction = { type: types.FETCH_ARTICLES_FAILURE, error };
    expect(fetchArticlesFailure(error)).toEqual(expectedAction);
  });

  it('Should create an action to createArticle', () => {
    const expectedAction = { type: types.CREATE_ARTICLE, payload };
    expect(createArticle(payload)).toEqual(expectedAction);
  });

  it('Should create an action to createArticleSuccess', () => {
    const expectedAction = { type: types.CREATE_ARTICLE_SUCCESS, payload };
    expect(createArticleSuccess(payload)).toEqual(expectedAction);
  });

  it('Should create an action to createArticleFailure', () => {
    const expectedAction = { type: types.CREATE_ARTICLE_FAILURE, error };
    expect(createArticleFailure(error)).toEqual(expectedAction);
  });

  it('Should create an action to deleteArticle', () => {
    const expectedAction = { type: types.DELETE_ARTICLE, payload };
    expect(deleteArticle(payload)).toEqual(expectedAction);
  });

  it('Should create an action to deleteArticleSuccess', () => {
    const expectedAction = { type: types.DELETE_ARTICLE_SUCCESS, payload };
    expect(deleteArticleSuccess(payload)).toEqual(expectedAction);
  });

  it('Should create an action to deleteArticleFailure', () => {
    const expectedAction = { type: types.DELETE_ARTICLE_FAILURE, error };
    expect(deleteArticleFailure(error)).toEqual(expectedAction);
  });

  it('Should create an action to saveArticleUpdates', () => {
    const expectedAction = { type: types.SAVE_ARTICLE_UPDATES, payload };
    expect(saveArticleUpdates(payload)).toEqual(expectedAction);
  });

  it('Should create an action to saveArticleUpdatesSuccess', () => {
    const expectedAction = { type: types.SAVE_ARTICLE_UPDATES_SUCCESS, payload };
    expect(saveArticleUpdatesSuccess(payload)).toEqual(expectedAction);
  });

  it('Should create an action to saveArticleUpdatesFailure', () => {
    const expectedAction = { type: types.SAVE_ARTICLE_UPDATES_FAILURE, error };
    expect(saveArticleUpdatesFailure(error)).toEqual(expectedAction);
  });

  it('Should create an action to selectArticle', () => {
    const expectedAction = { type: types.SELECT_ARTICLE, payload };
    expect(selectArticle(payload)).toEqual(expectedAction);
  });
});
