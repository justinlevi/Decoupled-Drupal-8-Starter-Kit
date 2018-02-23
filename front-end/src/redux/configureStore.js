import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

import { loadState, saveState } from './localStorage';

export const history = createHistory();

const configureStore = () => {
  const persistedState = loadState();
  const sagaMiddleware = createSagaMiddleWare();
  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(routerMiddleware(history)),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );
  sagaMiddleware.run(rootSaga);

  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
};

export default configureStore;
