import createSagaMiddleware from 'redux-saga';
import configureMockStore from 'redux-mock-store';
import * as sagas from './sagas';
import * as actions from './actions';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureMockStore([sagaMiddleware]);

describe('the sagas', () => {
  it('should execute the loginRequestSaga (LOGIN_REQUEST and LOGIN_SUCCESS)', (done) => {
    const store = mockStore({});
    sagaMiddleware.run(sagas.watchOAuth); // has to be executed after the mockStore() call

    const expectedActions = [
      {
        payload: {
          password: 'test', username: 'test',
        },
        type: 'LOGIN_REQUEST',
      },
      {
        payload: {
          accessToken: 'asdf',
          expiration: 300,
          refreshToken: 'asdfasdf',
          timestamp: 0,
          username: 'test',
        },
        type: 'LOGIN_SUCCESS',
      }];

    store.subscribe(() => {
      const storeActions = store.getActions();
      if (storeActions.length >= expectedActions.length) {
        expect(storeActions[0]).toEqual(expectedActions[0]);
        storeActions[1].payload.timestamp = 0;
        expect(storeActions[1]).toEqual(expectedActions[1]);
        done();
      }
    });

    // Return the promise
    store.dispatch({
      type: actions.LOGIN_REQUEST,
      payload: {
        username: 'test',
        password: 'test',
      },
    });
  });
});
