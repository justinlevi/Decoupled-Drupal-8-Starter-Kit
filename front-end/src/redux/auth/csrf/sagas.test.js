import createSagaMiddleware from 'redux-saga';
import configureMockStore from 'redux-mock-store';
import * as sagas from './sagas';
import * as actions from './actions';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureMockStore([sagaMiddleware]);

describe('the sagas', () => {
  it('should execute the initCsrfToken action creator (INIT_CSRF_TOKEN, CSRF_TOKEN_SUCCESS, REFRESH_TOKENS_REQUEST_SUCCESS', (done) => {
    const store = mockStore({});
    sagaMiddleware.run(sagas.watchCsrfToken); // has to be executed after the mockStore() call

    const expectedActions = [{ type: 'INIT_CSRF_TOKEN' }, { payload: 'asdf', type: 'SET_CSRF_TOKEN' }, { type: 'CSRF_TOKEN_SUCCESS' }];

    store.subscribe(() => {
      const storeActions = store.getActions();
      if (storeActions.length >= expectedActions.length) {
        expect(storeActions).toEqual(expectedActions);
        done();
      }
    });

    // Return the promise
    store.dispatch({
      type: actions.INIT_CSRF_TOKEN,
    });
  });
});
