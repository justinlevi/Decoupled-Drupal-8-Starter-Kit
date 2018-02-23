import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import rootSaga from './rootSaga';
import { rootReducer } from './rootReducer';

import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const configureStore = (history) => {
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
