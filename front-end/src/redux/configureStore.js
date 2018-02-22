import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import rootSaga from './rootSaga';
import { rootReducer } from './rootReducer';

const configureStore = (history) => {
  const sagaMiddleware = createSagaMiddleWare();
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
    applyMiddleware(routerMiddleware(history)),
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
