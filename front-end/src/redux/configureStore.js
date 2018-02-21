import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleWare from 'redux-saga';

import rootSaga from './rootSaga';
import { rootReducer } from './rootReducer';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleWare();
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
