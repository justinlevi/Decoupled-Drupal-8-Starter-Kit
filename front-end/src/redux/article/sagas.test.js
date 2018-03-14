import createSagaMiddleware from 'redux-saga';
import configureMockStore from 'redux-mock-store';
import * as sagas from './sagas';
import * as actions from './actions';
import * as oauthActions from '../auth/oauth/actions';

import { introspectionQuery, buildClientSchema, graphql } from 'graphql';
import { addMockFunctionsToSchema } from 'graphql-tools';
import { print } from 'graphql/language/printer';

import * as introspectionResult from '../../api/schema.json';

import {
  CURRENT_USER_QUERY,
  ARTICLES_BY_USER_QUERY,
} from '../../api/apolloProxy';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureMockStore([sagaMiddleware]);

describe('the sagas', () => {

  const schema = buildClientSchema(introspectionResult);
  addMockFunctionsToSchema({ schema });

  it('should execute the fetchArticlesSaga action creator and fail the call to articlesByUser', (done) => {
    const store = mockStore({});
    sagaMiddleware.run(sagas.watchArticleActions); // has to be executed after the mockStore() call

    const expectedActions = [
      { type: 'FETCH_ARTICLES' },
      { type: 'TOKENS_EXPIRED_CHECK' },
      { type: 'TOKENS_EXPIRED_CHECK_VALID' },
      {
        error: 'Error: Network error: Network request failed',
        type: 'FETCH_ARTICLES_FAILURE'
      }
    ];

    store.subscribe(() => {
      const storeActions = store.getActions();
      let refreshCheck;

      storeActions.forEach(function(item){
        if(item.type === 'TOKENS_EXPIRED_CHECK'){
          refreshCheck = 'valid';
        }else{
          refreshCheck = 'invalid';
        }
      })

      if(refreshCheck === 'valid'){
        store.dispatch({
          type: oauthActions.TOKENS_EXPIRED_CHECK_VALID,
        });
      }

      if(storeActions.length >= expectedActions.length){
        graphql(schema, print(ARTICLES_BY_USER_QUERY), null).then((result) => {
            expect(storeActions.sort()).toEqual(expectedActions.sort());
            done();
        });
      }
      
    });

    store.dispatch({
      type: actions.FETCH_ARTICLES,
    });
  });
});
