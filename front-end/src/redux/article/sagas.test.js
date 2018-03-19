import createSagaMiddleware from 'redux-saga';
import configureMockStore from 'redux-mock-store';
import * as sagas from './sagas';
import * as actions from './actions';
import * as oauthActions from '../auth/oauth/actions';
import {introspectionQuery, buildClientSchema, graphql} from 'graphql';
import {addMockFunctionsToSchema} from 'graphql-tools';
import {print} from 'graphql/language/printer';
import { put,call,takeEvery,take,select } from 'redux-saga/effects';
import * as introspectionResult from '../../api/schema.json';
import {
  CURRENT_USER_QUERY,
  ARTICLES_BY_USER_QUERY,
  createArticleMutation,
  deleteArticleMutation,
  updateArticleMutation,
  getSignedUrls,
  addS3Files,
} from '../../api/apolloProxy';
import { cloneableGenerator } from 'redux-saga/utils';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import * as data from '../../api/__mocks__/data';

const articles = data.ARTICLES_BY_USER_DATA;

import { articlesByUser,createArticle,selectArticles,deleteArticle,updateArticle } from '../../api/apolloProxy';
import { formatFetchArticlesResult, removeArticleFromArticles, updateArticlesWithArticle, getArticleFromNid } from './utilities';
import {
  types as articleActionTypes,
  fetchArticlesSuccess,
  fetchArticlesFailure,
  createArticleSuccess,
  createArticleFailure,
  deleteArticleSuccess,
  deleteArticleFailure,
  saveArticleUpdatesSuccess,
  saveArticleUpdatesFailure,
} from './actions';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureMockStore([sagaMiddleware]);
const schema = buildClientSchema(introspectionResult);
addMockFunctionsToSchema({schema});

const storeState = {
  articleReducer:{
    ...articles.data.user.nodes
  }
};

describe('the sagas', () => {

  it('should execute the fetchArticlesSaga action creator and fail the call to articlesByUser', () => {
    const store = mockStore({});
    sagaMiddleware.run(sagas.watchArticleActions); // has to be executed after the mockStore() call

    const expectedActions = [
      {
        type: 'FETCH_ARTICLES'
      }, {
        type: 'TOKENS_EXPIRED_CHECK'
      }, {
        type: 'TOKENS_EXPIRED_CHECK_VALID'
      }, {
        error: 'Error: Network error: Network request failed',
        type: 'FETCH_ARTICLES_FAILURE'
      }
    ];

    store.subscribe(() => {
      const storeActions = store.getActions();
      let refreshCheck;

      storeActions.forEach(function(item) {
        if (item.type === 'TOKENS_EXPIRED_CHECK') {
          refreshCheck = 'valid';
        } else {
          refreshCheck = 'invalid';
        }
      })

      if (refreshCheck === 'valid') {
        store.dispatch({type: oauthActions.TOKENS_EXPIRED_CHECK_VALID});
      }

      if (storeActions.length >= expectedActions.length) {
        expect(storeActions.sort()).toEqual(expectedActions.sort());
      }

    });

    store.dispatch({type: actions.FETCH_ARTICLES});
  });//End of fetch articles fail check


  it('should execute the fetchArticlesSaga action creator and succeed', () => {

    const saga = expectSaga(sagas.fetchArticlesSaga);

    graphql(schema,print(ARTICLES_BY_USER_QUERY),null).then((result) => {

      const images = result.data.user.nodes.articles.map(node =>
        node.images = {
          ...node.images,
          entity: {
            image: {
              derivative: {
                url: '',
              },
            },
          },
          mid: '',
        });

        result.data.user.nodes.articles[0].images = images;
        result.data.user.nodes.articles[1].images = images;

        const testData = formatFetchArticlesResult(result);

        saga
        .provide([
          [matchers.call.fn(articlesByUser), result],
        ])
        .put({type: 'TOKENS_EXPIRED_CHECK'})
        .put(fetchArticlesSuccess({ articles: testData }))
        .dispatch({type: oauthActions.TOKENS_EXPIRED_CHECK_VALID})
        .run()
      });

  });//End of fetch articles saga action

  it('should execute the createArticleSaga and succeed', () => {

    const payload = {
      payload:{
        title: "NULL"
      }
    }

    let updatedStoreState = {
      articleReducer:{
        ...articles.data.user.nodes
      }
    };

    const saga = expectSaga(sagas.createArticleSaga,payload);

    graphql(schema, print(createArticleMutation), null, null, { title: 'Hello Everybody' }).then((result) => {

        result.data.createArticle.page = {
          author: {
            name:"admin"
          },
          body: null,
          images: [],
          nid: 18,
          title: "NULL",
          uuid: 'c0ee6953-0398-4823-9bd8-1b1ef1896fc4'
        };

        const page = result.data.createArticle.page;
        updatedStoreState = articles.data.user.nodes.articles.concat([page]);

        saga
        .provide([
          [matchers.call.fn(createArticle), result],
        ])
        .withState(storeState)
        .put({type: 'TOKENS_EXPIRED_CHECK'})
        .put(createArticleSuccess({ articles: updatedStoreState , activeArticleNid: page.nid }))
        .dispatch({type: oauthActions.TOKENS_EXPIRED_CHECK_VALID})
        .run()
      });

  });//End of Create Article Test

  it('Should execute deleteArticleSaga and succeed',() => {

    const payload = {
      payload:{
        id: 13
      }
    }

    const saga = expectSaga(sagas.deleteArticleSaga,payload);

    graphql(schema, print(deleteArticleMutation), null, null, { id: 1 }).then((result) => {

      result.data.deleteArticle.page = {
        author: { name: 'admin' },
        title: 'hello article update',
        body: null,
        nid: 13,
        uuid: '79502776-61f8-4c48-b464-d94eebe0e01b',
        images: []
      };

      const page = result.data.deleteArticle.page;
      const testData = removeArticleFromArticles(storeState.articleReducer.articles, page.nid);

      saga
      .provide([
        [matchers.call.fn(deleteArticle), result],
      ])
      .withState(storeState)
      .put({type: 'TOKENS_EXPIRED_CHECK'})
      .put(deleteArticleSuccess({ articles: testData }))
      .dispatch({type: oauthActions.TOKENS_EXPIRED_CHECK_VALID})
      .run()

    })

  }); //End of Delete Article Saga test

  it('Should execute saveArticleUpdatesSaga and succeed',() => {

    const action ={
      payload: {
        id: 1,
        title: 'asdfasd',
        body: 'body text',
        field_media_image: [1, 2, 3],
      }
    }

    const saga = expectSaga(sagas.saveArticleUpdatesSaga,action);

    graphql(schema, print(updateArticleMutation), null, null, action.payload).then((result) => {

      result.data.updateArticle.page = {
        author: {
          name: 'admin'
        },
        title: 'Whatsup',
        body: null,
        nid: 13,
        uuid: '79502776-61f8-4c48-b464-d94eebe0e01b',
        images: []
      };

      const page = result.data.updateArticle.page;
      const testData = updateArticlesWithArticle(storeState.articleReducer.articles, page);

      saga
      .provide([
        [matchers.call.fn(updateArticle), result],
      ])
      .withState(storeState)
      .put({type: 'TOKENS_EXPIRED_CHECK'})
      .put(saveArticleUpdatesSuccess({ articles: testData }))
      .dispatch({type: oauthActions.TOKENS_EXPIRED_CHECK_VALID})
      .run()

    })

  });//End of Save Article Updates Saga

});
